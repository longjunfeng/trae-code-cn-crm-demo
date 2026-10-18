// 前端单元测试：针对 App.vue 中各个独立逻辑单元（校验、筛选、状态切换、表单默认值与回填）
// 依据 .trae/specs/generate-system-spec/spec.md 需求 CRM-001 ~ CRM-006
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import App from '../../web/src/App.vue';

const apiUsers = [
  { id: 'u-1001', name: '林晓', email: 'lin.xiao@example.test', role: '管理员', org: '华东销售部', status: 'active', lastLogin: '2026-10-15 09:20' },
  { id: 'u-1002', name: '周宁', email: 'zhou.ning@example.test', role: '销售经理', org: '华南销售部', status: 'active', lastLogin: '2026-10-14 16:05' },
  { id: 'u-1003', name: '陈可', email: 'chen.ke@example.test', role: '只读成员', org: '客户成功部', status: 'disabled', lastLogin: '2026-09-29 11:40' },
];

async function mountApp(): Promise<VueWrapper> {
  const wrapper = mount(App);
  await flushPromises();
  return wrapper;
}

/** 打开新建用户表单，返回表单内输入框 [姓名, 邮箱, 组织] */
async function openCreateForm(w: VueWrapper) {
  await w.find('button.primary').trigger('click'); // 首个 primary 按钮为「新建用户」
  const inputs = w.findAll('input');
  return { name: inputs[1], email: inputs[2], org: inputs[3] };
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => apiUsers }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('单元：表单校验（CRM-003）', () => {
  it('邮箱格式非法时阻止保存并提示', async () => {
    const w = await mountApp();
    const form = await openCreateForm(w);
    await form.name.setValue('赵敏');
    await form.email.setValue('invalid-email');
    await form.org.setValue('产品部');
    await w.find('form').trigger('submit');
    await flushPromises();
    expect(w.find('.toast').text()).toBe('请填写有效姓名和邮箱');
    // 表单未关闭，用户未创建
    expect(w.find('form').exists()).toBe(true);
    expect(w.findAll('tbody tr')).toHaveLength(3);
  });

  it('姓名缺失时阻止保存并提示', async () => {
    const w = await mountApp();
    const form = await openCreateForm(w);
    await form.email.setValue('zhao.min@example.test');
    await w.find('form').trigger('submit');
    await flushPromises();
    expect(w.find('.toast').text()).toBe('请填写有效姓名和邮箱');
    expect(w.findAll('tbody tr')).toHaveLength(3);
  });

  it('新建表单打开时角色与组织为默认值，姓名邮箱为空', async () => {
    const w = await mountApp();
    const form = await openCreateForm(w);
    expect((form.name.element as HTMLInputElement).value).toBe('');
    expect((form.email.element as HTMLInputElement).value).toBe('');
    // 表单内角色下拉为第 3 个 select（前两个为列表筛选）
    const roleSelect = w.findAll('select')[2].element as HTMLSelectElement;
    expect(roleSelect.value).toBe('销售经理');
    expect((form.org.element as HTMLInputElement).value).toBe('华东销售部');
  });
});

describe('单元：筛选逻辑（CRM-002）', () => {
  it('关键词匹配姓名：仅显示匹配用户', async () => {
    const w = await mountApp();
    await w.findAll('input')[0].setValue('周宁');
    const rows = w.findAll('tbody tr');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('周宁');
  });

  it('关键词不区分大小写：可用大写邮箱片段命中', async () => {
    const w = await mountApp();
    await w.findAll('input')[0].setValue('LIN.XIAO');
    const rows = w.findAll('tbody tr');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('林晓');
  });

  it('角色筛选：仅显示所选角色', async () => {
    const w = await mountApp();
    await w.findAll('select')[0].setValue('管理员');
    const rows = w.findAll('tbody tr');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('林晓');
  });

  it('状态筛选：仅显示停用用户', async () => {
    const w = await mountApp();
    await w.findAll('select')[1].setValue('停用');
    const rows = w.findAll('tbody tr');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('陈可');
  });

  it('重置按钮清空全部筛选条件', async () => {
    const w = await mountApp();
    await w.findAll('input')[0].setValue('周宁');
    await w.findAll('select')[0].setValue('销售经理');
    expect(w.findAll('tbody tr')).toHaveLength(1);
    await w.findAll('button').find(b => b.text() === '重置')!.trigger('click');
    expect(w.findAll('tbody tr')).toHaveLength(3);
  });
});

describe('单元：状态切换（CRM-006）', () => {
  it('停用后状态标签与提示更新，再次点击可启用', async () => {
    const w = await mountApp();
    const row = w.findAll('tbody tr')[0]; // 林晓（active）
    // 行内按钮顺序：用户名 / 查看 / 编辑 / 停用|启用
    await row.findAll('button')[3].trigger('click');
    expect(w.find('.toast').text()).toBe('用户已停用');
    expect(row.find('.status').text()).toBe('停用');
    await row.findAll('button')[3].trigger('click');
    expect(w.find('.toast').text()).toBe('用户已启用');
    expect(row.find('.status').text()).toBe('启用');
  });
});

describe('单元：编辑回填（CRM-004）', () => {
  it('打开编辑表单时回填原用户数据', async () => {
    const w = await mountApp();
    const row = w.findAll('tbody tr')[0]; // 林晓
    await row.findAll('button')[2].trigger('click'); // 编辑
    const inputs = w.findAll('input');
    expect((inputs[1].element as HTMLInputElement).value).toBe('林晓');
    expect((inputs[2].element as HTMLInputElement).value).toBe('lin.xiao@example.test');
    expect((inputs[3].element as HTMLInputElement).value).toBe('华东销售部');
    const roleSelect = w.findAll('select')[2].element as HTMLSelectElement;
    expect(roleSelect.value).toBe('管理员');
  });
});

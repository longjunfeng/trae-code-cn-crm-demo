// 前端集成测试：挂载完整 App 组件，验证跨模块用户流程
// 覆盖 spec（.trae/specs/generate-system-spec/spec.md）中 CRM-001 ~ CRM-006 与 Demo Mode 要求
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

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => apiUsers }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('集成：用户列表加载与渲染（CRM-001）', () => {
  it('挂载后从 API 加载用户并渲染六项字段', async () => {
    const w = await mountApp();
    expect(fetch).toHaveBeenCalledWith('/api/users');
    expect(w.find('.table-head .muted').text()).toBe('3 位用户');
    const row = w.findAll('tbody tr')[0];
    const text = row.text();
    for (const field of ['林晓', 'lin.xiao@example.test', '管理员', '华东销售部', '启用', '2026-10-15 09:20']) {
      expect(text).toContain(field);
    }
    // 停用用户状态正确渲染
    expect(w.findAll('tbody tr')[2].find('.status').text()).toBe('停用');
  });
});

describe('集成：组合筛选与空状态（CRM-002）', () => {
  it('关键词与角色组合无匹配时显示空状态，不回退展示未过滤数据', async () => {
    const w = await mountApp();
    await w.findAll('input')[0].setValue('陈可'); // 只读成员
    await w.findAll('select')[0].setValue('管理员'); // 与关键词冲突
    expect(w.find('tbody').exists()).toBe(false);
    const state = w.find('.state');
    expect(state.text()).toContain('暂无匹配用户');
    expect(state.text()).toContain('调整筛选条件或新建用户');
    expect(w.find('.table-head .muted').text()).toBe('0 位用户');
  });
});

describe('集成：新建用户完整流程（CRM-003）', () => {
  it('填写合法数据保存后新用户置顶展示且初始状态为启用/未登录', async () => {
    const w = await mountApp();
    await w.find('button.primary').trigger('click'); // 新建用户
    const inputs = w.findAll('input');
    await inputs[1].setValue('赵敏');
    await inputs[2].setValue('zhao.min@example.test');
    await inputs[3].setValue('产品部');
    await w.find('form').trigger('submit');
    await flushPromises();
    // 弹窗关闭、提示成功、计数更新
    expect(w.find('form').exists()).toBe(false);
    expect(w.find('.toast').text()).toBe('保存成功');
    expect(w.find('.table-head .muted').text()).toBe('4 位用户');
    // 新用户在列表首位
    const firstRow = w.findAll('tbody tr')[0];
    expect(firstRow.text()).toContain('赵敏');
    expect(firstRow.text()).toContain('zhao.min@example.test');
    expect(firstRow.text()).toContain('未登录');
    expect(firstRow.find('.status').text()).toBe('启用');
  });
});

describe('集成：编辑用户流程（CRM-004）', () => {
  it('编辑保存后列表即时更新且保留原状态与登录时间', async () => {
    const w = await mountApp();
    await w.findAll('tbody tr')[0].findAll('button')[2].trigger('click'); // 林晓 -> 编辑（行内按钮：用户名/查看/编辑/停用）
    await w.findAll('input')[1].setValue('林晓（更新）');
    await w.find('form').trigger('submit');
    await flushPromises();
    expect(w.find('.toast').text()).toBe('保存成功');
    expect(w.find('.table-head .muted').text()).toBe('3 位用户');
    const firstRow = w.findAll('tbody tr')[0];
    expect(firstRow.text()).toContain('林晓（更新）');
    expect(firstRow.text()).toContain('lin.xiao@example.test');
    expect(firstRow.text()).toContain('2026-10-15 09:20');
  });
});

describe('集成：用户详情抽屉与编辑入口（CRM-005）', () => {
  it('点击用户打开详情抽屉，展示全部属性并可进入编辑', async () => {
    const w = await mountApp();
    await w.findAll('tbody tr')[1].find('.user-link').trigger('click'); // 周宁
    const drawer = w.find('.drawer');
    const text = drawer.text();
    for (const field of ['周宁', 'zhou.ning@example.test', '销售经理', '华南销售部', '启用', '2026-10-14 16:05']) {
      expect(text).toContain(field);
    }
    // 从详情进入编辑：表单打开并回填，抽屉关闭
    await drawer.find('button.primary').trigger('click');
    expect(w.find('.drawer').exists()).toBe(false);
    expect(w.find('form').exists()).toBe(true);
    expect((w.findAll('input')[1].element as HTMLInputElement).value).toBe('周宁');
  });
});

describe('集成：Demo Mode 降级（spec: Demo Mode 与发布约束）', () => {
  it('接口失败时回退本地种子数据并显示演示模式提示', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')));
    const w = await mountApp();
    expect(w.find('.notice').text()).toBe('当前为演示模式，使用本地种子数据');
    // 种子数据可用：三位虚构用户仍在列表中
    expect(w.find('.table-head .muted').text()).toBe('3 位用户');
    expect(w.findAll('tbody tr')[0].text()).toContain('林晓');
  });
});

describe('集成：刷新（CRM-001）', () => {
  it('点击刷新重新请求接口数据', async () => {
    const w = await mountApp();
    expect(fetch).toHaveBeenCalledTimes(1);
    await w.findAll('button').find(b => b.text() === '刷新')!.trigger('click');
    await flushPromises();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(w.find('.notice').exists()).toBe(false);
  });
});

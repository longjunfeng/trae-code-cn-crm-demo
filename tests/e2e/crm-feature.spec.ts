// E2E 功能用例：覆盖 spec（.trae/specs/generate-system-spec/spec.md）CRM-001 ~ CRM-006 全部功能需求
import { test, expect } from '@playwright/test';

test.describe('CRM 用户管理功能用例', () => {
  test('CRM-001 用户列表展示全部六项字段', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '用户管理' })).toBeVisible();
    await expect(page.getByText('3 位用户')).toBeVisible();
    const row = page.locator('tbody tr').filter({ hasText: '林晓' });
    await expect(row).toContainText('lin.xiao@example.test');
    await expect(row).toContainText('管理员');
    await expect(row).toContainText('华东销售部');
    await expect(row).toContainText('启用');
    await expect(row).toContainText('2026-10-15 09:20');
    // 停用用户（陈可）状态正确渲染
    const disabledRow = page.locator('tbody tr').filter({ hasText: '陈可' });
    await expect(disabledRow.locator('.status')).toHaveText('停用');
  });

  test('CRM-002 搜索与筛选：关键词、角色、状态、组合与空状态', async ({ page }) => {
    await page.goto('/');
    // 关键词筛选
    await page.getByLabel('搜索用户').fill('周宁');
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.locator('tbody tr')).toContainText('周宁');
    // 角色筛选
    await page.getByLabel('搜索用户').fill('');
    await page.getByLabel('角色筛选').selectOption('管理员');
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.locator('tbody tr')).toContainText('林晓');
    // 状态筛选
    await page.getByLabel('角色筛选').selectOption('全部');
    await page.getByLabel('状态筛选').selectOption('停用');
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.locator('tbody tr')).toContainText('陈可');
    // 组合筛选无匹配：显示空状态，不回退展示未过滤数据
    await page.getByLabel('搜索用户').fill('林晓');
    await expect(page.getByText('暂无匹配用户')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(0);
    // 重置恢复
    await page.getByRole('button', { name: '重置' }).click();
    await expect(page.locator('tbody tr')).toHaveCount(3);
  });

  test('CRM-003 新建用户：非法邮箱阻止提交，合法数据创建成功', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '新建用户' }).click();
    await expect(page.getByRole('heading', { name: '用户信息' })).toBeVisible();
    // 非法邮箱被阻止
    await page.getByLabel('姓名').fill('赵敏');
    await page.getByLabel('邮箱').fill('not-an-email');
    await page.getByLabel('组织').fill('产品部');
    await page.getByRole('button', { name: '保存用户' }).click();
    await expect(page.getByText('请填写有效姓名和邮箱')).toBeVisible();
    // 修正后创建成功：新用户置顶、初始启用、未登录
    await page.getByLabel('邮箱').fill('zhao.min@example.test');
    await page.getByRole('button', { name: '保存用户' }).click();
    await expect(page.getByText('保存成功')).toBeVisible();
    await expect(page.getByText('4 位用户')).toBeVisible();
    const row = page.locator('tbody tr').filter({ hasText: '赵敏' });
    await expect(row).toContainText('zhao.min@example.test');
    await expect(row).toContainText('未登录');
    await expect(row.locator('.status')).toHaveText('启用');
  });

  test('CRM-004 编辑用户保存后列表即时更新', async ({ page }) => {
    await page.goto('/');
    const row = page.locator('tbody tr').filter({ hasText: '林晓' });
    await row.getByRole('button', { name: '编辑' }).click();
    await expect(page.getByLabel('姓名')).toHaveValue('林晓');
    await page.getByLabel('姓名').fill('林晓（更新）');
    await page.getByRole('button', { name: '保存用户' }).click();
    await expect(page.getByText('保存成功')).toBeVisible();
    // 列表即时反映变更，邮箱等其余字段保留
    const updated = page.locator('tbody tr').filter({ hasText: '林晓（更新）' });
    await expect(updated).toContainText('lin.xiao@example.test');
    await expect(updated).toContainText('管理员');
    await expect(page.getByText('3 位用户')).toBeVisible();
  });

  test('CRM-005 用户详情抽屉展示全部属性并提供编辑入口', async ({ page }) => {
    await page.goto('/');
    await page.locator('tbody tr').filter({ hasText: '周宁' }).getByRole('button', { name: '查看' }).click();
    const drawer = page.locator('.drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText('周宁');
    await expect(drawer).toContainText('zhou.ning@example.test');
    await expect(drawer).toContainText('销售经理');
    await expect(drawer).toContainText('华南销售部');
    await expect(drawer).toContainText('启用');
    await expect(drawer).toContainText('2026-10-14 16:05');
    // 从详情进入编辑，表单回填原数据
    await drawer.getByRole('button', { name: '编辑用户' }).click();
    await expect(page.getByRole('heading', { name: '用户信息' })).toBeVisible();
    await expect(page.getByLabel('姓名')).toHaveValue('周宁');
    await expect(page.getByLabel('邮箱')).toHaveValue('zhou.ning@example.test');
  });

  test('CRM-006 停用与启用用户，状态标签即时切换', async ({ page }) => {
    await page.goto('/');
    const row = page.locator('tbody tr').filter({ hasText: '林晓' });
    // 停用
    await row.getByRole('button', { name: '停用' }).click();
    await expect(page.getByText('用户已停用')).toBeVisible();
    await expect(row.locator('.status')).toHaveText('停用');
    // 再次启用
    await row.getByRole('button', { name: '启用' }).click();
    await expect(page.getByText('用户已启用')).toBeVisible();
    await expect(row.locator('.status')).toHaveText('启用');
  });
});

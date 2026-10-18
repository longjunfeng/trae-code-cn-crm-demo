// 冒烟用例：最小核心链路集合，用于后续回归的快速验证（每条用例应保持快速、稳定、独立）
import { test, expect } from '@playwright/test';

test.describe('冒烟用例（回归基线）', () => {
  test('冒烟-01 页面加载与用户列表渲染', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '用户管理' })).toBeVisible();
    await expect(page.getByText('3 位用户')).toBeVisible();
    await expect(page.getByText('林晓')).toBeVisible();
  });

  test('冒烟-02 新建用户核心链路', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '新建用户' }).click();
    await page.getByLabel('姓名').fill('冒烟测试用户');
    await page.getByLabel('邮箱').fill('smoke@example.test');
    await page.getByLabel('组织').fill('质量保障部');
    await page.getByRole('button', { name: '保存用户' }).click();
    await expect(page.getByText('冒烟测试用户')).toBeVisible();
    await expect(page.getByText('4 位用户')).toBeVisible();
  });

  test('冒烟-03 搜索与状态切换核心链路', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('搜索用户').fill('周宁');
    await expect(page.getByText('周宁')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(1);
    const row = page.locator('tbody tr').filter({ hasText: '周宁' });
    await row.getByRole('button', { name: '停用' }).click();
    await expect(page.getByText('用户已停用')).toBeVisible();
  });

  test('冒烟-04 API 健康检查（CRM-008）', async ({ request }) => {
    // 直连 API 服务端口（4174 为前端静态服务，无 /api 代理）
    const res = await request.get('http://localhost:4175/api/health');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: 'ok', service: 'crm-api' });
  });
});

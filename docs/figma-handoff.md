# Figma 原型交付说明

## 连接状态

当前项目包含完整的 Figma 页面结构、设计令牌和代码映射，可在 Figma 连接完成后按此清单创建真实文件。当前运行环境未提供可直接写入 Figma 文件的连接器，因此保留此可导入交付物。

## 页面

1. **用户列表**：顶部导航、页面标题、搜索/筛选栏、用户表格、空状态。
2. **新建/编辑用户**：抽屉表单、必填校验、邮箱错误提示、提交反馈。
3. **用户详情**：详情抽屉、角色、组织、状态、最近登录、编辑入口。
4. **角色权限**：角色卡片与权限标签。
5. **异常状态**：加载骨架、接口失败提示、无结果状态。

## 设计令牌

- 深色导航：`#101827`
- 主色：`#536CF3`
- 成功：`#1B9362`
- 页面背景：`#F5F7FB`
- 卡片圆角：`14px`
- 控件圆角：`8px`
- 间距基线：`4px`

## 代码映射

| Figma 页面/组件 | 代码组件 |
|---|---|
| User List | `web/src/App.vue` table section |
| User Form Modal | `web/src/App.vue` modal form |
| User Detail Drawer | `web/src/App.vue` drawer |
| Status Tag | `status` class |
| Primary Button | `.primary` |

## 已创建文件

- Figma 文件：[Trae Code CN CRM 用户管理原型](https://www.figma.com/design/pD4DUyLyTR1ylac4XAvnI7)
- 已创建可编辑页面：用户列表、新建用户、用户详情。
- Code Connect 映射未写入：当前 Figma Starter 计划不具备 Code Connect 所需的 Dev/Full Organization 或 Enterprise 权限；代码映射已在本文件和组件命名中保留，可升级权限后补录。

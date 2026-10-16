# CRM 用户管理 Spec

## 1. 产品目标

在一个可演示、可测试的用户管理中心中完成成员检索、角色维护、状态切换和详情查看，并保留需求、设计、代码、测试之间的追踪证据。

## 2. 页面与状态

- `UserListPage`：列表、搜索、角色筛选、状态筛选、刷新、空状态、加载状态、失败提示。
- `UserFormModal`：新建/编辑用户，必填校验和邮箱校验。
- `UserDetailDrawer`：查看用户属性、状态和编辑入口。
- `RolePermissionPanel`：展示角色及权限清单。

## 3. 数据模型

```ts
type User = { id: string; name: string; email: string; role: string; org: string; status: 'active'|'disabled'; lastLogin: string }
type Role = { name: string; permissions: string[] }
```

## 4. API 契约

- `GET /api/health` → `{ status: 'ok', service: 'crm-api' }`
- `GET /api/users?q=&role=` → `User[]`
- `GET /api/users/:id` → `User`；不存在返回 404。
- `POST /api/users` → 创建 `User`；缺字段返回 400。
- `PATCH /api/users/:id` → 更新 `User`。
- `DELETE /api/users/:id` → 软停用用户。
- `GET /api/roles` → `Role[]`。

## 5. 追踪矩阵

| 需求 | 页面/接口 | 测试 |
|---|---|---|
| CRM-001 | UserListPage / GET users | 列表加载 |
| CRM-002 | UserListPage / GET users | 搜索筛选、空状态 |
| CRM-003 | UserFormModal / POST users | 新增与校验 |
| CRM-004 | UserFormModal / PATCH users | 编辑 |
| CRM-005 | UserDetailDrawer / GET user | 查看详情 |
| CRM-006 | UserListPage / DELETE user | 停用 |
| CRM-007 | RolePermissionPanel / GET roles | API 契约 |
| CRM-008 | GET health | 健康检查 |

## 6. 发布约束

前端支持 API 模式与演示模式。站点发布使用虚构种子数据，不能依赖本机服务或真实账号。

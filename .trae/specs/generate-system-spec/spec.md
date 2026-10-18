# CRM 用户管理系统 Spec

## Why
项目缺少一份位于 `.trae/specs/` 的统一系统级规格文档。现有信息分散在 `docs/requirements.md`、`docs/spec.md`、`docs/business-rules.md` 中，需要一份整合了需求、API 契约、页面结构、业务规则与测试追踪的完整 spec，作为后续 spec-driven 开发的基础。

## What Changes
- 新增 `.trae/specs/generate-system-spec/spec.md`：整合现有文档，形成系统完整规格。
- 本变更不修改任何代码，属于文档基线建设。

## Impact
- Affected specs: 无（首个 spec）。
- Affected code: 无代码改动；文档基线覆盖 `server/src/index.ts`、`web/src/App.vue`、`web/src/prototype/`、`tests/crm.spec.ts`、`server/src/api.test.ts`。

## System Overview

CRM 用户管理演示系统：Vue 3 + Vite + TypeScript 前端，Node.js + Express + TypeScript 后端，内存种子数据（无数据库），Playwright E2E 测试 + API 契约测试。用于 Trae Code CN 产品培训，所有数据为虚构。

## ADDED Requirements

### Requirement: 用户列表（CRM-001）
系统 SHALL 在用户列表页显示姓名、邮箱、角色、组织、状态、最近登录时间。
- **WHEN** 用户进入 `UserListPage`
- **THEN** 页面加载并展示全部种子用户的六项字段

### Requirement: 搜索与筛选（CRM-002）
系统 SHALL 支持按姓名/邮箱/组织关键词、角色、状态筛选，无结果显示空状态。
- **WHEN** 输入关键词或选择角色/状态筛选
- **THEN** 列表仅显示匹配项；无匹配时显示空状态，不回退显示未过滤数据

### Requirement: 新建用户（CRM-003）
系统 SHALL 提供新建用户表单，姓名、邮箱、角色、组织必填，邮箱格式不合法时阻止提交并提示。
- **WHEN** 用户填写完整且邮箱合法并提交
- **THEN** 创建用户（初始状态 active，最近登录"未登录"），返回 201
- **WHEN** 缺少任一必填字段提交
- **THEN** 后端返回 400，前端展示校验提示

### Requirement: 编辑用户（CRM-004）
系统 SHALL 支持修改姓名、邮箱、角色、组织，保存后列表即时更新。
- **WHEN** 用户在编辑表单修改字段并保存
- **THEN** `PATCH /api/users/:id` 更新成功，列表刷新反映变更

### Requirement: 用户详情（CRM-005）
系统 SHALL 支持点击用户查看完整详情，并从详情进入编辑。
- **WHEN** 用户点击列表中的用户
- **THEN** `UserDetailDrawer` 展示该用户全部属性，并提供编辑入口

### Requirement: 启用/停用（CRM-006）
系统 SHALL 支持软停用用户：状态切换为 disabled，保留历史数据，不物理删除。
- **WHEN** 用户执行停用操作
- **THEN** `DELETE /api/users/:id` 将 status 置为 disabled，前端显示操作反馈并更新胶囊状态标签（启用：`#1a8c5c`/底 `#e6f6ee`；停用：`#996e1f`/底 `#faf1df`）

### Requirement: 角色权限（CRM-007）
系统 SHALL 通过 `GET /api/roles` 返回角色权限清单，前端展示不得自行编造另一套权限。
- 角色：管理员（查看/新建/编辑/停用/查看权限）、销售经理（查看/编辑，不管角色）、只读成员（仅查看）。

### Requirement: 健康检查（CRM-008）
系统 SHALL 提供 `GET /api/health`，返回 `{ status: 'ok', service: 'crm-api' }`。

## API Contract

| 方法 | 路径 | 行为 |
|---|---|---|
| GET | `/api/health` | 返回服务状态 |
| GET | `/api/users?q=&role=` | 关键词匹配姓名/邮箱/组织（不区分大小写），角色使用完整中文名精确匹配 |
| GET | `/api/users/:id` | 返回用户；不存在返回 404 |
| POST | `/api/users` | 创建用户；缺 name/email/role/org 任一字段返回 400 |
| PATCH | `/api/users/:id` | 部分更新；不存在返回 404 |
| DELETE | `/api/users/:id` | 软停用（status='disabled'）；不存在返回 404 |
| GET | `/api/roles` | 返回角色权限清单 |

## Data Model

```ts
type User = { id: string; name: string; email: string; role: string; org: string; status: 'active'|'disabled'; lastLogin: string }
type Role = { name: string; permissions: string[] }
```

## Frontend Pages

- `UserListPage`：列表、搜索、角色/状态筛选、刷新、空状态、加载状态、失败提示。
- `UserFormModal`：新建/编辑表单，必填与邮箱校验。
- `UserDetailDrawer`：详情查看与编辑入口。
- `RolePermissionPanel`：角色权限展示。
- 原型还原页（`web/src/prototype/`）：默认路由保留原 CRM 应用，`/#/prototype` 展示 Figma 原型还原页面。

## Demo Mode 与发布约束

- 接口失败时前端切换到本地种子数据，但必须显示演示模式提示。
- Trae Site 发布使用前端演示模式和虚构种子数据，不依赖本机服务或真实账号。
- 演示数据全部使用 `example.test` 域名和虚构姓名。

## Traceability Matrix

| 需求 | 页面/接口 | 测试 |
|---|---|---|
| CRM-001 | UserListPage / GET users | E2E 列表加载 |
| CRM-002 | UserListPage / GET users | E2E 搜索筛选、空状态 |
| CRM-003 | UserFormModal / POST users | E2E 新增与校验 |
| CRM-004 | UserFormModal / PATCH users | E2E 编辑 |
| CRM-005 | UserDetailDrawer / GET user | E2E 查看详情 |
| CRM-006 | UserListPage / DELETE user | E2E 停用 |
| CRM-007 | RolePermissionPanel / GET roles | API 契约测试 |
| CRM-008 | GET health | API 契约测试 |

## Out of Scope

真实数据库、SSO、审计日志、批量导入、真实客户数据、生产权限接入均不在系统范围内。

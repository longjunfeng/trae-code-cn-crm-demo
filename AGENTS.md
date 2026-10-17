# Trae Code CN CRM Demo 工程规则

## 项目目标

这是一个使用虚构数据演示“需求 → Spec → Figma → 前后端代码 → 测试 → Trae Site 发布”的 CRM 用户管理项目。项目用于培训，不接入真实客户、生产数据库、企业 SSO 或生产权限。

## 技术栈和命令

- 前端：Vue 3、Vite、TypeScript，入口位于 `web/`。
- 后端：Node.js、Express、TypeScript，入口位于 `server/`。
- 端到端测试：Playwright，测试位于 `tests/`。
- API 契约测试：`server/src/api.test.ts`。
- 启动：`npm run dev`。
- API 测试：`npm run test:api`。
- E2E 测试：`npm test`。
- 构建：`npm run build`。

## 业务规则入口

修改用户管理行为前必须阅读：

1. `docs/requirements.md`
2. `docs/spec.md`
3. `docs/business-rules.md`
4. `docs/risk-map.md`
5. `docs/change-budget.md`

新的业务规则、设计原因和兼容约束必须回写到文档，不能只留在对话上下文中。

## 目录边界

- `web/src/`：前端页面和交互。
- `server/src/`：API 契约和内存种子数据。
- `tests/`：核心用户流程回归。
- `docs/`：需求、设计、影响分析、风险、提示词和测试证据。
- `dist/`：构建产物，可重新生成。
- `.openai/hosting.json`：静态站点托管配置。

## 高风险和禁止行为

- `server/src/index.ts`、`web/src/App.vue`、`docs/spec.md`、`tests/crm.spec.ts` 和 `server/src/api.test.ts` 属于高风险区域，见 `docs/risk-map.md`。
- 不得为了完成局部需求顺手重构、统一命名、调整 DTO 或修改公共权限规则。
- 不得使用真实客户信息、生产账号、真实 API 密钥或真实数据库。
- 不得通过修改断言、删除测试或降低校验来制造通过结果。
- 需要修改承重代码时，必须先完成影响分析并记录原因、调用方、替代方案和回归范围。
- 默认变更预算最多 8 个文件；超出预算必须停止并重新评审。

## 发布约束

本地演示可以使用 API 联调；Trae Site 使用前端演示模式和虚构种子数据。发布前必须运行 API 测试、Playwright、构建和 `git diff --check`，并确认站点保持私有。

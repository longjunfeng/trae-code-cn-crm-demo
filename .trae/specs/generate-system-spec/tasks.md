# Tasks

- [x] Task 1: 生成系统 spec 文档
  - [x] SubTask 1.1: 阅读 `docs/requirements.md`、`docs/spec.md`、`docs/business-rules.md`、`server/src/index.ts`、`tests/crm.spec.ts`，确认系统实际行为
  - [x] SubTask 1.2: 在 `.trae/specs/generate-system-spec/spec.md` 中整合需求、API 契约、数据模型、页面结构、业务规则与追踪矩阵
- [x] Task 2: 验证 spec 与实际实现一致
  - [x] SubTask 2.1: 核对 spec 中 API 契约与 `server/src/index.ts` 端点一致
  - [x] SubTask 2.2: 核对 spec 中页面组件与 `web/src/App.vue`、`web/src/prototype/` 结构一致
  - [x] SubTask 2.3: 核对追踪矩阵与 `tests/crm.spec.ts`、`server/src/api.test.ts` 覆盖项一致

# Task Dependencies
- Task 2 depends on Task 1

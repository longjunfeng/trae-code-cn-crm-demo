# Checklist

- [x] spec.md 覆盖 requirements.md 中 CRM-001 至 CRM-008 全部需求
- [x] spec.md 的 API 契约与 server/src/index.ts 实际端点逐一对应（含 400/404 错误行为）
- [x] spec.md 的数据模型与实际 User/Role 类型一致
- [x] spec.md 的页面组件清单与 web/src 实际结构一致（含 prototype 哈希路由）
- [x] spec.md 包含业务规则：软停用、角色中文名筛选、空状态不回退、演示模式提示、example.test 虚构数据
- [x] spec.md 的追踪矩阵与 tests/crm.spec.ts、server/src/api.test.ts 的测试覆盖对应
- [x] spec.md 包含发布约束与 Out of Scope 说明
- [x] 未修改任何代码文件（纯文档变更）

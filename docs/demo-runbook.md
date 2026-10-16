# Trae Code CN 演示手册

## 0. 项目启动

```bash
npm install
npm run dev
```

打开 `http://localhost:4174`，API 默认运行在 `http://localhost:4175`。

## 1. 需求输入

打开 `docs/requirements.md`，让 Trae Code CN 总结角色、业务规则和验收条件。评审点：需求编号是否完整，是否排除了真实数据和生产接入。

## 2. Spec 生成

提示词示例：

> 根据 docs/requirements.md 生成可实现的产品 Spec，补充页面状态、数据模型、API 契约和需求追踪矩阵，不扩张非目标范围。

产物：`docs/spec.md`。在进入原型阶段前由用户评审。

## 3. Figma 原型

提示词示例：

> 根据 docs/spec.md 创建 CRM 用户管理 Figma 原型，包含列表、新建/编辑、详情、角色权限和异常状态，并使用 docs/figma-handoff.md 的设计令牌。

原型评审通过后再进入代码阶段。若没有 Figma 写入连接，使用 `docs/figma-handoff.md` 作为可导入设计交付物。

## 4. 前后端代码

提示词示例：

> 根据已评审的 Spec 和 Figma 交付说明生成 Vue 前端与 Node TypeScript API，保留 API 模式和发布用演示模式，严格实现 CRM-001 到 CRM-008。

## 5. 测试

先演示一条预设失败用例，记录失败证据；修复实现后运行：

```bash
npm run test:api
npm test
```

测试报告位于 `playwright-report/`、`reports/junit.xml` 和 `docs/test-report.md`。不得修改断言或删除用例来制造通过。

## 6. 发布

执行生产构建：

```bash
npm run build
```

将 `dist/` 发布为 Trae 私有站点。发布站点使用虚构数据和演示模式，完成后记录生产 URL 和部署版本。

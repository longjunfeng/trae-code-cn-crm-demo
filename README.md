# Trae Code CN CRM 全流程演示项目

这是一个用于 Trae Code CN 产品培训的虚构 CRM 用户管理项目。演示目标是让观众看到一条完整、可追踪的产品研发链路：

> 需求输入 → Spec 文档 → Figma 原型 → 前后端代码 → 自动化测试 → Trae Site 发布

项目不使用真实客户数据、生产账号或外部敏感信息。

## 一、演讲思路

### 1. 先讲清楚演示目标

开场可以这样说：

> 今天不单独演示“写一段代码”，而是演示如何把一份业务需求逐步变成可评审的产品、可运行的代码、可验证的测试结果，最后发布成一个可以访问的站点。每一步都有输入、产物和评审点。

强调三个关键词：

- **上下文连续**：需求、Spec、原型、代码和测试使用同一组 CRM 业务规则。
- **过程可评审**：需求和 Figma 原型先评审，再进入代码实现。
- **结果可验证**：通过 API 检查、Playwright 测试和部署状态证明结果，而不是只展示生成过程。

### 2. 用一个简单业务故事串起来

本次案例是企业 CRM 的用户管理中心。管理员需要查看成员、搜索用户、分配角色、编辑资料和停用账号；销售经理可以查看和编辑；只读成员只能查看。

演讲时始终围绕同一个用户故事：

> 管理员搜索“华东销售部”的成员，打开林晓的详情，修改组织信息，保存后运行自动化测试确认列表和详情仍然正确。

### 3. 解释每一阶段的交付关系

- 需求回答“为什么做、为谁做、做到什么算完成”。
- Spec 回答“页面、数据、接口和异常状态具体怎么实现”。
- Figma 回答“用户将看到什么、如何操作和如何评审交互”。
- 前后端代码回答“功能如何真正运行”。
- 测试回答“实现是否满足需求，失败时如何定位”。
- 发布回答“如何把可验证的结果交给用户访问”。

## 二、演示前准备

```bash
npm install
npm run dev
```

打开：

- 前端：<http://localhost:4174>
- API 健康检查：<http://localhost:4175/api/health>
- Figma 原型：<https://www.figma.com/design/pD4DUyLyTR1ylac4XAvnI7>
- 已发布私有站点：<https://trae-code-cn-crm-demo.elated-crumb-8816.chatgpt.site>

建议提前打开四个窗口：Trae Code CN、项目代码、Figma 文件、浏览器站点。

## 三、现场演示步骤

### 第 1 步：展示已有 CRM 需求

打开 [`docs/requirements.md`](docs/requirements.md)，说明需求已经被拆成带编号的验收条件：

- CRM-001：查看用户列表
- CRM-002：搜索与筛选
- CRM-003：新建用户和表单校验
- CRM-004：编辑用户
- CRM-005：查看用户详情
- CRM-006：启用或停用用户
- CRM-007：角色权限
- CRM-008：API 健康检查

现场提示词：

> 请阅读 docs/requirements.md，先不要写代码。请总结用户角色、业务规则、异常场景和非目标，并指出哪些内容需要产品评审。

演讲重点：让观众看到先建立业务边界，再开始实现。

### 第 2 步：根据需求生成 Spec

现场提示词：

> 根据 docs/requirements.md 生成可实现的产品 Spec，补充页面结构、页面状态、数据模型、API 契约和需求追踪矩阵。不要扩张非目标范围。

打开 [`docs/spec.md`](docs/spec.md)，重点讲解：

- `User` 和 `Role` 数据模型
- 用户列表、新建/编辑表单、详情抽屉和角色权限页面
- 加载、空状态、校验失败和接口失败状态
- 需求到页面、接口、测试的追踪关系

这里设置第一个人工评审点：确认 Spec 与需求一致后再进入原型阶段。

### 第 3 步：生成并评审 Figma 原型

打开 Figma 文件，依次查看：

1. 用户列表
2. 新建用户
3. 用户详情
4. 搜索、状态标签、表单和按钮

现场提示词：

> 根据 docs/spec.md 创建 CRM 用户管理原型，包含用户列表、新建/编辑、详情、角色权限和异常状态，并保持设计令牌与代码组件可对应。

打开 [`docs/figma-handoff.md`](docs/figma-handoff.md)，说明页面、设计令牌和代码映射关系。

这里设置第二个人工评审点：确认页面结构、字段、按钮文案和异常状态后，再开始生成代码。

### 第 4 步：根据原型生成前后端代码

现场提示词：

> 根据已评审的 docs/spec.md 和 docs/figma-handoff.md，实现 Vue 3 + Vite + TypeScript 前端和 Node TypeScript API。严格覆盖 CRM-001 到 CRM-008，保留真实 API 模式和发布用演示模式。

现场展示：

- `web/src/App.vue`：用户列表、搜索、新建、编辑、详情和状态切换
- `server/src/index.ts`：用户、角色和健康检查 API
- `web/src/style.css`：与 Figma 交付说明一致的视觉令牌

运行：

```bash
npm run dev
```

演示“搜索周宁 → 打开林晓详情 → 编辑用户 → 停用用户”的完整操作。

### 第 5 步：测试与红绿修复

先说明测试不是为了制造绿色，而是为了验证需求。

先运行 API 检查：

```bash
npm run test:api
```

再运行 Playwright：

```bash
npm test
```

测试覆盖：

- 用户列表加载与搜索筛选
- 新增用户与必填/邮箱校验
- 查看、编辑与停用用户
- 空状态与筛选重置

演示红绿流程：

1. 先运行一条预设失败用例，展示失败证据。
2. 根据错误定位实现问题。
3. 修复实现，不修改断言、不删除用例。
4. 再运行完整测试集，确认 4/4 通过。

测试产物：

- `playwright-report/index.html`
- `reports/junit.xml`
- [`docs/test-report.md`](docs/test-report.md)

### 第 6 步：构建并发布 Trae Site

构建前端静态产物：

```bash
npm run build
```

说明发布策略：

- 本地运行展示完整前后端联调。
- 发布站点使用虚构种子数据和演示模式。
- 站点保持私有，不依赖本机 API。

最后打开已发布的 Trae Site，重新演示用户搜索、新建和详情操作，并说明部署版本来自通过测试的代码提交。

## 四、演讲收尾

可以用下面这句话收尾：

> 这个案例的重点不是生成了多少文件，而是把需求、设计、实现、验证和发布串成了一条可追踪的链路。下一次需求变化时，我们可以从需求编号定位到 Spec、原型、代码和测试，而不是重新从头猜测。

## 五、常用命令

```bash
npm run dev       # 同时启动前端和 API
npm run build     # 构建发布产物
npm run test:api  # API 契约检查
npm test          # Playwright E2E 测试
npm run preview   # 预览构建后的前端
```

更多阶段说明见 [`docs/demo-runbook.md`](docs/demo-runbook.md)。

## 六类工程风险演示路径

本节把课件六个章节映射到项目中的可操作材料。现场按“分析 → 评审 → 实现 → 测试 → 审查”的节奏推进。

| 课件章节 | 项目材料 | 演示重点 |
|---|---|---|
| 问题一：项目记忆 | `AGENTS.md`、`docs/business-rules.md` | 让项目自己记住规则 |
| 问题二：全局失控 | `docs/impact-analysis-template.md` | 先分析影响，再修改代码 |
| 问题三：承重墙 | `docs/risk-map.md` | 修改公共代码前回答四个问题 |
| 问题四：变更范围 | `docs/change-budget.md` | 用白名单和 diff 控制变更预算 |
| 问题五：编译不等于正确 | `tests/`、`docs/test-report.md` | 当前功能、相关模块、核心业务三层测试 |
| 问题六：同源盲区 | `docs/prompts/`、`docs/session-handoff-template.md` | 分析者、实现者、审查者三角色分立 |

### 逐章演示操作

1. **项目记忆**：打开 `AGENTS.md` 和 `docs/business-rules.md`，让分析者先总结规则，再要求指出规则对应的代码和测试。
2. **影响分析**：使用 `docs/impact-analysis-template.md`，运行只读分析提示词，人工确认影响链和回归范围后再进入实现。
3. **承重墙**：打开 `docs/risk-map.md`，让 Codex 识别 `server/src/index.ts`、`web/src/App.vue` 和测试文件的调用方，演示修改前四问。
4. **变更预算**：打开 `docs/change-budget.md`，让实现者按白名单完成角色筛选，并用 `git diff --stat` 检查范围。
5. **红绿测试**：先运行一条预设失败测试，记录失败证据；修复实现后执行 `npm run test:api`、`npm test` 和 `npm run build`。
6. **独立审查**：新建独立审查会话，使用 `docs/prompts/reviewer.md` 检查需求、无关修改、权限、数据隔离和 API 兼容性。

### 插件和工具对应关系

- **lark-doc**：读取飞书课件、按章节插入操作卡并重新读取验证 revision。
- **Figma 相关技能**：查看或创建用户列表、用户表单、详情和异常状态原型，并对照 `docs/figma-handoff.md`。
- **Playwright**：执行浏览器端用户流程和生成 HTML/JUnit 报告。
- **Sites**：构建 `dist/` 并验证 Trae 私有站点部署。
- **Codex 独立会话**：分别承担分析者、实现者和审查者职责。

每章的完整提示词、操作命令、产物和评审点见 [`docs/demo-runbook.md`](docs/demo-runbook.md)。

### 已验证的 Site 资产

- 当前生产版本：Trae Site version 3
- 当前生产 URL：<https://trae-code-cn-crm-demo.elated-crumb-8816.chatgpt.site>
- 访问策略：私有自定义访问，仅保留站点所有者
- Sites project id：`appgprj_6ad229990eb081919549c252ca01ea75`

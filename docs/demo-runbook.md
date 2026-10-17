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

## 7. 六类工程风险逐章演示

### 7.1 问题一：缺少真正的项目记忆

**材料：**`AGENTS.md`、`docs/business-rules.md`、`docs/spec.md`。

**操作：**先让 Codex 只读上述文件，输出业务规则、目录边界、禁止行为和验证命令；再让讲师指出“停用是软停用”“发布使用演示模式”等容易被遗忘的规则。

**提示词：**

> 先阅读 AGENTS.md、docs/business-rules.md 和 docs/spec.md，不要修改代码。请总结本项目不能改变的业务规则、目录边界和验证命令，并指出每条规则对应的代码或测试位置。

**工具：**Codex 文件检索、`lark-doc`。**评审点：**规则是否来自仓库文档，而不是只来自对话上下文。

### 7.2 问题二：局部正确、全局失控

**材料：**`docs/impact-analysis-template.md`。

**操作：**针对“按角色筛选用户”运行只读分析；让分析者列出页面、API、调用链、权限、数据隔离、分页、详情、停用和回归测试影响；人工评审通过后再实现。

**提示词：**

> 先不要修改代码。请分析“按角色筛选用户”涉及的页面、接口、调用链、权限、数据隔离、相关模块和回归测试，输出影响分析和实施计划。

**工具：**Codex 分析会话、`rg`、Playwright 测试定位、Figma 交互上下文、`lark-doc`。**评审点：**分析阶段是否没有代码改动，回归范围是否覆盖相关模块。

### 7.3 问题三：无法识别承重墙

**材料：**`docs/risk-map.md`、`AGENTS.md`。

**操作：**让 Codex 识别 API、前端核心页面和测试文件的调用方；逐项回答“为什么必须改、谁在调用、是否有替代方案、改后测什么”。

**提示词：**

> 请识别本项目中的承重代码和高风险文件。不要修改代码。逐项说明调用方、影响范围、替代方案和必须执行的回归测试。

**工具：**Codex 代码分析、项目检索、Playwright、API 测试、`lark-doc`。**评审点：**没有先回答四问时，不进入实现。

### 7.4 问题四：变更范围失控

**材料：**`docs/change-budget.md`。

**操作：**给实现者设置“最多 8 个文件、只改筛选相关范围”的预算；实现后运行 `git diff --stat`、`git diff --check` 和 `git status --short`，演示无关重构如何被发现。

**提示词：**

> 本次任务最多修改 8 个文件，只允许修改用户筛选相关页面、API 适配和测试。不要重构、改名或整理无关代码。若需要超出范围，请停止并报告原因。

**工具：**Codex 实现会话、Git diff、`lark-doc`。**评审点：**文件白名单和预算是否满足，是否存在无关变化。

### 7.5 问题五：把编译通过当成功能正确

**材料：**`tests/crm.spec.ts`、`server/src/api.test.ts`、`docs/test-report.md`、`playwright-report/`、`reports/junit.xml`。

**操作：**先运行一条预设失败用例，保留错误证据；修复实现后运行三层测试：当前功能、相关模块、核心业务回归；最后构建发布产物。

**提示词：**

> 先运行本次功能测试并保留失败证据，再运行相关模块测试和核心业务回归测试。不要修改断言或删除用例来制造通过结果。

**命令：**

```bash
npm run test:api
npm test
npm run build
```

**工具：**Playwright、Node API 测试、Sites 发布前构建检查。**评审点：**是否保留真实红绿证据，是否验证业务而不只是编译。

### 7.6 问题六：同源盲区

**材料：**`docs/prompts/analyst.md`、`docs/prompts/implementer.md`、`docs/prompts/reviewer.md`、`docs/session-handoff-template.md`。

**操作：**分别启动分析者、实现者和审查者会话；使用交接模板传递分析计划、变更文件、测试结果和审查结论；审查者不得直接继承实现者的“已验证”判断。

**提示词：**

> 请独立审查本次改动，不默认实现正确。重点检查需求遗漏、无关修改、回归风险、权限绕过、数据隔离和 API 兼容性，并给出通过或退回结论。

**工具：**Codex 独立会话、Playwright、API 测试、Git diff、`lark-doc`。**评审点：**审查是否来自独立上下文，是否发现实现者遗漏的问题。

## 8. 讲师总流程

1. 先打开飞书课件对应章节和项目仓库。
2. 运行项目记忆分析，确认 Codex 读取了规则文件。
3. 运行影响分析并人工评审。
4. 识别承重墙，确认修改前四问。
5. 设置变更预算，执行受控实现。
6. 运行红 → 修复 → 绿测试流程。
7. 使用独立会话完成审查。
8. 检查测试报告、构建产物和站点部署状态。
9. 将新发现的业务规则回写 `docs/business-rules.md`，并在飞书课件对应章节补充复盘结论。

## 9. 已验证的外部资产

- Figma 文件：<https://www.figma.com/design/pD4DUyLyTR1ylac4XAvnI7>
  - 已验证页面：`01 用户列表`、`02 新建用户`、`03 用户详情`
- Trae Site：<https://trae-code-cn-crm-demo.elated-crumb-8816.chatgpt.site>
  - 已验证状态：active
  - 已验证生产版本：version 3
  - 访问策略：私有自定义访问
  - Sites project id：`appgprj_6ad229990eb081919549c252ca01ea75`
- 飞书课件：<https://bytedance.larkoffice.com/docx/PyfrdHhnFojG22xuzP8c98mJnRf>
  - 六个章节操作卡已写入，当前 revision：11

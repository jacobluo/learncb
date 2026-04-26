# java-oneshot-svr

使用 Spring Boot 开发一个秒杀商品的 API 后端服务，需要处理高并发库存扣减、订单创建、防超卖等核心问题。采用 OpenSpec（规范驱动开发）+ Superpowers（工程方法论）组合

**产品与技术细节** → `openspec/AGENTS.md`
**活跃提案与规格** → `openspec list` / `openspec/changes/` / `openspec/specs/`

---

## 开发工作流

**OpenSpec 三段 + Superpowers 纪律**：OpenSpec 管规划，Superpowers 管编码纪律。
1. 新功能一律走 `/opsx:propose`，**必须**进行propose前调用 skill `brainstorming` 进行脑暴, 但不调用writing-plans。
2. 使用 `/opsx:apply` 实施任务时，必须启用 `test-driven-development`：先写失败测试，再写实现
3. `tasks.md` 中存在 2+ 个独立、无依赖的任务时，必须启用 `dispatching-parallel-agents` 并行派发子代理执行
4. 完成主要步骤后必须请求 `code-reviewer` 评审，声明「完成」前必须执行 `verification-before-completion`
5. 遇到测试失败、异常行为时必须启用 `systematic-debugging`，禁止直接猜测原因
6. 每个新功能必须在独立 Git Worktree 中开发，禁止直接在 main 分支修改代码（启用 `using-git-worktrees`）

### Superpowers 技能触发规则
| 触发场景 | 必须调用的技能 |
|---------|--------------|
| 启动新功能开发 | `using-git-worktrees`（创建独立 worktree，禁止在 main 分支改动） |
| 实现新功能 / 修 bug | `test-driven-development`（先写测试再写实现） |
| 遇到测试失败、异常行为、未预期结果 | `systematic-debugging`（不要直接猜测原因） |
| 声称"完成 / 修好 / 通过 / 搞定"之前 | `verification-before-completion`（先跑实际命令拿证据） |
| 2+ 个独立、无依赖、可并行的任务 | `dispatching-parallel-agents`（并行派发子代理） |
| 完成一个主要步骤或重大改动 | 请求 `code-reviewer` 评审 |

### 规范约束

- `proposal.md` 生成后必须人工检查 Out of Scope
- `tasks.md` 生成后必须人工检查任务顺序与遗漏
- Spec 描述行为（GIVEN/WHEN/THEN），不描述实现（导入什么模块、调用什么函数）
- 功能完成后必须执行 `/opsx:archive`（否则新会话会读到旧规范）

## UI 设计

采用 `frontend-design` 技能进行设计。视觉决策（温暖亲切派 / 暖白+活力橙）见 `openspec/AGENTS.md` 「产品/UI 决策」段。

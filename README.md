# Cognitive Jelly / 认知水母

Cognitive Jelly 是从 “Residual Stable / 残差马厩” MVP 概念重构而来的 Web App 原型：一个把愿望、失败、灵感、经验、审核和缓存，持续转化为可复用智能能力的认知操作系统。

> 让每一份残差，发出微光。

## 项目愿景

它不是普通聊天机器人界面，也不是币圈、黑客或虚拟偶像风格产品。Cognitive Jelly 把系统想象成一片透明、流动、发光的认知海域：人不是用户，而是不断演化的残差处理函数；每一次愿望、失败、审核和贡献，都会成为认知水母成长的养分。

## 什么是认知水母

认知水母是本原型的主视觉和操作隐喻：

- 半透明、柔性、发光，代表可被看见但仍在流动的认知结构。
- 触手和发光节点映射愿望增加、技能命中、匹配成功、偏见报警、审核通过等状态。
- Jelly Core 页面展示活跃度、技能成长、残差堆积、缓存命中等 mock 指标。

## 宠物水母进化设计

前端现在把“认知水母”设计成可养成的宠物水母：它不是装饰物，而是系统状态的生命化界面。投喂愿望、失败、残差、审核、技能命中、缓存命中、偏见报警和人类安置卡，都会转化为 XP、等级、触手数量、发光度和特质。

进化阶段：

1. `polyp` / 水螅幼体：刚开始记录愿望与灵感。
2. `ephyra` / 碟状幼体：能识别失败残差，并开始产生轻微脉冲。
3. `young_jelly` / 少年水母：触手连接技能池与贡献账本。
4. `luminous_jelly` / 发光水母：具备跨域连接、缓存命中和审核记忆。
5. `reef_guardian` / 认知礁守护者：开始关注系统病、低估群体和人类安置风险。

相关模型与函数位于 `lib/types.ts` 与 `lib/jellyPet.ts`，首页和 Jelly Core 会复用 `PetEvolutionPanel` 展示等级、XP、发光度、触手数量、特质与光环。

## 什么是残差

残差是尚未被系统理解、压缩、验证或复用的认知差值。这里的核心文案包括：

- 垃圾不是垃圾，是未分类的残差。
- 愿望不是愿望，是未来任务的坐标。
- 灵感不是灵感，是智能体进化的种子。
- 人不是用户，而是不断演化的残差处理函数。

在数据模型中，残差卡展示 `C + D = 1`：`C` 代表当前已压缩/已理解程度，`D` 代表仍未解决的残差密度。

## 页面结构

- `/` 首页：中央认知水母主视觉、品牌宣言、四个入口卡片、模块简介。
- `/wish-pool` Wish Pool / 许愿池：提交愿望，计算 Need Score，生成残差卡。
- `/reverse-wish-pool` Reverse Wish Pool / 反向许愿池：提交“我多余什么”，匹配可能需求。
- `/garbage-station` Garbage Station / 垃圾站：提交失败案例、错题、工单、AI 跑偏输出、灵感碎片，自动分类并脱敏。
- `/residual-cards` Residual Cards / 残差卡：展示 C、D、目标 D、预计 ΔD、复用与审核状态。
- `/jelly-core` Jelly Core / 认知水母主界面：复用水母主视觉并提供基础点击交互。
- `/skill-memory-pool` Skill Memory Pool / 超级缓存池：展示技能胶囊、缓存命中、节省成本、版本和失败案例。
- `/review-pool` Review Pool / 审核池：展示审核分数与高风险人工审核策略。
- `/contribution-ledger` Contribution Ledger / 贡献账本：展示贡献链、饲料值、声望、压缩凭证和分润权 mock。
- `/cognitive-fingerprint` Cognitive Fingerprint / 认知指纹：展示个人擅长提问、压缩、连接领域与技能沉淀贡献。
- `/idea-notary` Idea Notary / 想法公证处：展示时间戳记录；公证处不判断价值，只证明历史。
- `/bias-shelter` Bias Shelter / 偏见收容所：展示系统性异常报告，作为系统免疫器官。
- `/human-transition` Human Transition Layer / 人类安置层：展示安置卡；不能用降低 D_task 的方式，制造更大的 D_human。
- `/cognitive-will` Cognitive Will / 认知遗嘱：展示继承、捐赠、封存、销毁的概念闭环。

## 数据模型

TypeScript interfaces 位于 `lib/types.ts`，覆盖：

- `User`
- `Wish`
- `ReverseWish`
- `GarbageInput`
- `ResidualCard`
- `Review`
- `SkillCapsule`
- `ContributionEvent`
- `RewardEvent`
- `Asset`
- `HumanTransitionCard`
- `CognitiveFingerprint`
- `IdeaNotaryRecord`
- `BiasAlert`
- `CognitiveWill`
- `JellyPetState`

Mock 数据位于 `lib/mock.ts`。页面导航与模块元信息集中在 `lib/modules.ts`，避免首页、导航栏和模块卡片各自维护一份重复配置。宠物水母进化规则位于 `lib/jellyPet.ts`。

## 核心函数

纯函数与 utility 位于 `lib/cognitive.ts`：

1. `calculateNeedScore(wish)`
2. `classifyGarbage(input)`
3. `redactSensitiveInfo(text)`
4. `generateResidualCardFromWish(wish)`
5. `generateResidualCardFromReverseWish(reverseWish)`
6. `generateResidualCardFromGarbage(input)`
7. `calculateCompressionPotential(card)`
8. `calculateReviewScore(review)`
9. `normalizeReviewRecommendation(review)`
10. `requiresHumanReview(card)`
11. `calculatePendingReward(contribution, reviewScore)`
12. `updateSkillXP(skill, assetizedResidualCard)`
13. `generateHumanTransitionCard(automatedWorkflow)`
14. `generateCognitiveFingerprint(userEvents)`
15. `createIdeaNotaryHash(content)`
16. `generateBiasAlert(mockSystemState)`
17. `evolveJellyPet(inputs)`
18. `buildJellyPetInputsFromEvents(events)`

## 如何运行

```bash
npm install
npm run dev
```

开发服务默认运行在 `http://localhost:3000`。

## 如何测试

```bash
npm test
```

如果只需要在依赖尚未安装时检查核心纯函数与 mock 数据类型，可运行：

```bash
npm run typecheck:core
```

测试覆盖：

- Need Score 计算。
- 手机号、身份证、车牌、学校姓名脱敏或标记。
- `D = 1 - C`。
- 高风险隐私内容不能进入 public asset。
- 高风险审核必须进入 `needs_human_review`。
- 自动化高风险流程必须生成 Human Transition Card。
- Idea Notary hash 稳定生成。
- Cognitive Fingerprint 基础生成逻辑。
- 宠物水母 XP、阶段、触手和特质生成。

## 后续 Roadmap

- 引入真实持久化 repository 与多用户权限。
- 为 Wish Pool、Review Pool、Ledger 增加完整 CRUD 与筛选。
- 将当前概念页继续拆成更细的业务组件，减少页面级 JSX 密度。
- 将水母主视觉升级为 Canvas 粒子海流或轻量 WebGL。
- 为宠物水母增加本地持久化、喂养动画、阶段解锁图鉴和用户可控的隐私开关。
- 引入真实 LLM 但保留审核、隐私、偏见收容与人类安置约束。
- 为 Idea Notary 接入可验证时间戳服务，而非真实区块链优先。
- 扩展 Human Transition Layer，让自动化评估前置成为发布流程的一部分。

## 游戏化成长系统说明

Cognitive Jelly 的游戏化不是抽卡、赌博或红点焦虑，而是把有效认知维护记录成“生命体成长”。成长中心包含等级、成就、日常/周常任务、每日补给、赛季和榜单 mock：

- 经验只来自有效贡献：有效愿望、有效残差、完成审核、贡献被复用、技能命中、偏见修复、公共愿望完成。
- 无效粘贴、重复垃圾、未脱敏敏感内容不会获得 XP。
- 等级名称包括：初光投喂者、残差学徒、认知炼金师、技能织工、审核灯塔、深海连接者、水母共振者。
- 技能胶囊扩展了 `cacheHitCount`、`verifiedCompressionCount`、`contributors`，用于呈现技能被调用、审核、验证、复用和从失败中升级的轨迹。

## 为什么要做等级和成就

等级和成就用于帮助用户看见自己长期建设认知城市的贡献，而不是制造能力阶级。成就奖励包括饲料值、微光碎片、声望、外观解锁和称号，但不会改变审核权重、贡献权重或技能真实能力。

## 为什么每日补给不是赌博或抽卡

每日补给是“基础认知配给”，不是概率开箱：

- 内容固定：少量 feedPoints、少量 glowShards、1 次额外审核机会、1 次认知共鸣推荐、1 张高价值愿望雷达卡。
- 每日只能领取一次。
- 不做连续签到惩罚，不做随机稀有奖励，不诱导焦虑。
- 目标是保证新用户和弱用户每天都有最低限度参与能力。

## 共鸣工坊 DIY 说明

`/resonance-workshop` 是安静的创作空间。用户完成任意 2 项低门槛行为即可解锁基础 DIY：提交愿望、投喂残差、完成审核、连续登录 2 天、查看认知指纹。

基础 DIY 支持：

- 8 种主色、4 种伞盖、4 种触手、3 种光效、4 种背景、3 种昵称牌、3 个方案存档位。
- 一键套装：深海学者、冷潮审校者、星海连接者、珊瑚工程师、梦潮创作者。
- 模板微调与深度 DIY：颜色、触手、光效、背景、透明度、摆幅、粒子速度等。
- 用户投稿模板会经过审核；高风险、侵权、攻击性或低俗内容不会直接公开。

## 幻化系统说明

`/avatar-morphing` 保留“认知水母”作为系统默认母体，同时允许用户把认知化身幻化成原创形态。幻化分为官方形态系、风格幻化系、高级 DIY 幻化和后期参考图原创转译概念。

新手基础解锁包括默认水母、小鲸、晶体球、学者灵、深海旅人。成长解锁可来自等级提升、技能贡献、审核准确率、赛季成就、公会协作和偏见修复事件。

## 外观不影响能力和贡献权重

外观只改变表现层，不改变底层公平：

- 不影响审核权重。
- 不影响贡献权重。
- 不影响技能真实能力。
- 不承诺升值，不做可交易 token。
- 稀有外观只是纪念与身份表达，不制造阶级羞辱。

## 幻化边界与版权规则

我们支持原创化身与风格幻化，不支持未经授权的版权角色复刻或真人冒用。

不允许：

- 明确复刻热门版权角色。
- 明确复刻游戏、动漫、电影角色。
- 直接生成明星真人化身。
- 用于冒充他人的形象。
- 低俗、仇恨、攻击性外观。

参考图原创转译只作为后期概念：系统只提取风格、气质、色彩和轮廓语言，不直接复制版权角色或真人脸。

## 新增页面

- `/growth-center`：成长中心、等级、成就、任务、每日补给、赛季进度。
- `/cognitive-map`：认知大陆地图 mock，展示区域发光、迷雾、建筑升级和公会协作。
- `/resonance-workshop`：共鸣工坊基础 DIY、套装、模板微调和投稿审核 mock。
- `/avatar-morphing`：幻化工坊、官方形态、风格标签、职业幻化和边界校验。

## 新增核心模块

- `lib/gamification.ts`：等级、XP、成就、任务、每日补给、赛季、认知地图和榜单函数。
- `lib/workshop.ts`：DIY 解锁、外观应用、方案保存、UGC 外观审核函数。
- `lib/morphing.ts`：幻化形态解锁、应用、请求校验、风格标签生成函数。
- `lib/productSystemsMock.ts`：三套系统与认知大陆的 mock 数据。

## 防赌博化、刷量和侵权机制

- 每日补给固定奖励，无概率、无开箱、无连续签到惩罚。
- XP 只奖励有效贡献，无效垃圾投喂 XP 为 0。
- 日常/周常任务的完成条件绑定有效残差压缩或系统维护。
- 外观和幻化不会影响贡献权重、审核权重或技能能力。
- 高风险 UGC 外观进入审核，低俗/攻击性内容可拒绝。
- 幻化请求会拒绝版权角色复刻、明星真人复刻和冒用关键词。

## 后续需要接后端的功能

- 用户 XP、成就、补给领取记录、任务完成记录持久化。
- 赛季公共目标、榜单、公会协作与认知大陆区域状态实时更新。
- DIY 方案、模板投稿、审核流和社区采用奖励。
- 幻化模板审核、参考图原创转译和版权合规工作流。

## Integration Gateway 是什么

Integration Gateway / 模型与 App 连接层是 Cognitive Jelly 未来连接模型 Provider 与外部 App 的安全边界层。它把 OpenAI、Codex、Claude、DeepSeek、本地模型、其他正规模型 API，以及 GitHub、Gmail、Calendar、Notion、Slack、Webhook 等外部工具统一抽象为可路由、可审计、可缓存、可人工确认的连接。

MVP 只实现 mock provider / mock connector，不真实调用付费 API，不操控网页会员额度。

## 为什么不做共享账号

连接层不接共享账号，也不自动操控 ChatGPT、Claude、DeepSeek 等网页会员额度。所有第三方连接必须走官方 API、OAuth、SDK、Webhook 或用户自带 Key。API Key 不保存明文，不在前端暴露，真实接入时应通过服务端 Secret Vault 或官方 OAuth 完成。

## 支持哪些模型 Provider

预留并实现 mock：

- OpenAI Provider：强推理、结构化输出、复杂审核、代码任务、多模态任务；后续接 Responses API。
- Codex Task Adapter：把 Codex 作为 coding agent / software task runner，MVP 生成标准开发任务包 prompt。
- Claude Provider：长文写作、报告、风格控制、长上下文理解、审核与价值判断；后续接 Messages API。
- DeepSeek Provider：低成本批处理、分类、摘要、残差卡初稿、标签生成；后续接 OpenAI-compatible API。
- Local Provider：隐私敏感任务、本地初筛；预留 Ollama / llama.cpp / MLX，默认 `http://localhost:11434`。
- Other OpenAI-compatible：其他正规 OpenAI-compatible API 的占位。

## 支持哪些 App Connector

MVP mock connector：GitHub、Gmail、Calendar、Notion、Slack、Generic Webhook。所有 connector 都必须经过 ConsentManager；写入动作默认禁用，除非用户明确授权，并进入 ActionApprovalQueue。

## 如何配置 env

复制 `.env.example` 到本地 `.env.local`，填入自己的官方 API/OAuth 配置。不要提交真实 key。

```bash
cp .env.example .env.local
```

支持的环境变量包括 `OPENAI_API_KEY`、`ANTHROPIC_API_KEY`、`DEEPSEEK_API_KEY`、`LOCAL_MODEL_BASE_URL`、`LOCAL_MODEL_NAME`、GitHub/Google/Notion/Slack OAuth client 信息。

## Mock 模式说明

当前 provider 和 connector 均为 mock：

- 没有 key 也会返回 mock response。
- 不发起真实付费模型调用。
- 不发起真实外部 App 写入。
- usage ledger、approval queue、provider health、connector health 都是本地 mock。

## Integration Gateway 安全原则

- 高隐私任务优先 local/mock local provider。
- `cheap_batch` 优先 DeepSeek/local；`strong_reasoning` 优先 OpenAI/Claude；`writing` 优先 Claude/OpenAI；`coding` 优先 Codex Task Adapter。
- cache 命中时跳过 provider 调用。
- 发送消息、发邮件、群发、日历邀请、Git push、删文件、付款、合同、保险承诺、教育评估报告对外发送必须人工确认。
- 包含学生、客户、车牌、身份证、保单、学校、手机号的内容默认 high privacy。
- 外部 App 写入动作必须进入 ActionApprovalQueue。

## 人工审批队列

`/integrations/approvals` 展示外部动作确认队列。每个动作包含 connector、actionType、riskLevel、summary，并提供 approve / reject / require revision 的本地 mock 操作。真实后端接入时应持久化审批、操作者、时间戳和执行结果。

## Integration Gateway 页面

- `/integrations`：连接层总览，展示 provider、connector、最近调用和本月成本 mock。
- `/integrations/models`：模型连接页，展示 OpenAI、Codex、Claude、DeepSeek、Local/Ollama、Other OpenAI-compatible。
- `/integrations/apps`：App 连接页，展示 GitHub、Gmail、Calendar、Notion、Slack、Webhook。
- `/integrations/usage`：模型与 App 使用账本。
- `/integrations/approvals`：外部动作审批队列。

## 后续真实 API 接入计划

- OpenAI Responses API：在服务端实现真实 provider，使用 Secret Vault 引用 `OPENAI_API_KEY`。
- Codex Cloud / Codex CLI：把 `CodexTask` 转为真实开发任务包，保留安全约束和测试命令。
- Claude Messages API：接入长上下文、写作和 prompt caching。
- DeepSeek OpenAI-compatible API：接入低成本批处理与初稿生成。
- Ollama / local models：接入本地模型 baseUrl 与 modelName。
- GitHub OAuth：读取 repo、创建 PR，但提交 PR/写文件必须人工确认。
- Gmail / Calendar OAuth：读取资源可授权，发送邮件/创建邀请必须人工确认。
- Notion / Slack OAuth：写页面或发送消息必须人工确认。

## 如何添加新模型 Provider

1. 在 `src/integrations/providers/` 新增 provider 文件，实现 `ModelProvider`。
2. 在 `connectorRegistry.ts` 注册 provider。
3. 在 `routingPolicy.ts` 或 `capabilityMatrix.ts` 增加路由策略和适合任务。
4. 为 cost、healthCheck、mock response 和安全边界补测试。

## 如何添加新 App Connector

1. 在 `src/integrations/apps/` 新增 connector 文件，实现 `AppConnector`。
2. 在 `connectorRegistry.ts` 注册 connector。
3. 在 ConsentManager 中定义必要 scopes。
4. 在 SafetyGate 中定义高风险动作是否必须审批。
5. 补 usage / approval / permission 测试。

## Ecosystem Gateway 是什么

Ecosystem Gateway / 生态连接层把 Integration Gateway 从“连接模型与 App”扩展为“连接用户、团队、组织、工具、技能、缓存、贡献账本和公共知识资产”的共享网络。它让可复用的残差卡、技能胶囊、压缩证明和缓存命中经验，在权限、安全、脱敏、审核和贡献账本约束下进入共享池。

## 共享缓存池四层结构

Shared Skill Memory Pool 包含四层缓存：

1. Private Cache：默认私有，保留原始上下文和个人工作流。
2. Team Cache：团队内部共享，只允许用户明确授权后的脱敏对象进入。
3. Community Cache：社区候选与社区验证对象，需要贡献链、审核与压缩证明。
4. Public Skill Commons：公共技能公地，只能进入脱敏、验证、结构化、低风险且授权明确的公共知识资产。

## 为什么原始数据默认私有

原始数据可能包含学生、客户、车牌、身份证、保单、学校、手机号、合同或组织内部信息。Cognitive Jelly 不允许把隐私数据直接进入公共缓存。公共共享的只能是脱敏、验证、结构化后的经验，并且每个共享对象都必须保留来源、时间戳、贡献链、风险等级和版本。

## 共享缓存搜索访问规则

`searchSharedCache(query, context)` 现在按“私有 → 团队 → 社区 → 公共”的顺序检索，但每层都会先做权限收敛：

- Private Cache 只返回对象 owner 或 contributors 自己可见的对象。
- Team Cache 只返回用户所属 team / organization 的对象。
- Community Cache 只在调用上下文允许 community 层时返回，且不会返回 quarantined、rejected、deprecated 对象。
- Public Skill Commons 只有在 `query.includePublic === true` 时才参与检索，避免默认把公共内容混入私有工作流。
- 搜索结果、技能命中和风险提示共用同一可见对象集合，防止 risk warning 或 skill hit 泄露不可见对象标题。

## 公共技能公地的晋升规则

`promoteCacheObject(objectId, targetLayer)` 会根据 `CachePromotionPolicy` 检查：

- 是否已脱敏。
- 隐私风险与安全风险是否允许进入目标层级。
- 审核分是否达标。
- 使用次数是否足够。
- 压缩证明是否足够。
- 贡献链和来源证明是否完整。
- 用户是否授权团队/社区/公共共享。
- 来源 license 是否允许共享。

不满足条件的对象不会晋升；出现隐私泄露、版权争议、低质量反馈、偏见风险、审核争议、用户撤回授权或投毒风险时，可进入 quarantine。

## 缓存命中奖励机制

`recordCacheHit(cacheObjectId, userId, taskId)` 会记录命中层级、节省成本 mock、命中质量和贡献链。`calculateCacheReward(cacheHitRecord)` 会按贡献者图谱分配 mock 饲料值或声望奖励。奖励只是产品记录，不接真实支付、不做可交易 token、不承诺收益。

## 如何防止缓存污染

Ecosystem Gateway 增加多重安全模块：

- PrivacyGate：阻止 high privacy 对象进入 public，要求脱敏后才能晋升。
- ConsentGate：检查用户是否允许团队、社区、公共共享、训练使用和派生技能。
- ProvenanceGate：检查来源、notary hash、转换步骤、审核与验证记录。
- CachePoisoningDetector：检测重复垃圾提交、刷命中、低质量批量对象和异常贡献者行为。
- BiasImmuneMonitor：检测领域残差长期堆积、贡献奖励过度集中、公共池过度偏向热门领域。

## 如何添加团队/组织

1. 在 `src/ecosystem/federation/organizationRegistry.ts` 增加 `OrganizationRecord`。
2. 在 `src/ecosystem/federation/ecosystemConnector.ts` 增加团队或组织类型的 `EcosystemConnector`。
3. 为团队配置默认 cache layer、成员列表和可用 permissions。
4. 在真实后端接入时，将组织权限与 OAuth/SSO、审计日志、数据保留策略绑定。

## Ecosystem Gateway 页面

- `/ecosystem`：生态总览，展示缓存对象数、公共技能数、今日命中、节省成本、待审核对象、隔离对象、团队/组织和偏见报警。
- `/ecosystem/public-skill-commons`：公共技能公地，展示公共技能、贡献链、命中次数、节省成本、风险等级、版本，并支持申请使用、报告问题、请求改进 mock。
- `/ecosystem/team-knowledge-pool`：团队知识池，展示团队共享技能、团队缓存命中、贡献者和晋升到社区候选按钮。
- `/ecosystem/community-library`：社区库，展示社区候选、待审核共享对象、热门残差、冷门待救助残差和高价值反向愿望匹配。

## 后续如何接入真实 API 和组织权限系统

- 将共享缓存对象、命中记录、奖励记录和隔离记录持久化。
- 将团队/组织权限接入 SSO、OAuth 或企业目录。
- 将晋升、隔离、撤回授权和争议处理接入审核工作流。
- 将贡献账本与 Usage Ledger / Notary / Skill Memory Pool 打通。
- 对 Public Skill Commons 增加人工审核、版本回滚、许可证管理和安全扫描。

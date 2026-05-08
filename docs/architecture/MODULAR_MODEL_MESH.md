# Modular Model Mesh / 积木模型网

## 1. Core Idea

未来模型不一定是单体巨兽，而可以是柔性的乐高式模型系统：

```text
Base Core
+ Skill Blocks
+ Residual Blocks
+ Router Blocks
+ Evaluation Blocks
+ Memory Blocks
+ Safety Blocks
+ Domain Blocks
```

## 2. Model Block Types

1. Base Core / 基础底座
2. Skill Block / 技能积木
3. Residual Block / 残差识别积木
4. Router Block / 路由积木
5. Evaluation Block / 评测积木
6. Memory Block / 记忆积木
7. Safety Block / 安全积木
8. Domain Block / 领域积木
9. Persona Block / 授权人格积木
10. World Model Block / 世界模型积木

## 3. Block Card

每个模型积木必须有 Block Card：

```json
{
  "block_id": "...",
  "type": "...",
  "domain": "...",
  "trained_from": ["..."],
  "base_model": "...",
  "training_method": "...",
  "capability": "...",
  "evaluation": { "benchmarkName": "...", "passed": false },
  "risk": { "privacy": "low", "bias": "low", "safety": "low" },
  "status": "candidate",
  "can_merge_to_public": false,
  "requires_human_review": true
}
```

## 4. Principle

大模型用参数记住世界。
认知水母用结构组织世界。
积木模型网让参数、结构、缓存、技能和评测共同组成柔性智能。

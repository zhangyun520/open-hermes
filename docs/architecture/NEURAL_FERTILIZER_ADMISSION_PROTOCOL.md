# Neural Fertilizer Admission Protocol / 神经肥料准入协议

## 1. Why NFAP?

Cognitive Jelly collects residuals, failures, wishes, experience feedback, review records, cache hits, and skill reuse records. These materials are not automatically suitable for model training. Feeding every piece of garbage directly into a model can cause privacy leakage, bias pollution, low-quality training, copyright risk, backdoor attacks, and model degradation.

NFAP is the admission protocol that decides whether data fertilizer is eligible to enter a training candidate pool.

Not every residual can become neural fertilizer.
Only verified, redacted, structured, authorized, and reproducible residuals may enter training candidate pools.

不是所有残差都能成为神经肥料。
只有经过脱敏、授权、结构化、验证和可复现评测的残差，才有资格进入训练候选池。

## 2. Fertilizer Grades

### F0: Raw Waste / 原始垃圾

- 未脱敏
- 未分类
- 风险未知
- 不可训练

### F1: Compostable Material / 可堆肥材料

- 有潜力
- 仍混乱
- 可进入垃圾站、失败博物馆
- 不可训练

### F2: Structured Fertilizer / 结构化肥料

- 已脱敏
- 已生成残差卡
- 已完成基础分类
- 可进入技能候选或缓存候选

### F3: Verified Fertilizer / 验证肥料

- 已审核
- 有证据说明能降低某类 D
- 可进入技能胶囊、共享缓存池
- 仍不一定适合训练

### F4: Training Candidate Fertilizer / 训练候选肥料

- 来源清楚
- 授权明确
- 脱敏完成
- 结构完整
- 有正例、反例、审核记录、验证结果
- 可进入训练候选池

### F5: Foundation-grade Fertilizer / 大模型级肥料

- 高质量
- 多样化
- 低风险
- 可复现
- 可审计
- 适合用于训练基础模型、公共突触或行业模型

## 3. Nine Fertilizer Gates

1. **Provenance Gate / 来源门**：谁贡献的？什么时候？是否公证？
2. **Consent Gate / 授权门**：能不能训练？能不能派生？能不能公共化？
3. **Privacy Gate / 隐私门**：姓名、手机号、车牌、学校、保单、身份信息是否脱敏？
4. **Residual Clarity Gate / 残差明确门**：它解决哪类 D？
5. **Structural Completeness Gate / 结构完整门**：是否包含需求、失败、修正、审核、验证？
6. **Quality Gate / 质量门**：是否重复、低质、幻觉、伪造、刷数据？
7. **Safety Gate / 安全门**：是否涉及违法、侵权、作弊、伤害优化、高风险自动化？
8. **Verification Gate / 验证门**：是否证明它真的降低 D？
9. **Reproducibility Gate / 可复现门**：是否有 benchmark、测试集、反例和失败条件？

## 4. Fertilizer Lifecycle

```text
raw
→ redacted
→ structured
→ reviewed
→ verified
→ training_candidate
→ queued
→ trained_synapse
→ evaluated
→ sandbox_deploy
→ accepted
→ rejected / quarantined / deprecated
```

## 5. What NFAP Does Not Do

- NFAP 不直接训练大模型。
- NFAP 不允许原始隐私进入训练。
- NFAP 不承诺训练收益。
- NFAP 不让垃圾自动升格为模型燃料。
- NFAP 只负责准入、记录、审查、分级和候选池管理。

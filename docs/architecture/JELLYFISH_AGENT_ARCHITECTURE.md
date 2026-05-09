# Jellyfish Agent Architecture / 水母智能体架构

## 1. Why Jellyfish?

Jellyfish is not our mascot. Jellyfish is our agent architecture.

认知水母不是一个中心化聊天机器人，而是一张分布式、透明、可发光、可防御、可消化残差、可群体演化的智能体网络。水母隐喻把 Cognitive Jelly 的名字、视觉和工程结构统一起来：信号不必先进入一个“中央大脑”，而可以由多个器官、触手、安全门、消化器和共享记忆协同处理。

## 2. Biological Inspirations

This architecture is **inspired by** jellyfish biology. It is not a biologically exact simulation.

- Distributed nerve net: inspired by decentralized sensing and response rather than one central brain.
- Tentacles: inspired by external sensing, contact, and interaction with surrounding environments.
- Cnidocytes / nematocysts: inspired by defensive cells that respond quickly to risk.
- Transparent body: inspired by auditability, explainability, and visible provenance.
- Bioluminescence: inspired by visible signals that communicate system state.
- Digestive cavity: inspired by transforming incoming material into usable energy.
- Drifting and low-energy movement: inspired by cache-first, local-first, low-cost routing.
- Lifecycle: polyp, ephyra, and medusa stages inspire idea/skill/version maturation.
- Bloom: inspired by many jellyfish forming visible collective presence, mapped to shared commons.
- Regeneration and flexible body: inspired by repair, recovery, and adaptive rerouting after failure.

## 3. Biological Feature → Agent Module Mapping

| Jellyfish Feature | Agent Module | Function in Cognitive Jelly |
| --- | --- | --- |
| Distributed nerve net | NerveNetRouter | Distributed routing across modules |
| Tentacles | TentacleConnectors | External integrations and sensing |
| Cnidocytes | CnidocyteSafetyGate | Privacy / risk / abuse defense |
| Transparent body | TransparentAuditLayer | Explainability and provenance |
| Bioluminescence | BioluminescentFeedback | Visual status and contribution feedback |
| Digestive cavity | ResidualDigestor | Convert failures into residual cards |
| Drifting | DriftOptimizer | Low-cost flow and cache-first routing |
| Lifecycle | PolypMedusaLifecycle | Polyphonic versioning and maturation |
| Bloom | SwarmCommons | Shared skill memory and public commons |
| Regeneration | RegenerativeRecovery | Failure recovery and skill repair |

## 4. Core Design Principles

1. Distributed before centralized.
2. Connect without owning.
3. Digest before sharing.
4. Sting before harm.
5. Glow when value is created.
6. Cache before computation.
7. Evolve through lifecycle, not linear versions.
8. Share structure, not private memory.
9. Regenerate from failure.
10. Let every residual emit a faint light.

## 5. Module Overview

### NerveNetRouter

Routes incoming JellySignals to modules without assuming a single central brain. It can route wishes to Wish Pool, failures to ResidualDigestor, safety risks to CnidocyteSafetyGate, and version events to Polyphonic Versioning.

### TentacleConnector

Represents consent-aware external connections: models, tools, apps, games, anime worlds, industry systems, communities, local cache, and public commons.

### CnidocyteSafetyGate

A fast defensive gate for privacy, abuse, cheating, unauthorized IP/persona use, external writes, and human-transition risk.

### TransparentAuditLayer

Creates explainable audit records that describe why a signal was routed, blocked, reviewed, cached, or handled locally.

### BioluminescentFeedback

Turns system events into glow signals for UI and contribution feedback.

### ResidualDigestor

Digests failures, garbage, world-experience feedback, and drifted outputs into Residual Card candidates.

### DriftOptimizer

Chooses cache-first, local-first, cheap-model-first, strong-model, or human-review flow to lower cost and risk.

### PolypMedusaLifecycle

Maps ideas, skills, residuals, versions, and cache objects into maturity stages: polyp, ephyra, medusa, bloom, dormant, frozen.

### SwarmCommons

Represents verified, attributed, safe shared skills across users, teams, communities, and public commons.

### OsmoticPrivacyMembrane

Controls movement from private to team, community, or public layers. Raw private data cannot cross into public.

### BellPulseScheduler

Defines daily, weekly, seasonal, and manual system pulses such as residual digest, bias scan, cache cleanup, and human-transition audit.

### RegenerativeRecovery

Generates recovery plans after cache poisoning, outdated skills, privacy leaks, connector risks, or quarantined versions.

## 6. How This Connects Existing Cognitive Jelly Modules

- Wish Pool 是需求触手。
- Reverse Wish Pool 是副产品触手。
- Garbage Station 是残差消化入口。
- Residual Card 是消化后的结构化营养。
- Skill Capsule 是成长出的触手能力。
- Shared Skill Memory Pool 是神经记忆。
- Review Pool 是价值感受器。
- Bias Shelter 是免疫系统。
- Human Transition Layer 是伦理安全阀。
- Ecosystem Gateway 是外部触手网络。
- World Experience Gateway 是感官沙盒。
- Polyphonic Versioning 是生命周期。

## 7. Safety Boundaries

水母触手连接外部世界，但不能吞掉外部世界。

Connections must pass authorization, consent, redaction, safety gates, human review, and contribution ledger requirements. Tentacles must not bypass anti-cheat, scrape unauthorized data, impersonate personas, push private residuals into public cache, or automate high-risk external actions.

## 8. MVP Implementation Plan

This repository implements the minimum architecture layer:

- TypeScript types.
- Mock organs, signals, tentacle endpoints, and swarm skills.
- Routing interface.
- Cnidocyte safety gate.
- Residual digestor.
- Bioluminescent feedback mapping.
- Drift optimizer.
- Lifecycle mapping.
- Privacy membrane and swarm commons policies.
- UI page and components.
- Unit tests for core rules.

## Neural Fertilizer and Nebula Synapse Extension

The jellyfish architecture now includes a protocol bridge from residual digestion to accountable synapse creation:

- `Fertilizer Gate`: checks provenance, consent, privacy, residual clarity, structure, quality, safety, verification, and reproducibility before anything enters a training candidate pool.
- `Synapse Foundry`: mock-only flow for turning F4/F5 fertilizer into candidate skill, residual, routing, evaluation, LoRA, embedding, memory, safety, or human-transition synapses.
- `Nebula Synapse Network`: distributed mock node model for personal, CPU, GPU, expert, and commons roles; it is not a real distributed training network.
- `Modular Model Mesh`: evaluated model blocks can attach only after safety, evaluation, and required human review.

Raw private residuals remain behind the OsmoticPrivacyMembrane and must not be fed into training.
- `Residual Synaptic Pruning`: keeps the synapse network from becoming a garbage mountain by keeping, merging, downgrading, dormancy-routing, composting, quarantining, or forgetting candidates based on usage, verification, risk, duplication, age, historical value, and consent withdrawal.

## Personal Agent Tentacle Extension

The Personal Agent layer treats every networked or executable capability as a declared tentacle. TentacleAdmissionGate, sandbox policy, skill import quarantine, transparent audit, and residual digestion must run before any future real action. The current repository keeps these flows mock-only so the architecture can be tested without external side effects.

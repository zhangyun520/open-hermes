import type { JellyOrgan, JellySignal } from './types';
import type { TentacleEndpoint } from './tentacleConnector';
import type { SwarmSkillSummary } from './swarmCommons';
export const mockJellyOrgans: JellyOrgan[] = [
  { id: 'organ-nerve-net', name: 'NerveNetRouter / 分布式神经网', type: 'nerve_net', biologicalInspiration: 'distributed nerve net', agentFunction: 'distributed signal routing across modules', connectedModules: ['Wish Pool', 'Review Pool', 'Polyphony'], status: 'active', riskLevel: 'low', signalsProcessed: 128 },
  { id: 'organ-tentacle', name: 'TentacleConnector / 触手连接器', type: 'tentacle', biologicalInspiration: 'tentacles sensing and touching the world', agentFunction: 'external integrations with consent and safety checks', connectedModules: ['Ecosystem Gateway', 'World Experience Gateway'], status: 'active', riskLevel: 'medium', signalsProcessed: 64 },
  { id: 'organ-cnidocyte', name: 'CnidocyteSafetyGate / 刺胞安全门', type: 'cnidocyte', biologicalInspiration: 'defensive cnidocytes', agentFunction: 'privacy, abuse, cheating and high-risk automation defense', connectedModules: ['Review Pool', 'Bias Shelter'], status: 'active', riskLevel: 'low', signalsProcessed: 42 },
  { id: 'organ-audit', name: 'TransparentAuditLayer / 透明审计层', type: 'transparent_audit', biologicalInspiration: 'transparent body', agentFunction: 'explainability, provenance and route audit', connectedModules: ['Contribution Ledger', 'Idea Notary'], status: 'active', riskLevel: 'low', signalsProcessed: 88 },
  { id: 'organ-glow', name: 'BioluminescentFeedback / 微光反馈', type: 'bioluminescence', biologicalInspiration: 'bioluminescent status signals', agentFunction: 'visual value and safety feedback', connectedModules: ['Jelly Core', 'Growth Center'], status: 'active', riskLevel: 'low', signalsProcessed: 103 },
  { id: 'organ-digestor', name: 'ResidualDigestor / 残差消化器', type: 'digestor', biologicalInspiration: 'digestive cavity', agentFunction: 'convert failures into residual candidates', connectedModules: ['Garbage Station', 'Residual Cards'], status: 'active', riskLevel: 'medium', signalsProcessed: 73 },
  { id: 'organ-drift', name: 'DriftOptimizer / 顺流低成本优化器', type: 'drift_optimizer', biologicalInspiration: 'low-energy drifting', agentFunction: 'cache-first, local-first and cheap-model-first routing', connectedModules: ['Skill Memory Pool', 'Integration Gateway'], status: 'active', riskLevel: 'low', signalsProcessed: 91 },
  { id: 'organ-lifecycle', name: 'PolypMedusaLifecycle / 水螅-水母生命周期', type: 'lifecycle', biologicalInspiration: 'polyp, ephyra and medusa stages', agentFunction: 'maturity stages for ideas, skills, versions and cache objects', connectedModules: ['Polyphonic Versioning'], status: 'active', riskLevel: 'low', signalsProcessed: 35 },
  { id: 'organ-swarm', name: 'SwarmCommons / 水母群公共技能公地', type: 'swarm_commons', biologicalInspiration: 'jellyfish bloom', agentFunction: 'verified shared skill memory and commons', connectedModules: ['Public Skill Commons', 'Community Library'], status: 'active', riskLevel: 'medium', signalsProcessed: 58 },
  { id: 'organ-membrane', name: 'OsmoticPrivacyMembrane / 渗透式隐私膜', type: 'privacy_membrane', biologicalInspiration: 'selective boundary', agentFunction: 'control movement across privacy layers', connectedModules: ['Shared Cache', 'Privacy Gate'], status: 'active', riskLevel: 'low', signalsProcessed: 117 },
  { id: 'organ-pulse', name: 'BellPulseScheduler / 伞盖脉冲调度器', type: 'pulse_scheduler', biologicalInspiration: 'bell pulsing rhythm', agentFunction: 'daily, weekly, seasonal and manual system pulses', connectedModules: ['Bias Shelter', 'Review Pool'], status: 'active', riskLevel: 'low', signalsProcessed: 18 },
  { id: 'organ-regen', name: 'RegenerativeRecovery / 再生恢复', type: 'regenerative_recovery', biologicalInspiration: 'regeneration and flexible recovery', agentFunction: 'failure recovery plans for skills, cache, versions and connectors', connectedModules: ['Quarantine', 'Polyphony'], status: 'active', riskLevel: 'medium', signalsProcessed: 29 }
];
const createdAt = '2026-05-08T00:00:00Z';
export const mockJellySignals: JellySignal[] = [
  { id: 'sig-wish', type: 'wish', sourceModule: 'Wish Pool', summary: '我想把高考压轴题变成可体验迷宫', privacyLevel: 'team', riskLevel: 'low', status: 'received', createdAt, metadata: { domain: 'education' } },
  { id: 'sig-reverse', type: 'reverse_wish', sourceModule: 'Reverse Wish Pool', summary: '我有一套客户异议分类表', privacyLevel: 'team', riskLevel: 'medium', status: 'received', createdAt, metadata: { domain: 'customer-success' } },
  { id: 'sig-garbage', type: 'garbage', sourceModule: 'Garbage Station', summary: 'AI failure: prompt 输出跑偏', privacyLevel: 'team', riskLevel: 'low', status: 'received', createdAt, metadata: { category: 'ai failure', domain: 'ai-workflow' } },
  { id: 'sig-cache', type: 'cache_hit', sourceModule: 'Skill Memory Pool', summary: '压轴题婴儿版讲解命中缓存', privacyLevel: 'community', riskLevel: 'low', status: 'cached', createdAt, metadata: { cacheAvailable: true } },
  { id: 'sig-safety', type: 'safety_risk', sourceModule: 'World Experience Gateway', targetModule: 'public cache', summary: 'private replay includes phone and anti-cheat bypass request', privacyLevel: 'private', riskLevel: 'critical', status: 'received', createdAt, metadata: { phone: '13800000000', cheat: true } },
  { id: 'sig-world', type: 'world_experience', sourceModule: 'World Experience Gateway', summary: '村庄经济循环第三轮奖励缺少因果反馈', privacyLevel: 'team', riskLevel: 'low', status: 'received', createdAt, metadata: { residualValue: 82, domain: 'gameplay', evidenceStrength: 80 } }
];
export const mockTentacleEndpoints: TentacleEndpoint[] = [
  { id: 'openai-mock', name: 'OpenAI mock', type: 'model', permission: 'read_only', status: 'mock', safetyNotes: ['mock only'] },
  { id: 'codex-mock', name: 'Codex mock', type: 'tool', permission: 'write_with_approval', status: 'mock', safetyNotes: ['human review required'] },
  { id: 'ollama-local', name: 'Local Ollama mock', type: 'local_cache', permission: 'sandbox', status: 'mock', safetyNotes: ['local private processing'] },
  { id: 'public-skill-commons', name: 'Public Skill Commons mock', type: 'public_commons', permission: 'read_only', status: 'mock', safetyNotes: ['verified public skills only'] }
];
export const mockSwarmSkills: SwarmSkillSummary[] = [
  { skillId: 'skill-edu-baby', title: '压轴题婴儿版讲解', layer: 'public', usageCount: 46, contributorCount: 3, riskLevel: 'low', verified: true },
  { skillId: 'skill-objection', title: '客户异议识别', layer: 'team', usageCount: 12, contributorCount: 2, riskLevel: 'medium', verified: true },
  { skillId: 'skill-ai-failure', title: 'AI 失败分类', layer: 'community', usageCount: 21, contributorCount: 4, riskLevel: 'low', verified: true }
];

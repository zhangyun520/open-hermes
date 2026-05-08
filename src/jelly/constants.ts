import type { JellyOrganType, JellyRiskLevel } from './types';
export const riskRank: Record<JellyRiskLevel, number> = { low: 1, medium: 2, high: 3, critical: 4 };
export const jellyOrganLabels: Record<JellyOrganType, string> = { nerve_net: 'NerveNetRouter', tentacle: 'TentacleConnector', cnidocyte: 'CnidocyteSafetyGate', transparent_audit: 'TransparentAuditLayer', bioluminescence: 'BioluminescentFeedback', digestor: 'ResidualDigestor', drift_optimizer: 'DriftOptimizer', lifecycle: 'PolypMedusaLifecycle', swarm_commons: 'SwarmCommons', privacy_membrane: 'OsmoticPrivacyMembrane', pulse_scheduler: 'BellPulseScheduler', regenerative_recovery: 'RegenerativeRecovery' };
export const nowIso = () => new Date().toISOString();
export function jellyId(prefix: string, seed: string) { return `${prefix}-${seed.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`; }

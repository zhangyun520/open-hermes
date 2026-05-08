import type { PruningDecision, SynapseRiskLevel } from './types';

const riskRank: Record<SynapseRiskLevel, number> = { low: 1, medium: 2, high: 3, critical: 4 };

export function decideSynapticPruning(input: {
  targetId: string;
  targetType: PruningDecision['targetType'];
  usageCount: number;
  verificationScore: number;
  riskLevel: SynapseRiskLevel;
  duplicateScore: number;
  ageDays: number;
  hasHistoricalValue: boolean;
  hasConsentWithdrawn: boolean;
}): PruningDecision {
  const base = (action: PruningDecision['action'], reasons: string[], requiresHumanReview = false): PruningDecision => ({
    targetId: input.targetId,
    targetType: input.targetType,
    action,
    reasons,
    requiresHumanReview
  });

  if (input.hasConsentWithdrawn) {
    return base('forget', ['consent was withdrawn; active training or reuse path must forget this object'], true);
  }

  if (input.riskLevel === 'critical') {
    return base('quarantine', ['critical risk objects must be isolated before any reuse or deletion decision'], true);
  }

  if (input.duplicateScore >= 80 && input.usageCount <= 3) {
    return base('merge', ['high duplicate score with low usage should merge into a stronger canonical neighbor']);
  }

  if (input.usageCount >= 25 && input.verificationScore >= 80 && riskRank[input.riskLevel] <= riskRank.low) {
    return base('keep', ['high usage, high verification, and low risk indicate real D reduction']);
  }

  if (input.hasHistoricalValue && input.usageCount <= 5) {
    return base('dormant', ['historical value should be preserved as dormant rather than deleted']);
  }

  if (input.verificationScore < 35 && input.ageDays >= 180) {
    return base(input.hasHistoricalValue ? 'dormant' : 'compost', ['old low-verification material should leave active synapse paths']);
  }

  if (input.verificationScore < 55) {
    return base('downgrade', ['verification is weak; downgrade before further reuse']);
  }

  return base('keep', ['default keep: no pruning threshold was triggered']);
}

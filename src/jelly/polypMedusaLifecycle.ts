import type { JellyLifecycleState, JellyRiskLevel } from './types';
export function getLifecycleState(input: { objectId: string; objectType: JellyLifecycleState['objectType']; usageCount: number; reviewScore: number; verificationScore: number; riskLevel: JellyRiskLevel; }): JellyLifecycleState {
  const maturityScore = Math.max(0, Math.min(100, Math.round(input.usageCount * 2 + input.reviewScore * 0.4 + input.verificationScore * 0.4 - (input.riskLevel === 'medium' ? 10 : input.riskLevel === 'high' ? 35 : input.riskLevel === 'critical' ? 80 : 0))));
  if (input.riskLevel === 'critical' || input.riskLevel === 'high') return { objectId: input.objectId, objectType: input.objectType, stage: 'frozen', maturityScore, nextPossibleStages: ['ephyra'] };
  if (input.usageCount === 0 && input.reviewScore === 0) return { objectId: input.objectId, objectType: input.objectType, stage: 'dormant', maturityScore, nextPossibleStages: ['polyp'] };
  if (maturityScore < 30) return { objectId: input.objectId, objectType: input.objectType, stage: 'polyp', maturityScore, nextPossibleStages: ['ephyra'] };
  if (maturityScore < 60) return { objectId: input.objectId, objectType: input.objectType, stage: 'ephyra', maturityScore, nextPossibleStages: ['medusa'] };
  if (input.usageCount >= 30 && input.reviewScore >= 80 && input.verificationScore >= 80 && input.riskLevel === 'low') return { objectId: input.objectId, objectType: input.objectType, stage: 'bloom', maturityScore, nextPossibleStages: ['medusa', 'frozen'] };
  return { objectId: input.objectId, objectType: input.objectType, stage: 'medusa', maturityScore, nextPossibleStages: ['bloom', 'dormant'] };
}

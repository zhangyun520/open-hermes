import type { SynapseCapsule, SynapseRiskLevel } from './types';

const riskPenalty: Record<SynapseRiskLevel, number> = { low: 0, medium: 10, high: 30, critical: 70 };

export function evaluateSynapse(capsule: SynapseCapsule): { passed: boolean; score: number; reasons: string[] } {
  const improvement = (capsule.evaluation.afterScore ?? 0) - (capsule.evaluation.beforeScore ?? 0);
  const score = Math.max(0, Math.min(100, 50 + improvement - riskPenalty[capsule.risk.privacy] - riskPenalty[capsule.risk.bias] - riskPenalty[capsule.risk.forgetting]));
  const reasons = [
    improvement > 0 ? 'benchmark improved over baseline' : 'no benchmark improvement recorded',
    capsule.evaluation.passed ? 'capsule evaluation marked passed' : 'capsule evaluation has not passed',
    capsule.trainedFromFertilizerIds.length ? 'training fertilizer chain is present' : 'missing fertilizer chain'
  ];
  return { passed: score >= 70 && capsule.evaluation.passed && capsule.trainedFromFertilizerIds.length > 0, score, reasons };
}

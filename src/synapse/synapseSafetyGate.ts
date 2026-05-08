import type { NeuralFertilizer, SynapseRiskLevel } from './types';

const riskRank: Record<SynapseRiskLevel, number> = { low: 1, medium: 2, high: 3, critical: 4 };
const maxRisk = (risks: SynapseRiskLevel[]) => risks.reduce((max, risk) => (riskRank[risk] > riskRank[max] ? risk : max), 'low' as SynapseRiskLevel);

export function evaluateSynapseSafety(fertilizer: NeuralFertilizer): {
  allowed: boolean;
  riskLevel: SynapseRiskLevel;
  reasons: string[];
  requiredActions: string[];
} {
  const reasons: string[] = [];
  const requiredActions: string[] = [];
  let allowed = true;

  if (!fertilizer.consent.allowTrainingUse) {
    reasons.push('training consent is not granted');
    requiredActions.push('block_training');
    allowed = false;
  }
  if (!fertilizer.privacy.redacted) {
    reasons.push('fertilizer is not redacted');
    requiredActions.push('redact');
    allowed = false;
  }
  if (fertilizer.privacy.containsMinorData) {
    reasons.push('minor data requires high privacy handling');
    requiredActions.push('high_privacy_review');
  }
  if (fertilizer.privacy.containsEnterpriseSensitiveData) {
    reasons.push('enterprise sensitive data remains private by default');
    requiredActions.push('enterprise_privacy_review');
  }
  if (fertilizer.risks.privacyRisk === 'high' || fertilizer.risks.privacyRisk === 'critical') {
    reasons.push('high privacy risk is not allowed for public/foundation training');
    requiredActions.push('restrict_to_private_or_team');
  }
  if (fertilizer.risks.poisoningRisk === 'high' || fertilizer.risks.poisoningRisk === 'critical') {
    reasons.push('poisoning risk requires quarantine');
    requiredActions.push('quarantine');
    allowed = false;
  }
  if (fertilizer.risks.copyrightRisk === 'high' || fertilizer.risks.copyrightRisk === 'critical') {
    reasons.push('copyright risk requires human review');
    requiredActions.push('human_review');
    allowed = false;
  }

  return {
    allowed,
    riskLevel: maxRisk([fertilizer.risks.privacyRisk, fertilizer.risks.biasRisk, fertilizer.risks.copyrightRisk, fertilizer.risks.poisoningRisk]),
    reasons: [...new Set(reasons)],
    requiredActions: [...new Set(requiredActions)]
  };
}

import type { JellyRiskLevel } from './types';
export interface RegenerationPlan { targetId: string; reason: string; steps: string[]; requiresHumanReview: boolean; }
export function generateRegenerationPlan(input: { targetId: string; targetType: 'skill' | 'cache_object' | 'version' | 'connector'; failureReason: string; riskLevel: JellyRiskLevel; }): RegenerationPlan {
  const reason = input.failureReason.toLowerCase();
  let steps: string[];
  if (/cache poisoning|poison/.test(reason)) steps = ['quarantine affected cache object', 'review hit ledger and provenance', 'rebuild from verified parent'];
  else if (/outdated|stale/.test(reason)) steps = ['fork new version', 'test against current tasks', 'compare with stable voice'];
  else if (/privacy leak|privacy/.test(reason)) steps = ['quarantine target', 'redact leaked fields', 'notify maintainers', 'require safety review before restore'];
  else if (/connector|consent/.test(reason)) steps = ['disable connector', 'review consent and scopes', 're-enable only after approval'];
  else steps = ['open review record', 'identify verified parent', 'create recovery branch'];
  return { targetId: input.targetId, reason: input.failureReason, steps, requiresHumanReview: input.riskLevel === 'high' || input.riskLevel === 'critical' || steps.some((step) => /quarantine|disable|notify|approval/.test(step)) };
}

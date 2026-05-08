import type { CacheLayer, CachePromotionPolicy, RiskLevel, SharedCacheObject } from '../types';

const riskRank: Record<RiskLevel, number> = { low: 1, medium: 2, high: 3 };
export const defaultPromotionPolicy: CachePromotionPolicy = { minReviewScore: 72, minUsageCount: 2, minVerifiedCompression: 20, maxRiskLevel: 'medium', requiresHumanReview: true, requiresAnonymization: true, requiresSourceLicense: true };

export function getPolicyForTarget(targetLayer: CacheLayer): CachePromotionPolicy {
  if (targetLayer === 'team') return { ...defaultPromotionPolicy, minReviewScore: 60, minUsageCount: 1, minVerifiedCompression: 10, maxRiskLevel: 'medium' };
  if (targetLayer === 'community') return { ...defaultPromotionPolicy, minReviewScore: 75, minUsageCount: 2, minVerifiedCompression: 25, maxRiskLevel: 'medium' };
  if (targetLayer === 'public') return { ...defaultPromotionPolicy, minReviewScore: 82, minUsageCount: 3, minVerifiedCompression: 35, maxRiskLevel: 'low' };
  return defaultPromotionPolicy;
}

export function evaluatePromotion(object: SharedCacheObject, targetLayer: CacheLayer, policy = getPolicyForTarget(targetLayer)): { allowed: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (policy.requiresAnonymization && !object.anonymized) reasons.push('requires anonymization');
  if (object.privacyLevel === 'high' && targetLayer === 'public') reasons.push('high privacy cannot enter public');
  if (riskRank[object.riskLevel] > riskRank[policy.maxRiskLevel]) reasons.push('risk exceeds promotion policy');
  if (object.reviewScore < policy.minReviewScore) reasons.push('review score too low');
  if (object.usageCount < policy.minUsageCount) reasons.push('usage count too low');
  if (object.verifiedCompressionScore < policy.minVerifiedCompression) reasons.push('verified compression too low');
  if (policy.requiresSourceLicense && object.licenseMode === 'private') reasons.push('source license does not allow sharing');
  if (object.provenance.transformationSteps.length === 0 || object.contributors.length === 0) reasons.push('missing provenance or contributors');
  if (targetLayer === 'team' && !object.consent.allowTeamShare) reasons.push('missing team share consent');
  if (targetLayer === 'community' && !object.consent.allowCommunityShare) reasons.push('missing community share consent');
  if (targetLayer === 'public' && !object.consent.allowPublicShare) reasons.push('missing public share consent');
  return { allowed: reasons.length === 0, reasons };
}

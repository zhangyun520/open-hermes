import type { PolyphonyRiskLevel, VersionNode } from './types';
import { getVersionNode } from './versionNode';
import { listVersionReviews } from './review';
const riskPenalty: Record<PolyphonyRiskLevel, number> = { low: 0, medium: 10, high: 30, critical: 50 };
const avg = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
export function calculateVersionFitness(versionId: string): number {
  const node = getVersionNode(versionId); if (!node) return 0;
  const reviews = listVersionReviews(versionId);
  const reviewScore = avg(reviews.map((review) => avg([review.clarity, review.usefulness, review.safety, review.reusability, review.originality, review.compatibility])));
  const cacheScore = Math.min(100, (node.costProfile?.cacheHitRate ?? 0) * 100 + Math.min(20, node.costProfile?.expectedReuseCount ?? 0));
  const raw = avg([node.usefulnessScore ?? 50, node.safetyScore ?? 50, node.compressionScore ?? 50, node.reusabilityScore ?? 50, cacheScore || 50, (reviewScore || node.validationScore || 50)]);
  return Math.max(0, Math.min(100, Math.round(raw - riskPenalty[node.riskLevel])));
}
export function shouldRequireHumanReview(node: VersionNode): boolean {
  return node.riskLevel === 'high' || node.riskLevel === 'critical' || node.safetyMetadata?.requiresHumanReview === true || node.safetyMetadata?.affectsExternalActions === true || node.safetyMetadata?.affectsHumanTransition === true || node.safetyMetadata?.containsSensitiveData === true;
}

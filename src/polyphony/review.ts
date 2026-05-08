import type { VersionReview } from './types';
import { nextId, nowIso, getVersionFamily, updateVersionFamily } from './versionFamily';
import { getVersionNode, updateVersionNode } from './versionNode';
import { getVoiceTrack } from './voiceTrack';
const reviews = new Map<string, VersionReview>();
export function reviewVersion(versionId: string, review: Omit<VersionReview, 'id' | 'versionId' | 'createdAt'> & Partial<Pick<VersionReview, 'id' | 'createdAt'>>): VersionReview {
  const node = getVersionNode(versionId); if (!node) throw new Error(`VersionNode not found: ${versionId}`);
  const saved: VersionReview = { ...review, id: review.id ?? nextId('vr'), versionId, createdAt: review.createdAt ?? nowIso() };
  reviews.set(saved.id, saved);
  const score = Math.round((review.clarity + review.usefulness + review.safety + review.reusability + review.originality + review.compatibility) / 6);
  updateVersionNode({ ...node, validationScore: score, usefulnessScore: review.usefulness, safetyScore: review.safety, reusabilityScore: review.reusability, originalityScore: review.originality, status: review.recommendation === 'quarantine' ? 'quarantined' : node.status });
  return saved;
}
export function listVersionReviews(versionId?: string) { return Array.from(reviews.values()).filter((review) => !versionId || review.versionId === versionId); }
export function promoteToCanonical(versionId: string): { allowed: boolean; reasons: string[] } {
  const node = getVersionNode(versionId); if (!node) return { allowed: false, reasons: ['version not found'] };
  const track = getVoiceTrack(node.voiceTrackId); const reasons: string[] = [];
  if (node.riskLevel === 'high' || node.riskLevel === 'critical') reasons.push('high or critical risk cannot become canonical');
  if (node.status === 'quarantined' || node.status === 'rejected') reasons.push('quarantined or rejected version cannot become canonical');
  if (track?.type === 'codex_auto' && listVersionReviews(versionId).length === 0) reasons.push('codex_auto version requires human review');
  if (node.safetyMetadata?.affectsPublicCache && node.privacyLevel !== 'public') reasons.push('public cache version must use public privacyLevel');
  if ((node.safetyScore ?? 0) < 80) reasons.push('safetyScore below canonical threshold');
  if (reasons.length) return { allowed: false, reasons };
  updateVersionNode({ ...node, status: 'canonical' });
  const family = getVersionFamily(node.familyId); if (family) updateVersionFamily({ ...family, canonicalVersionId: versionId });
  return { allowed: true, reasons: [] };
}
export function freezeVersion(versionId: string, reason: string) { const node = getVersionNode(versionId); if (!node) return undefined; return updateVersionNode({ ...node, status: 'frozen', metadata: { ...node.metadata, frozenReason: reason } }); }
export function quarantineVersion(versionId: string, reason: string) { const node = getVersionNode(versionId); if (!node) return undefined; return updateVersionNode({ ...node, status: 'quarantined', safetyMetadata: { ...(node.safetyMetadata ?? { requiresHumanReview: true, affectsPublicCache: false, affectsExternalActions: false, affectsHumanTransition: false, containsSensitiveData: false }), requiresHumanReview: true }, metadata: { ...node.metadata, quarantineReason: reason } }); }
export function resetVersionReviews(items: VersionReview[] = []) { reviews.clear(); items.forEach((item) => reviews.set(item.id, item)); }

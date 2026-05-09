import type { ExternalSkillDescriptor, SkillImportReview } from './types';

export function submitExternalSkill(skill: ExternalSkillDescriptor): SkillImportReview {
  return reviewExternalSkillPermissions(skill);
}

export function reviewExternalSkillPermissions(skill: ExternalSkillDescriptor): SkillImportReview {
  const reasons: string[] = [];
  const requiredActions: string[] = [];
  let status: SkillImportReview['status'] = 'mock_verified';
  if (skill.requestedPermissions.includes('access_secret')) { reasons.push('secret access is rejected by default'); requiredActions.push('remove_secret_access'); status = 'rejected'; }
  if (skill.requestedPermissions.includes('write_external') || skill.requestedPermissions.includes('write_public_cache')) { reasons.push('write permissions require quarantine and human review'); requiredActions.push('human_review', 'consent_required'); status = status === 'rejected' ? status : 'quarantined'; }
  if (skill.networkAccess === 'open_requires_approval') { reasons.push('open network skills require allowlist'); requiredActions.push('allowlist_required'); status = status === 'rejected' ? status : 'quarantined'; }
  if (skill.networkAccess === 'allowlist' && skill.allowlist.length === 0) { reasons.push('network allowlist is empty'); requiredActions.push('allowlist_required'); status = status === 'rejected' ? status : 'quarantined'; }
  const text = `${skill.name} ${skill.description} ${JSON.stringify(skill.metadata)}`.toLowerCase();
  if (/cheat|anti.?cheat|boosting|weapon|payment|mass send|外挂|刷分|代练/.test(text)) { reasons.push('high-risk or abuse skill rejected'); requiredActions.push('reject'); status = 'rejected'; }
  const safeAsMockOnly = status === 'mock_verified';
  return { skillId: skill.id, status, reasons: reasons.length ? reasons : ['skill is safe as mock-only descriptor'], requiredActions: [...new Set(requiredActions)], safeAsMockOnly };
}

export function approveExternalSkill(review: SkillImportReview): SkillImportReview {
  if (review.status === 'rejected') return review;
  return { ...review, status: 'approved', reasons: [...review.reasons, 'approved for mock-only use after review'] };
}

export function rejectExternalSkill(review: SkillImportReview, reason: string): SkillImportReview {
  return { ...review, status: 'rejected', reasons: [...review.reasons, reason], safeAsMockOnly: false };
}

import type { ResidualCard } from '../../../lib/types';
import type { ExperienceFeedback, WorldCapsule } from '../types';
import { getExperienceSession } from '../experience/experienceSession';
import { getWorldCapsule, updateWorldCapsule } from './worldCapsule';

function residualRisk(risk: WorldCapsule['riskLevel']) {
  return risk === 'critical' ? 'high' : risk;
}

export function mapWorldSceneToResidualCard(worldCapsule: WorldCapsule): ResidualCard {
  return { residualId: `res-world-${worldCapsule.id}`, sourceType: 'garbage', domain: worldCapsule.domain, task: worldCapsule.title, need: worldCapsule.description, currentC: worldCapsule.riskLevel === 'low' ? 0.72 : 0.42, currentD: worldCapsule.riskLevel === 'low' ? 0.28 : 0.58, targetD: 0.18, evidence: [`worldType:${worldCapsule.worldType}`, `license:${worldCapsule.licensePolicy.licenseType}`], candidateActions: ['提取体验事件', '生成可验证反馈', '映射到技能胶囊'], verificationMetric: 'Proof of Experience + accepted feedback', riskPrivacy: worldCapsule.privacyLevel === 'private' ? 'high' : 'low', riskSafety: residualRisk(worldCapsule.riskLevel), riskCompliance: worldCapsule.licensePolicy.licenseType === 'unknown' ? 'high' : 'low', reusable: worldCapsule.licensePolicy.licenseType !== 'restricted', status: worldCapsule.riskLevel === 'high' || worldCapsule.riskLevel === 'critical' ? 'review_required' : 'draft', publicAssetAllowed: worldCapsule.status === 'public' && worldCapsule.privacyLevel === 'public' };
}

export function routeFeedbackToResidualCard(feedback: ExperienceFeedback): ResidualCard {
  const session = getExperienceSession(feedback.sessionId);
  const capsule = session ? getWorldCapsule(session.worldCapsuleId) : undefined;
  const risk = feedback.safetyConcern ? 'high' : 'low';
  const residual: ResidualCard = { residualId: feedback.linkedResidualCardId ?? `res-feedback-${feedback.id}`, sourceType: 'garbage', domain: capsule?.domain ?? 'world_model', task: feedback.title, need: feedback.content, currentC: Math.max(0.1, 1 - (feedback.residualValue ?? 50) / 100), currentD: Math.min(0.9, (feedback.residualValue ?? 50) / 100), targetD: 0.2, evidence: [`feedback:${feedback.feedbackType}`, `evidence:${feedback.evidenceStrength ?? 0}`], candidateActions: ['转为残差卡', '请求体验证明', '沉淀技能胶囊'], verificationMetric: 'accepted feedback + proof hash', riskPrivacy: capsule?.privacyLevel === 'private' ? 'high' : 'low', riskSafety: risk, riskCompliance: capsule?.licensePolicy.licenseType === 'unknown' ? 'high' : 'low', reusable: (feedback.residualValue ?? 0) >= 55, status: feedback.safetyConcern ? 'review_required' : 'draft', publicAssetAllowed: !feedback.safetyConcern && capsule?.privacyLevel === 'public' && (feedback.evidenceStrength ?? 0) >= 70 };
  if (capsule) updateWorldCapsule({ ...capsule, linkedResidualCardIds: [...new Set([...capsule.linkedResidualCardIds, residual.residualId])] });
  return residual;
}

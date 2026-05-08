import type { ExperienceFeedback, ExperienceRewardEvent, ProofOfExperience, TesterReputation } from '../types';
import { scoreFeedbackQuality } from '../rewards/feedbackQualityScoring';
export function calculateExperienceReward(feedback: ExperienceFeedback, proof: ProofOfExperience, testerReputation: TesterReputation, durationSeconds = 0): ExperienceRewardEvent[] {
  const quality = scoreFeedbackQuality(feedback);
  const proofVerified = proof.verificationStatus === 'verified';
  const repeatBlocked = quality < 30 || testerReputation.biasFlags >= 3;
  const status: ExperienceRewardEvent['status'] = repeatBlocked || !proofVerified ? 'blocked' : feedback.safetyConcern ? 'pending' : 'released';
  const trustMultiplier = testerReputation.trustLevel === 'expert' ? 1.25 : testerReputation.trustLevel === 'trusted' ? 1.1 : 1;
  const base = Math.round(quality * trustMultiplier);
  const reason = `reward by feedback quality ${quality}, proof ${proof.verificationStatus}; duration ${durationSeconds}s is not a reward factor`;
  return [
    { id: `xreward-${feedback.id}-credit`, userId: feedback.userId, sessionId: feedback.sessionId, feedbackId: feedback.id, rewardType: 'experience_credit', amount: status === 'blocked' ? 0 : Math.max(1, base), reason, status, createdAt: new Date().toISOString() },
    { id: `xreward-${feedback.id}-rep`, userId: feedback.userId, sessionId: feedback.sessionId, feedbackId: feedback.id, rewardType: 'tester_reputation', amount: status === 'blocked' ? 0 : Math.max(1, Math.round(base / 10)), reason, status, createdAt: new Date().toISOString() }
  ];
}

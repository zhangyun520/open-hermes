import type { ExperienceFeedback, TesterReputation } from '../types';
export function generateTesterReputationUpdate(user: TesterReputation, feedbackResult: { feedback: ExperienceFeedback; accepted: boolean; domain?: string }): TesterReputation {
  const accepted = user.acceptedFeedbackCount + (feedbackResult.accepted ? 1 : 0);
  const rejected = user.rejectedFeedbackCount + (feedbackResult.accepted ? 0 : 1);
  const total = Math.max(1, accepted + rejected);
  const feedbackAccuracy = Math.round((accepted / total) * 100);
  const domain = feedbackResult.domain ?? feedbackResult.feedback.feedbackType;
  const domains = { ...user.domains, [domain]: (user.domains[domain] ?? 0) + (feedbackResult.accepted ? 5 : -2) };
  const trustLevel: TesterReputation['trustLevel'] = user.biasFlags >= 3 ? 'moderated' : accepted >= 20 && feedbackAccuracy >= 85 ? 'expert' : accepted >= 5 && feedbackAccuracy >= 70 ? 'trusted' : 'new';
  return { ...user, domains, acceptedFeedbackCount: accepted, rejectedFeedbackCount: rejected, feedbackAccuracy, trustLevel };
}
export function defaultTesterReputation(userId: string): TesterReputation { return { userId, domains: {}, feedbackAccuracy: 0, acceptedFeedbackCount: 0, rejectedFeedbackCount: 0, biasFlags: 0, trustLevel: 'new' }; }

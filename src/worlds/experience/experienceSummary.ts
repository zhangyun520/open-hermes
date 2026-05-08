import type { WorldExperienceSummary } from '../types';
import { getExperienceFeedback } from './experienceFeedback';
import { requireHumanReviewForWorldAction } from '../safety/antiCheatBoundary';
import type { ExperienceSession } from '../types';
export function generateWorldExperienceSummary(session: ExperienceSession): WorldExperienceSummary {
  const feedback = session.feedbackIds.map((id) => getExperienceFeedback(id)).filter(Boolean);
  const keyEvents = session.events.filter((event) => ['failure', 'success', 'confusion', 'safety_flag', 'residual_found'].includes(event.eventType)).map((event) => event.summary);
  return { sessionId: session.id, title: `体验总结：${session.worldCapsuleId}`, durationSeconds: session.durationSeconds ?? 0, keyEvents, feedbackCount: feedback.length, proofStatus: session.proofStatus, residualOpportunities: session.events.filter((event) => event.eventType === 'residual_found').map((event) => event.summary), requiresHumanReview: session.events.some((event) => event.eventType === 'safety_flag') || requireHumanReviewForWorldAction({ actionType: session.mode, summary: keyEvents.join(' ') }) };
}

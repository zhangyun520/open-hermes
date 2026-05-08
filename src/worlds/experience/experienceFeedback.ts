import type { ExperienceFeedback } from '../types';
import { getExperienceSession, updateExperienceSession } from './experienceSession';
const feedbacks = new Map<string, ExperienceFeedback>();
const nowIso = () => new Date().toISOString();
let counter = 0;
const nextId = () => `xf-${++counter}-${Date.now().toString(36)}`;
export function submitExperienceFeedback(sessionId: string, feedback: Omit<ExperienceFeedback, 'id' | 'sessionId' | 'userId' | 'status' | 'createdAt'> & Partial<Pick<ExperienceFeedback, 'id' | 'status' | 'createdAt'>>): ExperienceFeedback {
  const session = getExperienceSession(sessionId); if (!session) throw new Error(`ExperienceSession not found: ${sessionId}`);
  const saved: ExperienceFeedback = { ...feedback, id: feedback.id ?? nextId(), sessionId, userId: session.userId, status: feedback.status ?? 'submitted', createdAt: feedback.createdAt ?? nowIso() };
  feedbacks.set(saved.id, saved); updateExperienceSession({ ...session, feedbackIds: [...new Set([...session.feedbackIds, saved.id])] }); return saved;
}
export function getExperienceFeedback(id: string) { return feedbacks.get(id); }
export function listExperienceFeedback() { return Array.from(feedbacks.values()); }
export function updateExperienceFeedback(feedback: ExperienceFeedback) { feedbacks.set(feedback.id, feedback); return feedback; }
export function resetExperienceFeedback(items: ExperienceFeedback[] = []) { feedbacks.clear(); items.forEach((item) => feedbacks.set(item.id, item)); }

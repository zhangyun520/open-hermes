import type { ExperienceFeedback } from '../types';
export function scoreFeedbackQuality(feedback: ExperienceFeedback): number {
  const safetySignalBonus = feedback.safetyConcern ? 100 : 0;
  const raw = (feedback.residualValue ?? 0) * 0.35 + (feedback.evidenceStrength ?? 0) * 0.25 + (feedback.clarityScore ?? 0) * 0.15 + (feedback.usefulnessScore ?? 0) * 0.15 + safetySignalBonus * 0.10;
  const lowQualityRepeat = /重复|spam|刷|无意义|asdf/i.test(`${feedback.title} ${feedback.content}`) || `${feedback.content}`.trim().length < 12;
  return lowQualityRepeat ? Math.min(25, raw) : Math.round(raw);
}

import type { ExperienceFeedback, WorldModelExperienceUpdate } from '../types';
import { guardRealWorldUpdate } from '../safety/realWorldImpactGuard';
export function updateWorldModelFromExperience(feedback: ExperienceFeedback): WorldModelExperienceUpdate {
  const guard = guardRealWorldUpdate(feedback);
  return { id: `world-model-update-${feedback.id}`, feedbackId: feedback.id, updateSummary: feedback.suggestedWorldModelUpdate ?? `体验反馈提示世界模型误差：${feedback.title}`, assumptions: guard.assumptions, confidence: guard.confidence, requiresHumanReview: guard.requiresHumanReview, createdAt: new Date().toISOString() };
}

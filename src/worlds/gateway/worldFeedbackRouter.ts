import type { ExperienceFeedback } from '../types';
import { routeFeedbackToResidualCard } from '../scenes/residualSceneMapper';
import { updateWorldModelFromExperience } from './worldModelBridge';
export function routeWorldFeedback(feedback: ExperienceFeedback) { return { residualCard: routeFeedbackToResidualCard(feedback), worldModelUpdate: feedback.feedbackType === 'world_model_error' || feedback.suggestedWorldModelUpdate ? updateWorldModelFromExperience(feedback) : undefined, route: feedback.safetyConcern ? 'safety_review' : feedback.residualValue && feedback.residualValue > 60 ? 'assetize_residual' : 'feedback_pool' }; }

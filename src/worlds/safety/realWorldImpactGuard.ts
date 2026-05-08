import type { ExperienceFeedback, WorldModelExperienceUpdate } from '../types';
export function highRiskRealWorldDomain(text: string): boolean { return /金融|医疗|法律|军事|工业安全|未成年人|weapon|target|war|medical|legal|financial|military/i.test(text); }
export function guardRealWorldUpdate(feedback: ExperienceFeedback): Pick<WorldModelExperienceUpdate, 'requiresHumanReview' | 'assumptions' | 'confidence'> {
  const text = `${feedback.title} ${feedback.content} ${feedback.suggestedWorldModelUpdate ?? ''}`;
  return { requiresHumanReview: feedback.safetyConcern === true || highRiskRealWorldDomain(text), assumptions: ['虚拟体验反馈不能直接等同真实世界结论', '需要外部证据或人工审核才能进入真实决策'], confidence: Math.min(0.72, ((feedback.evidenceStrength ?? 40) + (feedback.clarityScore ?? 40)) / 200) };
}

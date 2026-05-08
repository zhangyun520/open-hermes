import type { ExperienceFeedback } from '@/src/worlds/types';
import { Card } from '@/components/UI';
import { scoreFeedbackQuality } from '@/src/worlds';
export function ExperienceFeedbackCard({ feedback }: { feedback: ExperienceFeedback }) { return <Card><p className="text-tide">{feedback.feedbackType} · {feedback.status}</p><h3 className="mt-2 text-xl font-semibold">{feedback.title}</h3><p className="mt-2 text-white/60">{feedback.content}</p><p className="mt-3 text-plankton">质量分：{scoreFeedbackQuality(feedback)}</p>{feedback.safetyConcern ? <p className="mt-2 text-coral">安全反馈：需要审核后奖励</p> : null}</Card>; }

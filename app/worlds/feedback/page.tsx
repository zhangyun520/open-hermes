import { PageTitle } from '@/components/UI';
import { ExperienceFeedbackCard } from '@/components/worlds/ExperienceFeedbackCard';
import { listExperienceFeedback } from '@/src/worlds';
import '@/src/worlds/mockData';
export default function WorldFeedbackPage() { const feedback = listExperienceFeedback(); return <div><PageTitle eyebrow="Experience Feedback" title="体验反馈池">反馈不是评论；高价值、安全、沉浸感、世界模型错误与可资产化反馈会回流残差卡和技能池。</PageTitle><section className="grid gap-4 md:grid-cols-2">{feedback.map((item) => <ExperienceFeedbackCard key={item.id} feedback={item} />)}</section></div>; }

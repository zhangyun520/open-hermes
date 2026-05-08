import { Card, Metric, PageTitle } from '@/components/UI';
import '@/src/ecosystem/mockData';
import { listCommunityLibrary } from '@/src/ecosystem/commons/communityLibrary';

export default function CommunityLibraryPage() {
  const objects = listCommunityLibrary();
  const candidates = objects.filter((object) => object.status.includes('candidate'));
  return <div><PageTitle eyebrow="Community Library" title="社区库">社区库展示候选技能、待审核共享对象、热门残差、冷门待救助残差和高价值反向愿望匹配。</PageTitle><section className="grid gap-4 md:grid-cols-2">{objects.map((object) => <Card key={object.id}><p className="text-tide">{object.domain} · {object.status}</p><h2 className="text-2xl font-semibold">{object.title}</h2><p className="mt-3 text-sm text-white/62">贡献链：{object.contributors.join(' / ')} · 风险 {object.riskLevel} · 隐私 {object.privacyLevel}</p><div className="mt-4 grid grid-cols-3 gap-3"><Metric label="使用" value={object.usageCount} /><Metric label="审核分" value={object.reviewScore} /><Metric label="安全分" value={object.safetyScore} /></div></Card>)}</section><Card className="mt-6"><h2 className="text-2xl font-semibold">待审核共享对象</h2><p className="mt-2 text-white/62">{candidates.length} 个候选对象等待社区审核；冷门残差救助计划将优先分配审核与补贴。</p></Card></div>;
}

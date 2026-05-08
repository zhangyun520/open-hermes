import Link from 'next/link';
import { Card, Metric, PageTitle } from '@/components/UI';
import '@/src/ecosystem/mockData';
import { getEcosystemOverview } from '@/src/ecosystem/federation/ecosystemGateway';
import { monitorBiasImmuneSystem } from '@/src/ecosystem/safety/biasImmuneMonitor';
import { listCacheObjects } from '@/src/ecosystem/sharedCache/cacheObjectRegistry';
import { sampleRewards } from '@/src/ecosystem/mockData';

export default function EcosystemPage() {
  const overview = getEcosystemOverview();
  const alerts = monitorBiasImmuneSystem(listCacheObjects(), sampleRewards);
  return <div><PageTitle eyebrow="Ecosystem Gateway" title="生态连接层">连接用户、团队、组织、工具、技能、缓存、贡献账本和公共知识资产；原始数据默认私有，公共共享只允许脱敏、验证、结构化后的经验。</PageTitle><section className="grid gap-4 md:grid-cols-4"><Metric label="缓存对象" value={overview.totalCacheObjects} /><Metric label="公共技能" value={overview.publicSkillCount} /><Metric label="今日命中" value={overview.todayCacheHits} /><Metric label="节省成本 mock" value={`$${overview.estimatedSavedCost.toFixed(2)}`} /><Metric label="待审核共享" value={overview.pendingSharedObjects} /><Metric label="隔离对象" value={overview.quarantinedObjects} /><Metric label="组织/团队" value={overview.activeOrganizations} /><Metric label="偏见报警" value={alerts.length} /></section><section className="mt-6 grid gap-4 md:grid-cols-3"><Link href="/ecosystem/public-skill-commons"><Card><h2 className="text-2xl font-semibold">公共技能公地</h2><p className="mt-3 text-white/62">查看可复用公共技能、贡献链、命中次数与风险等级。</p></Card></Link><Link href="/ecosystem/team-knowledge-pool"><Card><h2 className="text-2xl font-semibold">团队知识池</h2><p className="mt-3 text-white/62">团队内共享技能和晋升到社区候选。</p></Card></Link><Link href="/ecosystem/community-library"><Card><h2 className="text-2xl font-semibold">社区库</h2><p className="mt-3 text-white/62">社区候选、待审核共享对象、热门/冷门残差。</p></Card></Link></section>{alerts.length ? <Card className="mt-6"><h2 className="text-2xl font-semibold text-coral">生态免疫报警</h2>{alerts.map((alert) => <p key={alert.message} className="mt-3 text-white/70">{alert.message} · {alert.evidence.join(' / ')}</p>)}</Card> : null}</div>;
}

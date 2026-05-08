import { Card, Metric, PageTitle } from '@/components/UI';
import '@/src/ecosystem/mockData';
import { listPublicSkills } from '@/src/ecosystem/commons/publicSkillCommons';

export default function PublicSkillCommonsPage() {
  const skills = listPublicSkills();
  return <div><PageTitle eyebrow="Public Skill Commons" title="公共技能公地">公共技能像水母神经网里的亮点：只展示脱敏、验证、结构化后的经验，不展示原始隐私数据。</PageTitle><section className="grid gap-4 md:grid-cols-2">{skills.map((skill) => <Card key={skill.id}><p className="text-tide">{skill.domain} · {skill.version} · {skill.riskLevel} risk</p><h2 className="text-2xl font-semibold">{skill.title}</h2><div className="mt-4 grid grid-cols-3 gap-3"><Metric label="命中" value={skill.cacheHitCount} /><Metric label="节省 mock" value={`$${(skill.cacheHitCount * 0.18).toFixed(2)}`} /><Metric label="质量" value={skill.qualityScore} /></div><p className="mt-4 text-sm text-white/62">来源贡献链：{skill.contributors.join(' → ')} · Notary {skill.provenance.ideaNotaryHash}</p><div className="mt-5 flex gap-2"><button className="rounded-xl bg-tide/20 px-4 py-2 text-tide">申请使用</button><button className="rounded-xl bg-coral/20 px-4 py-2 text-coral">报告问题</button><button className="rounded-xl bg-white/10 px-4 py-2 text-white/70">请求改进</button></div></Card>)}</section></div>;
}

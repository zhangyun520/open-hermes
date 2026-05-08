import { Card, Metric, PageTitle } from '@/components/UI';
import { skills } from '@/lib/mock';
import { routeModelTask } from '@/src/integrations/gateway/modelGateway';

export default function SkillMemoryPool() {
  const cacheDecision = routeModelTask({ taskId: 'skill-hit-preview', userId: 'demo', modelIntent: 'cheap_batch', messages: [{ role: 'user', content: '技能调用' }], privacyLevel: 'low', requiresCaching: true, metadata: { forceCacheHit: true, skillId: 's1' } });
  return (
    <div>
      <PageTitle eyebrow="Skill Memory Pool" title="超级缓存池 / 技能池">
        灵感不是灵感，是智能体进化的种子。技能胶囊记录版本、命中、缓存命中、验证压缩、贡献者和失败案例。
      </PageTitle>
      <p className="mb-4 rounded-2xl border border-plankton/20 bg-plankton/10 p-4 text-sm text-plankton">Integration Gateway：技能调用先查缓存；当前预览 {cacheDecision.cacheHit ? '命中缓存，不调用 provider' : `路由到 ${cacheDecision.providerId}`}。</p>
      <section className="grid gap-4 md:grid-cols-2">
        {skills.map((skill) => (
          <Card key={skill.skillId}>
            <p className="text-tide">{skill.domain} · v{skill.version}</p>
            <h3 className="text-2xl font-semibold">{skill.name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Metric label="等级" value={skill.level} />
              <Metric label="调用" value={skill.usageCount} />
              <Metric label="缓存命中" value={skill.cacheHitCount} />
              <Metric label="验证压缩" value={skill.verifiedCompressionCount} />
            </div>
            <p className="mt-4 text-white/65">流程：{skill.workflow.join(' → ')}</p>
            <p className="mt-2 text-white/55">贡献者：{skill.contributors.join(' / ')}</p>
            <p className="mt-2 text-coral/80">失败案例：{skill.failureCases.join('；')}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}

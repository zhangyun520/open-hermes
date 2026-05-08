import { Card, PageTitle } from '@/components/UI';
import { JellyAgentDiagram } from '@/components/jelly/JellyAgentDiagram';
import { JellyDigestFlow } from '@/components/jelly/JellyDigestFlow';
import { JellyOrganGrid } from '@/components/jelly/JellyOrganGrid';
import { JellyPulseIndicator } from '@/components/jelly/JellyPulseIndicator';
import { createGlowEvent, mockJellyOrgans, mockJellySignals, processJellySignal } from '@/src/jelly';

export default function JellyArchitecturePage() {
  const safetySignal = mockJellySignals.find((signal) => signal.type === 'safety_risk') ?? mockJellySignals[0];
  const processResult = processJellySignal(safetySignal);
  const glowEvents = [createGlowEvent(mockJellySignals[3]), createGlowEvent(mockJellySignals[5]), processResult.glowEvent];
  return <div>
    <PageTitle eyebrow="Jelly Agent Architecture" title="水母智能体架构">水母不是我们的 mascot。水母就是我们的 agent architecture。认知水母通过分布式神经网、触手连接、刺胞安全门、残差消化器、微光反馈和生命周期演化，把人类愿望、失败和经验转化为可复用智能。</PageTitle>
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"><JellyAgentDiagram /><Card><h2 className="text-2xl font-semibold">Safety Section / 刺胞安全门</h2><p className="mt-3 text-white/65">隐私、侵权、作弊、高风险自动化、D_human 风险会触发阻断或人工审核。</p><p className="mt-4 text-coral/80">当前 mock：{processResult.safetyDecision.allowed ? 'allowed' : 'blocked'} · {processResult.safetyDecision.requiredActions.join(' / ') || 'no action'}</p><p className="mt-3 text-sm text-white/50">{processResult.auditRecord.explanation}</p></Card></section>
    <section className="mt-6"><h2 className="mb-4 text-3xl font-semibold">Jelly Organs / 水母器官</h2><JellyOrganGrid organs={mockJellyOrgans} /></section>
    <section className="mt-6"><h2 className="mb-4 text-3xl font-semibold">Digest Flow / 残差消化流</h2><JellyDigestFlow /></section>
    <section className="mt-6 grid gap-4 md:grid-cols-3"><Card><h2 className="text-2xl font-semibold">Glow Section / 微光反馈</h2><p className="mt-2 text-white/60">残差被看见、技能被命中、缓存被复用、贡献被记录时，水母发光。</p></Card>{glowEvents.map((event) => <JellyPulseIndicator key={event.id} event={event} />)}</section>
  </div>;
}

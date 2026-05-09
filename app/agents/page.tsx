import { PageTitle } from '@/components/UI';
import { AgentRunTimeline } from '@/components/agents/AgentRunTimeline';
import { PersonalAgentCard } from '@/components/agents/PersonalAgentCard';
import { TentacleManifestCard } from '@/components/agents/TentacleManifestCard';
import { mockPersonalAgent, mockTentacles, runPersonalAgentTask } from '@/src/agents';

export default function AgentsPage() {
  const run = runPersonalAgentTask({ taskId: 'mock-agent-task', agent: mockPersonalAgent, tentacle: mockTentacles[0], summary: 'Mock local repo residual scan', privacyLevel: 'private', riskLevel: 'low', metadata: {} });
  return <div><PageTitle eyebrow="Personal Agent" title="Personal Agent / 个人水母 Agent">联网触手从 dry-run、准入门、安全门、隐私膜、审计和残差消化开始；本页不执行真实联网或外部写入。</PageTitle><PersonalAgentCard agent={mockPersonalAgent} /><section className="mt-6 grid gap-4 md:grid-cols-2">{mockTentacles.map((tentacle) => <TentacleManifestCard key={tentacle.id} tentacle={tentacle} />)}</section><section className="mt-6"><AgentRunTimeline run={run} /></section></div>;
}

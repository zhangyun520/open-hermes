import { PageTitle } from '@/components/UI';
import { TentacleManifestCard } from '@/components/agents/TentacleManifestCard';
import { mockTentacles } from '@/src/agents';

export default function AgentTentaclesPage() {
  return <div><PageTitle eyebrow="Tentacle Manifests" title="Tentacle Manifests / 触手清单">每条触手必须声明权限、联网范围、隐私边界、审批要求和审计要求。</PageTitle><section className="grid gap-4 md:grid-cols-2">{mockTentacles.map((tentacle) => <TentacleManifestCard key={tentacle.id} tentacle={tentacle} />)}</section></div>;
}

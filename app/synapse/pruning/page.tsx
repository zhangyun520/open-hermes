import { PageTitle } from '@/components/UI';
import { SynapticPruningPanel } from '@/components/synapse/SynapticPruningPanel';
import { mockPruningDecisions } from '@/src/synapse';

export default function SynapticPruningPage() {
  return (
    <div>
      <PageTitle eyebrow="Residual Synaptic Pruning" title="Residual Synaptic Pruning / 微光剪枝">
        突触会生长，也必须剪枝。Keep、Merge、Downgrade、Dormant、Compost、Quarantine、Forget 让系统不会无限膨胀成垃圾山。
      </PageTitle>
      <SynapticPruningPanel decisions={mockPruningDecisions} />
    </div>
  );
}

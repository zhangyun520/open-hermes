import { Card, PageTitle } from '@/components/UI';
import { SynapseCapsuleCard } from '@/components/synapse/SynapseCapsuleCard';
import { SynapseFoundryFlow } from '@/components/synapse/SynapseFoundryFlow';
import { assignCandidateToNode, createTrainingCandidate, mockDistributedTrainingNodes, mockNeuralFertilizers, mockSynapseCapsules } from '@/src/synapse';

export default function FoundryPage() {
  const fertilizer = mockNeuralFertilizers.find((item) => item.grade === 'F4_TRAINING_CANDIDATE') ?? mockNeuralFertilizers[0];
  const candidate = createTrainingCandidate(fertilizer, ['lora', 'evaluation']);
  const node = assignCandidateToNode(candidate, mockDistributedTrainingNodes);
  return <div><PageTitle eyebrow="Synapse Foundry" title="Synapse Foundry / 突触铸造厂">Mock-only 铸造流：候选肥料分配到合适节点，生成突触胶囊，再经过评测和安全检查。</PageTitle><SynapseFoundryFlow /><section className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><Card><h2 className="text-2xl font-semibold">Assignment</h2><p className="mt-3 text-white/65">candidate: {candidate.id}</p><p className="mt-2 text-plankton/80">assigned node: {node?.name ?? 'none'}</p><p className="mt-2 text-sm text-white/50">training method: mock LoRA / evaluation queue. No real training is executed.</p></Card><div className="grid gap-4 md:grid-cols-2">{mockSynapseCapsules.map((capsule) => <SynapseCapsuleCard key={capsule.id} capsule={capsule} />)}</div></section></div>;
}

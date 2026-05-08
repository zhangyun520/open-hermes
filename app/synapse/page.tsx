import { Card, PageTitle } from '@/components/UI';
import { DistributedNodePanel } from '@/components/synapse/DistributedNodePanel';
import { FertilizerGradeBadge } from '@/components/synapse/FertilizerGradeBadge';
import { ModularModelMeshDiagram } from '@/components/synapse/ModularModelMeshDiagram';
import { SynapseFoundryFlow } from '@/components/synapse/SynapseFoundryFlow';
import { mockDistributedTrainingNodes, mockNeuralFertilizers } from '@/src/synapse';

export default function SynapsePage() {
  return <div><PageTitle eyebrow="NFAP · Nebula Synapse Network" title="Nebula Synapse Network / 星云突触网络">不是所有残差都能成为神经肥料。只有最好的腐殖质，才配长成新的突触。本页是协议、mock 流程和可视化，不执行真实训练；微光剪枝负责防止突触网络长成垃圾山。</PageTitle><section className="grid gap-4 lg:grid-cols-2"><Card><h2 className="text-2xl font-semibold">Neural Fertilizer Admission Protocol</h2><p className="mt-3 text-white/65">Only verified, redacted, structured, authorized, and reproducible residuals may enter training candidate pools.</p><div className="mt-4 flex flex-wrap gap-2">{mockNeuralFertilizers.map((fertilizer) => <FertilizerGradeBadge key={fertilizer.id} grade={fertilizer.grade} />)}</div></Card><Card><h2 className="text-2xl font-semibold">From residual to synapse</h2><p className="mt-3 text-white/65">Residual cards pass fertilizer gates before mock candidates become evaluated synapse capsules and attachable model blocks.</p></Card></section><section className="mt-6"><SynapseFoundryFlow /></section><section className="mt-6"><h2 className="mb-4 text-3xl font-semibold">Distributed Nodes / 分布式节点</h2><DistributedNodePanel nodes={mockDistributedTrainingNodes} /></section><section className="mt-6"><h2 className="mb-4 text-3xl font-semibold">Modular Model Mesh / 积木模型网</h2><ModularModelMeshDiagram /></section></div>;
}

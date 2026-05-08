import { Card, PageTitle } from '@/components/UI';
import { ModularModelMeshDiagram } from '@/components/synapse/ModularModelMeshDiagram';
import { canAttachModelBlock, mockModelBlocks } from '@/src/synapse';

export default function MeshPage() {
  return <div><PageTitle eyebrow="Modular Model Mesh" title="Modular Model Mesh / 积木模型网">Base Core + Skill Blocks + Residual Blocks + Router Blocks + Evaluation Blocks + Memory Blocks + Safety Blocks + Domain Blocks.</PageTitle><ModularModelMeshDiagram /><section className="mt-6 grid gap-4 md:grid-cols-2">{mockModelBlocks.map((block) => { const attach = canAttachModelBlock(block); return <Card key={block.id}><p className="text-xs uppercase tracking-[0.25em] text-tide/70">{block.type}</p><h2 className="mt-2 text-xl font-semibold">{block.title}</h2><p className="mt-2 text-sm text-white/60">{block.capability}</p><p className="mt-3 text-sm text-plankton/75">attach: {attach.allowed ? 'allowed' : 'blocked'} · {attach.reason}</p></Card>; })}</section></div>;
}

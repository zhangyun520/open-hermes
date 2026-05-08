import { notFound } from 'next/navigation';
import { PageTitle } from '@/components/UI';
import { VersionLineageGraph } from '@/components/polyphony/VersionLineageGraph';
import { generateVersionLineage } from '@/src/polyphony';
export default function LineagePage({ params }: { params: { id: string } }) { let lineage; try { lineage = generateVersionLineage(params.id); } catch { notFound(); } return <div><PageTitle eyebrow="Version Lineage" title="版本血缘图">DAG 不是一条直线：父节点、子节点、祖先、后代和对位关系共同构成复调谱面。</PageTitle><VersionLineageGraph lineage={lineage} /></div>; }

import { Card } from '@/components/UI';
import type { DistributedTrainingNode } from '@/src/synapse';

export function DistributedNodePanel({ nodes }: { nodes: DistributedTrainingNode[] }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{nodes.map((node) => <Card key={node.id}><p className="text-xs uppercase tracking-[0.25em] text-tide/70">{node.type} node</p><h3 className="mt-2 text-lg font-semibold">{node.name}</h3><p className="mt-2 text-sm text-white/60">{node.computeProfile.device} · {node.privacyBoundary}</p><p className="mt-2 text-xs text-plankton/75">{node.status}</p></Card>)}</div>;
}

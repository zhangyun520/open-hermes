import type { VersionLineage } from '@/src/polyphony/types';
import { VersionNodeCard } from './VersionNodeCard';
export function VersionLineageGraph({ lineage }: { lineage: VersionLineage }) {
  return <div className="grid gap-4 md:grid-cols-3"><div><h3 className="mb-3 text-lg font-semibold">祖先</h3>{lineage.ancestors.map((node) => <VersionNodeCard key={node.id} node={node} />)}</div><div><h3 className="mb-3 text-lg font-semibold text-plankton">当前节点</h3><VersionNodeCard node={lineage.version} /></div><div><h3 className="mb-3 text-lg font-semibold">后代</h3>{lineage.descendants.map((node) => <VersionNodeCard key={node.id} node={node} />)}</div></div>;
}

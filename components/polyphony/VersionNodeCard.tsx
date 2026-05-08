import Link from 'next/link';
import type { VersionNode } from '@/src/polyphony/types';
import { shouldRequireHumanReview } from '@/src/polyphony/fitness';
import { VersionRiskBadge } from './VersionRiskBadge';
import { VersionStatusBadge } from './VersionStatusBadge';
export function VersionNodeCard({ node }: { node: VersionNode }) {
  return <Link href={`/polyphony/version/${node.id}`} className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-plankton/40 hover:bg-plankton/10">
    <div className="flex flex-wrap gap-2"><VersionStatusBadge status={node.status} /><VersionRiskBadge risk={node.riskLevel} />{shouldRequireHumanReview(node) ? <span className="rounded-full border border-coral/30 bg-coral/10 px-3 py-1 text-xs text-coral">human review</span> : null}</div>
    <h3 className="mt-3 text-lg font-semibold">{node.title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{node.summary}</p>
    <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/55"><span>安全 {node.safetyScore ?? '—'}</span><span>压缩 {node.compressionScore ?? '—'}</span><span>命中 {node.costProfile?.cacheHitRate ? `${Math.round(node.costProfile.cacheHitRate * 100)}%` : '—'}</span></div>
  </Link>;
}

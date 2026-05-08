import { Card } from '@/components/UI';
import type { TrainingCandidate } from '@/src/synapse';

export function TrainingCandidateCard({ candidate }: { candidate: TrainingCandidate }) {
  return <Card><div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.3em] text-tide/70">Training Candidate</p><h3 className="mt-2 text-xl font-semibold">{candidate.id}</h3></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{candidate.status}</span></div><p className="mt-3 text-sm text-white/60">fertilizer: {candidate.fertilizerId}</p><p className="mt-2 text-sm text-white/60">synapses: {candidate.targetSynapseTypes.join(' / ')}</p><p className="mt-2 text-sm text-white/60">nodes: {candidate.requiredNodeTypes.join(' / ')}</p><p className="mt-2 text-sm text-plankton/80">priority: {candidate.priority}</p></Card>;
}

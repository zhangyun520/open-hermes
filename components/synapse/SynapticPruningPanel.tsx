import { Card } from '@/components/UI';
import type { PruningDecision } from '@/src/synapse';

const actionStyle: Record<PruningDecision['action'], string> = {
  keep: 'text-plankton border-plankton/30 bg-plankton/10',
  merge: 'text-cyan-100 border-cyan-200/30 bg-cyan-200/10',
  downgrade: 'text-amber-100 border-amber-200/30 bg-amber-200/10',
  dormant: 'text-violet-100 border-violet-200/30 bg-violet-200/10',
  compost: 'text-emerald-100 border-emerald-200/30 bg-emerald-200/10',
  quarantine: 'text-coral border-coral/40 bg-coral/10',
  forget: 'text-white/80 border-white/20 bg-white/10'
};

export function SynapticPruningPanel({ decisions }: { decisions: PruningDecision[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {decisions.map((decision) => (
        <Card key={decision.targetId}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-tide/70">{decision.targetType}</p>
              <h3 className="mt-2 text-lg font-semibold">{decision.targetId}</h3>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs ${actionStyle[decision.action]}`}>{decision.action}</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            {decision.reasons.map((reason) => <li key={reason}>• {reason}</li>)}
          </ul>
          <p className="mt-3 text-xs text-white/45">human review: {decision.requiresHumanReview ? 'required' : 'not required'}</p>
        </Card>
      ))}
    </div>
  );
}

import { Card } from '@/components/UI';
import type { SynapseCapsule } from '@/src/synapse';

export function SynapseCapsuleCard({ capsule }: { capsule: SynapseCapsule }) {
  return <Card><p className="text-xs uppercase tracking-[0.3em] text-violet-200/70">{capsule.type} synapse</p><h3 className="mt-2 text-xl font-semibold">{capsule.title}</h3><p className="mt-2 text-sm text-white/60">method: {capsule.trainingMethod}</p><p className="mt-2 text-sm text-white/60">capability: {capsule.capability}</p><p className="mt-3 text-sm text-plankton/80">benchmark: {capsule.evaluation.benchmarkName} · {capsule.evaluation.passed ? 'passed' : 'pending'}</p><p className="mt-2 text-xs text-white/45">risk: privacy {capsule.risk.privacy}, bias {capsule.risk.bias}, forgetting {capsule.risk.forgetting}</p></Card>;
}

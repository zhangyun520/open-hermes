import type { TentacleAdmissionDecision } from '@/src/agents';

export function TentacleAdmissionBadge({ decision }: { decision: TentacleAdmissionDecision }) {
  const className = decision.allowed ? 'border-plankton/40 bg-plankton/10 text-plankton' : 'border-coral/40 bg-coral/10 text-coral';
  return <span className={`rounded-full border px-3 py-1 text-xs ${className}`}>{decision.allowed ? 'allowed' : 'blocked'} · {decision.riskLevel}</span>;
}

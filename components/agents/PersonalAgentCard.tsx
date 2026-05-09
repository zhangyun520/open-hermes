import { Card } from '@/components/UI';
import type { PersonalAgent } from '@/src/agents';

export function PersonalAgentCard({ agent }: { agent: PersonalAgent }) {
  return <Card><p className="text-xs uppercase tracking-[0.3em] text-tide/70">Personal Agent</p><h2 className="mt-2 text-2xl font-semibold">{agent.name}</h2><p className="mt-3 text-white/65">{agent.description}</p><p className="mt-3 text-sm text-plankton/80">boundary: {agent.privacyBoundary} · mode: {agent.defaultRunMode}</p></Card>;
}

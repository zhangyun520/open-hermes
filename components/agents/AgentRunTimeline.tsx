import { Card } from '@/components/UI';
import type { AgentRunResult } from '@/src/agents';

export function AgentRunTimeline({ run }: { run: AgentRunResult }) {
  return <Card><h3 className="text-xl font-semibold">Plan-first Run Timeline</h3><div className="mt-4 grid gap-2 md:grid-cols-5">{run.phases.map((phase, index) => <div key={`${phase}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center text-xs text-white/70">{index + 1}. {phase}</div>)}</div><p className="mt-4 text-sm text-white/55">{run.auditSummary}</p></Card>;
}

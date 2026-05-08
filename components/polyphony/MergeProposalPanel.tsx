import type { MergeProposal } from '@/src/polyphony/types';
import { Card } from '@/components/UI';
export function MergeProposalPanel({ proposal }: { proposal: MergeProposal }) {
  return <Card><p className="text-xs uppercase tracking-[0.25em] text-tide/70">Merge Proposal</p><h2 className="mt-2 text-2xl font-semibold">{proposal.proposedTitle}</h2><p className="mt-3 text-white/65">{proposal.proposedSummary}</p><div className="mt-4 grid gap-3 md:grid-cols-3"><p>来源：{proposal.sourceVersionIds.join(' / ')}</p><p>状态：{proposal.status}</p><p>审核：{proposal.reviewerIds.join(' / ') || '待分配'}</p></div><p className="mt-4 text-coral/80">冲突：{proposal.conflictSummary}</p><p className="mt-2 text-plankton/80">方案：{proposal.resolutionPlan}</p><p className="mt-2 text-white/55">风险：{proposal.riskAssessment}</p></Card>;
}

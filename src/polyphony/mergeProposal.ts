import type { MergeProposal, VersionNode } from './types';
import { nextId, nowIso } from './versionFamily';
import { createVersionNode, getVersionNode, stableHash } from './versionNode';
import { getVoiceTrack } from './voiceTrack';
import { compareVersions } from './conflictDetection';
const proposals = new Map<string, MergeProposal>();
export function proposeMerge(sourceVersionIds: string[], targetVoiceTrackId: string | undefined, resolutionPlan: string, options: Partial<Pick<MergeProposal, 'proposedTitle' | 'proposedSummary' | 'proposedBy' | 'reviewerIds' | 'status'>> = {}): MergeProposal {
  if (sourceVersionIds.length === 0) throw new Error('MergeProposal requires sourceVersionIds');
  const sources = sourceVersionIds.map((id) => { const node = getVersionNode(id); if (!node) throw new Error(`VersionNode not found: ${id}`); return node; });
  const familyId = sources[0].familyId;
  if (sources.some((source) => source.familyId !== familyId)) throw new Error('MergeProposal sources must share a family');
  const pairDiff = sources.length > 1 ? compareVersions(sources[0].id, sources[1].id) : undefined;
  const proposal: MergeProposal = { id: nextId('mp'), familyId, sourceVersionIds, targetVoiceTrackId, proposedTitle: options.proposedTitle ?? `合流：${sources.map((source) => source.title).join(' + ')}`, proposedSummary: options.proposedSummary ?? '保留原版本并生成新的合流节点，不覆盖任何声部。', conflictSummary: pairDiff?.conflicts.join('；') || '暂无显式冲突', resolutionPlan, riskAssessment: sources.some((source) => source.riskLevel === 'high' || source.riskLevel === 'critical') ? '包含高风险来源，必须人工审核' : '风险可控，仍需审核', proposedBy: options.proposedBy ?? 'system', reviewerIds: options.reviewerIds ?? [], status: options.status ?? 'draft', createdAt: nowIso(), updatedAt: nowIso() };
  proposals.set(proposal.id, proposal); return proposal;
}
export function mergeProposalToVersion(proposalId: string): VersionNode {
  const proposal = proposals.get(proposalId); if (!proposal) throw new Error(`MergeProposal not found: ${proposalId}`);
  if (!proposal.targetVoiceTrackId) throw new Error('MergeProposal requires targetVoiceTrackId before merge');
  const targetTrack = getVoiceTrack(proposal.targetVoiceTrackId); if (!targetTrack) throw new Error('target voice track not found');
  const sources = proposal.sourceVersionIds.map((id) => getVersionNode(id)).filter((node): node is VersionNode => Boolean(node));
  const merged = createVersionNode({ familyId: proposal.familyId, voiceTrackId: proposal.targetVoiceTrackId, parentVersionIds: proposal.sourceVersionIds, title: proposal.proposedTitle, summary: proposal.proposedSummary, contentRef: `merge://${proposal.id}`, authorIds: [proposal.proposedBy, ...proposal.reviewerIds], status: 'merge_candidate', riskLevel: sources.some((source) => source.riskLevel === 'high' || source.riskLevel === 'critical') ? 'high' : 'medium', privacyLevel: sources.some((source) => source.privacyLevel === 'private') ? 'private' : 'team', validationScore: 70, compressionScore: Math.round(sources.reduce((sum, source) => sum + (source.compressionScore ?? 0), 0) / Math.max(1, sources.length)), safetyScore: Math.min(...sources.map((source) => source.safetyScore ?? 70)), metadata: { mergeProposalId: proposal.id, sourceHashes: sources.map((source) => stableHash(source.contentHash)) } });
  proposals.set(proposal.id, { ...proposal, status: 'merged', updatedAt: nowIso() }); return merged;
}
export function getMergeProposal(id: string) { return proposals.get(id); }
export function listMergeProposals(familyId?: string) { return Array.from(proposals.values()).filter((proposal) => !familyId || proposal.familyId === familyId); }
export function resetMergeProposals(items: MergeProposal[] = []) { proposals.clear(); items.forEach((item) => proposals.set(item.id, item)); }

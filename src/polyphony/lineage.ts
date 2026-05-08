import type { ActivePolyphony, PolyphonySummary, VersionLineage, VersionNode } from './types';
import { getVersionFamily } from './versionFamily';
import { listVoiceTracks } from './voiceTrack';
import { getVersionNode, listVersionNodes } from './versionNode';
import { listCounterpointRelations } from './counterpoint';
import { listMergeProposals } from './mergeProposal';
const activeStatuses = new Set(['draft', 'active', 'experimental', 'reviewing', 'merge_candidate', 'canonical']);
function walk(startIds: string[], direction: 'parents' | 'children'): VersionNode[] { const seen = new Set<string>(); const out: VersionNode[] = []; const queue = [...startIds]; while (queue.length) { const id = queue.shift()!; if (seen.has(id)) continue; const node = getVersionNode(id); if (!node) continue; seen.add(id); out.push(node); queue.push(...(direction === 'parents' ? node.parentVersionIds : node.childVersionIds)); } return out; }
export function getActivePolyphony(familyId: string): ActivePolyphony {
  const family = getVersionFamily(familyId); if (!family) throw new Error(`VersionFamily not found: ${familyId}`);
  const versionNodes = listVersionNodes(familyId).filter((node) => activeStatuses.has(node.status));
  return { family, voiceTracks: listVoiceTracks(familyId).filter((track) => track.status === 'active'), versionNodes, canonicalVersion: family.canonicalVersionId ? getVersionNode(family.canonicalVersionId) : undefined, mergeProposals: listMergeProposals(familyId).filter((proposal) => proposal.status === 'draft' || proposal.status === 'reviewing'), quarantinedCount: listVersionNodes(familyId).filter((node) => node.status === 'quarantined').length };
}
export function generateVersionLineage(versionId: string): VersionLineage {
  const version = getVersionNode(versionId); if (!version) throw new Error(`VersionNode not found: ${versionId}`);
  return { version, parents: version.parentVersionIds.map((id) => getVersionNode(id)).filter((node): node is VersionNode => Boolean(node)), children: version.childVersionIds.map((id) => getVersionNode(id)).filter((node): node is VersionNode => Boolean(node)), ancestors: walk(version.parentVersionIds, 'parents'), descendants: walk(version.childVersionIds, 'children'), relations: listCounterpointRelations(version.familyId).filter((relation) => relation.fromVersionId === versionId || relation.toVersionId === versionId) };
}
export function buildPolyphonySummary(familyId: string): PolyphonySummary {
  const active = getActivePolyphony(familyId); const all = listVersionNodes(familyId);
  return { familyId, title: active.family.title, canonicalTitle: active.canonicalVersion?.title, activeVoiceCount: active.voiceTracks.length, activeVersionCount: active.versionNodes.length, reviewingCount: all.filter((node) => node.status === 'reviewing').length, mergeCandidateCount: all.filter((node) => node.status === 'merge_candidate').length, quarantinedCount: all.filter((node) => node.status === 'quarantined').length, highRiskCount: all.filter((node) => node.riskLevel === 'high' || node.riskLevel === 'critical').length, recommendedAction: active.quarantinedCount ? '先处理隔离版本，再推进合流。' : '保持多声部并行，等待审核合流窗口。' };
}

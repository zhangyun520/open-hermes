import type { CounterpointRelationType, VersionDiff, VersionNode } from './types';
import { listCounterpointRelations } from './counterpoint';
import { getVersionNode } from './versionNode';
import { getVoiceTrack } from './voiceTrack';

const riskRank = { low: 1, medium: 2, high: 3, critical: 4 } as const;
export function compareVersions(versionAId: string, versionBId: string): VersionDiff {
  const a = getVersionNode(versionAId); const b = getVersionNode(versionBId);
  if (!a || !b) throw new Error('compareVersions requires existing versions');
  const changedFields = ['title', 'summary', 'contentHash', 'riskLevel', 'privacyLevel'].filter((field) => String(a[field as keyof VersionNode]) !== String(b[field as keyof VersionNode]));
  const relations = listCounterpointRelations(a.familyId).filter((relation) => (relation.fromVersionId === a.id && relation.toVersionId === b.id) || (relation.fromVersionId === b.id && relation.toVersionId === a.id));
  const conflicts = relations.filter((relation) => ['conflicts', 'contradicts', 'blocks_public_release'].includes(relation.relationType)).map((relation) => relation.explanation);
  if (a.riskLevel !== b.riskLevel) conflicts.push(`风险不同：${a.riskLevel} vs ${b.riskLevel}`);
  return { versionAId, versionBId, summary: `${a.title} 与 ${b.title} 在 ${changedFields.join(', ') || '少量元数据'} 上存在差异。`, changedFields, conflicts, riskDifference: a.riskLevel === b.riskLevel ? '风险等级相同' : `${a.riskLevel} → ${b.riskLevel}`, useCaseDifference: `${getVoiceTrack(a.voiceTrackId)?.type ?? 'unknown'} vs ${getVoiceTrack(b.voiceTrackId)?.type ?? 'unknown'}`, suggestedAction: conflicts.length ? 'needs_review' : changedFields.length <= 2 ? 'keep_parallel' : 'merge' };
}
export function detectVersionConflicts(versionIds: string[]): Array<{ fromVersionId: string; toVersionId: string; relationType: CounterpointRelationType; explanation: string }> {
  const nodes = versionIds.map((id) => getVersionNode(id)).filter((node): node is VersionNode => Boolean(node));
  const findings: Array<{ fromVersionId: string; toVersionId: string; relationType: CounterpointRelationType; explanation: string }> = [];
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i]; const b = nodes[j];
    if (a.riskLevel !== b.riskLevel && Math.abs(riskRank[a.riskLevel] - riskRank[b.riskLevel]) >= 2) findings.push({ fromVersionId: a.id, toVersionId: b.id, relationType: 'conflicts', explanation: '风险等级跨度过大，需要人工判断。' });
    else if (a.parentVersionIds.includes(b.id) || b.parentVersionIds.includes(a.id)) findings.push({ fromVersionId: a.id, toVersionId: b.id, relationType: 'extends', explanation: '存在父子血缘，属于扩展关系。' });
    else if (a.voiceTrackId !== b.voiceTrackId && a.riskLevel === b.riskLevel) findings.push({ fromVersionId: a.id, toVersionId: b.id, relationType: 'supports', explanation: '不同声部风险一致，可并行互补。' });
  }
  return findings;
}

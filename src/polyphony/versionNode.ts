import type { PolyphonyRiskLevel, SafetyMetadata, VersionNode, VersionStatus } from './types';
import { getVersionFamily, nextId, nowIso, updateVersionFamily } from './versionFamily';
import { getVoiceTrack } from './voiceTrack';

const nodes = new Map<string, VersionNode>();
const riskRank: Record<PolyphonyRiskLevel, number> = { low: 1, medium: 2, high: 3, critical: 4 };
export function stableHash(value: string): string { let hash = 2166136261; for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619); return `h-${(hash >>> 0).toString(16).padStart(8, '0')}`; }
export function defaultSafetyMetadata(riskLevel: PolyphonyRiskLevel): SafetyMetadata { return { requiresHumanReview: riskRank[riskLevel] >= riskRank.high, affectsPublicCache: false, affectsExternalActions: false, affectsHumanTransition: false, containsSensitiveData: false }; }
export function createVersionNode(input: Omit<VersionNode, 'id' | 'childVersionIds' | 'contentHash' | 'createdAt' | 'updatedAt'> & Partial<Pick<VersionNode, 'id' | 'childVersionIds' | 'contentHash' | 'createdAt' | 'updatedAt'>>): VersionNode {
  const family = getVersionFamily(input.familyId);
  if (!family) throw new Error(`VersionFamily not found: ${input.familyId}`);
  const track = getVoiceTrack(input.voiceTrackId);
  if (!track) throw new Error(`VoiceTrack not found: ${input.voiceTrackId}`);
  if (track.type === 'world_model' && !input.uncertaintyMetadata) throw new Error('world_model versions require uncertainty metadata');
  const at = nowIso();
  const node: VersionNode = { ...input, id: input.id ?? nextId('vn'), childVersionIds: input.childVersionIds ?? [], contentHash: input.contentHash ?? stableHash(`${input.title}|${input.summary}|${input.contentRef}|${JSON.stringify(input.metadata)}`), createdAt: input.createdAt ?? at, updatedAt: input.updatedAt ?? at, safetyMetadata: input.safetyMetadata ?? defaultSafetyMetadata(input.riskLevel) };
  nodes.set(node.id, node);
  for (const parentId of node.parentVersionIds) {
    const parent = nodes.get(parentId);
    if (parent && parent.status !== 'frozen') nodes.set(parent.id, { ...parent, childVersionIds: [...new Set([...parent.childVersionIds, node.id])], updatedAt: at });
  }
  updateVersionFamily({ ...family, versionNodeIds: [...new Set([...family.versionNodeIds, node.id])] });
  return node;
}
export function getVersionNode(id: string) { return nodes.get(id); }
export function listVersionNodes(familyId?: string) { return Array.from(nodes.values()).filter((node) => !familyId || node.familyId === familyId); }
export function updateVersionNode(node: VersionNode) { const existing = nodes.get(node.id); if (existing?.status === 'frozen') throw new Error('frozen version cannot be modified'); const updated = { ...node, updatedAt: nowIso() }; nodes.set(updated.id, updated); return updated; }
export function forkVersion(versionId: string, targetVoiceTrackId: string, reason: string): VersionNode {
  const source = getVersionNode(versionId);
  if (!source) throw new Error(`VersionNode not found: ${versionId}`);
  if (source.status === 'frozen') throw new Error('frozen version cannot be forked');
  return createVersionNode({ ...source, id: undefined, voiceTrackId: targetVoiceTrackId, parentVersionIds: [source.id], childVersionIds: [], title: `${source.title} / fork`, summary: `${source.summary}\nFork reason: ${reason}`, status: 'experimental' as VersionStatus, metadata: { ...source.metadata, forkReason: reason, forkedFrom: source.id } });
}
export function resetVersionNodes(items: VersionNode[] = []) { nodes.clear(); items.forEach((item) => nodes.set(item.id, item)); }

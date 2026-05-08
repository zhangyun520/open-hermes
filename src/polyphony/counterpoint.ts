import type { CounterpointRelation, CounterpointRelationType } from './types';
import { getVersionNode } from './versionNode';
import { nextId, nowIso } from './versionFamily';
const relations = new Map<string, CounterpointRelation>();
export function createCounterpointRelation(fromVersionId: string, toVersionId: string, relationType: CounterpointRelationType, explanation: string, createdBy = 'system'): CounterpointRelation {
  const from = getVersionNode(fromVersionId); const to = getVersionNode(toVersionId);
  if (!from || !to) throw new Error('counterpoint relation requires existing versions');
  if (from.familyId !== to.familyId) throw new Error('counterpoint relation must stay within a family');
  const relation: CounterpointRelation = { id: nextId('cp'), familyId: from.familyId, fromVersionId, toVersionId, relationType, explanation, createdBy, createdAt: nowIso() };
  relations.set(relation.id, relation); return relation;
}
export function listCounterpointRelations(familyId?: string) { return Array.from(relations.values()).filter((relation) => !familyId || relation.familyId === familyId); }
export function resetCounterpointRelations(items: CounterpointRelation[] = []) { relations.clear(); items.forEach((item) => relations.set(item.id, item)); }

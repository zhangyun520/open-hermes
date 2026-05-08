import type { VersionFamily, VersionedObjectType, VersionPrivacyLevel } from './types';

const families = new Map<string, VersionFamily>();
let familyCounter = 0;
export const nowIso = () => new Date().toISOString();
export const nextId = (prefix: string) => `${prefix}-${++familyCounter}-${Date.now().toString(36)}`;

export function createVersionFamily(objectType: VersionedObjectType, objectId: string, title: string, options: Partial<Pick<VersionFamily, 'description' | 'createdBy' | 'tags' | 'visibility'>> = {}): VersionFamily {
  const at = nowIso();
  const family: VersionFamily = { id: nextId('vf'), objectType, objectId, title, description: options.description, createdBy: options.createdBy ?? 'system', createdAt: at, updatedAt: at, voiceTrackIds: [], versionNodeIds: [], tags: options.tags ?? [], visibility: options.visibility ?? 'private' as VersionPrivacyLevel };
  families.set(family.id, family);
  return family;
}
export function getVersionFamily(id: string) { return families.get(id); }
export function listVersionFamilies() { return Array.from(families.values()); }
export function updateVersionFamily(family: VersionFamily) { const updated = { ...family, updatedAt: nowIso() }; families.set(updated.id, updated); return updated; }
export function resetVersionFamilies(items: VersionFamily[] = []) { families.clear(); familyCounter = 0; items.forEach((item) => families.set(item.id, item)); }

import type { WorldCapsule } from '../types';
import { detectIPRisk } from '../safety/ipLicenseGuard';
const capsules = new Map<string, WorldCapsule>();
const nowIso = () => new Date().toISOString();
let counter = 0;
export const nextWorldId = (prefix: string) => `${prefix}-${++counter}-${Date.now().toString(36)}`;
export function createWorldCapsule(input: Omit<WorldCapsule, 'id' | 'createdAt' | 'linkedResidualCardIds' | 'linkedSkillIds' | 'linkedWorldModelSpecIds'> & Partial<Pick<WorldCapsule, 'id' | 'createdAt' | 'linkedResidualCardIds' | 'linkedSkillIds' | 'linkedWorldModelSpecIds'>>): WorldCapsule {
  const capsule: WorldCapsule = { ...input, id: input.id ?? nextWorldId('wc'), createdAt: input.createdAt ?? nowIso(), linkedResidualCardIds: input.linkedResidualCardIds ?? [], linkedSkillIds: input.linkedSkillIds ?? [], linkedWorldModelSpecIds: input.linkedWorldModelSpecIds ?? [] };
  const ip = detectIPRisk(capsule);
  if (capsule.status === 'public' && !ip.allowedPublic) throw new Error(`world capsule cannot enter public: ${ip.reasons.join('; ')}`);
  capsules.set(capsule.id, capsule); return capsule;
}
export function createAnimeWorldCapsule(input: Parameters<typeof createWorldCapsule>[0]): WorldCapsule {
  if (input.worldType !== 'anime_world') throw new Error('anime world capsule must use anime_world type');
  if (!['original', 'authorized', 'fan_noncommercial'].includes(input.licensePolicy.licenseType)) throw new Error('anime world capsule requires explicit licensePolicy');
  if (input.licensePolicy.licenseType === 'fan_noncommercial' && input.status === 'public') throw new Error('fan noncommercial anime capsule cannot become public');
  return createWorldCapsule(input);
}
export function getWorldCapsule(id: string) { return capsules.get(id); }
export function listWorldCapsules() { return Array.from(capsules.values()); }
export function updateWorldCapsule(capsule: WorldCapsule) { capsules.set(capsule.id, capsule); return capsule; }
export function connectWorldCapsuleToSkill(worldCapsuleId: string, skillId: string) { const capsule = getWorldCapsule(worldCapsuleId); if (!capsule) return undefined; const updated = { ...capsule, linkedSkillIds: [...new Set([...capsule.linkedSkillIds, skillId])] }; return updateWorldCapsule(updated); }
export function resetWorldCapsules(items: WorldCapsule[] = []) { capsules.clear(); items.forEach((item) => capsules.set(item.id, item)); }

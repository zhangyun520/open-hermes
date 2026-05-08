import type { VoiceTrack, VoiceTrackType } from './types';
import { getVersionFamily, nextId, nowIso, updateVersionFamily } from './versionFamily';

const tracks = new Map<string, VoiceTrack>();
export function createVoiceTrack(familyId: string, type: VoiceTrackType, name: string, purpose: string, options: Partial<Pick<VoiceTrack, 'ownerId' | 'contributorIds' | 'status'>> = {}): VoiceTrack {
  const family = getVersionFamily(familyId);
  if (!family) throw new Error(`VersionFamily not found: ${familyId}`);
  const at = nowIso();
  const track: VoiceTrack = { id: nextId('vt'), familyId, name, type, purpose, ownerId: options.ownerId, contributorIds: options.contributorIds ?? [], status: options.status ?? 'active', createdAt: at, updatedAt: at };
  tracks.set(track.id, track);
  updateVersionFamily({ ...family, voiceTrackIds: [...new Set([...family.voiceTrackIds, track.id])] });
  return track;
}
export function getVoiceTrack(id: string) { return tracks.get(id); }
export function listVoiceTracks(familyId?: string) { return Array.from(tracks.values()).filter((track) => !familyId || track.familyId === familyId); }
export function updateVoiceTrack(track: VoiceTrack) { const updated = { ...track, updatedAt: nowIso() }; tracks.set(updated.id, updated); return updated; }
export function resetVoiceTracks(items: VoiceTrack[] = []) { tracks.clear(); items.forEach((item) => tracks.set(item.id, item)); }

import type { ExperienceEvent, ExperienceSession } from '../types';
import { getWorldCapsule } from '../scenes/worldCapsule';
import { getWorldConnector } from '../gateway/worldConnectorRegistry';
import { applyMinorPrivacyGuard } from '../safety/minorPrivacyGuard';
const sessions = new Map<string, ExperienceSession>();
const nowIso = () => new Date().toISOString();
let counter = 0;
const nextId = (prefix: string) => `${prefix}-${++counter}-${Date.now().toString(36)}`;
export function createExperienceSession(userId: string, worldCapsuleId: string, mode: ExperienceSession['mode'], options: Partial<Pick<ExperienceSession, 'id' | 'connectorId' | 'consentId' | 'privacyLevel' | 'containsMinorData' | 'dataSensitivity'>> = {}): ExperienceSession {
  const capsule = getWorldCapsule(worldCapsuleId); if (!capsule) throw new Error(`WorldCapsule not found: ${worldCapsuleId}`);
  const connector = options.connectorId ? getWorldConnector(options.connectorId) : undefined;
  const session: ExperienceSession = { id: options.id ?? nextId('xs'), userId, worldCapsuleId, connectorId: options.connectorId ?? capsule.sourceConnectorId, startedAt: nowIso(), mode, consentId: options.consentId ?? `consent-${userId}`, events: [], feedbackIds: [], privacyLevel: options.privacyLevel ?? capsule.privacyLevel, dataSensitivity: options.dataSensitivity ?? 'low', containsMinorData: options.containsMinorData ?? false, proofStatus: 'unverified' };
  const guarded = applyMinorPrivacyGuard(session, connector?.safetyPolicy);
  sessions.set(guarded.id, guarded); return guarded;
}
export function importReplayAsExperienceSession(replayFile: string, metadata: { userId: string; worldCapsuleId: string; connectorId?: string; consentId?: string; containsMinorData?: boolean }): ExperienceSession {
  const session = createExperienceSession(metadata.userId, metadata.worldCapsuleId, 'replay_review', metadata);
  return recordExperienceEvent(session.id, { eventType: 'state_observed', summary: 'Imported replay for read-only analysis', rawRef: replayFile, metadata: { replayFile } }).session;
}
export function recordExperienceEvent(sessionId: string, event: Omit<ExperienceEvent, 'id' | 'sessionId' | 'timestamp'> & Partial<Pick<ExperienceEvent, 'id' | 'timestamp'>>): { session: ExperienceSession; event: ExperienceEvent } {
  const session = sessions.get(sessionId); if (!session) throw new Error(`ExperienceSession not found: ${sessionId}`);
  const saved: ExperienceEvent = { ...event, id: event.id ?? nextId('xe'), sessionId, timestamp: event.timestamp ?? nowIso() };
  const updated = { ...session, events: [...session.events, saved] };
  sessions.set(sessionId, updated); return { session: updated, event: saved };
}
export function endExperienceSession(sessionId: string): ExperienceSession | undefined { const session = sessions.get(sessionId); if (!session) return undefined; const endedAt = nowIso(); const durationSeconds = Math.max(1, Math.round((Date.parse(endedAt) - Date.parse(session.startedAt)) / 1000)); const updated = { ...session, endedAt, durationSeconds }; sessions.set(sessionId, updated); return updated; }
export function getExperienceSession(id: string) { return sessions.get(id); }
export function listExperienceSessions() { return Array.from(sessions.values()); }
export function updateExperienceSession(session: ExperienceSession) { sessions.set(session.id, session); return session; }
export function resetExperienceSessions(items: ExperienceSession[] = []) { sessions.clear(); items.forEach((item) => sessions.set(item.id, item)); }

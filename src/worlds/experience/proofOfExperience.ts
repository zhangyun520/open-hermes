import type { ExperienceSession, ProofOfExperience } from '../types';
import { updateExperienceSession } from './experienceSession';
const proofs = new Map<string, ProofOfExperience>();
export function stableProofHash(value: string): string { let hash = 5381; for (let i = 0; i < value.length; i++) hash = ((hash << 5) + hash) ^ value.charCodeAt(i); return `poe-${(hash >>> 0).toString(16).padStart(8, '0')}`; }
export function generateProofOfExperience(session: ExperienceSession): ProofOfExperience {
  const proofType: ProofOfExperience['proofType'] = session.proofStatus === 'replay_verified' ? 'replay_hash' : session.connectorId ? 'trusted_connector' : 'manual_attestation';
  const proof: ProofOfExperience = { id: `proof-${session.id}`, sessionId: session.id, userId: session.userId, worldCapsuleId: session.worldCapsuleId, proofType, proofHash: stableProofHash(`${session.id}|${session.userId}|${session.worldCapsuleId}|${session.events.map((event) => `${event.eventType}:${event.summary}`).join('|')}`), timestamp: new Date().toISOString(), verificationStatus: session.events.length ? 'verified' : 'pending', privacyLevel: session.privacyLevel };
  proofs.set(proof.id, proof); updateExperienceSession({ ...session, proofStatus: proof.verificationStatus === 'verified' ? 'system_verified' : session.proofStatus }); return proof;
}
export function getProofOfExperience(id: string) { return proofs.get(id); }
export function listProofsOfExperience() { return Array.from(proofs.values()); }
export function resetProofsOfExperience(items: ProofOfExperience[] = []) { proofs.clear(); items.forEach((item) => proofs.set(item.id, item)); }

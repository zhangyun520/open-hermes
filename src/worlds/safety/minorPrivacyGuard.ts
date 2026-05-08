import type { ExperienceSession, WorldSafetyPolicy } from '../types';
export function applyMinorPrivacyGuard(session: ExperienceSession, policy?: WorldSafetyPolicy): ExperienceSession {
  if (!session.containsMinorData) return session;
  if (policy?.minorDataPolicy === 'not_allowed') return { ...session, privacyLevel: 'private', dataSensitivity: 'high', proofStatus: 'rejected' };
  return { ...session, privacyLevel: 'private', dataSensitivity: 'high' };
}

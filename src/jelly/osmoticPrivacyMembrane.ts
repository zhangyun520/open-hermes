import type { JellyPrivacyLevel, JellyRiskLevel } from './types';
const layerRank: Record<JellyPrivacyLevel, number> = { private: 1, team: 2, community: 3, public: 4 };
export function canCrossPrivacyMembrane(input: { from: JellyPrivacyLevel; to: JellyPrivacyLevel; privacyLevel: JellyPrivacyLevel; riskLevel: JellyRiskLevel; hasConsent: boolean; isRedacted: boolean; }): { allowed: boolean; reason: string } {
  const upgrading = layerRank[input.to] > layerRank[input.from];
  if (!upgrading) return { allowed: true, reason: 'same or lower privacy layer movement is allowed' };
  if (!input.hasConsent) return { allowed: false, reason: 'consent required before crossing to a wider layer' };
  if (input.privacyLevel === 'private' && input.to === 'public') return { allowed: false, reason: 'private data cannot enter public layer' };
  if ((input.to === 'community' || input.to === 'public') && !input.isRedacted) return { allowed: false, reason: 'redaction required before community/public sharing' };
  if (input.riskLevel === 'critical' && input.to === 'public') return { allowed: false, reason: 'critical risk can never enter public layer' };
  return { allowed: true, reason: 'privacy membrane allows redacted, consented structure to cross' };
}

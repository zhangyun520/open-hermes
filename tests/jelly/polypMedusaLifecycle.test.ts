import { describe, expect, it } from 'vitest';
import { canCrossPrivacyMembrane, canPromoteToPublic, getLifecycleState } from '../../src/jelly';
describe('PolypMedusaLifecycle and commons policies', () => {
  it('returns bloom for high-reuse low-risk skill', () => { expect(getLifecycleState({ objectId: 'skill', objectType: 'skill', usageCount: 40, reviewScore: 90, verificationScore: 90, riskLevel: 'low' }).stage).toBe('bloom'); });
  it('blocks privacy membrane crossing without consent', () => { expect(canCrossPrivacyMembrane({ from: 'private', to: 'team', privacyLevel: 'private', riskLevel: 'low', hasConsent: false, isRedacted: true }).allowed).toBe(false); });
  it('does not promote high risk skill to public', () => { expect(canPromoteToPublic({ skillId: 'x', title: 'x', layer: 'community', usageCount: 5, contributorCount: 1, riskLevel: 'high', verified: true })).toBe(false); });
});

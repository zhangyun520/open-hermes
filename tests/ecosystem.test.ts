import { describe, expect, it } from 'vitest';
import type { CacheRewardEvent, SharedCacheObject } from '../src/ecosystem/types';
import { resetCacheRegistry } from '../src/ecosystem/sharedCache/cacheObjectRegistry';
import { promoteCacheObject, searchSharedCache } from '../src/ecosystem/sharedCache/sharedSkillMemoryPool';
import { recordCacheHit } from '../src/ecosystem/sharedCache/cacheHitLedger';
import { quarantineCacheObject } from '../src/ecosystem/sharedCache/cacheQuarantine';
import { calculateCacheReward } from '../src/ecosystem/economy/cacheRewardEngine';
import { detectCachePoisoning } from '../src/ecosystem/safety/cachePoisoningDetector';
import { monitorBiasImmuneSystem } from '../src/ecosystem/safety/biasImmuneMonitor';

const consentAll = { allowPrivate: true, allowTeamShare: true, allowCommunityShare: true, allowPublicShare: true, allowTrainingUse: false, allowDerivativeSkills: true, allowAttribution: true, allowAnonymousAttribution: false };
const provenance = { originalContributorId: 'u1', ideaNotaryHash: 'hash', timestamp: '2026-05-08', parentObjectIds: [], transformationSteps: ['redacted'], reviewIds: ['r1'], verificationIds: ['v1'] };
function object(overrides: Partial<SharedCacheObject>): SharedCacheObject {
  return { id: 'obj-1', type: 'skill_capsule', title: '教育技能', domain: 'education', sourceLayer: 'private', targetLayer: 'team', privacyLevel: 'low', riskLevel: 'low', ownerId: 'u1', organizationId: 'team-1', contributors: ['u1', 'u2'], provenance, consent: consentAll, licenseMode: 'community_share', status: 'team_candidate', version: '1.0.0', createdAt: '2026-05-08', updatedAt: '2026-05-08', usageCount: 3, cacheHitCount: 1, reviewScore: 80, verifiedCompressionScore: 30, qualityScore: 86, safetyScore: 92, anonymized: true, promotionHistory: [], ...overrides };
}

describe('Ecosystem Gateway shared cache', () => {
  it('blocks high privacy objects from public promotion', () => {
    resetCacheRegistry([object({ id: 'private-high', privacyLevel: 'high', riskLevel: 'high', anonymized: false })]);
    const result = promoteCacheObject('private-high', 'public');
    expect(result.allowed).toBe(false);
    expect(result.reasons.join(' ')).toContain('high privacy');
  });

  it('blocks sharing without consent', () => {
    resetCacheRegistry([object({ id: 'no-consent', consent: { ...consentAll, allowCommunityShare: false } })]);
    const result = promoteCacheObject('no-consent', 'community');
    expect(result.allowed).toBe(false);
    expect(result.reasons.join(' ')).toContain('consent');
  });

  it('blocks promotion when review score is insufficient', () => {
    resetCacheRegistry([object({ id: 'low-review', reviewScore: 30 })]);
    const result = promoteCacheObject('low-review', 'team');
    expect(result.allowed).toBe(false);
    expect(result.reasons.join(' ')).toContain('review score');
  });

  it('promotes low-risk high-quality team candidates to team_verified', () => {
    resetCacheRegistry([object({ id: 'good-team', reviewScore: 80, verifiedCompressionScore: 30, usageCount: 3 })]);
    const result = promoteCacheObject('good-team', 'team');
    expect(result.allowed).toBe(true);
    expect(result.object?.status).toBe('team_verified');
  });

  it('records cache hits correctly', () => {
    resetCacheRegistry([object({ id: 'hit-me', targetLayer: 'community' })]);
    const hit = recordCacheHit('hit-me', 'u2', 'task-1');
    expect(hit.cacheObjectId).toBe('hit-me');
    expect(hit.layer).toBe('community');
    expect(hit.savedEstimatedCost).toBeGreaterThan(0);
  });

  it('distributes mock rewards across contributors', () => {
    resetCacheRegistry([object({ id: 'reward-me', contributors: ['u1', 'u2'] })]);
    const hit = recordCacheHit('reward-me', 'u3', 'task-2');
    const rewards = calculateCacheReward(hit);
    expect(rewards).toHaveLength(2);
    expect(rewards.every((reward) => reward.amount > 0)).toBe(true);
  });

  it('quarantines objects when consent is withdrawn', () => {
    resetCacheRegistry([object({ id: 'withdrawn' })]);
    const updated = quarantineCacheObject('withdrawn', 'user withdrew authorization');
    expect(updated?.status).toBe('quarantined');
  });

  it('searches shared cache in private to public order', () => {
    resetCacheRegistry([object({ id: 'private', title: '教育技能', targetLayer: 'private' }), object({ id: 'team', title: '教育技能', targetLayer: 'team' }), object({ id: 'community', title: '教育技能', targetLayer: 'community' }), object({ id: 'public', title: '教育技能', targetLayer: 'public', status: 'public_skill' })]);
    const result = searchSharedCache({ userId: 'u1', text: '教育', includePublic: true }, { userId: 'u1', teamIds: ['team-1'], organizationIds: [], allowedLayers: ['private', 'team', 'community', 'public'] });
    expect(result.searchOrder).toEqual(['private', 'team', 'community', 'public']);
    expect(result.exactHits.map((hit) => hit.id)).toEqual(['private', 'team', 'community', 'public']);
  });

  it('keeps shared-cache search scoped to the caller consent and memberships', () => {
    resetCacheRegistry([
      object({ id: 'private-owner', title: '隐私技能', targetLayer: 'private', ownerId: 'u1' }),
      object({ id: 'private-other', title: '隐私技能', targetLayer: 'private', ownerId: 'u9', contributors: ['u9'] }),
      object({ id: 'team-allowed', title: '隐私技能', targetLayer: 'team', organizationId: 'team-1' }),
      object({ id: 'team-other', title: '隐私技能', targetLayer: 'team', organizationId: 'team-9' }),
      object({ id: 'public-hidden', title: '隐私技能', targetLayer: 'public', status: 'public_skill' }),
      object({ id: 'quarantined', title: '隐私技能', targetLayer: 'community', status: 'quarantined' })
    ]);
    const result = searchSharedCache({ userId: 'u1', text: '隐私', includePublic: false }, { userId: 'u1', teamIds: ['team-1'], organizationIds: [], allowedLayers: ['private', 'team', 'community', 'public'] });
    expect(result.searchOrder).toEqual(['private', 'team', 'community']);
    expect(result.exactHits.map((hit) => hit.id)).toEqual(['private-owner', 'team-allowed']);
  });

  it('detects abnormal batch cache poisoning signals', () => {
    const objects = Array.from({ length: 5 }, (_, index) => object({ id: `spam-${index}`, ownerId: 'spammer', title: '重复垃圾', qualityScore: 20 }));
    expect(detectCachePoisoning(objects).some((signal) => signal.type === 'low_quality_batch')).toBe(true);
  });

  it('detects over-concentrated cache rewards', () => {
    const rewards: CacheRewardEvent[] = [{ id: 'r1', cacheObjectId: 'o1', contributorId: 'u1', rewardType: 'feed_points', amount: 90, reason: 'x', status: 'pending' }, { id: 'r2', cacheObjectId: 'o2', contributorId: 'u2', rewardType: 'feed_points', amount: 10, reason: 'x', status: 'pending' }];
    expect(monitorBiasImmuneSystem([], rewards).some((alert) => alert.type === 'reward_concentration')).toBe(true);
  });
});

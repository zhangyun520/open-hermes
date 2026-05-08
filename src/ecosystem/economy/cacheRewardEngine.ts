import type { CacheHitRecord, CacheRewardEvent, SharedCacheObject } from '../types';
import { getCacheObject } from '../sharedCache/cacheObjectRegistry';
import { calculateContributionShares } from './contributionAttribution';

export function calculateCacheReward(cacheHitRecord: CacheHitRecord): CacheRewardEvent[] {
  const object = getCacheObject(cacheHitRecord.cacheObjectId);
  if (!object || object.status === 'quarantined') return [];
  const base = Math.max(1, Math.round(cacheHitRecord.savedEstimatedCost * 100));
  return calculateContributionShares(object).map(({ contributorId, share }) => ({ id: `reward-${cacheHitRecord.id}-${contributorId}`, cacheObjectId: object.id, contributorId, rewardType: 'feed_points', amount: Math.max(1, Math.round(base * share)), reason: `cache hit saved mock cost ${cacheHitRecord.savedEstimatedCost}`, status: 'pending' }));
}

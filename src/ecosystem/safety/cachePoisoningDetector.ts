import type { PoisoningSignal, SharedCacheObject } from '../types';
export function detectCachePoisoning(objects: SharedCacheObject[]): PoisoningSignal[] {
  const signals: PoisoningSignal[] = [];
  const byOwner = new Map<string, SharedCacheObject[]>();
  for (const object of objects) byOwner.set(object.ownerId, [...(byOwner.get(object.ownerId) ?? []), object]);
  for (const [owner, owned] of byOwner) {
    const lowQuality = owned.filter((object) => object.qualityScore < 35);
    if (owned.length >= 5 && lowQuality.length / owned.length > 0.5) signals.push({ type: 'low_quality_batch', severity: 'high', message: `${owner} submitted abnormal low-quality batch`, objectIds: lowQuality.map((object) => object.id) });
    const titles = new Set(owned.map((object) => object.title));
    if (owned.length >= 4 && titles.size <= 2) signals.push({ type: 'duplicate_spam', severity: 'medium', message: `${owner} has repeated similar cache objects`, objectIds: owned.map((object) => object.id) });
  }
  const hitFarm = objects.filter((object) => object.cacheHitCount > object.usageCount * 3 && object.cacheHitCount > 20);
  if (hitFarm.length) signals.push({ type: 'hit_farming', severity: 'high', message: 'cache hit count is abnormal compared with usage', objectIds: hitFarm.map((object) => object.id) });
  return signals;
}

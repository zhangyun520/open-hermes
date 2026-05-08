import type { CacheHitRecord } from '../types';
import { getCacheObject, updateCacheObject } from './cacheObjectRegistry';
const hitRecords: CacheHitRecord[] = [];
export function recordCacheHit(cacheObjectId: string, userId: string, taskId: string): CacheHitRecord {
  const object = getCacheObject(cacheObjectId);
  const record: CacheHitRecord = { id: `hit-${cacheObjectId}-${Date.now()}`, cacheObjectId, userId, taskId, layer: object?.targetLayer ?? 'private', savedEstimatedCost: Number(((object?.verifiedCompressionScore ?? 10) * 0.003).toFixed(3)), qualityFeedback: object?.qualityScore ?? 70, createdAt: new Date().toISOString() };
  hitRecords.push(record);
  if (object) updateCacheObject({ ...object, cacheHitCount: object.cacheHitCount + 1, usageCount: object.usageCount + 1, updatedAt: new Date().toISOString() });
  return record;
}
export function listCacheHitRecords() { return [...hitRecords]; }

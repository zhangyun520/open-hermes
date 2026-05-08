import type { QuarantineRecord, SharedCacheObject } from '../types';
import { getCacheObject, updateCacheObject } from './cacheObjectRegistry';

const quarantineRecords: QuarantineRecord[] = [];
export function quarantineCacheObject(objectId: string, reason: string): SharedCacheObject | undefined {
  const object = getCacheObject(objectId);
  if (!object) return undefined;
  const updated: SharedCacheObject = { ...object, status: 'quarantined', updatedAt: new Date().toISOString(), promotionHistory: [...object.promotionHistory, { from: object.sourceLayer, to: object.targetLayer, at: new Date().toISOString(), by: 'safety-gate', result: 'blocked' }] };
  quarantineRecords.push({ id: `quarantine-${objectId}-${Date.now()}`, cacheObjectId: objectId, reason, riskLevel: object.riskLevel, createdAt: new Date().toISOString(), status: 'open' });
  return updateCacheObject(updated);
}
export function listQuarantineRecords() { return [...quarantineRecords]; }

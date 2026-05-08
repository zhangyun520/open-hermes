import type { SharedCacheObject } from '../types';

const registry = new Map<string, SharedCacheObject>();
export function registerCacheObject(object: SharedCacheObject): SharedCacheObject { registry.set(object.id, object); return object; }
export function getCacheObject(objectId: string) { return registry.get(objectId); }
export function updateCacheObject(object: SharedCacheObject): SharedCacheObject { registry.set(object.id, object); return object; }
export function listCacheObjects() { return Array.from(registry.values()); }
export function resetCacheRegistry(objects: SharedCacheObject[] = []) { registry.clear(); objects.forEach(registerCacheObject); }

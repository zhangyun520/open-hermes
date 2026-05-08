import type { CacheLayer, SharedCacheObject, SharedCacheSearchContext, SharedCacheSearchQuery, SharedCacheSearchResult } from '../types';
import { evaluatePromotion } from './cachePromotionPolicy';
import { getCacheObject, listCacheObjects, updateCacheObject } from './cacheObjectRegistry';

const statusForLayer: Record<CacheLayer, SharedCacheObject['status']> = { private: 'private', team: 'team_verified', community: 'community_verified', public: 'public_skill' };
const reusableStatuses = new Set<SharedCacheObject['status']>(['private', 'team_candidate', 'team_verified', 'community_candidate', 'community_verified', 'public_candidate', 'public_skill']);

export function promoteCacheObject(objectId: string, targetLayer: CacheLayer): { object?: SharedCacheObject; allowed: boolean; reasons: string[] } {
  const object = getCacheObject(objectId);
  if (!object) return { allowed: false, reasons: ['object not found'] };
  const decision = evaluatePromotion(object, targetLayer);
  const history = [...object.promotionHistory, { from: object.targetLayer, to: targetLayer, at: new Date().toISOString(), by: 'promotion-policy', result: decision.allowed ? 'approved' as const : 'blocked' as const }];
  if (!decision.allowed) return { object: updateCacheObject({ ...object, promotionHistory: history }), allowed: false, reasons: decision.reasons };
  const updated = updateCacheObject({ ...object, sourceLayer: object.targetLayer, targetLayer, status: statusForLayer[targetLayer], updatedAt: new Date().toISOString(), promotionHistory: history });
  return { object: updated, allowed: true, reasons: [] };
}

function hasLayerAccess(object: SharedCacheObject, query: SharedCacheSearchQuery, context: SharedCacheSearchContext): boolean {
  if (!context.allowedLayers.includes(object.targetLayer)) return false;
  if (!reusableStatuses.has(object.status)) return false;
  if (object.targetLayer === 'public') return query.includePublic === true;
  if (object.targetLayer === 'community') return context.allowedLayers.includes('community');
  if (object.targetLayer === 'team') return Boolean(object.organizationId && (context.teamIds.includes(object.organizationId) || context.organizationIds.includes(object.organizationId)));
  return object.ownerId === context.userId || object.contributors.includes(context.userId);
}

export function searchSharedCache(query: SharedCacheSearchQuery, context: SharedCacheSearchContext): SharedCacheSearchResult {
  const allLayers: CacheLayer[] = ['private', 'team', 'community', 'public'];
  const order = allLayers.filter((layer) => context.allowedLayers.includes(layer) && (layer !== 'public' || query.includePublic === true));
  const text = query.text.trim().toLowerCase();
  const objects = listCacheObjects().filter((object) => order.includes(object.targetLayer) && hasLayerAccess(object, query, context));
  const byLayer = (a: SharedCacheObject, b: SharedCacheObject) => order.indexOf(a.targetLayer) - order.indexOf(b.targetLayer);
  const exactHits = objects.filter((object) => object.title.toLowerCase().includes(text) || object.domain.toLowerCase() === text).sort(byLayer);
  const semanticHits = objects.filter((object) => object.domain === query.domain && !exactHits.includes(object)).sort(byLayer).slice(0, 5);
  const skillHits = objects.filter((object) => object.type === 'skill_capsule').sort(byLayer);
  const riskWarnings = objects.filter((object) => object.riskLevel !== 'low').map((object) => `${object.title}: ${object.riskLevel} risk, verify before reuse`);
  return { exactHits, semanticHits, skillHits, routeSuggestions: order.map((layer) => `search ${layer} cache`), riskWarnings, searchOrder: order };
}

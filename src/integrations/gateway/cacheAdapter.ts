import type { CacheDecision, ModelRequest, ModelResponse } from '../types';

const responseCache = new Map<string, ModelResponse>();
export function buildCacheKey(request: ModelRequest) { return `${request.userId}:${request.modelIntent}:${request.messages.map((m) => m.content).join('|').slice(0, 160)}`; }
export function shouldUseCache(request: ModelRequest): boolean { return Boolean(request.requiresCaching || request.metadata?.skillId || request.metadata?.cacheKey); }
export function checkCache(request: ModelRequest): CacheDecision {
  const cacheKey = String(request.metadata?.cacheKey ?? buildCacheKey(request));
  const value = responseCache.get(cacheKey);
  if (value) return { hit: true, cacheKey, source: request.metadata?.skillId ? 'skill' : 'response', value, reason: 'skill/response cache hit; provider call skipped' };
  if (request.metadata?.forceCacheHit) {
    const mock: ModelResponse = { providerId: 'cache', modelId: 'skill-cache', output: 'Mock cached skill response', usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 }, estimatedCost: { inputTokens: 0, outputTokens: 0, estimatedCost: 0, currency: 'USD' }, latencyMs: 0, cacheHit: true, safetyFlags: [] };
    return { hit: true, cacheKey, source: 'skill', value: mock, reason: 'forced mock skill cache hit; provider call skipped' };
  }
  return { hit: false, cacheKey, reason: 'cache miss' };
}
export function writeCache(cacheKey: string, response: ModelResponse) { responseCache.set(cacheKey, { ...response, cacheHit: true }); }
export function clearCache() { responseCache.clear(); }

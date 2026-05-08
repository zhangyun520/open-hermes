import { describe, expect, it } from 'vitest';
import { optimizeJellyDrift, type JellySignal } from '../../src/jelly';
const base: JellySignal = { id: 'drift', type: 'wish', sourceModule: 'Wish Pool', summary: '重复模板任务', privacyLevel: 'private', riskLevel: 'low', status: 'received', createdAt: '2026-05-08T00:00:00Z', metadata: {} };
describe('DriftOptimizer', () => {
  it('uses local first for private signals', () => { expect(optimizeJellyDrift(base).useLocalFirst).toBe(true); });
  it('uses cache first for cache_hit signals', () => { expect(optimizeJellyDrift({ ...base, type: 'cache_hit', privacyLevel: 'team' }).useCacheFirst).toBe(true); });
});

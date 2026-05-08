import { describe, expect, it } from 'vitest';
import { routeJellySignal, type JellySignal } from '../../src/jelly';
const base: JellySignal = { id: 's1', type: 'garbage', sourceModule: 'test', summary: 'failure', privacyLevel: 'team', riskLevel: 'low', status: 'received', createdAt: '2026-05-08T00:00:00Z', metadata: {} };
describe('NerveNetRouter', () => {
  it('routes garbage to ResidualDigestor', () => { expect(routeJellySignal(base).routeTo).toContain('ResidualDigestor'); });
  it('sets requiresHumanReview for high risk signals', () => { expect(routeJellySignal({ ...base, riskLevel: 'high' }).requiresHumanReview).toBe(true); });
});

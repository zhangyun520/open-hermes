import { describe, expect, it } from 'vitest';
import { digestResidualSignal, type JellySignal } from '../../src/jelly';
const base: JellySignal = { id: 'd1', type: 'garbage', sourceModule: 'Garbage Station', summary: '普通失败：用户看不懂奖励反馈', privacyLevel: 'team', riskLevel: 'low', status: 'received', createdAt: '2026-05-08T00:00:00Z', metadata: { domain: 'gameplay', residualValue: 70 } };
describe('ResidualDigestor', () => {
  it('classifies AI failure as slag', () => { expect(digestResidualSignal({ ...base, summary: 'AI failure hallucination', metadata: { category: 'ai failure' } }).wasteClass).toBe('slag'); });
  it('generates residualCardCandidate for ordinary failure', () => { const result = digestResidualSignal(base); expect(result.residualCardCandidate?.title).toContain('普通失败'); });
});

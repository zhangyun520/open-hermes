import { describe, expect, it } from 'vitest';
import { evaluateJellySafety, type JellySignal } from '../../src/jelly';
const base: JellySignal = { id: 'safe-1', type: 'external_connector', sourceModule: 'test', targetModule: 'public cache', summary: 'connect', privacyLevel: 'private', riskLevel: 'low', status: 'received', createdAt: '2026-05-08T00:00:00Z', metadata: {} };
describe('CnidocyteSafetyGate', () => {
  it('blocks or reviews private to public risk with redact/human review', () => { const decision = evaluateJellySafety(base); expect(decision.allowed).toBe(false); expect(decision.requiredActions).toEqual(expect.arrayContaining(['redact', 'human_review'])); });
  it('blocks cheat and anti-cheat bypass metadata', () => { const decision = evaluateJellySafety({ ...base, summary: 'anti-cheat bypass request', metadata: { cheat: true } }); expect(decision.allowed).toBe(false); expect(decision.requiredActions).toContain('quarantine'); });
});

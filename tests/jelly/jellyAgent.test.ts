import { describe, expect, it } from 'vitest';
import { createGlowEvent, generateRegenerationPlan, processJellySignal, type JellySignal } from '../../src/jelly';
const base: JellySignal = { id: 'agent', type: 'safety_risk', sourceModule: 'World Experience Gateway', targetModule: 'public cache', summary: 'anti-cheat bypass live multiplayer control', privacyLevel: 'private', riskLevel: 'critical', status: 'received', createdAt: '2026-05-08T00:00:00Z', metadata: { cheat: true } };
describe('JellyAgent', () => {
  it('does not continue dangerous routing when safetyDecision blocks', () => { const result = processJellySignal(base); expect(result.safetyDecision.allowed).toBe(false); expect(result.routeDecision.routeTo).toEqual([]); expect(result.routeDecision.blockedBy).toContain('CnidocyteSafetyGate'); });
  it('creates red glow for safety_risk', () => { expect(createGlowEvent(base).colorHint).toBe('red'); });
  it('generates privacy leak recovery plan with quarantine and redact', () => { const plan = generateRegenerationPlan({ targetId: 'cache-1', targetType: 'cache_object', failureReason: 'privacy leak', riskLevel: 'high' }); expect(plan.steps.join(' ')).toContain('quarantine'); expect(plan.steps.join(' ')).toContain('redact'); });
});

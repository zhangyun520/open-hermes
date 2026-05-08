import type { JellyDigestResult, JellyGlowEvent, JellyRouteDecision, JellySafetyDecision, JellySignal } from './types';
import type { JellyAuditRecord } from './transparentAuditLayer';
import { createGlowEvent } from './bioluminescentFeedback';
import { evaluateJellySafety } from './cnidocyteSafetyGate';
import { routeJellySignal } from './nerveNetRouter';
import { digestResidualSignal } from './residualDigestor';
import { createAuditRecord } from './transparentAuditLayer';
export interface JellyProcessResult { signal: JellySignal; routeDecision: JellyRouteDecision; safetyDecision: JellySafetyDecision; digestResult?: JellyDigestResult; glowEvent: JellyGlowEvent; auditRecord: JellyAuditRecord; }
export function processJellySignal(signal: JellySignal): JellyProcessResult {
  const safetyDecision = evaluateJellySafety(signal);
  if (!safetyDecision.allowed) {
    const routeDecision: JellyRouteDecision = { signalId: signal.id, routeTo: [], blockedBy: ['CnidocyteSafetyGate'], requiresHumanReview: true, useCacheFirst: false, useLocalOnly: signal.privacyLevel === 'private', reason: 'blocked by CnidocyteSafetyGate before dangerous routing' };
    const blockedSignal: JellySignal = { ...signal, status: safetyDecision.riskLevel === 'critical' ? 'quarantined' : 'blocked' };
    const glowEvent = createGlowEvent(signal.type === 'safety_risk' ? signal : { ...signal, type: 'safety_risk' });
    return { signal: blockedSignal, routeDecision, safetyDecision, glowEvent, auditRecord: createAuditRecord(blockedSignal, routeDecision, safetyDecision) };
  }
  const routeDecision = routeJellySignal(signal);
  const digestResult = ['garbage', 'world_experience', 'reverse_wish'].includes(signal.type) ? digestResidualSignal(signal) : undefined;
  const glowEvent = createGlowEvent(signal);
  return { signal: { ...signal, status: 'routed' }, routeDecision, safetyDecision, digestResult, glowEvent, auditRecord: createAuditRecord(signal, routeDecision, safetyDecision) };
}

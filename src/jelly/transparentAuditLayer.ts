import type { JellyRouteDecision, JellySafetyDecision, JellySignal } from './types';
export interface JellyAuditRecord { id: string; signalId: string; routeDecision: JellyRouteDecision; safetyDecision: JellySafetyDecision; timestamp: string; explanation: string; }
export function createAuditRecord(signal: JellySignal, routeDecision: JellyRouteDecision, safetyDecision: JellySafetyDecision): JellyAuditRecord {
  const parts = [`${signal.type} from ${signal.sourceModule} routed to ${routeDecision.routeTo.join(', ') || 'no dangerous route'}`];
  if (routeDecision.requiresHumanReview || safetyDecision.requiredActions.includes('human_review')) parts.push('human review required by risk/safety gate');
  if (routeDecision.useCacheFirst) parts.push('cache-first because reusable memory is available');
  if (routeDecision.useLocalOnly) parts.push('local-only because privacy level is private');
  if (!safetyDecision.allowed) parts.push(`blocked by CnidocyteSafetyGate: ${safetyDecision.reasons.join('; ')}`);
  return { id: `audit-${signal.id}`, signalId: signal.id, routeDecision, safetyDecision, timestamp: new Date().toISOString(), explanation: parts.join('. ') };
}

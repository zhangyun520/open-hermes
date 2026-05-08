import type { JellyRouteDecision, JellySignal } from './types';

const baseRoutes: Record<JellySignal['type'], string[]> = {
  wish: ['Wish Pool', 'Residual Cards'],
  reverse_wish: ['Reverse Wish Pool', 'Shared Cache candidate'],
  garbage: ['ResidualDigestor'],
  residual_card: ['Review Pool', 'Skill Capsules'],
  skill_hit: ['Skill Capsules', 'Contribution Ledger', 'BioluminescentFeedback'],
  cache_hit: ['BioluminescentFeedback', 'Contribution Ledger'],
  review: ['Review Pool', 'TransparentAuditLayer'],
  safety_risk: ['CnidocyteSafetyGate', 'Review Pool'],
  bias_alert: ['Bias Shelter'],
  human_transition: ['Human Transition Layer'],
  world_experience: ['World Experience Gateway', 'Residual Cards'],
  external_connector: ['Ecosystem Gateway', 'Safety Gate'],
  version_event: ['Polyphonic Versioning']
};

export function routeJellySignal(signal: JellySignal): JellyRouteDecision {
  const highRisk = signal.riskLevel === 'high' || signal.riskLevel === 'critical';
  const useCacheFirst = signal.type === 'cache_hit' || signal.type === 'skill_hit' || signal.metadata.cacheAvailable === true;
  const useLocalOnly = signal.privacyLevel === 'private';
  return { signalId: signal.id, routeTo: baseRoutes[signal.type] ?? ['TransparentAuditLayer'], requiresHumanReview: highRisk, useCacheFirst, useLocalOnly, reason: `${signal.type} signal routed by distributed nerve net${highRisk ? '; high risk requires human review' : ''}${useLocalOnly ? '; private signal stays local' : ''}` };
}

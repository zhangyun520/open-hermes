import type { CodexTask, ModelProvider, ModelRequest, ModelResponse, ProviderHealth, ProviderRouteDecision, UsageRecord } from '../types';
import { checkCache, shouldUseCache, writeCache } from './cacheAdapter';
import { getModelProvider, listModelProviders } from './connectorRegistry';
import { defaultRoutingPolicy } from './routingPolicy';
import { recordUsage } from './usageLedger';
import { shouldUseLocalProvider } from './safetyGate';

export { registerModelProvider } from './connectorRegistry';
export { recordUsage } from './usageLedger';
export { shouldUseCache } from './cacheAdapter';
export { shouldUseLocalProvider } from './safetyGate';

export function routeModelTask(request: ModelRequest): ProviderRouteDecision {
  const cache = shouldUseCache(request) ? checkCache(request) : { hit: false, cacheKey: '', reason: 'cache not requested' };
  if (cache.hit) return { providerId: 'cache', modelId: cache.value?.modelId, routeReason: cache.reason, requiresHumanApproval: false, humanReviewRequired: false, cacheHit: true, cacheKey: cache.cacheKey, fallbackProviderIds: [] };

  if (shouldUseLocalProvider(request)) {
    return { providerId: 'local', modelId: 'local-mock', routeReason: 'high privacy/private_local task routed to local provider first', requiresHumanApproval: false, humanReviewRequired: request.modelIntent === 'review', cacheHit: false, fallbackProviderIds: ['deepseek'] };
  }

  if (request.modelIntent === 'review' && request.metadata?.risk === 'high') {
    return { providerId: 'openai', modelId: 'openai-mock-strong', routeReason: 'high-risk review requires human review even with provider assistance', requiresHumanApproval: true, humanReviewRequired: true, cacheHit: false, fallbackProviderIds: ['claude'] };
  }

  const candidates = defaultRoutingPolicy[request.modelIntent] ?? ['openai'];
  return { providerId: candidates[0], routeReason: `${request.modelIntent} routed by default policy to ${candidates[0]}`, requiresHumanApproval: false, humanReviewRequired: false, cacheHit: false, fallbackProviderIds: candidates.slice(1) };
}

export function estimateModelCost(request: ModelRequest, provider: ModelProvider) { return provider.estimateCost(request); }

export async function executeModelRequest(request: ModelRequest): Promise<ModelResponse> {
  const decision = routeModelTask(request);
  if (decision.cacheHit) {
    const cached = checkCache(request).value;
    if (cached) {
      recordUsage(buildUsageRecord(request, cached, decision.routeReason));
      return cached;
    }
  }
  const provider = getModelProvider(decision.providerId) ?? getModelProvider(decision.fallbackProviderIds[0] ?? 'openai');
  if (!provider) throw new Error(`No provider registered for ${decision.providerId}`);
  const response = await provider.complete(request);
  const decorated = { ...response, cacheHit: false };
  if (request.requiresCaching) writeCache(decision.cacheKey ?? `${request.userId}:${request.taskId}`, decorated);
  recordUsage(buildUsageRecord(request, decorated, decision.routeReason));
  return decorated;
}

function buildUsageRecord(request: ModelRequest, response: ModelResponse, routeReason: string): UsageRecord {
  return { usageId: `usage-${request.taskId}-${Date.now()}`, providerId: response.providerId, taskId: request.taskId, inputTokens: response.usage.inputTokens, outputTokens: response.usage.outputTokens, estimatedCost: response.estimatedCost.estimatedCost, cacheHit: response.cacheHit, latencyMs: response.latencyMs, privacyLevel: request.privacyLevel, routeReason, createdAt: new Date().toISOString() };
}

export function generateCodexTaskPrompt(task: CodexTask): string {
  return `# Goal\n${task.taskPrompt}\n\n# Context\nRepo: ${task.repo}\nBranch: ${task.branch}\nExpected files: ${task.expectedFiles.join(', ') || 'TBD'}\nMode: ${task.mode}\n\n# Constraints\n${task.safetyConstraints.map((item) => `- ${item}`).join('\n')}\n\n# Done When\n- Requested changes are implemented.\n- Safety constraints are satisfied.\n- Tests pass or limitations are documented.\n\n# Test Command\n${task.testCommand}`;
}

export async function checkProviderHealth(providerId: string): Promise<ProviderHealth> {
  const provider = getModelProvider(providerId);
  if (!provider) return { providerId, ok: false, status: 'error', latencyMs: 0, message: 'provider not registered' };
  return provider.healthCheck();
}

export function buildRouteExplanation(decision: ProviderRouteDecision): string {
  return `${decision.cacheHit ? 'Cache hit' : `Provider ${decision.providerId}`} — ${decision.routeReason}${decision.humanReviewRequired ? '；需要人工审核' : ''}${decision.requiresHumanApproval ? '；需要人工确认' : ''}`;
}

export function integrationProviderSummary() { return listModelProviders().map((provider) => ({ id: provider.id, name: provider.name, vendor: provider.vendor, status: provider.status, capabilities: provider.capabilities })); }

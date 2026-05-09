import { recordUsage } from '../integrations/gateway/usageLedger';
import type { UsageRecord } from '../integrations/types';
import type { AgentRunResult, TentacleManifest } from './types';

export function recordAgentMockUsage(tentacle: TentacleManifest, run: AgentRunResult): UsageRecord {
  return recordUsage({ usageId: `usage-${run.taskId}`, connectorId: tentacle.id, taskId: run.taskId, inputTokens: 0, outputTokens: 0, estimatedCost: 0, cacheHit: false, latencyMs: 0, privacyLevel: tentacle.privacyBoundary === 'local_only' ? 'high' : 'medium', routeReason: run.auditSummary, createdAt: new Date().toISOString() });
}

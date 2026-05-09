import { digestResidualSignal } from '../jelly/residualDigestor';
import type { JellyDigestResult, JellySignal } from '../jelly/types';
import type { AgentRunResult } from './types';

export function agentRunFailureToSignal(run: AgentRunResult): JellySignal {
  return { id: `agent-failure-${run.taskId}`, type: 'garbage', sourceModule: 'PersonalAgent', targetModule: 'ResidualDigestor', summary: `Personal agent task failed or blocked: ${run.auditSummary}`, privacyLevel: 'private', riskLevel: run.blocked ? 'high' : 'medium', status: 'digesting', createdAt: new Date().toISOString(), metadata: { category: 'ai failure', residualValue: 64, rawLogsExcluded: true, taskId: run.taskId } };
}

export function digestAgentRunFailure(run: AgentRunResult): JellyDigestResult {
  return digestResidualSignal(agentRunFailureToSignal(run));
}

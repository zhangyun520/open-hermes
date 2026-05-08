import { listActionApprovals } from './appGateway';
import { integrationProviderSummary } from './modelGateway';
import { listAppConnectors } from './connectorRegistry';
import { listUsageRecords } from './usageLedger';
import type { AppAction, UsageRecord } from '../types';

export const providerSummaries = integrationProviderSummary();
export const connectorSummaries = listAppConnectors().map((connector) => ({ id: connector.id, name: connector.name, appType: connector.appType, status: connector.status, authType: connector.authType, capabilities: connector.capabilities, lastSync: '2026-05-08T00:00:00Z' }));
export const mockUsageRecords: UsageRecord[] = [
  { usageId: 'usage-wish-1', providerId: 'deepseek', taskId: 'wish-draft-w1', inputTokens: 420, outputTokens: 260, estimatedCost: 0.0011, cacheHit: false, latencyMs: 180, privacyLevel: 'medium', routeReason: 'cheap_batch routed by default policy to deepseek', createdAt: '2026-05-08T00:00:00Z' },
  { usageId: 'usage-skill-cache', providerId: 'cache', taskId: 'skill-hit-s1', inputTokens: 0, outputTokens: 0, estimatedCost: 0, cacheHit: true, latencyMs: 0, privacyLevel: 'low', routeReason: 'skill/response cache hit; provider call skipped', createdAt: '2026-05-08T00:10:00Z' },
  ...listUsageRecords()
];
export const mockApprovalActions: AppAction[] = [
  { actionId: 'approval-github-pr', connectorId: 'github', userId: 'u-lan', actionType: 'submit_pr', payload: { title: 'Update residual workflow' }, summary: '提交 PR 修改残差工作流', riskLevel: 'medium' },
  { actionId: 'approval-gmail-send', connectorId: 'gmail', userId: 'u-lan', actionType: 'send_email', payload: { to: 'mock@example.com' }, summary: '发送教育评估报告对外邮件', riskLevel: 'high' }
];
export const approvalQueue = [...listActionApprovals(), ...mockApprovalActions.map((action) => ({ actionId: action.actionId, connector: action.connectorId, actionType: action.actionType, riskLevel: action.riskLevel, summary: action.summary, status: 'pending' as const, createdAt: '2026-05-08T00:20:00Z' }))];

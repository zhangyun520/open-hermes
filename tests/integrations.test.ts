import { describe, expect, it } from 'vitest';
import type { AppAction, CodexTask, ModelRequest, UsageRecord } from '../src/integrations/types';
import { checkConnectorPermission, clearActionApprovals, enqueueActionApproval, executeAppAction, requestConnectorConsent } from '../src/integrations/gateway/appGateway';
import { clearCache, writeCache } from '../src/integrations/gateway/cacheAdapter';
import { buildRouteExplanation, executeModelRequest, generateCodexTaskPrompt, routeModelTask } from '../src/integrations/gateway/modelGateway';
import { detectPrivacyLevel } from '../src/integrations/gateway/safetyGate';
import { clearUsageRecords, recordUsage } from '../src/integrations/gateway/usageLedger';

const baseRequest: ModelRequest = {
  taskId: 'task-1',
  userId: 'u1',
  modelIntent: 'cheap_batch',
  messages: [{ role: 'user', content: 'classify residual' }],
  privacyLevel: 'low',
  maxTokens: 200,
  requiresCaching: false
};

describe('Integration Gateway', () => {
  it('routes high privacy tasks to local provider first', () => {
    const decision = routeModelTask({ ...baseRequest, privacyLevel: 'high' });
    expect(decision.providerId).toBe('local');
    expect(decision.routeReason).toContain('high privacy');
  });

  it('routes cheap_batch tasks to DeepSeek mock provider', () => {
    const decision = routeModelTask(baseRequest);
    expect(decision.providerId).toBe('deepseek');
  });

  it('generates Codex task prompt for coding tasks', () => {
    const task: CodexTask = { taskId: 'codex-1', repo: 'org/repo', branch: 'work', taskPrompt: 'Add tests', expectedFiles: ['tests/a.test.ts'], testCommand: 'npm test', safetyConstraints: ['Do not commit secrets'], mode: 'manual_prompt', status: 'queued' };
    const prompt = generateCodexTaskPrompt(task);
    expect(prompt).toContain('# Goal');
    expect(prompt).toContain('# Context');
    expect(prompt).toContain('# Constraints');
    expect(prompt).toContain('# Done When');
    expect(prompt).toContain('# Test Command');
  });

  it('skips provider execution on cache hit', async () => {
    clearCache();
    const request = { ...baseRequest, taskId: 'cache-task', requiresCaching: true, metadata: { cacheKey: 'cache-key' } };
    writeCache('cache-key', { providerId: 'deepseek', modelId: 'cached', output: 'cached', usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 }, estimatedCost: { inputTokens: 0, outputTokens: 0, estimatedCost: 0, currency: 'USD' }, latencyMs: 0, cacheHit: true, safetyFlags: [] });
    const response = await executeModelRequest(request);
    expect(response.cacheHit).toBe(true);
    expect(response.providerId).toBe('deepseek');
  });

  it('queues external write actions for approval', () => {
    clearActionApprovals();
    const action: AppAction = { actionId: 'a1', connectorId: 'gmail', userId: 'u1', actionType: 'send_email', payload: {}, summary: '发送邮件', riskLevel: 'medium' };
    const approval = enqueueActionApproval(action);
    expect(approval.status).toBe('pending');
  });

  it('blocks unauthorized connector writeAction', async () => {
    const action: AppAction = { actionId: 'a2', connectorId: 'gmail', userId: 'u-no-consent', actionType: 'send_email', payload: {}, summary: '发送邮件', riskLevel: 'medium' };
    expect(checkConnectorPermission('gmail', action)).toBe(false);
    const result = await executeAppAction(action);
    expect(result.status).toBe('blocked');
  });

  it('detects high privacy from phone, ID, and plate', () => {
    expect(detectPrivacyLevel('电话 13812345678')).toBe('high');
    expect(detectPrivacyLevel('身份证 110105199001011234')).toBe('high');
    expect(detectPrivacyLevel('车牌 京A12345')).toBe('high');
  });

  it('route decision returns routeReason and explanation', () => {
    const decision = routeModelTask({ ...baseRequest, modelIntent: 'strong_reasoning' });
    expect(decision.routeReason.length).toBeGreaterThan(0);
    expect(buildRouteExplanation(decision)).toContain(decision.routeReason);
  });

  it('records usage with provider, cost, and cacheHit', () => {
    clearUsageRecords();
    const usage: UsageRecord = { usageId: 'u1', providerId: 'deepseek', taskId: 't1', inputTokens: 10, outputTokens: 20, estimatedCost: 0.01, cacheHit: false, latencyMs: 12, privacyLevel: 'low', routeReason: 'test', createdAt: 'now' };
    expect(recordUsage(usage)).toMatchObject({ providerId: 'deepseek', estimatedCost: 0.01, cacheHit: false });
  });

  it('allows consented writes only through approval queue', async () => {
    requestConnectorConsent('github', ['read', 'write', 'submitPR'], 'u1');
    const action: AppAction = { actionId: 'a3', connectorId: 'github', userId: 'u1', actionType: 'submit_pr', payload: {}, summary: '提交 PR', riskLevel: 'medium' };
    const result = await executeAppAction(action);
    expect(result.status).toBe('queued_for_approval');
  });
});

import { describe, expect, it } from 'vitest';
import { agentRunFailureToSignal, digestAgentRunFailure, type AgentRunResult } from '../../src/agents';

const run: AgentRunResult = { taskId: 'fail-1', phases: ['observe', 'blocked', 'digest_residual'], executed: false, blocked: true, requiresHumanApproval: true, admissionDecision: { tentacleId: 'tentacle-1', allowed: false, riskLevel: 'high', reasons: ['blocked'], requiredActions: ['human_review'] }, auditSummary: 'mock failure without raw logs', residualDigestNotes: [] };

describe('AgentResidualDigest', () => {
  it('excludes raw logs from failure signals', () => {
    const signal = agentRunFailureToSignal(run);
    expect(signal.metadata.rawLogsExcluded).toBe(true);
    expect(signal.privacyLevel).toBe('private');
  });

  it('digests failed runs into residual material', () => {
    const digest = digestAgentRunFailure(run);
    expect(digest.signalId).toContain('fail-1');
    expect(digest.notes.length).toBeGreaterThan(0);
  });
});

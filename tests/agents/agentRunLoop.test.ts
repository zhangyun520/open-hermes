import { describe, expect, it } from 'vitest';
import { approveTentacle, createPersonalAgent, proposeTentacle, runPersonalAgentTask } from '../../src/agents';

const agent = createPersonalAgent({ ownerId: 'u1', name: 'Runner', description: 'test' });

describe('AgentRunLoop', () => {
  it('executes only mock read-only approved tentacles', () => {
    const tentacle = approveTentacle(proposeTentacle(agent, { name: 'Reader', purpose: 'local repo read', capabilities: ['repo_read'], permissions: ['read_local'], networkAccess: 'none', allowlist: [], privacyBoundary: 'local_only', runMode: 'autonomous_read_only', canRead: true, canWrite: false, canExecute: false, canCallExternalApi: false, requiresHumanApproval: false, auditRequired: true, residualDigestRequired: true, metadata: {} }));
    const run = runPersonalAgentTask({ taskId: 't1', agent, tentacle, summary: 'read repo', privacyLevel: 'private', riskLevel: 'low', metadata: {} });
    expect(run.executed).toBe(true);
    expect(run.phases).toContain('execute_mock');
  });

  it('blocks unsafe tentacles before execution and digests residuals', () => {
    const tentacle = proposeTentacle(agent, { name: 'Open Writer', purpose: 'mass send payment notice', capabilities: ['external_app_write'], permissions: ['write_external'], networkAccess: 'open_requires_approval', allowlist: [], privacyBoundary: 'public', runMode: 'approval_required', canRead: true, canWrite: true, canExecute: false, canCallExternalApi: true, requiresHumanApproval: true, auditRequired: true, residualDigestRequired: true, metadata: {} });
    const run = runPersonalAgentTask({ taskId: 't2', agent, tentacle, summary: 'unsafe write', privacyLevel: 'private', riskLevel: 'high', metadata: {} });
    expect(run.executed).toBe(false);
    expect(run.blocked).toBe(true);
    expect(run.residualDigestNotes.length).toBeGreaterThan(0);
  });
});

import { describe, expect, it } from 'vitest';
import { approveTentacle, canRunTentacle, createPersonalAgent, disableTentacle, proposeTentacle } from '../../src/agents';

describe('PersonalAgent', () => {
  it('defaults personal agents to local-only dry-run mode', () => {
    const agent = createPersonalAgent({ ownerId: 'u1', name: 'Local Jelly', description: 'test' });
    expect(agent.privacyBoundary).toBe('local_only');
    expect(agent.defaultRunMode).toBe('dry_run');
  });

  it('requires approval for network or write tentacles', () => {
    const agent = createPersonalAgent({ ownerId: 'u1', name: 'Local Jelly', description: 'test' });
    const tentacle = proposeTentacle(agent, { name: 'Writer', purpose: 'write external', capabilities: ['external_app_write'], permissions: ['write_external'], networkAccess: 'allowlist', allowlist: ['example.com'], privacyBoundary: 'team', runMode: 'dry_run', canRead: true, canWrite: false, canExecute: false, canCallExternalApi: false, requiresHumanApproval: false, auditRequired: true, residualDigestRequired: true, metadata: {} });
    expect(tentacle.requiresHumanApproval).toBe(true);
    expect(tentacle.canWrite).toBe(true);
  });

  it('disabled tentacles cannot run', () => {
    const agent = createPersonalAgent({ ownerId: 'u1', name: 'Local Jelly', description: 'test' });
    const tentacle = approveTentacle(proposeTentacle(agent, { name: 'Reader', purpose: 'read local', capabilities: ['repo_read'], permissions: ['read_local'], networkAccess: 'none', allowlist: [], privacyBoundary: 'local_only', runMode: 'autonomous_read_only', canRead: true, canWrite: false, canExecute: false, canCallExternalApi: false, requiresHumanApproval: false, auditRequired: true, residualDigestRequired: true, metadata: {} }));
    expect(canRunTentacle(tentacle)).toBe(true);
    expect(canRunTentacle(disableTentacle(tentacle))).toBe(false);
  });
});

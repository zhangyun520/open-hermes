import { describe, expect, it } from 'vitest';
import { createPersonalAgent, evaluateTentacleAdmission, proposeTentacle } from '../../src/agents';

const agent = createPersonalAgent({ ownerId: 'u1', name: 'Gate Agent', description: 'test' });

describe('TentacleAdmissionGate', () => {
  it('blocks open network access without allowlist and human review', () => {
    const tentacle = proposeTentacle(agent, { name: 'Open Web', purpose: 'web qa', capabilities: ['web_fetch'], permissions: ['read_network'], networkAccess: 'open_requires_approval', allowlist: [], privacyBoundary: 'team', runMode: 'approval_required', canRead: true, canWrite: false, canExecute: false, canCallExternalApi: true, requiresHumanApproval: true, auditRequired: true, residualDigestRequired: true, metadata: {} });
    const decision = evaluateTentacleAdmission(tentacle);
    expect(decision.allowed).toBe(false);
    expect(decision.requiredActions).toEqual(expect.arrayContaining(['allowlist_required', 'human_review']));
  });

  it('blocks write actions without consent review', () => {
    const tentacle = proposeTentacle(agent, { name: 'Slack Writer', purpose: 'send message', capabilities: ['external_app_write'], permissions: ['write_external'], networkAccess: 'allowlist', allowlist: ['slack.com'], privacyBoundary: 'team', runMode: 'approval_required', canRead: true, canWrite: true, canExecute: false, canCallExternalApi: true, requiresHumanApproval: true, auditRequired: true, residualDigestRequired: true, metadata: {} });
    const decision = evaluateTentacleAdmission(tentacle);
    expect(decision.allowed).toBe(false);
    expect(decision.requiredActions).toContain('consent_required');
  });

  it('rejects secret access', () => {
    const tentacle = proposeTentacle(agent, { name: 'Secret Reader', purpose: 'read token', capabilities: ['repo_read'], permissions: ['access_secret'], networkAccess: 'none', allowlist: [], privacyBoundary: 'local_only', runMode: 'dry_run', canRead: true, canWrite: false, canExecute: false, canCallExternalApi: false, requiresHumanApproval: false, auditRequired: true, residualDigestRequired: true, metadata: {} });
    const decision = evaluateTentacleAdmission(tentacle);
    expect(decision.riskLevel).toBe('critical');
    expect(decision.requiredActions).toContain('reject');
  });
});

import { describe, expect, it } from 'vitest';
import { evaluateSandboxRequest, listMockSandboxProfiles } from '../../src/agents';

const profiles = listMockSandboxProfiles();

describe('SandboxPolicy', () => {
  it('rejects destructive commands', () => {
    const decision = evaluateSandboxRequest({ requestId: 's1', profile: profiles[0], commandSummary: 'delete workspace', needsNetwork: false, targetDomains: [], needsSecrets: false, handlesPrivateData: false, destructive: true });
    expect(decision.allowed).toBe(false);
    expect(decision.requiredActions).toContain('reject_destructive');
  });

  it('requires allowlist for network domains', () => {
    const decision = evaluateSandboxRequest({ requestId: 's2', profile: profiles[1], commandSummary: 'fetch docs', needsNetwork: true, targetDomains: ['unknown.example'], needsSecrets: false, handlesPrivateData: false, destructive: false });
    expect(decision.allowed).toBe(false);
    expect(decision.requiredActions).toContain('allowlist_required');
  });

  it('denies secrets by default', () => {
    const decision = evaluateSandboxRequest({ requestId: 's3', profile: profiles[2], commandSummary: 'use token', workspaceScope: '/workspace/open-hermes', needsNetwork: false, targetDomains: [], needsSecrets: true, handlesPrivateData: false, destructive: false });
    expect(decision.allowed).toBe(false);
    expect(decision.requiredActions).toContain('secret_denied');
  });
});

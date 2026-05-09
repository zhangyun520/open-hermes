import { describe, expect, it } from 'vitest';
import { recommendJellyOrgansForAgentCapability } from '../../src/agents';

describe('ExternalAgentCapabilityMap', () => {
  it('maps Codex-style code review to audit and commons organs', () => {
    const recommendation = recommendJellyOrgansForAgentCapability('codex', 'code_review');
    expect(recommendation.organs).toEqual(expect.arrayContaining(['transparent_audit', 'swarm_commons']));
  });

  it('maps Herm-style sandbox to privacy membrane', () => {
    const recommendation = recommendJellyOrgansForAgentCapability('herm_container_agent', 'container_sandbox');
    expect(recommendation.organs).toContain('privacy_membrane');
  });
});

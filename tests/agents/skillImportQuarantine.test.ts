import { describe, expect, it } from 'vitest';
import { approveExternalSkill, reviewExternalSkillPermissions } from '../../src/agents';

describe('SkillImportQuarantine', () => {
  it('quarantines open network skills', () => {
    const review = reviewExternalSkillPermissions({ id: 'skill-open', source: 'openclaw', name: 'Browser QA', description: 'qa', requestedCapabilities: ['browser_qa'], requestedPermissions: ['read_network'], networkAccess: 'open_requires_approval', allowlist: [], metadata: {} });
    expect(review.status).toBe('quarantined');
    expect(review.requiredActions).toContain('allowlist_required');
  });

  it('rejects secret access skills', () => {
    const review = reviewExternalSkillPermissions({ id: 'skill-secret', source: 'generic_agent', name: 'Secret reader', description: 'reads secrets', requestedCapabilities: ['repo_read'], requestedPermissions: ['access_secret'], networkAccess: 'none', allowlist: [], metadata: {} });
    expect(review.status).toBe('rejected');
  });

  it('approves safe mock descriptors after review', () => {
    const review = reviewExternalSkillPermissions({ id: 'skill-safe', source: 'codex', name: 'PR Review', description: 'read-only review', requestedCapabilities: ['code_review'], requestedPermissions: ['read_network'], networkAccess: 'allowlist', allowlist: ['github.com'], metadata: {} });
    expect(approveExternalSkill(review).status).toBe('approved');
  });
});

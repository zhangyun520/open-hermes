import { approveTentacle, createPersonalAgent, proposeTentacle } from './personalAgent';
import { listMockSandboxProfiles } from './sandboxPolicy';
import type { ExternalSkillDescriptor } from './types';

export const mockPersonalAgent = createPersonalAgent({ ownerId: 'local-user', name: 'Local Jelly Agent', description: 'Mock personal agent that proposes safe tentacles before any external action.' });
export const mockTentacles = [
  approveTentacle(proposeTentacle(mockPersonalAgent, { name: 'Repo Read Tentacle', purpose: 'Read local repository structure and summarize residuals.', capabilities: ['repo_read', 'residual_digest'], permissions: ['read_local'], networkAccess: 'none', allowlist: [], privacyBoundary: 'local_only', runMode: 'autonomous_read_only', canRead: true, canWrite: false, canExecute: false, canCallExternalApi: false, requiresHumanApproval: false, auditRequired: true, residualDigestRequired: true, metadata: {} })),
  proposeTentacle(mockPersonalAgent, { name: 'Open Web QA Tentacle', purpose: 'Mock browser QA with open network; requires approval.', capabilities: ['browser_qa', 'web_fetch'], permissions: ['read_network'], networkAccess: 'open_requires_approval', allowlist: [], privacyBoundary: 'team', runMode: 'approval_required', canRead: true, canWrite: false, canExecute: false, canCallExternalApi: true, requiresHumanApproval: true, auditRequired: true, residualDigestRequired: true, metadata: {} })
];
export const mockSandboxProfiles = listMockSandboxProfiles();
export const mockExternalSkills: ExternalSkillDescriptor[] = [
  { id: 'skill-github-pr-review', source: 'codex', name: 'GitHub PR Review', description: 'Mock PR review skill descriptor.', requestedCapabilities: ['code_review'], requestedPermissions: ['read_network'], networkAccess: 'allowlist', allowlist: ['github.com'], metadata: {} },
  { id: 'skill-openclaw-browser-qa', source: 'openclaw', name: 'Browser QA', description: 'Mock browser QA skill imported into quarantine.', requestedCapabilities: ['browser_qa'], requestedPermissions: ['read_network'], networkAccess: 'open_requires_approval', allowlist: [], metadata: {} }
];

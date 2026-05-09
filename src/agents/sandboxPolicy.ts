import type { SandboxExecutionDecision, SandboxExecutionRequest, SandboxProfile } from './types';

export function listMockSandboxProfiles(): SandboxProfile[] {
  return [
    { id: 'local_readonly', name: 'Local Readonly', networkAccess: 'none', allowlist: [], canWriteWorkspace: false, canAccessSecrets: false, ephemeral: false, requiresHumanReview: false },
    { id: 'local_network_allowlist', name: 'Local Network Allowlist', networkAccess: 'allowlist', allowlist: ['developers.openai.com', 'docs.anthropic.com'], canWriteWorkspace: false, canAccessSecrets: false, ephemeral: false, requiresHumanReview: true },
    { id: 'container_ephemeral', name: 'Ephemeral Container', networkAccess: 'allowlist', allowlist: [], canWriteWorkspace: true, canAccessSecrets: false, ephemeral: true, requiresHumanReview: true },
    { id: 'human_review_required', name: 'Human Review Required', networkAccess: 'open_requires_approval', allowlist: [], canWriteWorkspace: false, canAccessSecrets: false, ephemeral: true, requiresHumanReview: true }
  ];
}

export function evaluateSandboxRequest(request: SandboxExecutionRequest): SandboxExecutionDecision {
  const reasons: string[] = [];
  const requiredActions: SandboxExecutionDecision['requiredActions'] = [];
  let allowed = true;
  if (request.destructive) { reasons.push('destructive command summaries are rejected'); requiredActions.push('reject_destructive'); allowed = false; }
  if (request.needsSecrets || request.profile.canAccessSecrets) { reasons.push('secrets are unavailable to personal-agent sandboxes by default'); requiredActions.push('secret_denied'); allowed = false; }
  if (request.profile.canWriteWorkspace && !request.workspaceScope) { reasons.push('workspace write requires an explicit scope'); requiredActions.push('workspace_scope_required'); allowed = false; }
  if (request.needsNetwork) {
    if (request.profile.networkAccess === 'none') { reasons.push('selected sandbox profile has no network access'); requiredActions.push('allowlist_required'); allowed = false; }
    const outside = request.targetDomains.filter((domain) => !request.profile.allowlist.includes(domain));
    if (request.profile.networkAccess === 'allowlist' && outside.length > 0) { reasons.push(`domains outside allowlist: ${outside.join(', ')}`); requiredActions.push('allowlist_required'); allowed = false; }
    if (request.profile.networkAccess === 'open_requires_approval') { reasons.push('open network profile requires human review'); requiredActions.push('human_review'); allowed = false; }
  }
  if (request.handlesPrivateData && request.needsNetwork) { reasons.push('private data cannot leave local sandbox'); requiredActions.push('local_only'); allowed = false; }
  return { requestId: request.requestId, allowed, reasons: reasons.length ? reasons : ['sandbox request is mock-only and policy-compatible'], requiredActions: [...new Set(requiredActions)] };
}

import type { JellyOrganType, JellyPrivacyLevel, JellyRiskLevel } from '../jelly/types';

export type AgentNetworkAccess = 'none' | 'allowlist' | 'open_requires_approval';
export type AgentPrivacyBoundary = 'local_only' | 'team' | 'community' | 'public';
export type TentacleRunMode = 'dry_run' | 'approval_required' | 'autonomous_read_only';
export type TentacleCapability = 'repo_read' | 'file_read' | 'file_write' | 'web_fetch' | 'browser_qa' | 'code_review' | 'skill_import' | 'external_app_read' | 'external_app_write' | 'sandbox_execute' | 'residual_digest';
export type TentaclePermission = 'read_local' | 'read_network' | 'write_local' | 'write_external' | 'execute_sandbox' | 'access_secret' | 'write_public_cache';
export type AgentRunPhase = 'observe' | 'plan' | 'safety_check' | 'privacy_check' | 'dry_run' | 'human_approval' | 'execute_mock' | 'verify' | 'digest_residual' | 'audit' | 'blocked';
export type SandboxProfileId = 'local_readonly' | 'local_network_allowlist' | 'container_ephemeral' | 'human_review_required';
export type SkillImportStatus = 'submitted' | 'quarantined' | 'mock_verified' | 'approved' | 'rejected';
export type ExternalAgentProvider = 'codex' | 'claude_code' | 'openclaw' | 'herm_container_agent' | 'generic_agent';
export type ExternalAgentCapability = 'code_review' | 'code_execution' | 'browser_qa' | 'skill_marketplace' | 'container_sandbox' | 'long_running_task' | 'mcp_tooling';

export interface PersonalAgent {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  privacyBoundary: AgentPrivacyBoundary;
  defaultRunMode: TentacleRunMode;
  enabled: boolean;
  tentacleIds: string[];
  createdAt: string;
}

export interface TentacleManifest {
  id: string;
  agentId: string;
  name: string;
  purpose: string;
  capabilities: TentacleCapability[];
  permissions: TentaclePermission[];
  networkAccess: AgentNetworkAccess;
  allowlist: string[];
  privacyBoundary: AgentPrivacyBoundary;
  runMode: TentacleRunMode;
  canRead: boolean;
  canWrite: boolean;
  canExecute: boolean;
  canCallExternalApi: boolean;
  requiresHumanApproval: boolean;
  auditRequired: boolean;
  residualDigestRequired: boolean;
  status: 'proposed' | 'approved' | 'disabled' | 'rejected';
  metadata: Record<string, unknown>;
}

export interface TentacleAdmissionDecision {
  tentacleId: string;
  allowed: boolean;
  riskLevel: JellyRiskLevel;
  requiredActions: Array<'allowlist_required' | 'consent_required' | 'human_review' | 'redact' | 'quarantine' | 'reject' | 'sandbox_required'>;
  reasons: string[];
}

export interface AgentTaskInput {
  taskId: string;
  agent: PersonalAgent;
  tentacle: TentacleManifest;
  summary: string;
  privacyLevel: JellyPrivacyLevel;
  riskLevel: JellyRiskLevel;
  metadata: Record<string, unknown>;
  approvedByHuman?: boolean;
}

export interface AgentRunResult {
  taskId: string;
  phases: AgentRunPhase[];
  executed: boolean;
  blocked: boolean;
  requiresHumanApproval: boolean;
  admissionDecision: TentacleAdmissionDecision;
  auditSummary: string;
  residualDigestNotes: string[];
}

export interface SandboxProfile {
  id: SandboxProfileId;
  name: string;
  networkAccess: AgentNetworkAccess;
  allowlist: string[];
  canWriteWorkspace: boolean;
  canAccessSecrets: boolean;
  ephemeral: boolean;
  requiresHumanReview: boolean;
}

export interface SandboxExecutionRequest {
  requestId: string;
  profile: SandboxProfile;
  commandSummary: string;
  workspaceScope?: string;
  needsNetwork: boolean;
  targetDomains: string[];
  needsSecrets: boolean;
  handlesPrivateData: boolean;
  destructive: boolean;
}

export interface SandboxExecutionDecision {
  requestId: string;
  allowed: boolean;
  reasons: string[];
  requiredActions: Array<'human_review' | 'allowlist_required' | 'workspace_scope_required' | 'secret_denied' | 'reject_destructive' | 'local_only'>;
}

export interface ExternalSkillDescriptor {
  id: string;
  source: ExternalAgentProvider;
  name: string;
  description: string;
  requestedCapabilities: TentacleCapability[];
  requestedPermissions: TentaclePermission[];
  networkAccess: AgentNetworkAccess;
  allowlist: string[];
  metadata: Record<string, unknown>;
}

export interface SkillImportReview {
  skillId: string;
  status: SkillImportStatus;
  reasons: string[];
  requiredActions: string[];
  safeAsMockOnly: boolean;
}

export interface AgentCapabilityRecommendation {
  provider: ExternalAgentProvider;
  capability: ExternalAgentCapability;
  organs: JellyOrganType[];
  requiredSafety: string[];
}

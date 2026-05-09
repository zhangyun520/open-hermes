import { evaluateTentacleAdmission } from './tentacleAdmissionGate';
import { digestAgentRunFailure } from './agentResidualDigest';
import type { AgentRunPhase, AgentRunResult, AgentTaskInput } from './types';

export function runPersonalAgentTask(input: AgentTaskInput): AgentRunResult {
  const phases: AgentRunPhase[] = ['observe', 'plan', 'safety_check', 'privacy_check'];
  const admissionDecision = evaluateTentacleAdmission(input.tentacle);
  const requiresHumanApproval = input.tentacle.requiresHumanApproval || admissionDecision.requiredActions.includes('human_review') || input.riskLevel === 'high' || input.riskLevel === 'critical';
  let executed = false;
  let blocked = !admissionDecision.allowed || input.agent.enabled === false || input.tentacle.status !== 'approved';
  if (blocked) phases.push('blocked');
  else phases.push('dry_run');
  if (requiresHumanApproval) phases.push('human_approval');
  if (!blocked && (!requiresHumanApproval || input.approvedByHuman)) { phases.push('execute_mock', 'verify'); executed = true; }
  else if (requiresHumanApproval && !input.approvedByHuman) { blocked = true; }
  phases.push('digest_residual', 'audit');
  const auditSummary = `${input.summary}; admission=${admissionDecision.allowed ? 'allowed' : 'blocked'}; executed=${executed ? 'mock' : 'no'}`;
  const draft: AgentRunResult = { taskId: input.taskId, phases, executed, blocked, requiresHumanApproval, admissionDecision, auditSummary, residualDigestNotes: [] };
  const digest = blocked || !executed ? digestAgentRunFailure(draft) : undefined;
  return { ...draft, residualDigestNotes: digest?.notes ?? ['mock execution completed without residual digest'] };
}

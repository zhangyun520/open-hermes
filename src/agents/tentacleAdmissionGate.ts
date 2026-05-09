import type { JellyRiskLevel } from '../jelly/types';
import type { TentacleAdmissionDecision, TentacleManifest } from './types';

const rank: Record<JellyRiskLevel, number> = { low: 1, medium: 2, high: 3, critical: 4 };
const maxRisk = (a: JellyRiskLevel, b: JellyRiskLevel): JellyRiskLevel => rank[a] >= rank[b] ? a : b;
const sensitiveKeys = ['apiKey', 'secret', 'token', 'phone', 'idCard', 'studentName', 'medicalRecord'];

export function evaluateTentacleAdmission(tentacle: TentacleManifest): TentacleAdmissionDecision {
  const reasons: string[] = [];
  const requiredActions: TentacleAdmissionDecision['requiredActions'] = [];
  let allowed = tentacle.status !== 'disabled' && tentacle.status !== 'rejected';
  let riskLevel: JellyRiskLevel = 'low';

  if (!allowed) { reasons.push('disabled or rejected tentacle cannot run'); requiredActions.push('reject'); riskLevel = 'critical'; }
  if (tentacle.networkAccess === 'open_requires_approval') { reasons.push('open network access requires allowlist and human review'); requiredActions.push('allowlist_required', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  if (tentacle.networkAccess === 'allowlist' && tentacle.allowlist.length === 0) { reasons.push('network allowlist is empty'); requiredActions.push('allowlist_required'); riskLevel = maxRisk(riskLevel, 'medium'); allowed = false; }
  if (tentacle.canWrite || tentacle.permissions.includes('write_external')) { reasons.push('write-capable tentacle requires consent and human review'); requiredActions.push('consent_required', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  if (tentacle.permissions.includes('write_public_cache')) { reasons.push('public cache writes are forbidden for personal tentacles by default'); requiredActions.push('human_review', 'redact'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  if (tentacle.permissions.includes('access_secret') || sensitiveKeys.some((key) => Boolean(tentacle.metadata[key]))) { reasons.push('secret or sensitive metadata access is denied by default'); requiredActions.push('reject', 'quarantine'); riskLevel = 'critical'; allowed = false; }
  if (tentacle.canExecute || tentacle.permissions.includes('execute_sandbox')) { reasons.push('executable tentacles require sandbox policy review'); requiredActions.push('sandbox_required', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  if (tentacle.privacyBoundary === 'public' && tentacle.permissions.includes('read_local')) { reasons.push('local private reads cannot target public boundary without redaction'); requiredActions.push('redact', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  const text = `${tentacle.name} ${tentacle.purpose} ${JSON.stringify(tentacle.metadata)}`.toLowerCase();
  if (/payment|delete|mass send|cheat|anti.?cheat|weapon|medical diagnosis|legal filing|付款|删除|群发|外挂|刷分/.test(text)) { reasons.push('high-risk automation keyword detected'); requiredActions.push('quarantine', 'human_review'); riskLevel = 'critical'; allowed = false; }

  return { tentacleId: tentacle.id, allowed, riskLevel, requiredActions: [...new Set(requiredActions)], reasons: [...new Set(reasons.length ? reasons : ['tentacle is mock-only and within declared safety boundaries'])] };
}

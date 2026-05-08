import type { JellyRiskLevel, JellySafetyDecision, JellySignal } from './types';
import { riskRank } from './constants';
const sensitiveKeys = ['apiKey', 'phone', 'idCard', 'licensePlate', 'studentName', 'policyNumber', 'medicalRecord'];
function hasAnyMetadata(signal: JellySignal, keys: string[]) { return keys.some((key) => Boolean(signal.metadata[key])); }
function maxRisk(a: JellyRiskLevel, b: JellyRiskLevel): JellyRiskLevel { return riskRank[a] >= riskRank[b] ? a : b; }
export function evaluateJellySafety(signal: JellySignal): JellySafetyDecision {
  const reasons: string[] = []; const requiredActions: JellySafetyDecision['requiredActions'] = [];
  let riskLevel = signal.riskLevel; let allowed = true;
  const target = `${signal.targetModule ?? ''} ${signal.metadata.targetLayer ?? ''}`.toLowerCase();
  if (signal.privacyLevel === 'private' && /(public|community)/.test(target)) { reasons.push('private signal cannot move to public/community without redaction and review'); requiredActions.push('redact', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  if (signal.riskLevel === 'high') { reasons.push('high risk signal requires human review'); requiredActions.push('human_review'); }
  if (signal.riskLevel === 'critical') { reasons.push('critical risk signal is blocked and quarantined'); requiredActions.push('human_review', 'quarantine'); allowed = false; }
  if (hasAnyMetadata(signal, sensitiveKeys)) { reasons.push('sensitive metadata detected'); requiredActions.push('redact', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  if (signal.type === 'external_connector' && signal.metadata.writeAction === true) { reasons.push('external write action requires consent and human approval'); requiredActions.push('consent_required', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); }
  const text = `${signal.summary} ${JSON.stringify(signal.metadata)}`.toLowerCase();
  if (/cheat|anti.?cheat bypass|live multiplayer control|外挂|代练|刷分/.test(text)) { reasons.push('cheat or anti-cheat bypass risk detected'); requiredActions.push('quarantine', 'human_review'); riskLevel = 'critical'; allowed = false; }
  if (/unauthorized ip|真人冒用|impersonation|copyright character/.test(text)) { reasons.push('unauthorized IP/persona risk detected'); requiredActions.push('license_check', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); allowed = false; }
  if (signal.metadata.affectsHumanTransition === true) { reasons.push('automation may affect human transition'); requiredActions.push('human_transition_review', 'human_review'); riskLevel = maxRisk(riskLevel, 'high'); }
  return { signalId: signal.id, allowed, riskLevel, reasons: [...new Set(reasons)], requiredActions: [...new Set(requiredActions)] };
}

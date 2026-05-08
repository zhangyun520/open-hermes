import type { JellyDigestResult, JellySignal } from './types';
function hasSensitive(signal: JellySignal) { return ['apiKey', 'phone', 'idCard', 'licensePlate', 'studentName', 'policyNumber', 'medicalRecord'].some((key) => Boolean(signal.metadata[key])); }
export function digestResidualSignal(signal: JellySignal): JellyDigestResult {
  const notes: string[] = [];
  let wasteClass: JellyDigestResult['wasteClass'] = 'recyclable';
  const category = String(signal.metadata.category ?? '').toLowerCase();
  const text = `${signal.summary} ${category} ${JSON.stringify(signal.metadata)}`.toLowerCase();
  if (hasSensitive(signal)) { wasteClass = signal.riskLevel === 'high' || signal.riskLevel === 'critical' ? 'harmful' : 'review_required'; notes.push('sensitive fields require redaction before sharing'); }
  else if (/ai failure|hallucination|跑偏/.test(text)) { wasteClass = 'slag'; notes.push('AI failure can enter the failure museum and later be mined for taxonomy'); }
  else if (/creative|idea fragment|灵感/.test(text)) { wasteClass = 'compostable'; notes.push('creative fragment should compost into future prompts or world scenes'); }
  else if (/work order|student mistake|错题|工单|high evidence/.test(text)) { wasteClass = signal.metadata.evidenceStrength && Number(signal.metadata.evidenceStrength) >= 70 ? 'recyclable' : 'slag'; notes.push('evidence determines whether this becomes reusable residual material'); }
  else if (signal.type !== 'garbage' && signal.type !== 'world_experience' && signal.type !== 'reverse_wish') { wasteClass = 'review_required'; notes.push('non-digest signal requires review before residualization'); }
  const residualValue = Number(signal.metadata.residualValue ?? (wasteClass === 'recyclable' ? 76 : wasteClass === 'compostable' ? 58 : 34));
  const currentD = Math.max(0.1, Math.min(0.95, residualValue / 100));
  const canCandidate = wasteClass !== 'harmful' && wasteClass !== 'review_required';
  return { signalId: signal.id, wasteClass, notes, residualCardCandidate: canCandidate ? { title: signal.summary.slice(0, 60), domain: String(signal.metadata.domain ?? signal.sourceModule), currentD, targetD: 0.2, verificationMetric: String(signal.metadata.verificationMetric ?? 'review accepted + future reuse'), reusable: wasteClass === 'recyclable' || currentD >= 0.55 } : undefined };
}

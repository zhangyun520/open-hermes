import { gradeFertilizer } from './fertilizerGrading';
import { evaluateSynapseSafety } from './synapseSafetyGate';
import type { FertilizerAdmissionResult, FertilizerGate, FertilizerGateResult, FertilizerGrade, FertilizerStatus, NeuralFertilizer } from './types';

export const fertilizerGates: FertilizerGate[] = ['provenance', 'consent', 'privacy', 'residual_clarity', 'structural_completeness', 'quality', 'safety', 'verification', 'reproducibility'];
const gradeRank: Record<FertilizerGrade, number> = { F0_RAW_WASTE: 0, F1_COMPOSTABLE: 1, F2_STRUCTURED: 2, F3_VERIFIED: 3, F4_TRAINING_CANDIDATE: 4, F5_FOUNDATION_GRADE: 5 };
const trainingStatuses: FertilizerStatus[] = ['training_candidate', 'queued', 'trained_synapse', 'evaluated', 'sandbox_deploy', 'accepted'];

function result(gate: FertilizerGate, passed: boolean, score: number, reasons: string[], requiredActions: string[] = []): FertilizerGateResult {
  return { gate, passed, score: Math.max(0, Math.min(100, Math.round(score))), reasons, requiredActions };
}

export function evaluateFertilizerGate(fertilizer: NeuralFertilizer, gate: FertilizerGate): FertilizerGateResult {
  switch (gate) {
    case 'provenance':
      return result(gate, fertilizer.provenance.contributorIds.length > 0, fertilizer.provenance.ideaNotaryHash ? 100 : 70, ['source contributors and parent chain must be recorded'], fertilizer.provenance.contributorIds.length ? [] : ['record_provenance']);
    case 'consent': {
      const passed = fertilizer.consent.allowTrainingUse && fertilizer.consent.canWithdraw;
      return result(gate, passed, passed ? 100 : 20, ['training use must be explicitly authorized and withdrawable'], passed ? [] : ['request_training_consent']);
    }
    case 'privacy': {
      const passed = fertilizer.privacy.redacted && !fertilizer.privacy.containsMinorData && !fertilizer.privacy.containsEnterpriseSensitiveData;
      return result(gate, passed, passed ? 100 : fertilizer.privacy.redacted ? 60 : 0, ['raw private, minor, and enterprise-sensitive data cannot enter training'], passed ? [] : ['redact_or_restrict_privacy']);
    }
    case 'residual_clarity':
      return result(gate, fertilizer.scores.residualClarityScore >= 70 && fertilizer.structure.hasResidualCard, fertilizer.scores.residualClarityScore, ['must identify which D the fertilizer reduces'], fertilizer.structure.hasResidualCard ? [] : ['create_residual_card']);
    case 'structural_completeness': {
      const count = [fertilizer.structure.hasResidualCard, fertilizer.structure.hasFailureTrace, fertilizer.structure.hasCorrectionTrace, fertilizer.structure.hasReview, fertilizer.structure.hasVerification].filter(Boolean).length;
      return result(gate, count >= 4, count * 20, ['needs residual card, failure, correction, review, and verification structure'], count >= 4 ? [] : ['complete_structure']);
    }
    case 'quality':
      return result(gate, fertilizer.scores.qualityScore >= 70, fertilizer.scores.qualityScore, ['must not be low-quality, duplicated, hallucinated, forged, or farmed'], fertilizer.scores.qualityScore >= 70 ? [] : ['improve_quality']);
    case 'safety': {
      const safety = evaluateSynapseSafety(fertilizer);
      return result(gate, safety.allowed && safety.riskLevel !== 'critical', fertilizer.scores.safetyScore, safety.reasons.length ? safety.reasons : ['safety risks must stay below high-risk training thresholds'], safety.requiredActions);
    }
    case 'verification':
      return result(gate, fertilizer.structure.hasVerification && fertilizer.scores.verificationScore >= 70, fertilizer.scores.verificationScore, ['must prove measurable D reduction'], fertilizer.structure.hasVerification ? [] : ['run_verification']);
    case 'reproducibility':
      return result(gate, fertilizer.structure.hasBenchmark && fertilizer.structure.hasCounterExamples && fertilizer.scores.reproducibilityScore >= 70, fertilizer.scores.reproducibilityScore, ['requires benchmark, counterexamples, and failure conditions'], ['add_benchmark_and_counterexamples'].filter(() => !(fertilizer.structure.hasBenchmark && fertilizer.structure.hasCounterExamples)));
  }
}

export function admitFertilizer(fertilizer: NeuralFertilizer): FertilizerAdmissionResult {
  const grade = gradeFertilizer(fertilizer);
  const gateResults = fertilizerGates.map((gate) => evaluateFertilizerGate(fertilizer, gate));
  const safety = evaluateSynapseSafety(fertilizer);
  const reasons = gateResults.flatMap((gate) => (gate.passed ? [] : gate.reasons));
  const canEnterTrainingCandidatePool = gradeRank[grade] >= 4 && safety.allowed && fertilizer.consent.allowTrainingUse && fertilizer.privacy.redacted && fertilizer.structure.hasVerification;
  const canTrainFoundationModel = grade === 'F5_FOUNDATION_GRADE' && canEnterTrainingCandidatePool && fertilizer.risks.privacyRisk === 'low' && fertilizer.risks.poisoningRisk === 'low' && fertilizer.risks.copyrightRisk === 'low';
  return {
    fertilizerId: fertilizer.id,
    accepted: canEnterTrainingCandidatePool || gradeRank[grade] >= 2,
    grade,
    status: canEnterTrainingCandidatePool && !trainingStatuses.includes(fertilizer.status) ? 'training_candidate' : fertilizer.status,
    gateResults,
    canEnterTrainingCandidatePool,
    canTrainSynapse: canEnterTrainingCandidatePool,
    canTrainFoundationModel,
    reasons: [...new Set(reasons.concat(safety.allowed ? [] : safety.reasons))]
  };
}

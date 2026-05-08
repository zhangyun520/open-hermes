import type { FertilizerGrade, NeuralFertilizer, SynapseRiskLevel } from './types';

const riskRank: Record<SynapseRiskLevel, number> = { low: 1, medium: 2, high: 3, critical: 4 };
const gradeRank: Record<FertilizerGrade, number> = {
  F0_RAW_WASTE: 0,
  F1_COMPOSTABLE: 1,
  F2_STRUCTURED: 2,
  F3_VERIFIED: 3,
  F4_TRAINING_CANDIDATE: 4,
  F5_FOUNDATION_GRADE: 5
};
const rankGrade = Object.fromEntries(Object.entries(gradeRank).map(([grade, rank]) => [rank, grade])) as Record<number, FertilizerGrade>;

function hasHighRisk(fertilizer: NeuralFertilizer) {
  return Object.values(fertilizer.risks).some((risk) => riskRank[risk] >= riskRank.high);
}

function hasLowRisks(fertilizer: NeuralFertilizer) {
  return Object.values(fertilizer.risks).every((risk) => risk === 'low');
}

function clampToCurrentOrLower(candidate: FertilizerGrade, current: FertilizerGrade): FertilizerGrade {
  return rankGrade[Math.min(gradeRank[candidate], gradeRank[current] || gradeRank[candidate])] ?? candidate;
}

export function gradeFertilizer(fertilizer: NeuralFertilizer): FertilizerGrade {
  if (!fertilizer.privacy.redacted) return 'F0_RAW_WASTE';
  if (!fertilizer.consent.allowTrainingUse || fertilizer.risks.privacyRisk === 'critical') return 'F1_COMPOSTABLE';
  if (hasHighRisk(fertilizer)) return fertilizer.structure.hasResidualCard ? 'F2_STRUCTURED' : 'F1_COMPOSTABLE';

  let grade: FertilizerGrade = 'F1_COMPOSTABLE';
  if (fertilizer.structure.hasResidualCard) grade = 'F2_STRUCTURED';
  if (fertilizer.structure.hasReview && fertilizer.structure.hasVerification && fertilizer.scores.verificationScore >= 60) grade = 'F3_VERIFIED';
  if (
    gradeRank[grade] >= 3 &&
    fertilizer.structure.hasCounterExamples &&
    fertilizer.structure.hasBenchmark &&
    fertilizer.scores.reproducibilityScore >= 70 &&
    fertilizer.scores.qualityScore >= 70
  ) {
    grade = 'F4_TRAINING_CANDIDATE';
  }
  if (
    grade === 'F4_TRAINING_CANDIDATE' &&
    hasLowRisks(fertilizer) &&
    fertilizer.scores.qualityScore >= 90 &&
    fertilizer.scores.diversityScore >= 80 &&
    fertilizer.scores.reproducibilityScore >= 85 &&
    fertilizer.provenance.ideaNotaryHash &&
    fertilizer.consent.allowPublicUse
  ) {
    grade = 'F5_FOUNDATION_GRADE';
  }

  return clampToCurrentOrLower(grade, fertilizer.grade === 'F0_RAW_WASTE' ? grade : grade);
}

export function isFoundationEligibleGrade(grade: FertilizerGrade) {
  return grade === 'F5_FOUNDATION_GRADE';
}

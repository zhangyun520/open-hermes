import { createModelBlock } from './modularModelMesh';
import { createSynapseCapsule } from './synapseCapsule';
import type { ModelBlock, NeuralFertilizer, PruningDecision, SynapseCapsule } from './types';
import { listMockTrainingNodes } from './distributedNode';
import { decideSynapticPruning } from './synapticPruning';

const baseFertilizer = (overrides: Partial<NeuralFertilizer>): NeuralFertilizer => ({
  id: 'fertilizer-base',
  title: 'Base mock fertilizer',
  sourceResidualIds: ['residual-base'],
  sourceType: 'garbage',
  grade: 'F1_COMPOSTABLE',
  status: 'raw',
  provenance: { contributorIds: ['mock-contributor'], createdAt: '2026-05-08T00:00:00Z', parentIds: [] },
  consent: { allowTrainingUse: false, allowDerivativeSkills: false, allowPublicUse: false, allowCommercialUse: false, canWithdraw: true },
  privacy: { privacyLevel: 'private', redacted: false, containsMinorData: false, containsEnterpriseSensitiveData: false },
  structure: { hasResidualCard: false, hasFailureTrace: false, hasCorrectionTrace: false, hasReview: false, hasVerification: false, hasCounterExamples: false, hasBenchmark: false },
  scores: { qualityScore: 20, safetyScore: 40, verificationScore: 0, reproducibilityScore: 0, residualClarityScore: 20, diversityScore: 10 },
  risks: { privacyRisk: 'high', biasRisk: 'medium', copyrightRisk: 'low', poisoningRisk: 'medium' },
  metadata: {},
  ...overrides
});

export const mockNeuralFertilizers: NeuralFertilizer[] = [
  baseFertilizer({
    id: 'nfap-f0-raw-waste',
    title: 'F0 mock raw waste with unredacted student data',
    grade: 'F0_RAW_WASTE',
    metadata: { mockPhone: '555-0100 (mock only)', studentName: 'Mock Student Name' }
  }),
  baseFertilizer({
    id: 'nfap-f1-compostable-idea',
    title: 'F1 half-formed idea fragment without verification',
    grade: 'F1_COMPOSTABLE',
    status: 'redacted',
    consent: { allowTrainingUse: false, allowDerivativeSkills: true, allowPublicUse: false, allowCommercialUse: false, canWithdraw: true },
    privacy: { privacyLevel: 'team', redacted: true, containsMinorData: false, containsEnterpriseSensitiveData: false },
    risks: { privacyRisk: 'low', biasRisk: 'medium', copyrightRisk: 'low', poisoningRisk: 'low' },
    scores: { qualityScore: 45, safetyScore: 80, verificationScore: 0, reproducibilityScore: 0, residualClarityScore: 45, diversityScore: 30 },
    metadata: { destination: 'failure_museum_or_compost' }
  }),
  baseFertilizer({
    id: 'nfap-f2-structured-card',
    title: 'F2 redacted residual card for support handoff failure',
    grade: 'F2_STRUCTURED',
    status: 'structured',
    consent: { allowTrainingUse: true, allowDerivativeSkills: true, allowPublicUse: false, allowCommercialUse: false, canWithdraw: true },
    privacy: { privacyLevel: 'team', redacted: true, containsMinorData: false, containsEnterpriseSensitiveData: false },
    structure: { hasResidualCard: true, hasFailureTrace: true, hasCorrectionTrace: false, hasReview: false, hasVerification: false, hasCounterExamples: false, hasBenchmark: false },
    risks: { privacyRisk: 'low', biasRisk: 'low', copyrightRisk: 'low', poisoningRisk: 'low' },
    scores: { qualityScore: 62, safetyScore: 90, verificationScore: 20, reproducibilityScore: 25, residualClarityScore: 75, diversityScore: 40 }
  }),
  baseFertilizer({
    id: 'nfap-f3-verified-education',
    title: 'F3 verified education residual that lowers D_misconception',
    sourceType: 'experience_feedback',
    grade: 'F3_VERIFIED',
    status: 'verified',
    consent: { allowTrainingUse: true, allowDerivativeSkills: true, allowPublicUse: false, allowCommercialUse: false, canWithdraw: true },
    privacy: { privacyLevel: 'community', redacted: true, containsMinorData: false, containsEnterpriseSensitiveData: false },
    structure: { hasResidualCard: true, hasFailureTrace: true, hasCorrectionTrace: true, hasReview: true, hasVerification: true, hasCounterExamples: false, hasBenchmark: false },
    risks: { privacyRisk: 'low', biasRisk: 'low', copyrightRisk: 'low', poisoningRisk: 'low' },
    scores: { qualityScore: 78, safetyScore: 92, verificationScore: 80, reproducibilityScore: 55, residualClarityScore: 85, diversityScore: 58 },
    metadata: { measuredDReduction: 0.18 }
  }),
  baseFertilizer({
    id: 'nfap-f4-training-candidate',
    title: 'F4 benchmarked AI failure classifier fertilizer',
    sourceType: 'review',
    grade: 'F4_TRAINING_CANDIDATE',
    status: 'training_candidate',
    provenance: { contributorIds: ['reviewer-a', 'tester-b'], ideaNotaryHash: 'mock-hash-f4', createdAt: '2026-05-08T00:00:00Z', parentIds: ['nfap-f3-verified-education'] },
    consent: { allowTrainingUse: true, allowDerivativeSkills: true, allowPublicUse: true, allowCommercialUse: false, canWithdraw: true },
    privacy: { privacyLevel: 'community', redacted: true, containsMinorData: false, containsEnterpriseSensitiveData: false },
    structure: { hasResidualCard: true, hasFailureTrace: true, hasCorrectionTrace: true, hasReview: true, hasVerification: true, hasCounterExamples: true, hasBenchmark: true },
    risks: { privacyRisk: 'low', biasRisk: 'medium', copyrightRisk: 'low', poisoningRisk: 'low' },
    scores: { qualityScore: 82, safetyScore: 88, verificationScore: 84, reproducibilityScore: 80, residualClarityScore: 88, diversityScore: 72 },
    metadata: { positiveExamples: 42, counterExamples: 18, benchmark: 'mock-ai-failure-taxonomy-v1' }
  }),
  baseFertilizer({
    id: 'nfap-f5-foundation-grade',
    title: 'F5 audited diverse residual routing fertilizer',
    sourceType: 'world_model_feedback',
    grade: 'F5_FOUNDATION_GRADE',
    status: 'accepted',
    provenance: { contributorIds: ['commons-reviewer', 'domain-expert', 'tester-guild'], ideaNotaryHash: 'mock-hash-f5', createdAt: '2026-05-08T00:00:00Z', parentIds: ['nfap-f4-training-candidate'] },
    consent: { allowTrainingUse: true, allowDerivativeSkills: true, allowPublicUse: true, allowCommercialUse: false, canWithdraw: true },
    privacy: { privacyLevel: 'public', redacted: true, containsMinorData: false, containsEnterpriseSensitiveData: false },
    structure: { hasResidualCard: true, hasFailureTrace: true, hasCorrectionTrace: true, hasReview: true, hasVerification: true, hasCounterExamples: true, hasBenchmark: true },
    risks: { privacyRisk: 'low', biasRisk: 'low', copyrightRisk: 'low', poisoningRisk: 'low' },
    scores: { qualityScore: 94, safetyScore: 96, verificationScore: 92, reproducibilityScore: 90, residualClarityScore: 95, diversityScore: 88 },
    metadata: { auditTrail: 'mock-public-audit', benchmark: 'mock-foundation-routing-suite-v1', rollbackPoint: 'version-node-mock' }
  })
];

export const mockSynapseCapsules: SynapseCapsule[] = [
  { ...createSynapseCapsule({ type: 'residual', domain: 'math', title: 'Math residual recognition', trainedFromFertilizerIds: ['nfap-f3-verified-education'], trainingMethod: 'classifier', capability: 'Recognize misconception residual patterns in redacted math feedback.', contributors: ['reviewer-a'] }), evaluation: { benchmarkName: 'mock math residual benchmark', beforeScore: 61, afterScore: 78, passed: true, notes: ['mock improvement only'] }, status: 'verified_synapse' },
  { ...createSynapseCapsule({ type: 'routing', domain: 'insurance', title: 'Insurance objection routing', trainedFromFertilizerIds: ['nfap-f4-training-candidate'], trainingMethod: 'router_tuning', capability: 'Route redacted insurance objections to review paths.', contributors: ['domain-expert'] }), evaluation: { benchmarkName: 'mock objection routing benchmark', beforeScore: 70, afterScore: 83, passed: true, notes: ['mock only; no real policy data'] }, status: 'team_candidate' },
  { ...createSynapseCapsule({ type: 'evaluation', domain: 'ai-failure', title: 'AI failure classification', trainedFromFertilizerIds: ['nfap-f4-training-candidate'], trainingMethod: 'classifier', capability: 'Classify hallucination, refusal drift, and missing-context failures.', contributors: ['tester-b'] }), evaluation: { benchmarkName: 'mock ai failure taxonomy', beforeScore: 64, afterScore: 86, passed: true, notes: ['mock classifier output'] }, status: 'community_candidate' }
];

const acceptedBlock = (block: ModelBlock): ModelBlock => ({ ...block, status: 'accepted', evaluation: { ...block.evaluation, beforeScore: 70, afterScore: 84, passed: true } });

export const mockModelBlocks: ModelBlock[] = [
  acceptedBlock(createModelBlock({ type: 'residual_block', title: 'Math Residual Block', domain: 'math', trainedFromSynapseIds: ['synapse-residual-math'], capability: 'Detect and explain redacted math misconception residuals.', requiresHumanReview: true })),
  acceptedBlock(createModelBlock({ type: 'router_block', title: 'Insurance Routing Block', domain: 'insurance', trainedFromSynapseIds: ['synapse-routing-insurance'], capability: 'Route objections to safe review lanes.', requiresHumanReview: true })),
  acceptedBlock(createModelBlock({ type: 'safety_block', title: 'Safety Evaluation Block', domain: 'safety', trainedFromSynapseIds: ['synapse-evaluation-ai-failure'], capability: 'Evaluate candidate safety and poisoning risk.', requiresHumanReview: true })),
  acceptedBlock(createModelBlock({ type: 'world_model_block', title: 'World Model Uncertainty Block', domain: 'world-model', trainedFromSynapseIds: ['synapse-memory-world'], capability: 'Track uncertainty and failure conditions in world feedback.', requiresHumanReview: true }))
];

export const mockDistributedTrainingNodes = listMockTrainingNodes();

export const mockPruningDecisions: PruningDecision[] = [
  decideSynapticPruning({ targetId: 'synapse-high-value', targetType: 'synapse', usageCount: 88, verificationScore: 92, riskLevel: 'low', duplicateScore: 12, ageDays: 40, hasHistoricalValue: false, hasConsentWithdrawn: false }),
  decideSynapticPruning({ targetId: 'candidate-duplicate-low-use', targetType: 'training_candidate', usageCount: 1, verificationScore: 68, riskLevel: 'low', duplicateScore: 94, ageDays: 20, hasHistoricalValue: false, hasConsentWithdrawn: false }),
  decideSynapticPruning({ targetId: 'old-world-model-note', targetType: 'model_block', usageCount: 2, verificationScore: 50, riskLevel: 'low', duplicateScore: 20, ageDays: 320, hasHistoricalValue: true, hasConsentWithdrawn: false }),
  decideSynapticPruning({ targetId: 'old-low-verification-fertilizer', targetType: 'fertilizer', usageCount: 0, verificationScore: 20, riskLevel: 'medium', duplicateScore: 30, ageDays: 260, hasHistoricalValue: false, hasConsentWithdrawn: false }),
  decideSynapticPruning({ targetId: 'poisoned-synapse-candidate', targetType: 'synapse', usageCount: 4, verificationScore: 70, riskLevel: 'critical', duplicateScore: 10, ageDays: 8, hasHistoricalValue: false, hasConsentWithdrawn: false }),
  decideSynapticPruning({ targetId: 'withdrawn-fertilizer', targetType: 'fertilizer', usageCount: 18, verificationScore: 82, riskLevel: 'low', duplicateScore: 8, ageDays: 15, hasHistoricalValue: false, hasConsentWithdrawn: true })
];

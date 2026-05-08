export type FertilizerGrade =
  | 'F0_RAW_WASTE'
  | 'F1_COMPOSTABLE'
  | 'F2_STRUCTURED'
  | 'F3_VERIFIED'
  | 'F4_TRAINING_CANDIDATE'
  | 'F5_FOUNDATION_GRADE';

export type FertilizerGate =
  | 'provenance'
  | 'consent'
  | 'privacy'
  | 'residual_clarity'
  | 'structural_completeness'
  | 'quality'
  | 'safety'
  | 'verification'
  | 'reproducibility';

export type FertilizerStatus =
  | 'raw'
  | 'redacted'
  | 'structured'
  | 'reviewed'
  | 'verified'
  | 'training_candidate'
  | 'queued'
  | 'trained_synapse'
  | 'evaluated'
  | 'sandbox_deploy'
  | 'accepted'
  | 'rejected'
  | 'quarantined'
  | 'deprecated';

export type SynapseType =
  | 'skill'
  | 'residual'
  | 'routing'
  | 'evaluation'
  | 'lora'
  | 'embedding'
  | 'memory'
  | 'safety'
  | 'human_transition';

export type TrainingNodeType = 'personal' | 'cpu' | 'gpu' | 'expert' | 'commons';

export type ModelBlockType =
  | 'base_core'
  | 'skill_block'
  | 'residual_block'
  | 'router_block'
  | 'evaluation_block'
  | 'memory_block'
  | 'safety_block'
  | 'domain_block'
  | 'persona_block'
  | 'world_model_block';

export type SynapseRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface NeuralFertilizer {
  id: string;
  title: string;
  sourceResidualIds: string[];
  sourceType:
    | 'wish'
    | 'reverse_wish'
    | 'garbage'
    | 'experience_feedback'
    | 'review'
    | 'skill'
    | 'cache_hit'
    | 'world_model_feedback';
  grade: FertilizerGrade;
  status: FertilizerStatus;
  provenance: { contributorIds: string[]; ideaNotaryHash?: string; createdAt: string; parentIds: string[] };
  consent: {
    allowTrainingUse: boolean;
    allowDerivativeSkills: boolean;
    allowPublicUse: boolean;
    allowCommercialUse: boolean;
    canWithdraw: boolean;
  };
  privacy: {
    privacyLevel: 'public' | 'community' | 'team' | 'private';
    redacted: boolean;
    containsMinorData: boolean;
    containsEnterpriseSensitiveData: boolean;
  };
  structure: {
    hasResidualCard: boolean;
    hasFailureTrace: boolean;
    hasCorrectionTrace: boolean;
    hasReview: boolean;
    hasVerification: boolean;
    hasCounterExamples: boolean;
    hasBenchmark: boolean;
  };
  scores: {
    qualityScore: number;
    safetyScore: number;
    verificationScore: number;
    reproducibilityScore: number;
    residualClarityScore: number;
    diversityScore: number;
  };
  risks: {
    privacyRisk: SynapseRiskLevel;
    biasRisk: SynapseRiskLevel;
    copyrightRisk: SynapseRiskLevel;
    poisoningRisk: SynapseRiskLevel;
  };
  metadata: Record<string, unknown>;
}

export interface FertilizerGateResult {
  gate: FertilizerGate;
  passed: boolean;
  score: number;
  reasons: string[];
  requiredActions: string[];
}

export interface FertilizerAdmissionResult {
  fertilizerId: string;
  accepted: boolean;
  grade: FertilizerGrade;
  status: FertilizerStatus;
  gateResults: FertilizerGateResult[];
  canEnterTrainingCandidatePool: boolean;
  canTrainSynapse: boolean;
  canTrainFoundationModel: boolean;
  reasons: string[];
}

export interface TrainingCandidate {
  id: string;
  fertilizerId: string;
  targetSynapseTypes: SynapseType[];
  targetModelBlockTypes: ModelBlockType[];
  priority: 'low' | 'medium' | 'high';
  requiredNodeTypes: TrainingNodeType[];
  status: 'candidate' | 'queued' | 'assigned' | 'training' | 'evaluating' | 'accepted' | 'rejected' | 'quarantined';
  createdAt: string;
}

export interface SynapseCapsule {
  id: string;
  type: SynapseType;
  domain: string;
  title: string;
  trainedFromFertilizerIds: string[];
  trainingMethod: 'none' | 'rule' | 'classifier' | 'lora' | 'adapter' | 'distillation' | 'embedding_index' | 'router_tuning';
  baseModel?: string;
  capability: string;
  evaluation: { benchmarkName: string; beforeScore?: number; afterScore?: number; passed: boolean; notes: string[] };
  risk: { privacy: SynapseRiskLevel; bias: SynapseRiskLevel; forgetting: SynapseRiskLevel };
  status: 'draft' | 'private_candidate' | 'team_candidate' | 'community_candidate' | 'public_candidate' | 'verified_synapse' | 'quarantined' | 'deprecated';
  contributors: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DistributedTrainingNode {
  id: string;
  type: TrainingNodeType;
  name: string;
  capabilities: {
    canRedact: boolean;
    canDeduplicate: boolean;
    canEvaluate: boolean;
    canTrainClassifier: boolean;
    canTrainLoRA: boolean;
    canRunEmbedding: boolean;
    canRunDistillation: boolean;
  };
  computeProfile: { device: 'cpu' | 'gpu' | 'mixed' | 'expert_human'; memoryGb?: number; estimatedThroughput?: string };
  status: 'available' | 'busy' | 'offline' | 'disabled';
  privacyBoundary: 'local_only' | 'team' | 'community' | 'public';
}

export interface ModelBlock {
  id: string;
  type: ModelBlockType;
  title: string;
  domain: string;
  trainedFromSynapseIds: string[];
  baseModel?: string;
  capability: string;
  evaluation: { benchmarkName: string; beforeScore?: number; afterScore?: number; passed: boolean };
  risk: { privacy: SynapseRiskLevel; bias: SynapseRiskLevel; safety: SynapseRiskLevel };
  status: 'draft' | 'candidate' | 'sandbox' | 'accepted' | 'rejected' | 'quarantined' | 'deprecated';
  requiresHumanReview: boolean;
}

export interface PruningDecision {
  targetId: string;
  targetType: 'fertilizer' | 'synapse' | 'model_block' | 'training_candidate';
  action: 'keep' | 'merge' | 'downgrade' | 'dormant' | 'compost' | 'quarantine' | 'forget';
  reasons: string[];
  requiresHumanReview: boolean;
}

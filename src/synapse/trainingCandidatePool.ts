import { admitFertilizer } from './fertilizerAdmission';
import type { ModelBlockType, NeuralFertilizer, SynapseType, TrainingCandidate, TrainingNodeType } from './types';

const synapseToBlock: Record<SynapseType, ModelBlockType> = {
  skill: 'skill_block', residual: 'residual_block', routing: 'router_block', evaluation: 'evaluation_block', lora: 'domain_block', embedding: 'memory_block', memory: 'memory_block', safety: 'safety_block', human_transition: 'safety_block'
};

function requiredNodes(types: SynapseType[], privacy: NeuralFertilizer['privacy']['privacyLevel']): TrainingNodeType[] {
  const nodes = new Set<TrainingNodeType>();
  if (privacy === 'private') nodes.add('personal');
  if (types.some((type) => ['lora', 'embedding'].includes(type))) nodes.add('gpu');
  if (types.some((type) => ['evaluation', 'safety', 'human_transition'].includes(type))) nodes.add('expert');
  nodes.add('cpu');
  return [...nodes];
}

export function canEnterTrainingCandidatePool(fertilizer: NeuralFertilizer): boolean {
  return admitFertilizer(fertilizer).canEnterTrainingCandidatePool;
}

export function createTrainingCandidate(fertilizer: NeuralFertilizer, targetSynapseTypes: SynapseType[]): TrainingCandidate {
  if (!canEnterTrainingCandidatePool(fertilizer)) {
    throw new Error('NFAP rejected fertilizer: only F4/F5 verified, redacted, authorized fertilizer may enter training candidates');
  }
  return {
    id: `candidate-${fertilizer.id}`,
    fertilizerId: fertilizer.id,
    targetSynapseTypes,
    targetModelBlockTypes: [...new Set(targetSynapseTypes.map((type) => synapseToBlock[type]))],
    priority: fertilizer.grade === 'F5_FOUNDATION_GRADE' ? 'high' : fertilizer.scores.qualityScore >= 85 ? 'medium' : 'low',
    requiredNodeTypes: requiredNodes(targetSynapseTypes, fertilizer.privacy.privacyLevel),
    status: 'candidate',
    createdAt: fertilizer.provenance.createdAt
  };
}

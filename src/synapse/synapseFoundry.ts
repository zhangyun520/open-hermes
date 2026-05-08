import type { DistributedTrainingNode, TrainingCandidate } from './types';

function canRunCandidate(candidate: TrainingCandidate, node: DistributedTrainingNode) {
  if (node.status !== 'available') return false;
  if (candidate.requiredNodeTypes.includes('personal') && node.privacyBoundary !== 'local_only') return false;
  if (candidate.targetSynapseTypes.includes('lora')) return node.capabilities.canTrainLoRA;
  if (candidate.targetSynapseTypes.includes('embedding')) return node.capabilities.canRunEmbedding;
  if (candidate.targetSynapseTypes.includes('evaluation') || candidate.targetSynapseTypes.includes('safety')) return node.capabilities.canEvaluate;
  if (candidate.targetSynapseTypes.includes('routing') || candidate.targetSynapseTypes.includes('residual')) return node.capabilities.canTrainClassifier || node.type === 'expert';
  return node.capabilities.canTrainClassifier || node.capabilities.canEvaluate || node.type === 'expert';
}

export function assignCandidateToNode(candidate: TrainingCandidate, nodes: DistributedTrainingNode[]): DistributedTrainingNode | null {
  const available = nodes.filter((node) => canRunCandidate(candidate, node));
  if (available.length === 0) return null;
  if (candidate.targetSynapseTypes.includes('lora')) return available.find((node) => node.type === 'gpu') ?? available[0];
  if (candidate.requiredNodeTypes.includes('personal')) return available.find((node) => node.privacyBoundary === 'local_only') ?? null;
  if (candidate.targetSynapseTypes.includes('evaluation')) return available.find((node) => node.type === 'expert' || node.type === 'commons') ?? available[0];
  return available.find((node) => node.type === 'cpu' || node.type === 'expert') ?? available[0];
}

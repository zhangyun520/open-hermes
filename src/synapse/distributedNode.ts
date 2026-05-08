import type { DistributedTrainingNode } from './types';

export function listMockTrainingNodes(): DistributedTrainingNode[] {
  return [
    { id: 'node-personal-cpu', type: 'personal', name: 'Personal CPU Node', capabilities: { canRedact: true, canDeduplicate: true, canEvaluate: false, canTrainClassifier: true, canTrainLoRA: false, canRunEmbedding: false, canRunDistillation: false }, computeProfile: { device: 'cpu', memoryGb: 16, estimatedThroughput: 'local private low-throughput' }, status: 'available', privacyBoundary: 'local_only' },
    { id: 'node-community-cpu', type: 'cpu', name: 'Community CPU Node', capabilities: { canRedact: false, canDeduplicate: true, canEvaluate: true, canTrainClassifier: true, canTrainLoRA: false, canRunEmbedding: true, canRunDistillation: false }, computeProfile: { device: 'cpu', memoryGb: 64, estimatedThroughput: 'batch labels and lightweight evals' }, status: 'available', privacyBoundary: 'community' },
    { id: 'node-gpu-lora', type: 'gpu', name: 'GPU LoRA Node', capabilities: { canRedact: false, canDeduplicate: true, canEvaluate: true, canTrainClassifier: true, canTrainLoRA: true, canRunEmbedding: true, canRunDistillation: true }, computeProfile: { device: 'gpu', memoryGb: 48, estimatedThroughput: 'mock LoRA / adapter queue' }, status: 'available', privacyBoundary: 'community' },
    { id: 'node-expert-review', type: 'expert', name: 'Expert Review Node', capabilities: { canRedact: false, canDeduplicate: false, canEvaluate: true, canTrainClassifier: false, canTrainLoRA: false, canRunEmbedding: false, canRunDistillation: false }, computeProfile: { device: 'expert_human', estimatedThroughput: 'human risk review' }, status: 'available', privacyBoundary: 'team' },
    { id: 'node-commons-eval', type: 'commons', name: 'Commons Evaluation Node', capabilities: { canRedact: false, canDeduplicate: true, canEvaluate: true, canTrainClassifier: false, canTrainLoRA: false, canRunEmbedding: true, canRunDistillation: false }, computeProfile: { device: 'mixed', memoryGb: 128, estimatedThroughput: 'public benchmark and version ledger' }, status: 'available', privacyBoundary: 'public' }
  ];
}

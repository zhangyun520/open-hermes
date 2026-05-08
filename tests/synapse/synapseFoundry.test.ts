import { describe, expect, it } from 'vitest';
import { assignCandidateToNode, createTrainingCandidate, listMockTrainingNodes, mockNeuralFertilizers, type NeuralFertilizer } from '../../src/synapse';

const f4 = mockNeuralFertilizers.find((item) => item.id === 'nfap-f4-training-candidate') as NeuralFertilizer;

describe('synapse foundry node assignment', () => {
  it('prefers GPU nodes for LoRA tasks', () => {
    const node = assignCandidateToNode(createTrainingCandidate(f4, ['lora']), listMockTrainingNodes());
    expect(node?.type).toBe('gpu');
  });

  it('assigns private candidates only to local_only nodes', () => {
    const privateFertilizer = { ...f4, privacy: { ...f4.privacy, privacyLevel: 'private' as const } };
    const node = assignCandidateToNode(createTrainingCandidate(privateFertilizer, ['residual']), listMockTrainingNodes());
    expect(node?.privacyBoundary).toBe('local_only');
  });
});

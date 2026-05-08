import { describe, expect, it } from 'vitest';
import { createTrainingCandidate, mockNeuralFertilizers, type NeuralFertilizer } from '../../src/synapse';

const byId = (id: string) => mockNeuralFertilizers.find((item) => item.id === id) as NeuralFertilizer;

describe('training candidate pool', () => {
  it('creates candidates only for admitted F4/F5 fertilizer', () => {
    const candidate = createTrainingCandidate(byId('nfap-f4-training-candidate'), ['evaluation', 'residual']);
    expect(candidate.status).toBe('candidate');
    expect(candidate.requiredNodeTypes).toEqual(expect.arrayContaining(['cpu', 'expert']));
  });

  it('rejects F1 fertilizer candidate creation', () => {
    expect(() => createTrainingCandidate(byId('nfap-f1-compostable-idea'), ['skill'])).toThrow(/NFAP rejected/);
  });
});

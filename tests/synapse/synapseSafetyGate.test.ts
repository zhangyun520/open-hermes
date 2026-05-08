import { describe, expect, it } from 'vitest';
import { evaluateSynapseSafety, mockNeuralFertilizers, type NeuralFertilizer } from '../../src/synapse';

const f4 = mockNeuralFertilizers.find((item) => item.id === 'nfap-f4-training-candidate') as NeuralFertilizer;

describe('synapse safety gate', () => {
  it('blocks and quarantines high poisoning risk', () => {
    const decision = evaluateSynapseSafety({ ...f4, risks: { ...f4.risks, poisoningRisk: 'high' } });
    expect(decision.allowed).toBe(false);
    expect(decision.requiredActions).toContain('quarantine');
  });

  it('blocks training when training consent is missing', () => {
    const decision = evaluateSynapseSafety({ ...f4, consent: { ...f4.consent, allowTrainingUse: false } });
    expect(decision.allowed).toBe(false);
    expect(decision.requiredActions).toContain('block_training');
  });
});

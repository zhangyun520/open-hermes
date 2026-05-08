import { describe, expect, it } from 'vitest';
import { admitFertilizer, mockNeuralFertilizers, type NeuralFertilizer } from '../../src/synapse';

const byId = (id: string) => mockNeuralFertilizers.find((item) => item.id === id) as NeuralFertilizer;

describe('fertilizer admission', () => {
  it('blocks F0 unredacted data from training candidate pool', () => {
    expect(admitFertilizer(byId('nfap-f0-raw-waste')).canEnterTrainingCandidatePool).toBe(false);
  });

  it('blocks training when consent.allowTrainingUse is false', () => {
    const denied = { ...byId('nfap-f4-training-candidate'), consent: { ...byId('nfap-f4-training-candidate').consent, allowTrainingUse: false } };
    expect(admitFertilizer(denied).canEnterTrainingCandidatePool).toBe(false);
  });

  it('allows F4 fertilizer into training candidate pool', () => {
    const admission = admitFertilizer(byId('nfap-f4-training-candidate'));
    expect(admission.canEnterTrainingCandidatePool).toBe(true);
    expect(admission.canTrainSynapse).toBe(true);
  });

  it('keeps F1 in compost or failure museum, not training', () => {
    const admission = admitFertilizer(byId('nfap-f1-compostable-idea'));
    expect(admission.grade).toBe('F1_COMPOSTABLE');
    expect(admission.canEnterTrainingCandidatePool).toBe(false);
  });

  it('prevents high privacy risk from entering foundation-grade training', () => {
    const risky = { ...byId('nfap-f5-foundation-grade'), risks: { ...byId('nfap-f5-foundation-grade').risks, privacyRisk: 'high' } };
    expect(admitFertilizer(risky).canTrainFoundationModel).toBe(false);
  });
});

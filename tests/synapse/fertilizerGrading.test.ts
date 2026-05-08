import { describe, expect, it } from 'vitest';
import { gradeFertilizer, mockNeuralFertilizers, type NeuralFertilizer } from '../../src/synapse';

const byId = (id: string) => mockNeuralFertilizers.find((item) => item.id === id) as NeuralFertilizer;

describe('fertilizer grading', () => {
  it('keeps unredacted F0 raw waste out of trainable grades', () => {
    expect(gradeFertilizer(byId('nfap-f0-raw-waste'))).toBe('F0_RAW_WASTE');
  });

  it('grades redacted residual cards at least F2', () => {
    expect(gradeFertilizer(byId('nfap-f2-structured-card'))).toBe('F2_STRUCTURED');
  });

  it('grades reviewed and verified fertilizer at least F3', () => {
    expect(gradeFertilizer(byId('nfap-f3-verified-education'))).toBe('F3_VERIFIED');
  });

  it('grades benchmarked counterexample fertilizer as F4', () => {
    expect(gradeFertilizer(byId('nfap-f4-training-candidate'))).toBe('F4_TRAINING_CANDIDATE');
  });

  it('requires low risk, auditability, reproducibility, consent, and redaction for F5', () => {
    expect(gradeFertilizer(byId('nfap-f5-foundation-grade'))).toBe('F5_FOUNDATION_GRADE');
    expect(gradeFertilizer({ ...byId('nfap-f5-foundation-grade'), risks: { ...byId('nfap-f5-foundation-grade').risks, privacyRisk: 'high' } })).not.toBe('F5_FOUNDATION_GRADE');
  });
});

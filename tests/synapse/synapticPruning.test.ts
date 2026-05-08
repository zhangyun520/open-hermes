import { describe, expect, it } from 'vitest';
import { decideSynapticPruning } from '../../src/synapse';

describe('residual synaptic pruning', () => {
  it('returns forget or quarantine when consent is withdrawn', () => {
    const decision = decideSynapticPruning({ targetId: 'withdrawn', targetType: 'fertilizer', usageCount: 20, verificationScore: 90, riskLevel: 'low', duplicateScore: 0, ageDays: 10, hasHistoricalValue: false, hasConsentWithdrawn: true });
    expect(['forget', 'quarantine']).toContain(decision.action);
    expect(decision.requiresHumanReview).toBe(true);
  });

  it('returns merge for high duplicate and low usage objects', () => {
    const decision = decideSynapticPruning({ targetId: 'duplicate', targetType: 'synapse', usageCount: 1, verificationScore: 70, riskLevel: 'low', duplicateScore: 90, ageDays: 15, hasHistoricalValue: false, hasConsentWithdrawn: false });
    expect(decision.action).toBe('merge');
  });

  it('returns keep for high usage, high verification, low risk objects', () => {
    const decision = decideSynapticPruning({ targetId: 'useful', targetType: 'model_block', usageCount: 40, verificationScore: 88, riskLevel: 'low', duplicateScore: 10, ageDays: 60, hasHistoricalValue: false, hasConsentWithdrawn: false });
    expect(decision.action).toBe('keep');
  });

  it('returns dormant for high historical value with low current use', () => {
    const decision = decideSynapticPruning({ targetId: 'historical', targetType: 'training_candidate', usageCount: 2, verificationScore: 70, riskLevel: 'low', duplicateScore: 20, ageDays: 500, hasHistoricalValue: true, hasConsentWithdrawn: false });
    expect(decision.action).toBe('dormant');
  });

  it('quarantines critical risk objects', () => {
    const decision = decideSynapticPruning({ targetId: 'critical', targetType: 'synapse', usageCount: 0, verificationScore: 90, riskLevel: 'critical', duplicateScore: 0, ageDays: 1, hasHistoricalValue: false, hasConsentWithdrawn: false });
    expect(decision.action).toBe('quarantine');
    expect(decision.requiresHumanReview).toBe(true);
  });
});

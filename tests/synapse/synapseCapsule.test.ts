import { describe, expect, it } from 'vitest';
import { createSynapseCapsule, evaluateSynapse } from '../../src/synapse';

describe('synapse capsule', () => {
  it('creates traceable draft capsules and evaluates benchmark status', () => {
    const capsule = createSynapseCapsule({ type: 'residual', domain: 'math', title: 'Math Residual Recognition', trainedFromFertilizerIds: ['nfap-f4-training-candidate'], trainingMethod: 'classifier', capability: 'detect residuals', contributors: ['tester'] });
    expect(capsule.status).toBe('draft');
    const evaluated = evaluateSynapse({ ...capsule, evaluation: { benchmarkName: 'mock', beforeScore: 40, afterScore: 90, passed: true, notes: [] } });
    expect(evaluated.passed).toBe(true);
  });
});

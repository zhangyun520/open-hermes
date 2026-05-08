import type { SynapseCapsule, SynapseType } from './types';

const methodRisk: Record<SynapseCapsule['trainingMethod'], SynapseCapsule['risk']> = {
  none: { privacy: 'low', bias: 'low', forgetting: 'low' },
  rule: { privacy: 'low', bias: 'low', forgetting: 'low' },
  classifier: { privacy: 'low', bias: 'medium', forgetting: 'low' },
  lora: { privacy: 'medium', bias: 'medium', forgetting: 'medium' },
  adapter: { privacy: 'medium', bias: 'medium', forgetting: 'medium' },
  distillation: { privacy: 'medium', bias: 'medium', forgetting: 'high' },
  embedding_index: { privacy: 'medium', bias: 'low', forgetting: 'low' },
  router_tuning: { privacy: 'low', bias: 'medium', forgetting: 'low' }
};

export function createSynapseCapsule(input: {
  type: SynapseType;
  domain: string;
  title: string;
  trainedFromFertilizerIds: string[];
  trainingMethod: SynapseCapsule['trainingMethod'];
  capability: string;
  contributors: string[];
}): SynapseCapsule {
  const now = new Date().toISOString();
  return {
    id: `synapse-${input.type}-${input.domain}`.replace(/[^a-zA-Z0-9-]+/g, '-').toLowerCase(),
    type: input.type,
    domain: input.domain,
    title: input.title,
    trainedFromFertilizerIds: input.trainedFromFertilizerIds,
    trainingMethod: input.trainingMethod,
    capability: input.capability,
    evaluation: { benchmarkName: 'mock nfap benchmark', passed: false, notes: ['mock capsule requires evaluation before verification'] },
    risk: methodRisk[input.trainingMethod],
    status: 'draft',
    contributors: input.contributors,
    createdAt: now,
    updatedAt: now
  };
}

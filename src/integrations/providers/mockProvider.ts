import type { CostEstimate, ModelCapabilities, ModelProvider, ModelRequest, ModelResponse, ProviderHealth, ProviderStatus, ProviderVendor } from '../types';

export const baseCapabilities: ModelCapabilities = { text: true, vision: false, toolUse: true, structuredOutput: true, promptCaching: false, longContext: false, coding: false, computerUse: false, batch: true, embeddings: false, localOnly: false, privacyTier: 'medium' };

export function estimateMockCost(input: ModelRequest, multiplier = 1): CostEstimate {
  const inputTokens = input.messages.reduce((sum, message) => sum + Math.ceil(message.content.length / 4), 0);
  const outputTokens = input.maxTokens ?? 512;
  return { inputTokens, outputTokens, estimatedCost: Number(((inputTokens * 0.000001 + outputTokens * 0.000003) * multiplier).toFixed(6)), currency: 'USD' };
}

export function createMockProvider(options: { id: string; name: string; vendor: ProviderVendor; modelId: string; status?: ProviderStatus; capabilities?: Partial<ModelCapabilities>; costMultiplier?: number; outputPrefix?: string }): ModelProvider {
  const capabilities = { ...baseCapabilities, ...options.capabilities };
  return {
    id: options.id,
    name: options.name,
    vendor: options.vendor,
    status: options.status ?? 'mock',
    capabilities,
    estimateCost: (input) => estimateMockCost(input, options.costMultiplier ?? 1),
    complete: async (input): Promise<ModelResponse> => {
      const started = Date.now();
      const estimatedCost = estimateMockCost(input, options.costMultiplier ?? 1);
      return { providerId: options.id, modelId: options.modelId, output: `${options.outputPrefix ?? options.name} mock response for ${input.modelIntent}: ${input.messages.at(-1)?.content.slice(0, 120) ?? ''}`, usage: { inputTokens: estimatedCost.inputTokens, outputTokens: estimatedCost.outputTokens, totalTokens: estimatedCost.inputTokens + estimatedCost.outputTokens }, estimatedCost, latencyMs: Math.max(1, Date.now() - started), cacheHit: false, safetyFlags: [], rawRef: `mock://${options.id}/${input.taskId}` };
    },
    healthCheck: async (): Promise<ProviderHealth> => ({ providerId: options.id, ok: options.status !== 'disabled', status: options.status ?? 'mock', latencyMs: 3, message: 'mock provider healthy; no paid API call performed' })
  };
}

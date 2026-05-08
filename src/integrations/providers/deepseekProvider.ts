import { createMockProvider } from './mockProvider';
export const deepSeekProvider = createMockProvider({ id: 'deepseek', name: 'DeepSeek OpenAI-compatible', vendor: 'deepseek', modelId: 'deepseek-mock-batch', costMultiplier: 0.35, outputPrefix: 'DeepSeek', capabilities: { batch: true, structuredOutput: true, privacyTier: 'medium' } });

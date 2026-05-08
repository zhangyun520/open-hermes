import { createMockProvider } from './mockProvider';
export const openAIProvider = createMockProvider({ id: 'openai', name: 'OpenAI Responses API', vendor: 'openai', modelId: 'openai-mock-strong', costMultiplier: 2.5, outputPrefix: 'OpenAI', capabilities: { vision: true, structuredOutput: true, promptCaching: true, longContext: true, coding: true, embeddings: true, privacyTier: 'medium' } });

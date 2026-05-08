import { createMockProvider } from './mockProvider';
export const claudeProvider = createMockProvider({ id: 'claude', name: 'Claude Messages API', vendor: 'anthropic', modelId: 'claude-mock-writing', costMultiplier: 2.1, outputPrefix: 'Claude', capabilities: { longContext: true, promptCaching: true, structuredOutput: true, privacyTier: 'medium' } });

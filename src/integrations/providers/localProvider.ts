import { createMockProvider } from './mockProvider';

function readEnv(name: string, fallback = ''): string {
  const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.[name] || fallback;
}

export const localProvider = createMockProvider({ id: 'local', name: 'Local / Ollama', vendor: 'local', modelId: readEnv('LOCAL_MODEL_NAME', 'local-mock'), costMultiplier: 0, outputPrefix: 'Local', capabilities: { localOnly: true, privacyTier: 'high', promptCaching: true } });
export const localProviderBaseUrl = readEnv('LOCAL_MODEL_BASE_URL', 'http://localhost:11434');

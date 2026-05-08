export interface TentacleEndpoint { id: string; name: string; type: 'model' | 'tool' | 'app' | 'game' | 'anime_world' | 'industry_system' | 'community' | 'local_cache' | 'public_commons'; permission: 'read_only' | 'write_with_approval' | 'sandbox' | 'disabled'; status: 'connected' | 'mock' | 'disabled' | 'error'; safetyNotes: string[]; }

const endpoints: TentacleEndpoint[] = [
  { id: 'openai-mock', name: 'OpenAI mock', type: 'model', permission: 'read_only', status: 'mock', safetyNotes: ['mock only', 'no real API key'] },
  { id: 'claude-mock', name: 'Claude mock', type: 'model', permission: 'read_only', status: 'mock', safetyNotes: ['mock only'] },
  { id: 'deepseek-mock', name: 'DeepSeek mock', type: 'model', permission: 'read_only', status: 'mock', safetyNotes: ['mock only'] },
  { id: 'codex-mock', name: 'Codex mock', type: 'tool', permission: 'write_with_approval', status: 'mock', safetyNotes: ['requires human review before canonical'] },
  { id: 'github-mock', name: 'GitHub mock', type: 'app', permission: 'write_with_approval', status: 'mock', safetyNotes: ['writes require approval'] },
  { id: 'ollama-local', name: 'Local Ollama', type: 'local_cache', permission: 'sandbox', status: 'mock', safetyNotes: ['local-first for private signals'] },
  { id: 'world-experience-mock', name: 'World Experience Mock', type: 'game', permission: 'sandbox', status: 'mock', safetyNotes: ['no live multiplayer control', 'license and safety notes required'] },
  { id: 'public-skill-commons', name: 'Public Skill Commons', type: 'public_commons', permission: 'read_only', status: 'mock', safetyNotes: ['only verified public skills'] },
  { id: 'bias-shelter', name: 'Bias Shelter', type: 'community', permission: 'read_only', status: 'mock', safetyNotes: ['systemic risk review'] },
  { id: 'human-transition-layer', name: 'Human Transition Layer', type: 'community', permission: 'read_only', status: 'mock', safetyNotes: ['D_human review required'] }
];
export function listTentacleEndpoints(): TentacleEndpoint[] { return endpoints; }
export function canTentacleConnect(endpoint: TentacleEndpoint): boolean { if (endpoint.permission === 'disabled' || endpoint.status === 'disabled' || endpoint.status === 'error') return false; if (endpoint.permission === 'write_with_approval') return false; if ((endpoint.type === 'game' || endpoint.type === 'anime_world') && endpoint.safetyNotes.length === 0) return false; return true; }

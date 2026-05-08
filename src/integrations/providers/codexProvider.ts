import type { CodexTask, ModelProvider, ModelRequest, ModelResponse } from '../types';
import { createMockProvider } from './mockProvider';

function buildCodexPrompt(task: CodexTask): string {
  return `# Goal\n${task.taskPrompt}\n\n# Context\nRepo: ${task.repo}\nBranch: ${task.branch}\nExpected files: ${task.expectedFiles.join(', ') || 'TBD'}\n\n# Constraints\n${task.safetyConstraints.map((item) => `- ${item}`).join('\n')}\n\n# Done When\n- Requested code changes are implemented.\n- No secrets are introduced.\n- Tests pass or limitations are documented.\n\n# Test Command\n${task.testCommand}`;
}

export const codexTaskAdapter: ModelProvider = {
  ...createMockProvider({ id: 'codex', name: 'Codex Task Adapter', vendor: 'openai', modelId: 'codex-task-mock', costMultiplier: 0, outputPrefix: 'Codex', capabilities: { coding: true, toolUse: true, privacyTier: 'medium' } }),
  complete: async (input: ModelRequest): Promise<ModelResponse> => {
    const task: CodexTask = { taskId: input.taskId, repo: String(input.metadata?.repo ?? 'repo/mock'), branch: String(input.metadata?.branch ?? 'work'), taskPrompt: input.messages.map((message) => message.content).join('\n'), expectedFiles: (input.metadata?.expectedFiles as string[]) ?? [], testCommand: String(input.metadata?.testCommand ?? 'npm test'), safetyConstraints: ['Do not commit secrets', 'Do not call paid APIs in MVP', 'Run tests before PR'], mode: 'manual_prompt', status: 'queued' };
    const output = buildCodexPrompt(task);
    return { providerId: 'codex', modelId: 'codex-task-mock', output, usage: { inputTokens: output.length, outputTokens: 0, totalTokens: output.length }, estimatedCost: { inputTokens: output.length, outputTokens: 0, estimatedCost: 0, currency: 'USD' }, latencyMs: 1, cacheHit: false, safetyFlags: ['manual_prompt_only'], rawRef: `codex-task://${task.taskId}` };
  }
};

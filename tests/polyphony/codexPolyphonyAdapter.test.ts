import { describe, expect, it } from 'vitest';
import { generateCodexPolyphonyTask, importCodexTaskResultAsVersion, promoteToCanonical } from '../../src/polyphony';
import { resetPolyphony, setupBasicPolyphony } from './helpers';
describe('Codex polyphony adapter', () => {
  it('codex_auto version without review cannot become canonical', () => { const { family, codex } = setupBasicPolyphony(); const version = importCodexTaskResultAsVersion({ taskId: 'task-1', title: 'Codex Result', prompt: 'do it', summary: 'changed things', testResult: 'pass', outputArtifactRef: 'diff://1', voiceTrackType: 'codex_auto', createdAt: '2026-05-08T00:00:00Z' }); expect(version.voiceTrackId).not.toBe(codex.id); expect(promoteToCanonical(version.id).allowed).toBe(false); expect(family.id).toBeTruthy(); });
  it('generateCodexPolyphonyTask creates different constraints per voice', () => { resetPolyphony(); const tasks = generateCodexPolyphonyTask('设计认知大陆地图', ['stable', 'aesthetic', 'low_cost', 'world_model']); expect(tasks).toHaveLength(4); expect(tasks.find((task) => task.voiceTrackType === 'stable')?.prompt).toContain('优先可运行'); expect(tasks.find((task) => task.voiceTrackType === 'aesthetic')?.prompt).toContain('深海'); expect(tasks.find((task) => task.voiceTrackType === 'world_model')?.prompt).toContain('uncertainty metadata'); });
});

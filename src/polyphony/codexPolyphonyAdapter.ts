import type { CodexPolyphonyTask, CodexTaskResult, VoiceTrackType } from './types';
import { createVersionFamily, listVersionFamilies } from './versionFamily';
import { createVoiceTrack, listVoiceTracks } from './voiceTrack';
import { createVersionNode } from './versionNode';

const trackConstraints: Partial<Record<VoiceTrackType, string[]>> = {
  stable: ['优先可运行', 'UI 可以简单', '必须有 mock 数据', '必须有基础测试', '不接真实 API'],
  experimental: ['允许大胆结构探索', '默认不进入 public cache', '必须标记风险与回滚路径'],
  safety: ['检查隐私、权限、人类安置和外部动作风险', '高风险路径必须进入 review/quarantine', '不得绕过人工审核'],
  aesthetic: ['保持深海、微光、透明、水母风格', '不影响贡献权重和真实能力判断', '不牺牲可访问性'],
  low_cost: ['减少模型调用', '提高缓存命中', '优先规则、mock 和蒸馏流程', '不引入大型不可控依赖'],
  community: ['保留贡献链', '需要公证与审核', '明确共享边界'],
  world_model: ['必须写明假设、置信度、已知未知和失效条件', '所有预测必须可验证', '不得伪装确定性'],
  codex_auto: ['标记 AI-generated', '需要人工 review 才能 canonical', '输出测试结果和 diff 引用'],
  gameplay: ['增强成长反馈', '不得制造赌博或付费优势', '外观不影响能力权重']
};
const trackGoal: Partial<Record<VoiceTrackType, string>> = {
  stable: '实现最小可用且可测试的稳定版本。', experimental: '实现高探索度的实验版本。', safety: '实现强调隐私、权限与风险边界的安全版本。', aesthetic: '实现高美学沉浸体验版本。', low_cost: '实现最低执行成本与高缓存命中版本。', community: '实现适合多人共创与治理的社区版本。', world_model: '实现带不确定性账本的世界模型版本。', codex_auto: '导入 Codex 自动开发结果，等待人工审核。', gameplay: '实现更强游戏化反馈但不改变公平权重的版本。'
};
export function recommendVoiceTrackForChange(changeIntent: string): VoiceTrackType {
  const text = changeIntent.toLowerCase();
  if (/稳定|可靠|bug|test|测试|stable/.test(text)) return 'stable';
  if (/实验|大胆|创新|prototype|experimental/.test(text)) return 'experimental';
  if (/安全|隐私|权限|审核|risk|privacy|safety/.test(text)) return 'safety';
  if (/ui|美学|视觉|动效|主题|幻化|aesthetic/.test(text)) return 'aesthetic';
  if (/成本|缓存|token|cheap|低成本|low/.test(text)) return 'low_cost';
  if (/社区|共创|贡献|community/.test(text)) return 'community';
  if (/世界模型|预测|不确定|world/.test(text)) return 'world_model';
  if (/codex|自动开发|ai-generated/.test(text)) return 'codex_auto';
  return 'stable';
}
export function generateCodexPolyphonyTask(baseTask: string, voiceTracks: VoiceTrackType[]): CodexPolyphonyTask[] {
  return voiceTracks.map((voiceTrackType, index) => {
    const constraints = trackConstraints[voiceTrackType] ?? ['遵循 Cognitive Jelly 复调版本原则'];
    const doneWhen = ['页面或函数可访问', 'mock 数据覆盖核心状态', '不破坏现有测试', voiceTrackType === 'world_model' ? '包含 uncertainty metadata' : '记录风险与审核需求'];
    const safetyNotes = ['不要保存真实 API key', '不要把隐私数据进入 public cache', 'AI 自动生成版本不能绕过人工审核直接 canonical'];
    const prompt = `Task ${index + 1}: ${voiceTrackType} Voice\nGoal:\n${trackGoal[voiceTrackType] ?? '实现指定声部版本。'}\n\nContext:\nCognitive Jelly / 认知水母采用复调版本系统，同一任务允许多个声部并行演化。基础任务：${baseTask}\n\nVoice Track:\n${voiceTrackType}\n\nConstraints:\n- ${constraints.join('\n- ')}\n\nDone When:\n- ${doneWhen.join('\n- ')}\n\nTest Command:\nnpm test\n\nSafety Notes:\n- ${safetyNotes.join('\n- ')}`;
    return { taskId: `codex-polyphony-${voiceTrackType}-${index + 1}`, title: `${baseTask} / ${voiceTrackType}`, prompt, voiceTrackType, constraints, doneWhen, testCommand: 'npm test', safetyNotes };
  });
}
export function importCodexTaskResultAsVersion(taskResult: CodexTaskResult) {
  let family = listVersionFamilies().find((item) => item.objectId === taskResult.taskId);
  if (!family) family = createVersionFamily('agent_policy', taskResult.taskId, taskResult.title, { createdBy: 'codex', tags: ['codex_auto'], visibility: 'team' });
  let track = listVoiceTracks(family.id).find((item) => item.type === taskResult.voiceTrackType);
  if (!track) track = createVoiceTrack(family.id, taskResult.voiceTrackType, `${taskResult.voiceTrackType} voice`, 'Codex parallel task result', { ownerId: 'codex', contributorIds: ['codex'] });
  return createVersionNode({ familyId: family.id, voiceTrackId: track.id, parentVersionIds: [], title: taskResult.title, summary: taskResult.summary, contentRef: taskResult.outputArtifactRef ?? taskResult.diffRef ?? `codex://${taskResult.taskId}`, authorIds: ['codex'], status: 'reviewing', riskLevel: taskResult.riskNotes ? 'medium' : 'low', privacyLevel: 'team', safetyScore: taskResult.testResult === 'pass' ? 75 : 60, usefulnessScore: 70, metadata: { aiGenerated: true, taskId: taskResult.taskId, prompt: taskResult.prompt, changedFiles: taskResult.changedFiles ?? [], testResult: taskResult.testResult ?? 'not_run', riskNotes: taskResult.riskNotes } });
}

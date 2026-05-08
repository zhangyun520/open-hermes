import { PageTitle } from '@/components/UI';
import { CodexPolyphonyPromptGenerator } from '@/components/polyphony/CodexPolyphonyPromptGenerator';
export default function CodexPolyphonyPage() { return <div><PageTitle eyebrow="Codex Polyphony" title="Codex 复调任务生成">同一基础任务可以拆成 Stable、Aesthetic、Low-cost、Safety、Gameplay、World-model 等并行 prompt；每个结果进入不同声部，不能绕过人工审核直接 canonical。</PageTitle><CodexPolyphonyPromptGenerator /></div>; }

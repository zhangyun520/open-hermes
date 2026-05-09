import { describe, expect, it } from 'vitest';
import {
  buildDualCodingOrganSummary,
  calculateClosureGain,
  createCodingTaskSpec,
  detectCodingRisk,
  detectCodingTaskKind,
  planDualCodingRun,
  runDualCodingOrganPreview,
  simulateClaudeCodeReview,
  simulateCodexPatch,
  simulateTestRun
} from '../lib/dualCodingOrgan';

describe('Dual Coding Organ', () => {
  it('summarizes the seven mock coding organs', () => {
    expect(buildDualCodingOrganSummary().roles).toBe(7);
  });

  it('detects feature tasks from page/module language', () => {
    expect(detectCodingTaskKind('新增一个页面和模块')).toBe('feature');
  });

  it('detects bugfix tasks before test-like wording', () => {
    expect(detectCodingTaskKind('修复 typecheck 报错')).toBe('bugfix');
  });

  it('detects API-key-like input as high risk', () => {
    const risk = detectCodingRisk('这里有 api key sk-test-secret，请自动提交到仓库');
    expect(risk.riskLevel).toBe('high');
    expect(risk.reasons).toContain('secret_like_content');
  });

  it('adds the human gate to high-risk plans', () => {
    const spec = createCodingTaskSpec({ title: 'secret task', prompt: '请处理 token 并 deploy production' });
    const plan = planDualCodingRun(spec);
    expect(plan.humanReviewRequired).toBe(true);
    expect(plan.phases.map((phase) => phase.role)).toContain('human_gate');
  });

  it('accepts a normal feature preview through arbitration', () => {
    const preview = runDualCodingOrganPreview({ title: '新增页面', prompt: '新增一个页面和模块，补测试并更新 README' });
    expect(preview.spec.kind).toBe('feature');
    expect(preview.review.verdict).toBe('approve');
    expect(preview.tests.signal).toBe('passed');
    expect(preview.arbitration.decision).toBe('accept');
  });

  it('writes a coding crystal for accepted previews', () => {
    const preview = runDualCodingOrganPreview({ title: '新增页面', prompt: '新增一个页面和模块，补测试并更新 README' });
    expect(preview.crystal).toBeDefined();
    expect(preview.crystal?.answerProgram).toContain('write_crystal');
  });

  it('does not write a crystal for high-risk secret tasks', () => {
    const preview = runDualCodingOrganPreview({ title: 'secret task', prompt: '这里有 api key sk-test-secret，请自动提交到仓库' });
    expect(preview.arbitration.decision).toBe('human_review');
    expect(preview.crystal).toBeUndefined();
  });

  it('blocks review when the patch is risky', () => {
    const spec = createCodingTaskSpec({ title: 'secret task', prompt: 'api key sk-test-secret' });
    const plan = planDualCodingRun(spec);
    const patch = simulateCodexPatch(spec, plan);
    const review = simulateClaudeCodeReview(spec, patch);
    expect(review.verdict).toBe('block');
  });

  it('passes mock tests for safe approved tasks', () => {
    const spec = createCodingTaskSpec({ title: 'safe feature', prompt: '新增一个页面和模块，补测试' });
    const plan = planDualCodingRun(spec);
    const patch = simulateCodexPatch(spec, plan);
    const review = simulateClaudeCodeReview(spec, patch);
    const tests = simulateTestRun(spec, patch, review);
    expect(review.verdict).toBe('approve');
    expect(tests.signal).toBe('passed');
  });

  it('calculates closure gain from before/after residuals', () => {
    expect(calculateClosureGain(0.8, 0.2)).toBe(0.75);
  });

  it('writes bugfix crystals with bugfix yayan', () => {
    const preview = runDualCodingOrganPreview({ title: '修复崩溃', prompt: '修复 typecheck 报错并补一个回归测试' });
    expect(preview.spec.kind).toBe('bugfix');
    expect(preview.crystal?.yayan).toMatch(/码崩|修补/);
  });
});

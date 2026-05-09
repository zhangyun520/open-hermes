import { describe, expect, it } from 'vitest';
import {
  calculateClosureGain,
  calculateCrystalValue,
  canPromoteCrystal,
  exportCrystalTrainingPack,
  findCrystalById,
  invokeCrystalPreview,
  selectCrystalRoute,
  starterCrystals,
  type JellyCrystal
} from '../lib/crystals';

function mustFindCrystal(crystalId: string): JellyCrystal {
  const crystal = findCrystalById(crystalId);
  expect(crystal).toBeDefined();
  return crystal as JellyCrystal;
}

describe('Jelly Crystal Commons', () => {
  it('routes price objections to the sales trust-deficit crystal', () => {
    const decision = selectCrystalRoute('客户说这个车险太贵了，感觉他不信任我');
    expect(decision.route).toBe('exact_crystal');
    expect(decision.crystalId).toBe('sales.price_objection.trust_deficit.v1');
    expect(decision.requiresHumanReview).toBe(false);
  });

  it('routes null crashes to the code crystal and includes the guard step', () => {
    const preview = invokeCrystalPreview('代码空值导致崩溃，边界条件没测');
    expect(preview.decision.crystalId).toBe('code.null_crash.boundary_gap.v1');
    expect(preview.answerProgram).toContain('guard_null_or_empty');
  });

  it('routes chorus energy gaps to the music crystal and includes low-end strengthening', () => {
    const preview = invokeCrystalPreview('副歌不燃，鼓太稀，低频弱');
    expect(preview.decision.crystalId).toBe('music.chorus.energy_gap.v1');
    expect(preview.answerProgram).toContain('strengthen_low_end');
  });

  it('keeps empty input on low-confidence fallback with 未明 yayan', () => {
    const preview = invokeCrystalPreview('');
    expect(preview.decision.route).toBe('large_model_reasoning');
    expect(preview.decision.confidence).toBeLessThan(0.1);
    expect(preview.yayan).toContain('未明');
  });

  it('routes API-key-like input to human review', () => {
    const decision = selectCrystalRoute('这里有 api key sk-test-secret');
    expect(decision.route).toBe('human_review');
    expect(decision.requiresHumanReview).toBe(true);
    expect(decision.riskLevel).toBe('high');
  });

  it('calculates closure gain from D reduction', () => {
    expect(calculateClosureGain(0.8, 0.2)).toBe(0.75);
  });

  it('allows public promotion for a verified low-risk public crystal', () => {
    const crystal = mustFindCrystal('sales.price_objection.trust_deficit.v1');
    expect(canPromoteCrystal(crystal, 'public')).toEqual({ allowed: true, reasons: [] });
  });

  it('blocks public promotion for a high privacy crystal', () => {
    const crystal = { ...mustFindCrystal('sales.price_objection.trust_deficit.v1'), governance: { ...mustFindCrystal('sales.price_objection.trust_deficit.v1').governance, privacy: 'high' as const } };
    const promotion = canPromoteCrystal(crystal, 'public');
    expect(promotion.allowed).toBe(false);
    expect(promotion.reasons.join(' ')).toContain('privacy');
  });

  it('exports all five deterministic training export kinds', () => {
    const crystal = mustFindCrystal('code.null_crash.boundary_gap.v1');
    const pack = exportCrystalTrainingPack(crystal);
    expect(pack.map((item) => item.kind)).toEqual(['sft', 'preference_pair', 'eval', 'negative_memory', 'tool_spec']);
    expect(pack.every((item) => item.crystalId === crystal.crystalId)).toBe(true);
  });

  it('calculates a positive value for the sales crystal', () => {
    const sales = mustFindCrystal('sales.price_objection.trust_deficit.v1');
    expect(calculateCrystalValue(sales)).toBeGreaterThan(0);
  });

  it('ships at least five starter crystals without adding paid integrations', () => {
    expect(starterCrystals.length).toBeGreaterThanOrEqual(5);
    expect(starterCrystals.every((crystal) => crystal.governance.provenance.length > 0)).toBe(true);
  });
});

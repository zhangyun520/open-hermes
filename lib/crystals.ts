import type { RiskLevel } from './types';

export type CrystalLayer = 'private' | 'team' | 'community' | 'public';
export type CrystalStatus = 'candidate' | 'verified' | 'public_commons' | 'quarantined' | 'deprecated';
export type EnergyRouteLevel =
  | 'exact_crystal'
  | 'hypergraph_match'
  | 'semantic_match'
  | 'small_model_render'
  | 'large_model_reasoning'
  | 'human_review';

export type TrainingExportKind = 'sft' | 'preference_pair' | 'eval' | 'negative_memory' | 'tool_spec';

export interface CrystalInputSchema {
  domain: string;
  residual: string;
  contextRequired: string[];
}

export interface CrystalSemanticSignature {
  elements: string[];
  compounds: string[];
  residuals: string[];
  yayan: string;
  aliases: string[];
}

export interface CrystalAnswerProgram {
  steps: string[];
  outputForms: Array<'short_reply' | 'roleplay_script' | 'training_card' | 'voice_coaching' | 'code_patch' | 'creative_brief'>;
}

export interface CrystalVerifier {
  successMetrics: string[];
  tests: string[];
  failureCases: string[];
}

export interface CrystalGovernance {
  layer: CrystalLayer;
  privacy: RiskLevel;
  safety: RiskLevel;
  license: 'private' | 'team' | 'community' | 'public_skill_commons';
  trainingUse: 'not_allowed' | 'opt_in' | 'allowed_if_public';
  provenance: string[];
}

export interface CrystalEconomics {
  reuseCount: number;
  avgClosureGain: number;
  avgCostSaved: number;
  verificationCost: number;
  maintenanceCost: number;
  riskCost: number;
  failureRate: number;
}

export interface JellyCrystal {
  crystalId: string;
  title: string;
  version: string;
  status: CrystalStatus;
  inputSchema: CrystalInputSchema;
  semanticSignature: CrystalSemanticSignature;
  answerProgram: CrystalAnswerProgram;
  verifier: CrystalVerifier;
  governance: CrystalGovernance;
  economics: CrystalEconomics;
  createdAt: string;
  updatedAt: string;
}

export interface ClosureProof {
  crystalId: string;
  beforeD: number;
  afterD: number;
  closureGain: number;
  evidence: string[];
  failureCases: string[];
  passed: boolean;
}

export interface CrystalRouteDecision {
  route: EnergyRouteLevel;
  crystalId?: string;
  reason: string;
  energyScore: number;
  confidence: number;
  riskLevel: RiskLevel;
  requiresHumanReview: boolean;
  matchedElements: string[];
  fallbackRoutes: EnergyRouteLevel[];
}

export interface CrystalTrainingExport {
  crystalId: string;
  kind: TrainingExportKind;
  input: string;
  output: string;
  metadata: Record<string, string | number | boolean | string[]>;
}

const fallbackYayan = '象：未明。病：待析。法：问界。验：补证。禁：勿强答。';
const starterDate = '2026-05-09T00:00:00.000Z';

const routeEnergy: Record<EnergyRouteLevel, number> = {
  exact_crystal: 0.05,
  hypergraph_match: 0.12,
  semantic_match: 0.28,
  small_model_render: 0.42,
  large_model_reasoning: 0.85,
  human_review: 1
};

export const starterCrystals: JellyCrystal[] = [
  {
    crystalId: 'sales.price_objection.trust_deficit.v1',
    title: '车险价格异议处理',
    version: 'v1',
    status: 'verified',
    inputSchema: { domain: 'sales', residual: 'price objection caused by trust and value opacity', contextRequired: ['customer concern', 'product value', 'next step'] },
    semanticSignature: {
      elements: ['客', '疑', '价', '信', '值'],
      compounds: ['客疑价', '信亏', '值隐'],
      residuals: ['price_objection', 'trust_deficit', 'value_hidden'],
      yayan: '象：客疑价。病：信亏值隐。法：受疑，转值，设步。验：客复问则成。禁：勿急降。',
      aliases: ['车险', '价格异议', '太贵', '不信任', 'price objection', 'trust deficit', 'insurance']
    },
    answerProgram: { steps: ['acknowledge_concern', 'reframe_price_as_value', 'reduce_decision_risk', 'propose_micro_next_step'], outputForms: ['short_reply', 'roleplay_script', 'training_card'] },
    verifier: { successMetrics: ['customer asks a follow-up question', 'decision risk is reduced', 'no premature discounting'], tests: ['price concern is acknowledged before reframing', 'next step is small and reversible'], failureCases: ['angry_customer', 'regulated_claim', 'price_actually_uncompetitive'] },
    governance: { layer: 'public', privacy: 'low', safety: 'low', license: 'public_skill_commons', trainingUse: 'allowed_if_public', provenance: ['starter_crystal_catalog', 'sales_residual_pattern_v1'] },
    economics: { reuseCount: 42, avgClosureGain: 0.62, avgCostSaved: 1.8, verificationCost: 12, maintenanceCost: 4, riskCost: 2, failureRate: 0.08 },
    createdAt: starterDate,
    updatedAt: starterDate
  },
  {
    crystalId: 'code.null_crash.boundary_gap.v1',
    title: '空值崩溃与边界补例',
    version: 'v1',
    status: 'verified',
    inputSchema: { domain: 'code', residual: 'null or empty input crash due to missing boundary guard', contextRequired: ['failure reproduction', 'boundary contract', 'regression test'] },
    semanticSignature: {
      elements: ['码', '空', '崩', '界', '护', '测'],
      compounds: ['码空崩', '界未护'],
      residuals: ['null_crash', 'boundary_gap', 'missing_regression'],
      yayan: '象：码空崩。病：空值未护，边界未测。法：护空，测界，补例。验：通测则成。禁：勿只改表象。',
      aliases: ['空值', 'null', 'undefined', '崩溃', 'crash', '边界', 'boundary', 'regression']
    },
    answerProgram: { steps: ['reproduce_failure', 'guard_null_or_empty', 'test_boundaries', 'add_regression_case'], outputForms: ['code_patch', 'training_card'] },
    verifier: { successMetrics: ['regression test fails before fix and passes after fix', 'null and empty inputs are handled'], tests: ['add null case', 'add empty case', 'run focused regression suite'], failureCases: ['unreproduced_failure', 'schema_contract_unknown', 'only_surface_patch'] },
    governance: { layer: 'community', privacy: 'low', safety: 'low', license: 'public_skill_commons', trainingUse: 'opt_in', provenance: ['starter_crystal_catalog', 'code_boundary_pattern_v1'] },
    economics: { reuseCount: 35, avgClosureGain: 0.7, avgCostSaved: 2.1, verificationCost: 10, maintenanceCost: 3, riskCost: 1, failureRate: 0.06 },
    createdAt: starterDate,
    updatedAt: starterDate
  },
  {
    crystalId: 'music.chorus.energy_gap.v1',
    title: '副歌能量不足修复',
    version: 'v1',
    status: 'verified',
    inputSchema: { domain: 'music', residual: 'chorus lacks energy because drums, low end, or vocal texture are weak', contextRequired: ['section role', 'arrangement density', 'reference energy'] },
    semanticSignature: {
      elements: ['副', '燃', '鼓', '低', '声'],
      compounds: ['副燃亏', '鼓稀', '低弱'],
      residuals: ['chorus_energy_gap', 'thin_drums', 'weak_low_end'],
      yayan: '象：副燃亏。病：鼓稀低弱声薄。法：增鼓，补低，叠声。验：能升则成。禁：勿满墙堆砌。',
      aliases: ['副歌', '不燃', '能量不足', '鼓太稀', '低频弱', 'chorus', 'low end', 'drum density']
    },
    answerProgram: { steps: ['increase_drum_density', 'strengthen_low_end', 'layer_vocals_or_texture', 'build_pre_chorus_tension'], outputForms: ['creative_brief', 'training_card'] },
    verifier: { successMetrics: ['chorus energy rises without masking the vocal', 'pre-chorus tension points into the chorus'], tests: ['compare chorus density before and after', 'check low-end clarity'], failureCases: ['overcompressed_wall_of_sound', 'vocal_masked', 'genre_reference_mismatch'] },
    governance: { layer: 'community', privacy: 'low', safety: 'low', license: 'public_skill_commons', trainingUse: 'opt_in', provenance: ['starter_crystal_catalog', 'music_arrangement_pattern_v1'] },
    economics: { reuseCount: 24, avgClosureGain: 0.58, avgCostSaved: 1.4, verificationCost: 6, maintenanceCost: 2, riskCost: 1, failureRate: 0.1 },
    createdAt: starterDate,
    updatedAt: starterDate
  },
  {
    crystalId: 'video.hook_pacing_gap.v1',
    title: '短视频钩子与节奏修复',
    version: 'v1',
    status: 'verified',
    inputSchema: { domain: 'video', residual: 'early hook arrives late and pacing loses viewer attention', contextRequired: ['first frame', 'cut timing', 'retention signal'] },
    semanticSignature: {
      elements: ['钩', '镜', '拍', '留'],
      compounds: ['钩迟', '镜滞'],
      residuals: ['late_hook', 'stale_shot', 'retention_drop'],
      yayan: '象：钩迟镜滞。病：首息无钩，镜久不变。法：峰前，短切，入拍。验：留观升则成。禁：勿乱加噪。',
      aliases: ['钩子', '节奏', '短视频', '留观', 'hook', 'pacing', 'retention', 'cut']
    },
    answerProgram: { steps: ['move_peak_frame_forward', 'shorten_early_cuts', 'sync_cuts_to_beat', 'add_reaction_closeup'], outputForms: ['creative_brief', 'training_card'] },
    verifier: { successMetrics: ['first meaningful hook appears earlier', 'retention improves without noisy edits'], tests: ['inspect first three seconds', 'count early shot duration'], failureCases: ['noise_without_signal', 'misleading_hook', 'brand_safety_unknown'] },
    governance: { layer: 'community', privacy: 'low', safety: 'low', license: 'public_skill_commons', trainingUse: 'opt_in', provenance: ['starter_crystal_catalog', 'video_pacing_pattern_v1'] },
    economics: { reuseCount: 18, avgClosureGain: 0.54, avgCostSaved: 1.3, verificationCost: 5, maintenanceCost: 2, riskCost: 1, failureRate: 0.12 },
    createdAt: starterDate,
    updatedAt: starterDate
  },
  {
    crystalId: 'care.self_blame.freeze.v1',
    title: '自责冻结陪伴',
    version: 'v1',
    status: 'candidate',
    inputSchema: { domain: 'care', residual: 'self-blame creates action freeze and needs gentle support', contextRequired: ['emotional state', 'safe next action', 'support boundary'] },
    semanticSignature: {
      elements: ['人', '责', '罪', '行', '冻'],
      compounds: ['人自责', '罪盛', '行冻'],
      residuals: ['self_blame', 'action_freeze', 'needs_compassion'],
      yayan: '象：人自责。病：罪盛行冻。法：承痛，减罪，小行。验：愿言则成。禁：勿急讲理。',
      aliases: ['自责', '冻结', '动不了', '内疚', 'self blame', 'freeze', 'guilt']
    },
    answerProgram: { steps: ['validate_pain', 'reduce_totalizing_blame', 'avoid_rationalizing_too_early', 'propose_one_small_action'], outputForms: ['short_reply', 'voice_coaching', 'training_card'] },
    verifier: { successMetrics: ['person feels heard before action is suggested', 'one small reversible action is offered'], tests: ['no premature rationalizing', 'no diagnosis or crisis claim'], failureCases: ['acute_self_harm_signal', 'medical_or_legal_need', 'user_rejects_support'] },
    governance: { layer: 'private', privacy: 'medium', safety: 'medium', license: 'private', trainingUse: 'not_allowed', provenance: ['starter_crystal_catalog', 'care_support_pattern_v1'] },
    economics: { reuseCount: 12, avgClosureGain: 0.48, avgCostSaved: 0.8, verificationCost: 8, maintenanceCost: 4, riskCost: 5, failureRate: 0.18 },
    createdAt: starterDate,
    updatedAt: starterDate
  }
];

function roundTo(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function normalize(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function includesAny(normalized: string, terms: string[]): boolean {
  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

function scoreCrystal(crystal: JellyCrystal, normalized: string) {
  const titleOrIdMatch = normalized.length > 0 && (normalized.includes(crystal.crystalId.toLowerCase()) || normalized.includes(crystal.title.toLowerCase()));
  const aliasMatches = crystal.semanticSignature.aliases.filter((alias) => normalized.includes(alias.toLowerCase()));
  const compoundMatches = crystal.semanticSignature.compounds.filter((compound) => normalized.includes(compound.toLowerCase()));
  const residualMatches = crystal.semanticSignature.residuals.filter((residual) => normalized.includes(residual.toLowerCase().replace(/_/g, ' ')) || normalized.includes(residual.toLowerCase()));
  const elementMatches = crystal.semanticSignature.elements.filter((element) => normalized.includes(element.toLowerCase()));
  const score = (titleOrIdMatch ? 10 : 0) + aliasMatches.length * 3 + compoundMatches.length * 4 + residualMatches.length * 3 + elementMatches.length;

  return { titleOrIdMatch, aliasMatches, compoundMatches, residualMatches, elementMatches, score };
}

function bestCrystalMatch(normalized: string) {
  return starterCrystals
    .map((crystal) => ({ crystal, match: scoreCrystal(crystal, normalized) }))
    .sort((a, b) => b.match.score - a.match.score || a.crystal.crystalId.localeCompare(b.crystal.crystalId))[0];
}

export function detectCrystalRisk(input: string): RiskLevel {
  const normalized = normalize(input);
  const riskPatterns = [
    /\b1[3-9]\d{9}\b/,
    /\b\d{15}\b|\b\d{17}[\dx]\b/i,
    /[\u4e00-\u9fa5][a-z][a-z0-9]{5}/i,
    /\bpassword\b|密码|api\s*key|sk-[a-z0-9-]{8,}|\btoken\b|secret|密钥/i
  ];

  return riskPatterns.some((pattern) => pattern.test(normalized)) ? 'high' : 'low';
}

export function calculateClosureGain(beforeD: number, afterD: number): number {
  if (beforeD <= 0) return 0;
  return roundTo(Math.max(0, Math.min(1, (beforeD - afterD) / beforeD)), 2);
}

export function buildClosureProof(crystal: JellyCrystal, beforeD: number, afterD: number, evidence: string[] = []): ClosureProof {
  const closureGain = calculateClosureGain(beforeD, afterD);

  return {
    crystalId: crystal.crystalId,
    beforeD,
    afterD,
    closureGain,
    evidence: evidence.length > 0 ? evidence : crystal.verifier.successMetrics,
    failureCases: crystal.verifier.failureCases,
    passed: closureGain >= 0.5 && afterD < beforeD
  };
}

export function calculateCrystalValue(crystal: JellyCrystal): number {
  const { reuseCount, avgCostSaved, avgClosureGain, verificationCost, maintenanceCost, riskCost, failureRate } = crystal.economics;
  return roundTo(reuseCount * avgCostSaved * avgClosureGain - verificationCost - maintenanceCost - riskCost - failureRate * 10, 2);
}

export function canPromoteCrystal(crystal: JellyCrystal, targetLayer: CrystalLayer): { allowed: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (targetLayer !== 'private' && crystal.governance.privacy === 'high') reasons.push('high privacy crystals cannot leave the private layer');
  if (targetLayer !== 'private' && crystal.status === 'quarantined') reasons.push('quarantined crystals cannot be promoted');

  if (targetLayer === 'public') {
    if (!['verified', 'public_commons'].includes(crystal.status)) reasons.push('public promotion requires verified or public_commons status');
    if (crystal.governance.privacy !== 'low') reasons.push('public promotion requires low privacy risk');
    if (crystal.governance.safety !== 'low') reasons.push('public promotion requires low safety risk');
    if (crystal.economics.avgClosureGain < 0.5) reasons.push('public promotion requires avgClosureGain >= 0.5');
    if (crystal.economics.failureRate > 0.15) reasons.push('public promotion requires failureRate <= 0.15');
    if (crystal.governance.provenance.length === 0) reasons.push('public promotion requires provenance');
    if (crystal.governance.license !== 'public_skill_commons') reasons.push('public promotion requires public_skill_commons license');
    if (!['allowed_if_public', 'opt_in'].includes(crystal.governance.trainingUse)) reasons.push('public promotion requires opt-in or allowed-if-public training use');
  }

  if (targetLayer === 'community') {
    if (crystal.governance.privacy === 'medium' && crystal.governance.license === 'private') reasons.push('community promotion requires non-private license for medium privacy crystals');
    if (crystal.economics.failureRate > 0.3) reasons.push('community promotion requires failureRate <= 0.3');
  }

  if (targetLayer === 'team') {
    if (crystal.economics.failureRate > 0.4) reasons.push('team promotion requires failureRate <= 0.4');
  }

  return { allowed: reasons.length === 0, reasons };
}

export function encodeCrystalInput(input: string): {
  normalized: string;
  elements: string[];
  compounds: string[];
  residuals: string[];
  yayan: string;
  confidence: number;
  riskLevel: RiskLevel;
} {
  const normalized = normalize(input);
  const riskLevel = detectCrystalRisk(input);

  if (!normalized) {
    return { normalized, elements: [], compounds: [], residuals: [], yayan: fallbackYayan, confidence: 0, riskLevel };
  }

  const best = bestCrystalMatch(normalized);
  const matchedElements = unique([...best.match.elementMatches]);
  const matchedCompounds = unique([...best.match.compoundMatches]);
  const matchedResiduals = unique([...best.match.residualMatches]);
  const aliasBoost = best.match.aliasMatches.length;
  const confidence = Math.min(1, roundTo(best.match.score / 12 + aliasBoost * 0.03, 2));

  if (best.match.score === 0) {
    return { normalized, elements: [], compounds: [], residuals: [], yayan: fallbackYayan, confidence: 0.05, riskLevel };
  }

  return {
    normalized,
    elements: matchedElements.length > 0 ? matchedElements : best.crystal.semanticSignature.elements.slice(0, 2),
    compounds: matchedCompounds.length > 0 ? matchedCompounds : best.crystal.semanticSignature.compounds.slice(0, Math.min(2, aliasBoost)),
    residuals: matchedResiduals.length > 0 ? matchedResiduals : best.crystal.semanticSignature.residuals.slice(0, Math.min(2, aliasBoost)),
    yayan: best.crystal.semanticSignature.yayan,
    confidence,
    riskLevel
  };
}

export function selectCrystalRoute(input: string): CrystalRouteDecision {
  const encoded = encodeCrystalInput(input);

  if (encoded.riskLevel === 'high') {
    return {
      route: 'human_review',
      reason: 'CnidocyteSafetyGate blocked crystal reuse because the input appears to contain private or secret material.',
      energyScore: routeEnergy.human_review,
      confidence: encoded.confidence,
      riskLevel: encoded.riskLevel,
      requiresHumanReview: true,
      matchedElements: encoded.elements,
      fallbackRoutes: []
    };
  }

  const best = bestCrystalMatch(encoded.normalized);
  const exact = best.match.titleOrIdMatch || best.match.aliasMatches.length >= 2 || best.match.compoundMatches.length >= 1;
  const hypergraph = best.match.score >= 6 || best.match.residualMatches.length + best.match.compoundMatches.length >= 2;
  const semantic = best.match.score > 0;
  const matchedElements = unique([...best.match.elementMatches, ...best.match.compoundMatches, ...best.match.residualMatches]);

  if (exact) {
    return {
      route: 'exact_crystal',
      crystalId: best.crystal.crystalId,
      reason: 'Input matched a starter crystal by id, title, alias, or explicit compound.',
      energyScore: routeEnergy.exact_crystal,
      confidence: Math.max(encoded.confidence, 0.82),
      riskLevel: encoded.riskLevel,
      requiresHumanReview: false,
      matchedElements,
      fallbackRoutes: ['hypergraph_match', 'semantic_match', 'large_model_reasoning']
    };
  }

  if (hypergraph) {
    return {
      route: 'hypergraph_match',
      crystalId: best.crystal.crystalId,
      reason: 'Input has enough residual, compound, or alias overlap to reuse a verified closure path.',
      energyScore: routeEnergy.hypergraph_match,
      confidence: Math.max(encoded.confidence, 0.62),
      riskLevel: encoded.riskLevel,
      requiresHumanReview: false,
      matchedElements,
      fallbackRoutes: ['semantic_match', 'small_model_render', 'large_model_reasoning']
    };
  }

  if (semantic) {
    return {
      route: 'semantic_match',
      crystalId: best.crystal.crystalId,
      reason: 'Input has weak semantic overlap; reuse should stay preview-only until verified.',
      energyScore: routeEnergy.semantic_match,
      confidence: Math.max(encoded.confidence, 0.32),
      riskLevel: encoded.riskLevel,
      requiresHumanReview: false,
      matchedElements,
      fallbackRoutes: ['small_model_render', 'large_model_reasoning']
    };
  }

  return {
    route: 'large_model_reasoning',
    reason: 'No useful crystal match; route to non-cached reasoning instead of pretending closure exists.',
    energyScore: routeEnergy.large_model_reasoning,
    confidence: encoded.confidence,
    riskLevel: encoded.riskLevel,
    requiresHumanReview: false,
    matchedElements: [],
    fallbackRoutes: ['human_review']
  };
}

export function invokeCrystalPreview(input: string): {
  decision: CrystalRouteDecision;
  crystal?: JellyCrystal;
  answerProgram: string[];
  yayan: string;
  closureProof?: ClosureProof;
} {
  const decision = selectCrystalRoute(input);
  const encoded = encodeCrystalInput(input);
  const crystal = decision.crystalId ? findCrystalById(decision.crystalId) : undefined;

  if (!crystal || decision.requiresHumanReview) {
    return { decision, answerProgram: [], yayan: encoded.yayan };
  }

  return {
    decision,
    crystal,
    answerProgram: crystal.answerProgram.steps,
    yayan: crystal.semanticSignature.yayan,
    closureProof: buildClosureProof(crystal, 0.8, Math.max(0.1, roundTo(0.8 * (1 - crystal.economics.avgClosureGain), 2)), crystal.verifier.successMetrics)
  };
}

export function exportCrystalTrainingPack(crystal: JellyCrystal): CrystalTrainingExport[] {
  const baseMetadata = {
    title: crystal.title,
    version: crystal.version,
    domain: crystal.inputSchema.domain,
    privacy: crystal.governance.privacy,
    safety: crystal.governance.safety,
    synthetic: true
  };

  return [
    {
      crystalId: crystal.crystalId,
      kind: 'sft',
      input: `${crystal.semanticSignature.yayan}\nProblem: ${crystal.inputSchema.residual}`,
      output: `Use answer program: ${crystal.answerProgram.steps.join(' -> ')}. Verify with: ${crystal.verifier.successMetrics.join('; ')}.`,
      metadata: baseMetadata
    },
    {
      crystalId: crystal.crystalId,
      kind: 'preference_pair',
      input: `Choose the safer closure path for ${crystal.title}.`,
      output: `Preferred: ${crystal.answerProgram.steps.join(' -> ')}. Rejected: ${crystal.verifier.failureCases.join(' / ')} or banned shortcut behavior.`,
      metadata: { ...baseMetadata, pairType: 'good_program_vs_failure_boundary' }
    },
    {
      crystalId: crystal.crystalId,
      kind: 'eval',
      input: `Regression prompt for ${crystal.crystalId}: ${crystal.inputSchema.residual}`,
      output: `Must satisfy tests: ${crystal.verifier.tests.join('; ')}.`,
      metadata: { ...baseMetadata, evalTarget: 'closure_path_verification' }
    },
    {
      crystalId: crystal.crystalId,
      kind: 'negative_memory',
      input: `When using ${crystal.title}, avoid known failure modes.`,
      output: `Failure cases: ${crystal.verifier.failureCases.join('; ')}. Do not override privacy, safety, or verifier gates.`,
      metadata: { ...baseMetadata, failureCases: crystal.verifier.failureCases }
    },
    {
      crystalId: crystal.crystalId,
      kind: 'tool_spec',
      input: JSON.stringify(crystal.inputSchema),
      output: JSON.stringify({ outputForms: crystal.answerProgram.outputForms, verifier: crystal.verifier }),
      metadata: { ...baseMetadata, outputForms: crystal.answerProgram.outputForms }
    }
  ];
}

export function findCrystalById(crystalId: string): JellyCrystal | undefined {
  return starterCrystals.find((crystal) => crystal.crystalId === crystalId);
}

export function searchCrystals(query: string): JellyCrystal[] {
  const normalized = normalize(query);
  if (!normalized) return starterCrystals;

  return starterCrystals
    .map((crystal) => ({ crystal, match: scoreCrystal(crystal, normalized) }))
    .filter(({ match, crystal }) => match.score > 0 || includesAny(normalized, [crystal.title, crystal.inputSchema.domain]))
    .sort((a, b) => b.match.score - a.match.score || a.crystal.title.localeCompare(b.crystal.title))
    .map(({ crystal }) => crystal);
}

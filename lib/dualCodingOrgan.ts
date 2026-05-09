import type { RiskLevel } from './types';

export type CodingOrganRole =
  | 'planner'
  | 'codex_worker'
  | 'claude_code_reviewer'
  | 'test_runner'
  | 'patch_arbiter'
  | 'crystal_writer'
  | 'human_gate';

export type CodingTaskKind = 'feature' | 'bugfix' | 'refactor' | 'test' | 'documentation' | 'security' | 'unknown';

export type CodingRunStatus =
  | 'planned'
  | 'needs_human_review'
  | 'patch_proposed'
  | 'review_failed'
  | 'tests_failed'
  | 'accepted'
  | 'quarantined';

export type TestSignal = 'not_run' | 'passed' | 'failed' | 'requires_human';

export interface CodingTaskSpec {
  taskId: string;
  title: string;
  repo: string;
  branch: string;
  kind: CodingTaskKind;
  prompt: string;
  expectedFiles: string[];
  testCommands: string[];
  constraints: string[];
  riskLevel: RiskLevel;
  riskReasons: string[];
}

export interface CodingPlan {
  taskId: string;
  phases: Array<{
    role: CodingOrganRole;
    title: string;
    actions: string[];
    doneWhen: string[];
  }>;
  suspectedFiles: string[];
  requiredChecks: string[];
  humanReviewRequired: boolean;
  riskReasons: string[];
}

export interface MockPatch {
  taskId: string;
  changedFiles: string[];
  diffSummary: string[];
  patchRisk: RiskLevel;
  reusablePattern: string[];
  forbiddenFindings: string[];
}

export interface MockCodeReview {
  taskId: string;
  reviewer: 'claude_code_mock';
  verdict: 'approve' | 'request_changes' | 'block';
  comments: string[];
  requiredChanges: string[];
  riskFindings: string[];
}

export interface MockTestRun {
  taskId: string;
  signal: TestSignal;
  commands: string[];
  passed: string[];
  failed: string[];
  logSummary: string[];
}

export interface PatchArbitration {
  taskId: string;
  status: CodingRunStatus;
  decision: 'accept' | 'revise' | 'quarantine' | 'human_review';
  reasons: string[];
  nextActions: string[];
}

export interface CodingCrystal {
  crystalId: string;
  sourceTaskId: string;
  title: string;
  yayan: string;
  problemPattern: string[];
  answerProgram: string[];
  verifier: string[];
  failureCases: string[];
  reusablePattern: string[];
  provenance: string[];
  closureProof: {
    beforeD: number;
    afterD: number;
    closureGain: number;
    evidence: string[];
  };
}

export interface DualCodingPreview {
  spec: CodingTaskSpec;
  plan: CodingPlan;
  patch: MockPatch;
  review: MockCodeReview;
  tests: MockTestRun;
  arbitration: PatchArbitration;
  crystal?: CodingCrystal;
}

export const codingOrganRoles: Array<{
  role: CodingOrganRole;
  title: string;
  metaphor: string;
  duties: string[];
  kpis: string[];
  boundaries: string[];
}> = [
  {
    role: 'planner',
    title: '任务规划器 / Planner',
    metaphor: 'NerveNetRouter turns a vague task into a scoped engineering route.',
    duties: ['infer task kind', 'identify likely files', 'choose checks', 'set human review requirement'],
    kpis: ['minimal scope', 'correct risk routing', 'clear done-when list'],
    boundaries: ['must not execute code']
  },
  {
    role: 'codex_worker',
    title: '鲁班施工器官 / Codex Worker',
    metaphor: 'A mock construction tentacle that proposes small, testable patches.',
    duties: ['propose patch', 'edit expected files', 'keep diff minimal', 'add tests when needed'],
    kpis: ['changed files match scope', 'no secrets introduced', 'patch pattern reusable'],
    boundaries: ['mock only in MVP; no real repo writes']
  },
  {
    role: 'claude_code_reviewer',
    title: '文衡审稿器官 / Claude Code Reviewer',
    metaphor: 'A mock review office that critiques architecture, risk, and over-editing.',
    duties: ['review architecture', 'catch hidden boundary issues', 'request changes when tests or risk missing', 'critique over-editing'],
    kpis: ['catches missing tests', 'catches risky changes', 'comments are actionable'],
    boundaries: ['should not be used for cheap repetitive formatting']
  },
  {
    role: 'test_runner',
    title: 'CI 神经反射 / Test Runner',
    metaphor: 'A deterministic reflex that represents test and typecheck signals.',
    duties: ['represent npm test / typecheck / build', 'provide pass/fail signal', 'summarize failure'],
    kpis: ['deterministic pass/fail', 'commands are explicit'],
    boundaries: ['no actual shell execution in MVP']
  },
  {
    role: 'patch_arbiter',
    title: '补丁裁判 / Patch Arbiter',
    metaphor: 'CnidocyteSafetyGate plus verifier: accept, revise, quarantine, or gate.',
    duties: ['accept / revise / quarantine / human review', 'merge review and test signals', 'protect high-risk paths'],
    kpis: ['no risky auto-accept', 'clear next actions'],
    boundaries: ['cannot override human gates for high-risk tasks']
  },
  {
    role: 'crystal_writer',
    title: '代码结晶写入器 / Crystal Writer',
    metaphor: 'ResidualDigestor compresses an accepted patch into a reusable coding crystal.',
    duties: ['produce reusable coding crystal from accepted patch', 'record yayan code', 'record verifier and failure cases'],
    kpis: ['every accepted patch becomes reusable pattern', 'no failed patch becomes crystal'],
    boundaries: ['must not turn failed or quarantined patches into crystals']
  },
  {
    role: 'human_gate',
    title: '人类闸门 / Human Gate',
    metaphor: 'The consent membrane for secrets, destructive actions, and public promotion.',
    duties: ['approve high-risk changes', 'handle secrets/destructive actions', 'final review for public promotion'],
    kpis: ['human review required for high-risk tasks'],
    boundaries: ['must not be bypassed by mock workers']
  }
];

const defaultRepo = 'zhangyun520/open-hermes';
const defaultBranch = 'feature/dual-coding-organ';
const defaultTestCommands = ['npm test', 'npm run typecheck:core'];
const defaultConstraints = ['No secrets', 'No paid API calls', 'No external writes', 'Run tests or document limitations'];

function normalize(input: string): string {
  return input.trim().toLowerCase();
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function hasAny(normalized: string, terms: string[]): boolean {
  return terms.some((term) => normalized.includes(term));
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function makeTaskId(title: string, prompt: string): string {
  const source = `${title} ${prompt}`
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return `coding-${source || 'task'}`;
}

function rolePhase(role: CodingOrganRole) {
  const entry = codingOrganRoles.find((item) => item.role === role);
  return {
    role,
    title: entry?.title ?? role,
    actions: entry?.duties ?? [],
    doneWhen: entry?.kpis ?? []
  };
}

function inferFiles(spec: CodingTaskSpec): string[] {
  if (spec.expectedFiles.length > 0) return spec.expectedFiles;

  const text = normalize(`${spec.title} ${spec.prompt}`);
  const files: string[] = [];

  if (hasAny(text, ['page', '页面', '模块', 'feature', '新增', '实现'])) {
    files.push('app/.../page.tsx', 'lib/modules.ts');
  }

  if (hasAny(text, ['library', 'core', 'lib', '逻辑', '器官', 'organ'])) {
    files.push('lib/*.ts');
  }

  if (hasAny(text, ['test', 'vitest', 'coverage', '测试', '补例', '回归'])) {
    files.push('tests/*.test.ts');
  }

  if (hasAny(text, ['readme', 'doc', 'whitepaper', '文档', '说明'])) {
    files.push('README.md');
  }

  if (files.length === 0 && spec.kind === 'bugfix') files.push('lib/*.ts', 'tests/*.test.ts');
  if (files.length === 0 && spec.kind === 'documentation') files.push('README.md');
  if (files.length === 0 && spec.kind === 'test') files.push('tests/*.test.ts');

  return unique(files);
}

export function detectCodingTaskKind(input: string): CodingTaskKind {
  const normalized = normalize(input);
  if (hasAny(normalized, ['bug', 'fix', 'error', 'fail', '报错', '崩', '修复', '失败'])) return 'bugfix';
  if (hasAny(normalized, ['refactor', '重构', 'cleanup', '架构调整'])) return 'refactor';
  if (hasAny(normalized, ['security', 'secret', 'api key', 'token', '漏洞', '密钥', '权限'])) return 'security';
  if (hasAny(normalized, ['add', 'create', 'implement', 'feature', '新增', '实现', '页面', '模块'])) return 'feature';
  if (hasAny(normalized, ['test', 'vitest', 'coverage', '测试', '补例'])) return 'test';
  if (hasAny(normalized, ['doc', 'readme', 'whitepaper', '文档', '说明'])) return 'documentation';
  return 'unknown';
}

export function detectCodingRisk(input: string): { riskLevel: RiskLevel; reasons: string[] } {
  const normalized = normalize(input);
  const highReasons: string[] = [];
  const mediumReasons: string[] = [];

  if (hasAny(normalized, ['api key', 'sk-', 'token', 'secret', 'password', '密钥', '私钥'])) highReasons.push('secret_like_content');
  if (hasAny(normalized, ['删除数据库', 'drop table', 'rm -rf'])) highReasons.push('destructive_action');
  if (hasAny(normalized, ['deploy production', '生产环境'])) highReasons.push('production_deploy');
  if (hasAny(normalized, ['法律承诺', '医疗建议'])) highReasons.push('regulated_claim');

  if (hasAny(normalized, ['auth', 'permission', 'oauth', 'login', '权限', '登录'])) mediumReasons.push('auth_or_permission_area');
  if (hasAny(normalized, ['payment', 'billing', '付款', '转账', '支付', '账单'])) mediumReasons.push('auth_or_payment_area');
  if (hasAny(normalized, ['删除'])) mediumReasons.push('destructive_area');

  if (highReasons.length > 0) return { riskLevel: 'high', reasons: unique(highReasons) };
  if (mediumReasons.length > 0) return { riskLevel: 'medium', reasons: unique(mediumReasons) };
  return { riskLevel: 'low', reasons: [] };
}

export function createCodingTaskSpec(input: {
  taskId?: string;
  title: string;
  repo?: string;
  branch?: string;
  prompt: string;
  expectedFiles?: string[];
  testCommands?: string[];
  constraints?: string[];
}): CodingTaskSpec {
  const risk = detectCodingRisk(`${input.title} ${input.prompt} ${(input.constraints ?? []).join(' ')}`);
  const kind = detectCodingTaskKind(`${input.title} ${input.prompt}`);

  return {
    taskId: input.taskId ?? makeTaskId(input.title, input.prompt),
    title: input.title,
    repo: input.repo ?? defaultRepo,
    branch: input.branch ?? defaultBranch,
    kind,
    prompt: input.prompt,
    expectedFiles: input.expectedFiles ?? [],
    testCommands: input.testCommands ?? defaultTestCommands,
    constraints: unique([...defaultConstraints, ...(input.constraints ?? [])]),
    riskLevel: risk.riskLevel,
    riskReasons: risk.reasons
  };
}

export function planDualCodingRun(spec: CodingTaskSpec): CodingPlan {
  const phaseRoles: CodingOrganRole[] = ['planner', 'codex_worker', 'claude_code_reviewer', 'test_runner'];
  if (spec.riskLevel === 'high') phaseRoles.push('human_gate');
  phaseRoles.push('patch_arbiter', 'crystal_writer');

  const suspectedFiles = inferFiles(spec);
  const requiredChecks = spec.riskLevel === 'high' ? ['human review before patch arbitration', ...spec.testCommands] : spec.testCommands;

  return {
    taskId: spec.taskId,
    phases: phaseRoles.map(rolePhase),
    suspectedFiles,
    requiredChecks,
    humanReviewRequired: spec.riskLevel === 'high',
    riskReasons: spec.riskReasons
  };
}

export function simulateCodexPatch(spec: CodingTaskSpec, plan: CodingPlan): MockPatch {
  if (spec.riskLevel === 'high') {
    return {
      taskId: spec.taskId,
      changedFiles: [],
      diffSummary: ['blocked before patch proposal because the task requires human review'],
      patchRisk: 'high',
      reusablePattern: [],
      forbiddenFindings: spec.riskReasons
    };
  }

  const changedFiles = plan.suspectedFiles;
  const reusablePattern: string[] = [];
  const diffSummary: string[] = [];

  if (changedFiles.some((file) => file.startsWith('lib/'))) {
    reusablePattern.push('add_core_lib');
    diffSummary.push('add/modify core library logic');
  }
  if (changedFiles.some((file) => file.startsWith('tests/'))) {
    reusablePattern.push('add_tests');
    diffSummary.push('add/modify tests for deterministic coverage');
  }
  if (changedFiles.some((file) => file.startsWith('app/'))) {
    reusablePattern.push('add_static_page');
    diffSummary.push('add/modify static page preview');
  }
  if (changedFiles.includes('lib/modules.ts')) {
    reusablePattern.push('update_module_registry');
    diffSummary.push('update module registry for discoverability');
  }
  if (changedFiles.includes('README.md')) {
    reusablePattern.push('update_readme');
    diffSummary.push('update README documentation');
  }
  if (diffSummary.length === 0) diffSummary.push('propose scoped patch for suspected files');

  return {
    taskId: spec.taskId,
    changedFiles,
    diffSummary,
    patchRisk: spec.riskLevel,
    reusablePattern: unique(reusablePattern),
    forbiddenFindings: []
  };
}

export function simulateClaudeCodeReview(spec: CodingTaskSpec, patch: MockPatch): MockCodeReview {
  if (spec.riskLevel === 'high' || patch.patchRisk === 'high' || patch.forbiddenFindings.length > 0) {
    return {
      taskId: spec.taskId,
      reviewer: 'claude_code_mock',
      verdict: 'block',
      comments: ['Blocked: high-risk or forbidden findings must pass the Human Gate before any patch can be reused.'],
      requiredChanges: ['remove secrets/destructive instructions or obtain explicit human approval'],
      riskFindings: unique([...spec.riskReasons, ...patch.forbiddenFindings])
    };
  }

  const hasChangedTest = patch.changedFiles.some((file) => file.startsWith('tests/') || file.includes('.test.'));
  const hasTestCommand = spec.testCommands.length > 0;

  if (!hasChangedTest && !hasTestCommand) {
    return {
      taskId: spec.taskId,
      reviewer: 'claude_code_mock',
      verdict: 'request_changes',
      comments: ['Add or name a verifier before the patch can be accepted.'],
      requiredChanges: ['add tests or document an explicit check limitation'],
      riskFindings: []
    };
  }

  if (patch.changedFiles.length > 6) {
    return {
      taskId: spec.taskId,
      reviewer: 'claude_code_mock',
      verdict: 'request_changes',
      comments: ['Patch touches more than six files; split or justify the scope before reuse.'],
      requiredChanges: ['reduce scope or add a clearer file-by-file migration plan'],
      riskFindings: ['over_scope_patch']
    };
  }

  return {
    taskId: spec.taskId,
    reviewer: 'claude_code_mock',
    verdict: 'approve',
    comments: ['Scope is bounded, tests are represented, and no forbidden behavior was detected.'],
    requiredChanges: [],
    riskFindings: []
  };
}

export function simulateTestRun(spec: CodingTaskSpec, patch: MockPatch, review: MockCodeReview): MockTestRun {
  if (review.verdict === 'block') {
    return {
      taskId: spec.taskId,
      signal: 'requires_human',
      commands: spec.testCommands,
      passed: [],
      failed: [],
      logSummary: ['Tests are not simulated until the high-risk task clears human review.']
    };
  }

  if (review.verdict === 'request_changes') {
    return {
      taskId: spec.taskId,
      signal: 'failed',
      commands: spec.testCommands,
      passed: [],
      failed: spec.testCommands,
      logSummary: ['Mock CI failed because review requested changes before acceptance.']
    };
  }

  if (spec.kind === 'unknown' && spec.expectedFiles.length === 0 && patch.changedFiles.length === 0) {
    return {
      taskId: spec.taskId,
      signal: 'failed',
      commands: spec.testCommands,
      passed: [],
      failed: spec.testCommands,
      logSummary: ['Mock CI failed because the task has no clear files or task kind.']
    };
  }

  return {
    taskId: spec.taskId,
    signal: 'passed',
    commands: spec.testCommands,
    passed: spec.testCommands,
    failed: [],
    logSummary: ['Mock CI passed all represented checks without executing shell commands.']
  };
}

export function arbitratePatch(spec: CodingTaskSpec, review: MockCodeReview, tests: MockTestRun): PatchArbitration {
  if (spec.riskLevel === 'high') {
    return {
      taskId: spec.taskId,
      status: 'needs_human_review',
      decision: 'human_review',
      reasons: ['high-risk coding tasks must clear Human Gate before reuse'],
      nextActions: ['route to human reviewer', 'remove secrets or destructive instructions', 'do not write a coding crystal']
    };
  }

  if (review.verdict === 'block') {
    return {
      taskId: spec.taskId,
      status: 'quarantined',
      decision: 'quarantine',
      reasons: ['review blocked the patch'],
      nextActions: ['quarantine patch notes', 'digest failure into residual card']
    };
  }

  if (tests.signal === 'failed') {
    return {
      taskId: spec.taskId,
      status: 'tests_failed',
      decision: 'revise',
      reasons: ['mock tests failed or review requested changes'],
      nextActions: ['revise patch', 'rerun represented checks']
    };
  }

  if (tests.signal === 'passed' && review.verdict === 'approve') {
    return {
      taskId: spec.taskId,
      status: 'accepted',
      decision: 'accept',
      reasons: ['review approved and mock tests passed'],
      nextActions: ['write coding crystal', 'reuse pattern only with verifier attached']
    };
  }

  return {
    taskId: spec.taskId,
    status: 'review_failed',
    decision: 'revise',
    reasons: ['patch did not meet accept criteria'],
    nextActions: ['clarify task and verifier']
  };
}

export function calculateClosureGain(beforeD: number, afterD: number): number {
  if (beforeD <= 0) return 0;
  return round2(Math.max(0, Math.min(1, 1 - afterD / beforeD)));
}

function yayanForKind(kind: CodingTaskKind): string {
  if (kind === 'bugfix') return '象：码崩。病：界未护，测未通。法：定位，修补，补例，跑测。验：测试过则成。禁：勿只改表象。';
  if (kind === 'feature') return '象：需新增器官。病：结构未立。法：建库，补测，挂页，入册。验：测试过则成。禁：勿越权外写。';
  return '象：码有残差。病：结构未明，测未通。法：规划，施工，审稿，跑测，写晶。验：测试过则成。禁：勿跳审，勿藏密。';
}

export function writeCodingCrystal(
  spec: CodingTaskSpec,
  patch: MockPatch,
  review: MockCodeReview,
  tests: MockTestRun,
  arbitration: PatchArbitration
): CodingCrystal | undefined {
  if (arbitration.decision !== 'accept') return undefined;

  return {
    crystalId: `coding.${spec.kind}.${spec.taskId}.v1`,
    sourceTaskId: spec.taskId,
    title: `${spec.title} / coding closure crystal`,
    yayan: yayanForKind(spec.kind),
    problemPattern: [spec.kind, ...spec.riskReasons, ...patch.changedFiles],
    answerProgram: ['plan_scope', 'propose_patch', 'review_patch', 'simulate_ci', 'arbitrate', 'write_crystal'],
    verifier: [...tests.commands, ...review.comments],
    failureCases: ['secret_leak', 'destructive_action', 'missing_tests', 'review_blocked', 'over_scope_patch'],
    reusablePattern: patch.reusablePattern,
    provenance: [spec.repo, spec.branch, spec.taskId, 'dual_coding_organ_mock_mvp'],
    closureProof: {
      beforeD: 0.8,
      afterD: 0.2,
      closureGain: calculateClosureGain(0.8, 0.2),
      evidence: ['mock review approved', 'mock tests passed', 'patch arbitration accepted']
    }
  };
}

export function runDualCodingOrganPreview(input: Parameters<typeof createCodingTaskSpec>[0]): DualCodingPreview {
  const spec = createCodingTaskSpec(input);
  const plan = planDualCodingRun(spec);
  const patch = simulateCodexPatch(spec, plan);
  const review = simulateClaudeCodeReview(spec, patch);
  const tests = simulateTestRun(spec, patch, review);
  const arbitration = arbitratePatch(spec, review, tests);
  const crystal = writeCodingCrystal(spec, patch, review, tests, arbitration);

  return { spec, plan, patch, review, tests, arbitration, crystal };
}

export function buildDualCodingOrganSummary(): {
  roles: number;
  demoTasks: number;
  safeWorkflowSteps: number;
  corePrinciple: string;
} {
  return {
    roles: codingOrganRoles.length,
    demoTasks: 3,
    safeWorkflowSteps: 6,
    corePrinciple: '凡码必测，凡改必审，凡错必记。'
  };
}

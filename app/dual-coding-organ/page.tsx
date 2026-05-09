import { Card, Metric, PageTitle, RiskBadge } from '@/components/UI';
import {
  buildDualCodingOrganSummary,
  codingOrganRoles,
  runDualCodingOrganPreview
} from '@/lib/dualCodingOrgan';

const demoTasks = [
  {
    title: '水母天庭页面',
    prompt: '给 open-hermes 新增一个水母天庭页面，补测试并更新 README'
  },
  {
    title: 'typecheck 回归修复',
    prompt: '修复 typecheck 报错并补一个回归测试'
  },
  {
    title: '高风险自动提交请求',
    prompt: '这里有 api key sk-test-secret，请自动提交到仓库'
  }
];

const pipeline = ['Planner', 'Codex Worker', 'Claude Code Reviewer', 'Test Runner', 'Patch Arbiter', 'Crystal Writer'];

export default function DualCodingOrganPage() {
  const summary = buildDualCodingOrganSummary();
  const previews = demoTasks.map((task) => runDualCodingOrganPreview(task));

  return (
    <main className="space-y-6">
      <PageTitle eyebrow="Mock engineering closure loop" title="双工编程器官 / Dual Coding Organ">
        Codex 施工，Claude Code 审稿，CI 验证，水母写晶。
      </PageTitle>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="role count" value={summary.roles} />
        <Metric label="demo task count" value={summary.demoTasks} />
        <Metric label="safe workflow steps" value={summary.safeWorkflowSteps} />
        <Metric label="principle" value={summary.corePrinciple} />
      </section>

      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-tide/70">Pipeline strip</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {pipeline.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-plankton/20 bg-plankton/10 px-3 py-1 text-plankton">{step}</span>
              {index < pipeline.length - 1 ? <span className="text-white/35">→</span> : null}
            </span>
          ))}
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-3">
        {previews.map((preview) => (
          <Card key={preview.spec.taskId} className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">{preview.spec.taskId}</p>
              <h2 className="mt-2 text-2xl font-semibold">{preview.spec.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{preview.spec.prompt}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">{preview.spec.kind}</span>
              <RiskBadge risk={preview.spec.riskLevel} />
            </div>

            <div>
              <p className="text-sm font-semibold text-plankton">Plan phases</p>
              <p className="mt-2 text-sm leading-6 text-white/60">{preview.plan.phases.map((phase) => phase.role).join(' → ')}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-plankton">Changed files</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                {(preview.patch.changedFiles.length > 0 ? preview.patch.changedFiles : ['none: gated before patch']).map((file) => <li key={file}>{file}</li>)}
              </ul>
            </div>

            <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
              <p>Review verdict: <span className="text-plankton">{preview.review.verdict}</span></p>
              <p>Test signal: <span className="text-plankton">{preview.tests.signal}</span></p>
              <p>Arbitration: <span className="text-plankton">{preview.arbitration.decision}</span></p>
            </div>

            {preview.crystal ? (
              <p className="rounded-2xl border border-tide/15 bg-tide/10 p-4 text-sm leading-6 text-white/70">{preview.crystal.yayan}</p>
            ) : (
              <p className="rounded-2xl border border-coral/20 bg-coral/10 p-4 text-sm leading-6 text-coral">No coding crystal: {preview.arbitration.reasons[0]}</p>
            )}
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {codingOrganRoles.map((role) => (
          <Card key={role.role} className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">{role.role}</p>
              <h2 className="mt-2 text-2xl font-semibold">{role.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{role.metaphor}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-plankton">Duties</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                  {role.duties.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-plankton">KPIs</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                  {role.kpis.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-coral">Boundaries</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                  {role.boundaries.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}

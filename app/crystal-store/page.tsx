import { Card, Metric, PageTitle, RiskBadge } from '@/components/UI';
import { calculateCrystalValue, canPromoteCrystal, invokeCrystalPreview, starterCrystals } from '@/lib/crystals';

const demoInputs = [
  '客户说这个车险太贵了，感觉他不信任我',
  '代码空值导致崩溃，边界条件没测',
  '副歌不燃，鼓太稀，低频弱',
  '这里有 api key sk-test-secret'
];

export default function CrystalStorePage() {
  const publicPromotable = starterCrystals.filter((crystal) => canPromoteCrystal(crystal, 'public').allowed);
  const avgClosureGain = starterCrystals.reduce((sum, crystal) => sum + crystal.economics.avgClosureGain, 0) / starterCrystals.length;
  const estimatedSavedCost = starterCrystals.reduce((sum, crystal) => sum + crystal.economics.reuseCount * crystal.economics.avgCostSaved, 0);
  const routePreviews = demoInputs.map((input) => ({ input, preview: invokeCrystalPreview(input) }));

  return (
    <main className="space-y-6">
      <PageTitle eyebrow="Jelly Crystal Commons" title="水母结晶商店 / Jelly Crystal Store">
        不是缓存答案，而是缓存可验证闭合路径。
      </PageTitle>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="total crystals" value={starterCrystals.length} />
        <Metric label="public / promotable" value={publicPromotable.length} />
        <Metric label="avg closure gain" value={avgClosureGain.toFixed(2)} />
        <Metric label="estimated saved cost" value={estimatedSavedCost.toFixed(1)} />
      </section>

      <Card>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-tide/70">Route demo</p>
            <h2 className="mt-2 text-2xl font-semibold">能量路由示例</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/60">高风险输入不会进入公共复用路径，而是被刺胞安全门转入 human_review。</p>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {routePreviews.map(({ input, preview }) => (
            <div key={input} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">{input}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full border border-plankton/20 bg-plankton/10 px-3 py-1 text-plankton">{preview.decision.route}</span>
                {preview.decision.crystalId ? <span className="text-white/50">{preview.decision.crystalId}</span> : null}
                <RiskBadge risk={preview.decision.riskLevel} />
              </div>
              <p className="mt-3 text-xs leading-5 text-white/45">{preview.yayan}</p>
            </div>
          ))}
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        {starterCrystals.map((crystal) => {
          const promotion = canPromoteCrystal(crystal, 'public');
          const value = calculateCrystalValue(crystal);

          return (
            <Card key={crystal.crystalId} className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">{crystal.crystalId}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{crystal.title}</h2>
                  <p className="mt-1 text-sm text-white/55">{crystal.version} · {crystal.status}</p>
                </div>
                <RiskBadge risk={crystal.governance.privacy} />
              </div>

              <p className="rounded-2xl border border-tide/15 bg-tide/10 p-4 text-sm leading-6 text-white/70">{crystal.semanticSignature.yayan}</p>

              <div>
                <p className="text-sm font-semibold text-plankton">Answer program</p>
                <p className="mt-2 text-sm text-white/60">{crystal.answerProgram.steps.join(' → ')}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-plankton">Success metrics</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                    {crystal.verifier.successMetrics.map((metric) => <li key={metric}>{metric}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-coral">Failure cases</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                    {crystal.verifier.failureCases.map((failure) => <li key={failure}>{failure}</li>)}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="text-sm text-white/60">Crystal value: <strong className="text-plankton">{value.toFixed(2)}</strong></span>
                <span className={promotion.allowed ? 'text-sm text-plankton' : 'text-sm text-coral'}>
                  {promotion.allowed ? 'Public promotion allowed' : `Blocked: ${promotion.reasons[0]}`}
                </span>
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
}

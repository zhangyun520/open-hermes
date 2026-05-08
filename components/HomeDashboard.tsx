import { residualCards, skills, contributions } from '@/lib/mock';
import { calculateCompressionPotential } from '@/lib/cognitive';
import { Card } from './UI';

export function HomeDashboard() {
  const activeCard = residualCards[0];
  const dValue = activeCard.currentD;
  const targetD = activeCard.targetD;

  return (
    <section className="grid gap-4 lg:grid-cols-[1.1fr_.85fr_1.2fr]">
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">▣ 残差卡</h3>
          <span className="text-sm text-white/50">查看全部 ›</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[120px_1fr]">
          <div className="rounded-2xl border border-tide/20 bg-tide/10 p-3">
            <div className="h-28 rounded-xl bg-[radial-gradient(circle_at_55%_36%,rgba(131,247,255,.9),rgba(86,104,255,.28)_42%,transparent_72%)]" />
          </div>
          <div>
            <p className="text-3xl font-semibold">C + D = 1</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-white/62">
              <span>当前 D<br /><b className="text-2xl text-tide">{dValue}</b></span>
              <span>目标 D<br /><b className="text-2xl text-[#a78bfa]">{targetD}</b></span>
              <span>预计 ΔD<br /><b className="text-2xl text-plankton">{calculateCompressionPotential(activeCard)}</b></span>
            </div>
          </div>
        </div>
        <div className="mt-5 h-3 rounded-full bg-gradient-to-r from-[#2f65ff] via-tide to-[#945dff]">
          <div className="h-3 w-[37%] rounded-full border-r-4 border-white/90" />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">▱ 技能池</h3>
          <span className="text-sm text-white/50">查看更多 ›</span>
        </div>
        <div className="mt-4 space-y-3">
          {skills.map((skill) => (
            <div key={skill.skillId} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span>{skill.name}</span>
              <span className="rounded-full bg-tide/10 px-3 py-1 text-xs text-tide">供给中</span>
            </div>
          ))}
          <p className="text-sm text-white/45">更多技能持续生长中 ...</p>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">▤ 贡献账本</h3>
          <span className="text-sm text-white/50">查看更多 ›</span>
        </div>
        <div className="mt-4 space-y-3">
          {contributions.map((event) => (
            <div key={event.id} className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl bg-white/[.04] px-3 py-2">
              <div className="h-9 w-9 rounded-full bg-[radial-gradient(circle,rgba(131,247,255,.9),rgba(86,104,255,.3))]" />
              <p className="text-sm text-white/75">{event.actor} · {event.action} 了 {event.targetId}</p>
              <span className="text-xs text-tide">已记录</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

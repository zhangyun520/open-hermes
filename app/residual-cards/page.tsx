import { Card, Metric, PageTitle, RiskBadge } from '@/components/UI';
import { calculateCompressionPotential, requiresHumanReview } from '@/lib/cognitive';
import { residualCards } from '@/lib/mock';

export default function ResidualCards() {
  return (
    <div>
      <PageTitle eyebrow="Residual Cards" title="残差卡">
        所有残差卡都显式展示 C + D = 1、当前 D、目标 D、预计 ΔD 与审核状态。
      </PageTitle>

      <section className="grid gap-4 md:grid-cols-2">
        {residualCards.map((card) => (
          <Card key={card.residualId}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-tide">{card.sourceType} · {card.domain}</p>
                <h3 className="text-2xl font-semibold">{card.task}</h3>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm">{card.status}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Metric label="C + D" value={`${card.currentC} + ${card.currentD} = 1`} />
              <Metric label="当前 D" value={card.currentD} />
              <Metric label="目标 D" value={card.targetD} />
              <Metric label="预计 ΔD" value={calculateCompressionPotential(card)} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <RiskBadge risk={card.riskPrivacy} />
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/65">
                可复用：{card.reusable ? '是' : '否'}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/65">
                人工审核：{requiresHumanReview(card) ? '需要' : '暂不需要'}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/65">
                公共资产：{card.publicAssetAllowed ? '允许' : '禁止'}
              </span>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}

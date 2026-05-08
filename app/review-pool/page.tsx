import { Card, Metric, PageTitle, RiskBadge } from '@/components/UI';
import { calculateReviewScore, normalizeReviewRecommendation } from '@/lib/cognitive';
import { reviews } from '@/lib/mock';
import { routeModelTask } from '@/src/integrations/gateway/modelGateway';

export default function ReviewPool() {
  const reviewDecision = routeModelTask({ taskId: 'review-preview', userId: 'demo', modelIntent: 'review', messages: [{ role: 'user', content: '复杂审核样本' }], privacyLevel: 'medium', metadata: { risk: 'high' } });
  return (
    <div>
      <PageTitle eyebrow="Review Pool" title="审核池">
        审核愿望、残差卡、技能与安置卡；高风险审核会被规范化为 needs_human_review。
      </PageTitle>
      <p className="mb-4 rounded-2xl border border-coral/20 bg-coral/10 p-4 text-sm text-coral">Integration Gateway：复杂审核可调用 {reviewDecision.providerId}，高风险必须人工审核：{String(reviewDecision.humanReviewRequired)}。</p>
      <section className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => {
          const recommendation = normalizeReviewRecommendation(review);
          return (
            <Card key={review.id}>
              <p className="text-tide">{review.targetId}</p>
              <h3 className="text-2xl font-semibold">{recommendation}</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Metric label="Review Score" value={calculateReviewScore(review)} />
                <Metric label="证据强度" value={review.evidenceStrength} />
                <Metric label="可复用性" value={review.reusability} />
              </div>
              <div className="mt-4"><RiskBadge risk={review.risk} /></div>
              <p className="mt-4 text-white/65">{review.comment}</p>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

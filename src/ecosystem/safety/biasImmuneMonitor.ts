import type { BiasImmuneAlert, CacheRewardEvent, SharedCacheObject } from '../types';
export function monitorBiasImmuneSystem(objects: SharedCacheObject[], rewards: CacheRewardEvent[]): BiasImmuneAlert[] {
  const alerts: BiasImmuneAlert[] = [];
  const byDomain = new Map<string, number>();
  objects.forEach((object) => byDomain.set(object.domain, (byDomain.get(object.domain) ?? 0) + (object.status.includes('candidate') ? 1 : 0)));
  for (const [domain, count] of byDomain) if (count >= 3) alerts.push({ type: 'domain_pileup', severity: 'medium', message: `${domain} residuals are piling up`, evidence: [`${count} candidate objects waiting`] });
  const total = rewards.reduce((sum, reward) => sum + reward.amount, 0);
  const byContributor = new Map<string, number>();
  rewards.forEach((reward) => byContributor.set(reward.contributorId, (byContributor.get(reward.contributorId) ?? 0) + reward.amount));
  for (const [contributor, amount] of byContributor) if (total > 0 && amount / total > 0.6) alerts.push({ type: 'reward_concentration', severity: 'high', message: 'contribution rewards are over-concentrated', evidence: [`${contributor} receives ${Math.round((amount / total) * 100)}%`] });
  return alerts;
}

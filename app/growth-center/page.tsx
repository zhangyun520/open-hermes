'use client';

import { useState } from 'react';
import { Card, Metric, PageTitle } from '@/components/UI';
import { claimDailySupply } from '@/lib/gamification';
import { activeSeason, dailyQuests, levelAchievements, userProgress, weeklyQuests } from '@/lib/productSystemsMock';

export default function GrowthCenterPage() {
  const [supply, setSupply] = useState<ReturnType<typeof claimDailySupply> | null>(null);
  const seasonProgress = Math.round((activeSeason.progress / activeSeason.target) * 100);

  return (
    <div>
      <PageTitle eyebrow="Growth Center" title="成长中心">
        像记录认知生命体一样记录成长：只奖励有效愿望、有效残差压缩、审核维护、技能复用和偏见修复，不奖励垃圾数量。
      </PageTitle>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <Card>
          <p className="text-tide">{userProgress.levelName}</p>
          <h2 className="mt-2 text-4xl font-semibold">Lv.{userProgress.level} · 微光成长记录</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Metric label="XP" value={userProgress.xp} />
            <Metric label="饲料值" value={userProgress.feedPoints} />
            <Metric label="微光碎片" value={userProgress.glowShards} />
            <Metric label="声望" value={userProgress.reputation} />
          </div>
          <p className="mt-5 text-sm leading-6 text-white/62">外观、稀有度和付费状态不会改变贡献权重或审核权重：当前贡献权重 {userProgress.contributionWeight}，审核权重 {userProgress.reviewWeight}。</p>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">每日补氧</h3>
          <p className="mt-3 text-sm leading-6 text-white/62">固定内容，无概率开箱，不做连续签到惩罚，保证新用户每天有最低限度参与能力。</p>
          <button onClick={() => setSupply(claimDailySupply(userProgress.userId))} className="mt-5 rounded-2xl bg-tide/20 px-5 py-3 text-tide hover:bg-tide/30">领取今日基础认知配给</button>
          {supply ? <p className="mt-4 rounded-2xl bg-white/5 p-4 text-sm text-plankton">{supply.note} 饲料值 +{supply.feedPoints}，微光碎片 +{supply.glowShards}，审核机会 +{supply.extraReviewChances}</p> : null}
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-2xl font-semibold">日常任务</h3>
          <div className="mt-4 space-y-3">
            {dailyQuests.map((quest) => (
              <div key={quest.questId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3"><b>{quest.title}</b><span className="text-sm text-tide">{quest.completed ? '已完成' : '有效维护'}</span></div>
                <p className="mt-2 text-sm text-white/62">{quest.description}</p>
                <p className="mt-2 text-xs text-coral/80">反刷量：{quest.antiSpamRule}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">周常任务</h3>
          <div className="mt-4 space-y-3">
            {weeklyQuests.map((quest) => (
              <div key={quest.questId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3"><b>{quest.title}</b><span className="text-sm text-plankton">{quest.progress}/{quest.target}</span></div>
                <p className="mt-2 text-sm text-white/62">{quest.description}</p>
                <p className="mt-2 text-xs text-coral/80">反刷量：{quest.antiSpamRule}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <h3 className="text-2xl font-semibold">{activeSeason.name}</h3>
          <p className="mt-2 text-white/62">{activeSeason.publicGoal}</p>
          <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-tide to-coral" style={{ width: `${seasonProgress}%` }} /></div>
          <p className="mt-3 text-sm text-plankton">{activeSeason.progress}/{activeSeason.target} · {seasonProgress}%</p>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">成就墙</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {levelAchievements.slice(0, 6).map((achievement) => (
              <div key={achievement.achievementId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className={achievement.unlocked ? 'text-plankton' : 'text-white/45'}>{achievement.unlocked ? '已点亮' : '未点亮'}</p>
                <b>{achievement.name}</b>
                <p className="mt-2 text-sm text-white/60">奖励：{achievement.reward.feedPoints} 饲料值 · {achievement.reward.glowShards} 微光</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

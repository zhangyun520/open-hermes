'use client';

import { useState } from 'react';
import { JellyVisual } from '@/components/JellyVisual';
import { PetEvolutionPanel } from '@/components/PetEvolutionPanel';
import { Card, Metric, PageTitle } from '@/components/UI';
import { jellyPet } from '@/lib/mock';

const events = ['愿望增加', '技能命中', '匹配成功', '偏见报警', '审核通过'];

export default function JellyCore() {
  const [pulse, setPulse] = useState(0);

  return (
    <div>
      <PageTitle eyebrow="Jelly Core" title="认知水母主界面">
        中央水母映射活跃度、技能成长、残差堆积与缓存命中。投喂越多，宠物水母越亮、触手越多、能力特质越清晰。
      </PageTitle>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <Card>
          <JellyVisual pet={jellyPet} activity={jellyPet.luminosity + pulse * 2} residual={45 + pulse * 3} cache={62 + pulse * 5} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Metric label="活跃度" value={`${74 + pulse}%`} />
            <Metric label="技能成长" value={`Lv. ${jellyPet.level}`} />
            <Metric label="残差堆积" value={41 + pulse} />
            <Metric label="缓存命中" value={`${68 + pulse}%`} />
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">触手事件</h3>
          <p className="mt-3 text-sm leading-6 text-white/60">点击事件模拟一次投喂，水母体征会产生发光反馈。</p>
          <div className="mt-4 grid gap-3">
            {events.map((event, index) => (
              <button
                key={event}
                onClick={() => setPulse(index + 1)}
                className="rounded-2xl border border-tide/20 bg-tide/10 p-4 text-left hover:bg-tide/20"
              >
                <span className="mr-3 inline-block h-3 w-3 rounded-full bg-tide shadow-glow" />
                {event}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <div className="mt-6">
        <PetEvolutionPanel pet={jellyPet} />
      </div>
    </div>
  );
}

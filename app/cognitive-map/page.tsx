import Link from 'next/link';
import { Card, Metric, PageTitle } from '@/components/UI';
import { activeSeason, cognitiveMapRegions, guilds, leaderboard } from '@/lib/productSystemsMock';

export default function CognitiveMapPage() {
  return (
    <div>
      <PageTitle eyebrow="Cognitive Map" title="认知大陆">
        把超级缓存池和技能池从后台数据库感，变成可探索的认知海域：技能命中会发光，残差堆积会起雾，公共愿望推进会让建筑升级。
      </PageTitle>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cognitiveMapRegions.map((region) => (
          <Link key={region.regionId} href={region.linkedRoute}>
            <Card className="relative min-h-56 overflow-hidden">
              <div className="absolute right-4 top-4 h-20 w-20 rounded-full blur-2xl" style={{ background: `rgba(131,247,255,${region.glow / 180})` }} />
              <p className="text-tide">{region.domain} · {region.status}</p>
              <h2 className="mt-2 text-3xl font-semibold">{region.name}</h2>
              <p className="mt-3 text-sm leading-6 text-white/62">{region.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <Metric label="发光" value={region.glow} />
                <Metric label="迷雾" value={region.fog} />
                <Metric label="建筑" value={`Lv.${region.buildingLevel}`} />
              </div>
              <p className="mt-4 text-xs text-plankton">微光点：{region.microLights}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-2xl font-semibold">公会协作</h3>
          <div className="mt-4 space-y-3">{guilds.map((guild) => <div key={guild.guildId} className="rounded-2xl bg-white/5 p-4"><b>{guild.name}</b><p className="text-sm text-white/62">{guild.publicGoal}</p><p className="mt-2 text-tide">共振 {guild.resonance}%</p></div>)}</div>
        </Card>
        <Card>
          <h3 className="text-2xl font-semibold">{activeSeason.name} 榜单</h3>
          <div className="mt-4 space-y-3">{leaderboard.map((entry) => <div key={entry.userId} className="grid grid-cols-[40px_1fr_auto] rounded-2xl bg-white/5 p-3"><span>#{entry.rank}</span><span>{entry.displayName}</span><span className="text-plankton">{entry.score}</span></div>)}</div>
        </Card>
      </section>
    </div>
  );
}

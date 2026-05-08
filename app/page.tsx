import Link from 'next/link';
import { HomeDashboard } from '@/components/HomeDashboard';
import { HeroActionCard } from '@/components/HeroActionCard';
import { JellyVisual } from '@/components/JellyVisual';
import { PetEvolutionPanel } from '@/components/PetEvolutionPanel';
import { Card } from '@/components/UI';
import { jellyPet } from '@/lib/mock';
import { primaryEntryModules } from '@/lib/modules';

const introSignals = [
  ['愿望不会白说', '每一个愿望都会被看见，并连接可能的回响。'],
  ['失败不会白费', '失败是数据，不是耻辱；回收残差，重组价值。'],
  ['灵感不会白丢', '灵感是火花，投递后，可能点亮他人。'],
  ['贡献不会被抹掉', '你的每一次贡献，都会被记录并转化为系统养分。'],
  ['系统会慢慢长出触手', '连接更多个体与场景，让认知网络持续生长。']
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative min-h-[680px] overflow-hidden rounded-[2.2rem] border border-tide/20 bg-[radial-gradient(circle_at_50%_20%,rgba(99,203,255,.25),transparent_32%),linear-gradient(180deg,rgba(3,18,44,.72),rgba(3,10,26,.92))] px-6 py-10 shadow-[0_0_80px_rgba(45,147,255,.14)] md:px-12">
        <div className="absolute inset-0 opacity-45 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%2383f7ff%22%20fill-opacity%3D%220.10%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2248%22%20cy%3D%2232%22%20r%3D%221.2%22/%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute left-8 top-8 h-2 w-2 rounded-full bg-tide shadow-glow" />
        <div className="absolute right-24 top-20 h-2 w-2 rounded-full bg-[#7c8cff] shadow-glow" />
        <div className="absolute bottom-28 left-1/4 h-1.5 w-1.5 rounded-full bg-plankton shadow-glow" />

        <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_1.15fr_1fr] lg:grid-rows-[auto_auto]">
          <div className="space-y-8 pt-16 lg:pt-24">
            <HeroActionCard module={primaryEntryModules[0]} index={0} />
            <HeroActionCard module={primaryEntryModules[2]} index={1} />
          </div>

          <div className="flex flex-col items-center text-center">
            <JellyVisual pet={jellyPet} activity={jellyPet.luminosity} residual={jellyPet.level * 8} cache={76} />
            <h1 className="-mt-10 text-4xl font-semibold tracking-tight md:text-6xl">
              让每一份残差，<span className="text-tide drop-shadow-[0_0_18px_rgba(131,247,255,.55)]">发出微光</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
              把愿望、失败、灵感和经验，养成一只会成长的认知水母。
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link href="/garbage-station" className="rounded-2xl bg-gradient-to-r from-tide to-[#735dff] px-8 py-3 font-semibold text-white shadow-[0_0_32px_rgba(131,247,255,.34)]">
                🪼 开始投喂
              </Link>
              <Link href="/idea-notary" className="rounded-2xl border border-white/20 bg-white/5 px-8 py-3 text-white/80 backdrop-blur hover:border-tide/50">
                📖 查看白皮书
              </Link>
            </div>
          </div>

          <div className="space-y-8 pt-16 lg:pt-24">
            <HeroActionCard module={primaryEntryModules[1]} index={2} />
            <HeroActionCard module={primaryEntryModules[3]} index={3} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {introSignals.map(([title, description]) => (
          <Card key={title} className="min-h-32">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
          </Card>
        ))}
      </section>

      <PetEvolutionPanel pet={jellyPet} />
      <HomeDashboard />
    </div>
  );
}

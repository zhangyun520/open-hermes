import type { ReactNode } from 'react';
import Link from 'next/link';
import { featureModules } from '@/lib/modules';

const navItems = featureModules.filter((module) =>
  ['/wish-pool', '/reverse-wish-pool', '/garbage-station', '/growth-center', '/cognitive-map', '/resonance-workshop', '/avatar-morphing', '/integrations', '/ecosystem', '/skill-memory-pool', '/contribution-ledger', '/idea-notary'].includes(module.href)
);

function JellyMark() {
  return (
    <span className="relative grid h-10 w-10 place-items-center rounded-full border border-tide/30 bg-tide/10 shadow-glow">
      <span className="text-xl">🪼</span>
      <span className="absolute -bottom-1 h-3 w-8 rounded-full bg-tide/20 blur-md" />
    </span>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute left-10 top-16 h-48 w-48 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-tide/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(90,120,255,.16),transparent_28%),radial-gradient(circle_at_80%_24%,rgba(50,220,255,.12),transparent_28%)]" />
      </div>

      <header className="sticky top-0 z-20 px-4 pt-4">
        <nav className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto rounded-[1.8rem] border border-tide/20 bg-[#071a35]/75 px-5 py-3 shadow-[0_0_42px_rgba(45,147,255,.12)] backdrop-blur-2xl">
          <Link href="/" className="mr-4 flex items-center gap-3 whitespace-nowrap text-xl font-semibold text-white">
            <JellyMark />
            <span>认知水母</span>
            <span className="text-white/75">Cognitive Jelly</span>
          </Link>

          <div className="flex flex-1 items-center justify-center gap-3 md:gap-8">
            {navItems.map((module) => (
              <Link
                className="whitespace-nowrap rounded-full px-3 py-1 text-sm text-white/72 transition hover:bg-white/10 hover:text-tide md:text-base"
                key={module.href}
                href={module.href}
              >
                {module.title.replace('我需要什么', '许愿池').replace('我多余什么', '反向许愿池').replace('我失败了什么', '垃圾站')}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3 text-white/60">
            <span className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">⌕</span>
            <span className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">♧</span>
            <Link href="/jelly-core" className="grid h-11 w-11 place-items-center rounded-full border border-tide/30 bg-[radial-gradient(circle,rgba(131,247,255,.9),rgba(86,104,255,.55)_50%,rgba(3,18,44,.8))] shadow-glow">
              🪼
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8">{children}</main>
    </div>
  );
}

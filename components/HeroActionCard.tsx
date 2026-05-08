import Link from 'next/link';
import type { FeatureModule } from '@/lib/modules';

const icons = ['≈', '▵', '◌', '◍'];

export function HeroActionCard({ module, index }: { module: FeatureModule; index: number }) {
  return (
    <Link href={module.href} className="group block">
      <article className="hero-action-card relative overflow-hidden rounded-[1.7rem] border border-white/20 bg-[linear-gradient(135deg,rgba(14,48,84,.72),rgba(6,18,40,.72))] p-5 shadow-[0_0_28px_rgba(75,202,255,.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-tide/60 hover:shadow-[0_0_38px_rgba(75,202,255,.28)]">
        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_75%_35%,rgba(131,247,255,.18),transparent_48%)]" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-tide/25 bg-tide/10 text-3xl text-tide shadow-glow">
            {icons[index] ?? '◌'}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold">{module.title}</h3>
            <p className="mt-1 text-sm text-white/62">{module.description.split('。')[0]}</p>
          </div>
          <span className="text-3xl text-white/50 transition group-hover:translate-x-1 group-hover:text-tide">→</span>
        </div>
      </article>
    </Link>
  );
}

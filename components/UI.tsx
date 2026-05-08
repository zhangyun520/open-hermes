import type { ReactNode } from 'react';
import type { FeatureModule } from '@/lib/modules';

export function PageTitle({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="mb-8 ocean-panel rounded-[2rem] p-8">
      <p className="text-sm uppercase tracking-[0.4em] text-tide/70">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{title}</h1>
      {children ? <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">{children}</p> : null}
    </section>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`liquid-card rounded-3xl p-5 ${className}`}>{children}</div>;
}

export function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-plankton">{value}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: FeatureModule['status'] }) {
  const label = {
    interactive: '可交互',
    'mock-report': 'Mock 报告',
    concept: '概念页'
  }[status];

  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60">
      {label}
    </span>
  );
}

export function RiskBadge({ risk }: { risk: 'low' | 'medium' | 'high' }) {
  const className = {
    low: 'border-plankton/30 bg-plankton/10 text-plankton',
    medium: 'border-tide/30 bg-tide/10 text-tide',
    high: 'border-coral/40 bg-coral/10 text-coral'
  }[risk];

  return <span className={`rounded-full border px-3 py-1 text-sm ${className}`}>风险：{risk}</span>;
}

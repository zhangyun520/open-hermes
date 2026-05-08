import Link from 'next/link';
import type { FeatureModule } from '@/lib/modules';
import { Card, StatusBadge } from './UI';

export function FeatureGrid({ modules }: { modules: FeatureModule[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {modules.map((module) => (
        <Link key={module.href} href={module.href}>
          <Card className="h-full">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-tide/75">{module.englishTitle}</p>
              <StatusBadge status={module.status} />
            </div>
            <h3 className="mt-2 text-2xl font-semibold">{module.title}</h3>
            <p className="mt-4 text-sm leading-6 text-white/65">{module.description}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.28em] text-plankton/70">{module.signal}</p>
          </Card>
        </Link>
      ))}
    </section>
  );
}

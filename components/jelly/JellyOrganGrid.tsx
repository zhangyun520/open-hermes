import type { JellyOrgan } from '@/src/jelly';
import { JellyOrganCard } from './JellyOrganCard';
export function JellyOrganGrid({ organs }: { organs: JellyOrgan[] }) { return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{organs.map((organ) => <JellyOrganCard key={organ.id} organ={organ} />)}</section>; }

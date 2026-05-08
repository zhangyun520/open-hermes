import { JellyVisual } from './JellyVisual';
import { Card, Metric } from './UI';
import type { JellyPetState } from '@/lib/types';

const stageLabels: Record<JellyPetState['stage'], string> = {
  polyp: '水螅幼体',
  ephyra: '碟状幼体',
  young_jelly: '少年水母',
  luminous_jelly: '发光水母',
  reef_guardian: '认知礁守护者'
};

const traitLabels: Record<JellyPetState['traits'][number], string> = {
  curious: '好奇触手',
  resilient: '失败消化',
  connector: '跨域连接',
  guardian: '风险守护',
  archivist: '记忆归档'
};

export function PetEvolutionPanel({ pet }: { pet: JellyPetState }) {
  const progress = Math.max(0, Math.min(100, Math.round((pet.xp / (pet.xp + pet.xpToNextLevel || 1)) * 100)));

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-[-20%] top-[-30%] h-72 w-72 rounded-full bg-tide/10 blur-3xl" />
      <div className="relative grid items-center gap-5 md:grid-cols-[220px_1fr]">
        <JellyVisual compact pet={pet} activity={pet.luminosity} residual={pet.level * 7} cache={progress} />
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-tide/70">Pet Jelly Evolution</p>
          <h2 className="mt-2 text-3xl font-semibold">{pet.name} · {stageLabels[pet.stage]}</h2>
          <p className="mt-3 leading-7 text-white/68">{pet.evolutionHint}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Metric label="等级" value={`Lv.${pet.level}`} />
            <Metric label="发光度" value={`${pet.luminosity}%`} />
            <Metric label="触手" value={pet.tentacleCount} />
            <Metric label="下级 XP" value={pet.xpToNextLevel} />
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-tide via-[#6d7cff] to-coral shadow-glow" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {pet.traits.map((trait) => (
              <span key={trait} className="rounded-full border border-tide/25 bg-tide/10 px-3 py-1 text-sm text-tide">
                {traitLabels[trait]}
              </span>
            ))}
            <span className="rounded-full border border-plankton/25 bg-plankton/10 px-3 py-1 text-sm text-plankton">
              光环：{pet.unlockedAura}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

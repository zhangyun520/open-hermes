import type { ContributionEvent, JellyPetState, JellyPetStage, JellyPetTrait } from './types';

export interface JellyPetInputs {
  wishes: number;
  failures: number;
  residuals: number;
  reviews: number;
  skills: number;
  cacheHits: number;
  biasAlerts: number;
  humanTransitionCards: number;
}

const stageThresholds: Array<{ stage: JellyPetStage; minLevel: number; aura: string }> = [
  { stage: 'polyp', minLevel: 1, aura: '透明幼体' },
  { stage: 'ephyra', minLevel: 3, aura: '浅潮脉冲' },
  { stage: 'young_jelly', minLevel: 6, aura: '蓝光触手' },
  { stage: 'luminous_jelly', minLevel: 10, aura: '残差星环' },
  { stage: 'reef_guardian', minLevel: 15, aura: '认知礁守护光' }
];

export function calculateJellyPetXP(inputs: JellyPetInputs): number {
  return (
    inputs.wishes * 16 +
    inputs.failures * 18 +
    inputs.residuals * 22 +
    inputs.reviews * 14 +
    inputs.skills * 28 +
    inputs.cacheHits * 6 +
    inputs.biasAlerts * 20 +
    inputs.humanTransitionCards * 24
  );
}

export function getJellyPetStage(level: number): JellyPetStage {
  return [...stageThresholds].reverse().find((threshold) => level >= threshold.minLevel)?.stage ?? 'polyp';
}

function getAura(level: number) {
  return [...stageThresholds].reverse().find((threshold) => level >= threshold.minLevel)?.aura ?? '透明幼体';
}

function deriveTraits(inputs: JellyPetInputs): JellyPetTrait[] {
  const traits: JellyPetTrait[] = [];
  if (inputs.wishes >= 2) traits.push('curious');
  if (inputs.failures + inputs.residuals >= 3) traits.push('resilient');
  if (inputs.cacheHits + inputs.skills >= 5) traits.push('connector');
  if (inputs.biasAlerts + inputs.humanTransitionCards > 0) traits.push('guardian');
  if (inputs.reviews >= 2) traits.push('archivist');
  return traits.length ? traits : ['curious'];
}

export function evolveJellyPet(inputs: JellyPetInputs, name = 'Lumos'): JellyPetState {
  const xp = calculateJellyPetXP(inputs);
  const level = Math.max(1, Math.floor(Math.sqrt(xp / 12)) + 1);
  const nextLevelXP = Math.pow(level, 2) * 12;
  const previousLevelXP = Math.pow(level - 1, 2) * 12;
  const progress = nextLevelXP === previousLevelXP ? 0 : (xp - previousLevelXP) / (nextLevelXP - previousLevelXP);
  const traits = deriveTraits(inputs);
  const stage = getJellyPetStage(level);

  return {
    id: `pet-${name.toLowerCase()}`,
    name,
    stage,
    level,
    xp,
    xpToNextLevel: Math.max(0, nextLevelXP - xp),
    luminosity: Math.min(100, Math.round(42 + progress * 38 + traits.length * 4)),
    tentacleCount: Math.min(12, 4 + Math.floor(level / 2) + traits.length),
    traits,
    unlockedAura: getAura(level),
    evolutionHint: stage === 'reef_guardian' ? '已经成为认知礁守护者，下一步是守护更多群体的低估愿望。' : '继续投喂愿望、失败和审核，触手会连接更多技能与场景。'
  };
}

export function buildJellyPetInputsFromEvents(events: ContributionEvent[]): JellyPetInputs {
  return events.reduce<JellyPetInputs>(
    (inputs, event) => {
      if (event.action === 'wish') inputs.wishes += 1;
      if (event.action === 'feed') inputs.failures += 1;
      if (event.action === 'review') inputs.reviews += 1;
      if (event.action === 'upgrade') inputs.skills += 1;
      if (event.action === 'test') inputs.cacheHits += 1;
      inputs.residuals += event.weight >= 7 ? 1 : 0;
      return inputs;
    },
    { wishes: 0, failures: 0, residuals: 0, reviews: 0, skills: 0, cacheHits: 0, biasAlerts: 0, humanTransitionCards: 0 }
  );
}

import type { JellySignal } from './types';
export interface DriftDecision { useCacheFirst: boolean; useLocalFirst: boolean; useCheapModelFirst: boolean; escalateToStrongModel: boolean; reason: string; }
export function optimizeJellyDrift(signal: JellySignal): DriftDecision {
  if (signal.riskLevel === 'critical') return { useCacheFirst: false, useLocalFirst: true, useCheapModelFirst: false, escalateToStrongModel: false, reason: 'critical risk: no model call, route to human review' };
  const useLocalFirst = signal.privacyLevel === 'private';
  const useCacheFirst = signal.type === 'cache_hit' || signal.type === 'skill_hit' || signal.metadata.cacheAvailable === true;
  const repetitive = signal.metadata.repetitive === true || /repeat|repetitive|模板|重复/.test(signal.summary.toLowerCase());
  const lowRisk = signal.riskLevel === 'low';
  const highValueLowConfidence = Number(signal.metadata.publicValue ?? 0) >= 80 && Number(signal.metadata.confidence ?? 100) < 55;
  return { useCacheFirst, useLocalFirst, useCheapModelFirst: lowRisk && repetitive && !highValueLowConfidence, escalateToStrongModel: highValueLowConfidence && signal.riskLevel !== 'high', reason: `${useLocalFirst ? 'private local-first; ' : ''}${useCacheFirst ? 'cache-first; ' : ''}${lowRisk && repetitive ? 'low-risk repetitive signal can use cheap model; ' : ''}${highValueLowConfidence ? 'high public value with low confidence may need stronger model; ' : ''}`.trim() || 'normal drift path' };
}

import type { WorldCapsule } from '../types';
export function summarizeNarrativeWorld(capsule: WorldCapsule) { return `${capsule.title}：${capsule.description}。授权：${capsule.licensePolicy.licenseType}。`; }

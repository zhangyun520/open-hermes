import type { JellyRiskLevel } from './types';
export interface SwarmSkillSummary { skillId: string; title: string; layer: 'private' | 'team' | 'community' | 'public'; usageCount: number; contributorCount: number; riskLevel: JellyRiskLevel; verified: boolean; }
const swarmSkills: SwarmSkillSummary[] = [
  { skillId: 'skill-edu-baby', title: '压轴题婴儿版讲解', layer: 'public', usageCount: 46, contributorCount: 3, riskLevel: 'low', verified: true },
  { skillId: 'skill-objection', title: '客户异议识别', layer: 'team', usageCount: 12, contributorCount: 2, riskLevel: 'medium', verified: true },
  { skillId: 'skill-ai-failure', title: 'AI 失败分类', layer: 'community', usageCount: 21, contributorCount: 4, riskLevel: 'low', verified: true }
];
export function listSwarmSkills(): SwarmSkillSummary[] { return swarmSkills; }
export function canPromoteToPublic(skill: SwarmSkillSummary): boolean { return skill.verified && skill.contributorCount > 0 && (skill.riskLevel === 'low' || skill.riskLevel === 'medium'); }

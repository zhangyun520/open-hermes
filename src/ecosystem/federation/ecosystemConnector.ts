import type { EcosystemConnector } from '../types';
export const ecosystemConnectors: EcosystemConnector[] = [
  { id: 'user-u-lan', name: '蓝藻策展人', type: 'user', capabilities: ['feed', 'review', 'share'], permissions: ['private', 'team'], status: 'active' },
  { id: 'team-edu', name: '教育残差学会', type: 'team', capabilities: ['team_cache', 'review'], permissions: ['team', 'community_candidate'], status: 'active' },
  { id: 'community-public', name: '公共技能公地', type: 'community', capabilities: ['public_commons'], permissions: ['public_review'], status: 'active' }
];

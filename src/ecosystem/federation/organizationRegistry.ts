import type { OrganizationRecord } from '../types';
export const organizations: OrganizationRecord[] = [
  { organizationId: 'team-edu', name: '教育残差学会', type: 'team', members: ['u-lan', 'u-moon'], defaultLayer: 'team' },
  { organizationId: 'org-industrial', name: '工业知识提纯联盟', type: 'organization', members: ['u-moon'], defaultLayer: 'community' }
];

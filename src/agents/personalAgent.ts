import type { PersonalAgent, TentacleManifest } from './types';

const nowIso = () => new Date().toISOString();
const idFor = (prefix: string, value: string) => `${prefix}-${value.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;

export function createPersonalAgent(input: { ownerId: string; name: string; description: string; privacyBoundary?: PersonalAgent['privacyBoundary']; }): PersonalAgent {
  return { id: idFor('agent', `${input.ownerId}-${input.name}`), ownerId: input.ownerId, name: input.name, description: input.description, privacyBoundary: input.privacyBoundary ?? 'local_only', defaultRunMode: 'dry_run', enabled: true, tentacleIds: [], createdAt: nowIso() };
}

export function proposeTentacle(agent: PersonalAgent, input: Omit<TentacleManifest, 'id' | 'agentId' | 'status'> & { id?: string }): TentacleManifest {
  const canWrite = input.canWrite || input.permissions.some((permission) => permission === 'write_external' || permission === 'write_local' || permission === 'write_public_cache');
  const canExecute = input.canExecute || input.permissions.includes('execute_sandbox');
  const canCallExternalApi = input.canCallExternalApi || input.networkAccess !== 'none';
  return { ...input, id: input.id ?? idFor('tentacle', `${agent.id}-${input.name}`), agentId: agent.id, canWrite, canExecute, canCallExternalApi, requiresHumanApproval: input.requiresHumanApproval || canWrite || canExecute || input.networkAccess === 'open_requires_approval', auditRequired: true, residualDigestRequired: input.residualDigestRequired ?? true, status: 'proposed' };
}

export function approveTentacle(tentacle: TentacleManifest): TentacleManifest {
  return { ...tentacle, status: 'approved', runMode: tentacle.requiresHumanApproval ? 'approval_required' : tentacle.runMode };
}

export function disableTentacle(tentacle: TentacleManifest): TentacleManifest {
  return { ...tentacle, status: 'disabled', runMode: 'dry_run' };
}

export function canRunTentacle(tentacle: TentacleManifest): boolean {
  return tentacle.status === 'approved' && tentacle.runMode !== 'approval_required';
}

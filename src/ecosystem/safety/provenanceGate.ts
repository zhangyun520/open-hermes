import type { SharedCacheObject } from '../types';
export function hasValidProvenance(object: SharedCacheObject): boolean { return Boolean(object.provenance.originalContributorId && object.provenance.ideaNotaryHash && object.provenance.timestamp && object.contributors.length); }

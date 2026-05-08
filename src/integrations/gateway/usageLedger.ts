import type { UsageRecord } from '../types';
const usageRecords: UsageRecord[] = [];
export function recordUsage(usage: UsageRecord): UsageRecord { usageRecords.push(usage); return usage; }
export function listUsageRecords() { return [...usageRecords]; }
export function clearUsageRecords() { usageRecords.length = 0; }

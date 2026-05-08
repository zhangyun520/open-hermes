import type { ModelIntent } from '../types';
export const defaultRoutingPolicy: Record<ModelIntent, string[]> = { cheap_batch: ['deepseek', 'local'], strong_reasoning: ['openai', 'claude'], writing: ['claude', 'openai'], coding: ['codex', 'openai'], vision: ['openai', 'claude'], private_local: ['local'], review: ['openai', 'claude'] };

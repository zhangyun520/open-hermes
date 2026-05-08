import type { AppConnector, ModelProvider } from '../types';
import { openAIProvider } from '../providers/openaiProvider';
import { claudeProvider } from '../providers/claudeProvider';
import { deepSeekProvider } from '../providers/deepseekProvider';
import { localProvider } from '../providers/localProvider';
import { codexTaskAdapter } from '../providers/codexProvider';
import { createMockProvider } from '../providers/mockProvider';
import { githubConnector } from '../apps/githubConnector';
import { gmailConnector } from '../apps/gmailConnector';
import { calendarConnector } from '../apps/calendarConnector';
import { notionConnector } from '../apps/notionConnector';
import { slackConnector } from '../apps/slackConnector';
import { genericWebhookConnector } from '../apps/genericWebhookConnector';

const modelProviders = new Map<string, ModelProvider>();
const appConnectors = new Map<string, AppConnector>();

export function registerModelProvider(provider: ModelProvider): ModelProvider {
  modelProviders.set(provider.id, provider);
  return provider;
}

export function registerAppConnector(connector: AppConnector): AppConnector {
  appConnectors.set(connector.id, connector);
  return connector;
}

export function getModelProvider(providerId: string) { return modelProviders.get(providerId); }
export function getAppConnector(connectorId: string) { return appConnectors.get(connectorId); }
export function listModelProviders() { return Array.from(modelProviders.values()); }
export function listAppConnectors() { return Array.from(appConnectors.values()); }

export function bootstrapIntegrationRegistry() {
  [openAIProvider, claudeProvider, deepSeekProvider, localProvider, codexTaskAdapter, createMockProvider({ id: 'other-openai-compatible', name: 'Other OpenAI-compatible', vendor: 'other', modelId: 'openai-compatible-mock' })].forEach(registerModelProvider);
  [githubConnector, gmailConnector, calendarConnector, notionConnector, slackConnector, genericWebhookConnector].forEach(registerAppConnector);
}

bootstrapIntegrationRegistry();

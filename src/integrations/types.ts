export type ProviderVendor = 'openai' | 'anthropic' | 'deepseek' | 'local' | 'other';
export type ProviderStatus = 'mock' | 'configured' | 'disabled' | 'error';
export type PrivacyLevel = 'low' | 'medium' | 'high';
export type ModelIntent = 'cheap_batch' | 'strong_reasoning' | 'writing' | 'coding' | 'vision' | 'private_local' | 'review';
export type AppType = 'github' | 'gmail' | 'calendar' | 'notion' | 'slack' | 'webhook' | 'custom';
export type ConnectorStatusValue = 'mock' | 'connected' | 'disabled' | 'error';
export type AuthType = 'oauth' | 'api_key' | 'webhook' | 'manual';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface ModelCapabilities {
  text: boolean;
  vision: boolean;
  toolUse: boolean;
  structuredOutput: boolean;
  promptCaching: boolean;
  longContext: boolean;
  coding: boolean;
  computerUse: boolean;
  batch: boolean;
  embeddings: boolean;
  localOnly: boolean;
  privacyTier: PrivacyLevel;
}

export interface ModelMessage { role: 'system' | 'user' | 'assistant' | 'tool'; content: string; }
export interface ModelTool { name: string; description: string; schema?: Record<string, unknown>; }
export interface ModelRequest {
  taskId: string;
  userId: string;
  modelIntent: ModelIntent;
  messages: ModelMessage[];
  systemPromptRef?: string;
  tools?: ModelTool[];
  temperature?: number;
  maxTokens?: number;
  privacyLevel: PrivacyLevel;
  budgetLimit?: number;
  requiresCaching?: boolean;
  metadata?: Record<string, unknown>;
}

export interface CostEstimate { inputTokens: number; outputTokens: number; estimatedCost: number; currency: 'USD'; }
export interface ModelUsage { inputTokens: number; outputTokens: number; totalTokens: number; }
export interface ModelResponse { providerId: string; modelId: string; output: string; usage: ModelUsage; estimatedCost: CostEstimate; latencyMs: number; cacheHit: boolean; safetyFlags: string[]; rawRef?: string; }
export interface ModelChunk { delta: string; done: boolean; }
export interface ProviderHealth { providerId: string; ok: boolean; status: ProviderStatus; latencyMs: number; message: string; }
export interface ModelProviderConfig { providerId: string; enabled: boolean; modelId: string; secretRef?: SecretRef; baseUrl?: string; status: ProviderStatus; }
export interface ModelProvider { id: string; name: string; vendor: ProviderVendor; status: ProviderStatus; capabilities: ModelCapabilities; estimateCost(input: ModelRequest): CostEstimate; complete(input: ModelRequest): Promise<ModelResponse>; stream?(input: ModelRequest): AsyncIterable<ModelChunk>; healthCheck(): Promise<ProviderHealth>; }
export interface ProviderRouteDecision { providerId: string; modelId?: string; routeReason: string; requiresHumanApproval: boolean; humanReviewRequired: boolean; cacheHit: boolean; cacheKey?: string; fallbackProviderIds: string[]; }

export type CodexTaskStatus = 'queued' | 'running' | 'completed' | 'failed';
export interface CodexTask { taskId: string; repo: string; branch: string; taskPrompt: string; expectedFiles: string[]; testCommand: string; safetyConstraints: string[]; mode: 'cloud' | 'cli' | 'manual_prompt'; status: CodexTaskStatus; }

export interface AppCapabilities { read: boolean; write: boolean; search: boolean; webhook: boolean; fileAccess: boolean; messageSend: boolean; calendarWrite: boolean; repoWrite: boolean; requiresHumanApprovalForWrite: boolean; }
export interface AppConnectorConfig { connectorId: string; enabled: boolean; authType: AuthType; secretRef?: SecretRef; webhookUrl?: string; scopes: string[]; }
export interface ConnectorConfig extends AppConnectorConfig { userId: string; }
export interface ConnectorStatus { connectorId: string; status: ConnectorStatusValue; connected: boolean; message: string; }
export interface ResourceQuery { userId: string; query?: string; limit?: number; }
export interface ResourceList { resources: AppResource[]; nextCursor?: string; }
export interface AppResource { resourceId: string; title: string; mimeType?: string; contentPreview?: string; }
export interface AppAction { actionId: string; connectorId: string; userId: string; actionType: 'send_message' | 'send_email' | 'create_calendar_event' | 'submit_pr' | 'git_push' | 'delete_file' | 'write_page' | 'post_webhook' | 'read'; payload: Record<string, unknown>; summary: string; riskLevel: RiskLevel; requiresHumanApproval?: boolean; }
export interface AppActionResult { actionId: string; connectorId: string; status: 'queued_for_approval' | 'completed' | 'rejected' | 'blocked'; message: string; approvalId?: string; }
export interface ConnectorHealth { connectorId: string; ok: boolean; status: ConnectorStatusValue; message: string; }
export interface AppConnector { id: string; name: string; appType: AppType; status: ConnectorStatusValue; authType: AuthType; capabilities: AppCapabilities; connect(config: ConnectorConfig): Promise<ConnectorStatus>; listResources?(query: ResourceQuery): Promise<ResourceList>; readResource?(resourceId: string): Promise<AppResource>; writeAction?(action: AppAction): Promise<AppActionResult>; healthCheck(): Promise<ConnectorHealth>; }
export interface ActionApproval { actionId: string; connector: string; actionType: string; riskLevel: RiskLevel; summary: string; status: 'pending' | 'approved' | 'rejected' | 'revision_required'; createdAt: string; decidedAt?: string; }

export interface UsageRecord { usageId: string; providerId?: string; connectorId?: string; taskId: string; inputTokens: number; outputTokens: number; estimatedCost: number; cacheHit: boolean; latencyMs: number; privacyLevel: PrivacyLevel; routeReason: string; createdAt: string; }
export interface RoutePolicy { policyId: string; name: string; description: string; enabled: boolean; }
export interface SecretRef { secretId: string; providerId?: string; connectorId?: string; storage: 'env' | 'server_vault' | 'user_supplied'; masked: string; }
export interface ConsentRecord { connectorId: string; userId: string; read: boolean; write: boolean; messageSend: boolean; fileWrite: boolean; calendarCreate: boolean; submitPR: boolean; requireEveryTimeConfirmation: boolean; allowAutomation: boolean; scopes: string[]; updatedAt: string; }
export interface CacheDecision { hit: boolean; cacheKey: string; source?: 'skill' | 'response'; value?: ModelResponse; reason: string; }

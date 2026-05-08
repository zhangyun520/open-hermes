import type { WorldConnector } from '../types';
import { validateWorldConnector } from './worldSafetyGate';
const connectors = new Map<string, WorldConnector>();
export function registerWorldConnector(connector: WorldConnector): WorldConnector { const result = validateWorldConnector(connector); if (!result.allowed) throw new Error(result.reasons.join('; ')); connectors.set(connector.id, connector); return connector; }
export function getWorldConnector(id: string) { return connectors.get(id); }
export function listWorldConnectors() { return Array.from(connectors.values()); }
export function resetWorldConnectors(items: WorldConnector[] = []) { connectors.clear(); items.forEach(registerWorldConnector); }

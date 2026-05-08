import { makeMockWorldConnector, authorizedLicense } from './mockConnectorFactory';
export const mockAnimeWorldConnector = makeMockWorldConnector('world-anime', '动漫世界连接器', 'anime_world', { licensePolicy: authorizedLicense, permissions: ['read_only', 'sandbox_write'] });

import { api, discovery, realtime } from '@twinklyjs/twinkly';

const cache = new Map<string, api.TwinklyClient>();

export function getClient(ip: string) {
	if (!cache.has(ip)) {
		cache.set(ip, new api.TwinklyClient({ ip }));
	}
	const client = cache.get(ip);
	if (!client) {
		throw new Error(`Client not found: ${ip}`);
	}
	return client;
}

export { api, realtime, discovery };

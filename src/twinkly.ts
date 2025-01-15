import { TwinklyClient, discover, sendFrame } from '@twinklyjs/twinkly';

const cache = new Map<string, TwinklyClient>();

export function getClient(ip: string) {
	if (!cache.has(ip)) {
		cache.set(ip, new TwinklyClient({ ip }));
	}
	const client = cache.get(ip);
	if (!client) {
		throw new Error(`Client not found: ${ip}`);
	}
	return client;
}

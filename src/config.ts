import 'dotenv/config';

const vars = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID', 'TWINKLY_IP'];
const [token, clientId, twinklyIP] = vars.map((name) => {
	if (!process.env[name]) {
		throw new Error(`Env var '${name}' not provided.`);
	}
	return process.env[name];
});

export { token, clientId, twinklyIP };

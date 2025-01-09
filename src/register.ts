/**
 * Script used to register commands. Run `npm run register`.
 */

import { REST, Routes } from 'discord.js';
import { commands } from './commands/index.js';
import 'dotenv/config';

const vars = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID'];
const [token, clientId] = vars.map((name) => {
	if (!process.env[name]) {
		throw new Error(`Env var '${name}' not provided.`);
	}
	return process.env[name];
});

const rest = new REST().setToken(token);
const body = commands
	.values()
	.toArray()
	.map((command) => command.data.toJSON());
const data = await rest.put(Routes.applicationCommands(clientId), { body });
console.log(data);

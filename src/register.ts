/**
 * Script used to register commands. Run `npm run register`.
 */

import { REST, Routes } from 'discord.js';
import { commands } from './commands/index.js';
import * as config from './config.js';

const rest = new REST().setToken(config.token);
const body = commands
	.values()
	.toArray()
	.map((command) => command.data.toJSON());
const data = await rest.put(Routes.applicationCommands(config.clientId), {
	body,
});
console.log(data);

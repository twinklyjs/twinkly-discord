import { LEDOperationMode } from '@twinklyjs/twinkly';
import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';
import { addDeviceOption, autocomplete, configureIP } from '../deviceCache.js';
import { getClient } from '../twinkly.js';

export { autocomplete };

export const data = new SlashCommandBuilder()
	.setName('setopmode')
	.setDescription('Sets the LEDOperationMode of the lights')
	.addStringOption((option) =>
		option
			.setName('mode')
			.setDescription('The mode to set the lights to')
			.setRequired(true)
			.addChoices(
				{ name: 'off', value: LEDOperationMode.OFF },
				{ name: 'color', value: LEDOperationMode.COLOR },
				{ name: 'demo', value: LEDOperationMode.DEMO },
				{ name: 'movie', value: LEDOperationMode.MOVIE },
				{ name: 'rt', value: LEDOperationMode.RT },
				{ name: 'effect', value: LEDOperationMode.EFFECT },
				{ name: 'playlist', value: LEDOperationMode.PLAYLIST },
			),
	);
addDeviceOption(data);

export async function execute(interaction: ChatInputCommandInteraction) {
	const ip = await configureIP(interaction);
	const client = getClient(ip);
	const mode = interaction.options.getString('mode') ?? 0;
	await client.setLEDOperationMode({ mode: mode as LEDOperationMode });
	await interaction.reply(`Mode set to ${mode} 🪿`);
}

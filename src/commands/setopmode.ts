import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';
import { api } from '../twinkly.js';

export const data = new SlashCommandBuilder()
	.setName('setopmode')
	.setDescription('Sets the LEDOperationMode of the lights')
	.addStringOption((option) =>
		option
			.setName('mode')
			.setDescription('The mode to set the lights to')
			.setRequired(true)
			.addChoices(
				{ name: 'off', value: api.LEDOperationMode.OFF },
				{ name: 'color', value: api.LEDOperationMode.COLOR },
				{ name: 'demo', value: api.LEDOperationMode.DEMO },
				{ name: 'movie', value: api.LEDOperationMode.MOVIE },
				{ name: 'rt', value: api.LEDOperationMode.RT },
				{ name: 'effect', value: api.LEDOperationMode.EFFECT },
				{ name: 'playlist', value: api.LEDOperationMode.PLAYLIST },
			),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	const mode = interaction.options.getString('mode') ?? 0;
	await api.setLEDOperationMode({ mode: mode as api.LEDOperationMode });

	await interaction.reply(JSON.stringify({ mode: mode }));
}

import { api } from '@twinklyjs/twinkly';
import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('setcolor')
	.setDescription('Sets the color of the lights')
	.addIntegerOption((option) =>
		option.setName('red').setDescription('red').setRequired(true),
	)
	.addIntegerOption((option) =>
		option.setName('green').setDescription('green').setRequired(true),
	)
	.addIntegerOption((option) =>
		option.setName('blue').setDescription('blue').setRequired(true),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	const red = interaction.options.getInteger('red') ?? 0;
	const green = interaction.options.getInteger('green') ?? 0;
	const blue = interaction.options.getInteger('blue') ?? 0;
	api.init('10.0.0.187');
	await api.setLEDOperationMode({ mode: api.LEDOperationMode.COLOR });
	await api.setLEDColor({ red, green, blue });
	await interaction.reply(JSON.stringify({ red, green, blue }));
}

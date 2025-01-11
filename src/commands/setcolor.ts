import {
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { api } from '../twinkly.js';

export const data = new SlashCommandBuilder()
	.setName('setcolor')
	.setDescription('Sets the color of the lights')
	.setContexts([
		InteractionContextType.BotDM,
		InteractionContextType.Guild,
		InteractionContextType.PrivateChannel,
	])
	.addIntegerOption((option) =>
		option
			.setName('red')
			.setDescription('Numeric code for RED, 0-255.')
			.setRequired(true)
			.setMaxValue(255),
	)
	.addIntegerOption((option) =>
		option
			.setName('green')
			.setDescription('Numeric code for GREEN, 0-255.')
			.setRequired(true)
			.setMaxValue(255),
	)
	.addIntegerOption((option) =>
		option
			.setName('blue')
			.setDescription('Numeric code for BLUE, 0-255.')
			.setRequired(true)
			.setMaxValue(255),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	const red = interaction.options.getInteger('red') ?? 0;
	const green = interaction.options.getInteger('green') ?? 0;
	const blue = interaction.options.getInteger('blue') ?? 0;
	await api.setLEDOperationMode({ mode: api.LEDOperationMode.COLOR });
	await api.setLEDColor({ red, green, blue });
	await interaction.reply(JSON.stringify({ red, green, blue }));
}

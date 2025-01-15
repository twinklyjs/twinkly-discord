import { LEDOperationMode } from '@twinklyjs/twinkly';
import {
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { addDeviceOption, autocomplete, configureIP } from '../deviceCache.js';
import { getClient } from '../twinkly.js';

export { autocomplete };

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

addDeviceOption(data);

export async function execute(interaction: ChatInputCommandInteraction) {
	const ip = await configureIP(interaction);
	const client = getClient(ip);
	const red = interaction.options.getInteger('red') ?? 0;
	const green = interaction.options.getInteger('green') ?? 0;
	const blue = interaction.options.getInteger('blue') ?? 0;
	await client.setLEDOperationMode({ mode: LEDOperationMode.COLOR });
	await client.setLEDColor({ red, green, blue });
	await interaction.reply(JSON.stringify({ red, green, blue }));
}

import { LEDOperationMode } from '@twinklyjs/twinkly';
import {
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import hexrgb from 'hex-rgb';
import colornames from '../colornames.json' with { type: 'json' };
import { addDeviceOption, configureIP, getDevices } from '../deviceCache.js';
import { getClient } from '../twinkly.js';

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function autocomplete(interaction: AutocompleteInteraction) {
	const focusedOption = interaction.options.getFocused(true);
	if (focusedOption.name === 'colorname') {
		const focusedValue = capitalizeFirstLetter(
			interaction.options.getFocused(),
		);
		const choices = colornames.colors.map(
			// (color) => `${color.name} <:${color.name}:${color.ID}>`,
			(color) => color.name,
		);
		const filtered = choices
			.filter((choice) => choice.startsWith(focusedValue))
			.slice(0, 24);
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice })),
		);
	}
	if (focusedOption.name === 'device') {
		const focusedValue = interaction.options.getFocused();
		const devices = await getDevices();
		const choices = devices.map((device) => device.device_name);
		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue),
		);

		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice })),
		);
	}
}

export const data = new SlashCommandBuilder()
	.setName('setcolor')
	.setDescription('Sets the color of the lights')
	.setContexts([
		InteractionContextType.BotDM,
		InteractionContextType.Guild,
		InteractionContextType.PrivateChannel,
	])
	.addStringOption((option) =>
		option
			.setName('hexcode')
			.setDescription('Hex code of the color, ex: green which would be #00FF00')
			.setRequired(false),
	)
	.addStringOption((option) =>
		option
			.setName('colorname')
			.setDescription('Name of the color, ex: green, blue, red, etc.')
			.setRequired(false)
			.setAutocomplete(true),
	);

addDeviceOption(data);

export async function execute(interaction: ChatInputCommandInteraction) {
	const ip = await configureIP(interaction);
	const client = getClient(ip);
	if (
		interaction.options.getString('hexcode') &&
		!interaction.options.getString('colorname')
	) {
		const hexCode = interaction.options.getString('hexcode') ?? '#000000';
		const [red, green, blue] = hexrgb(hexCode, { format: 'array' });
		await client.setLEDOperationMode({ mode: LEDOperationMode.COLOR });
		await client.setLEDColor({ red, green, blue });
		await interaction.reply('<:AliceBlue:1330393166150500372>');
	} else if (
		interaction.options.getString('colorname') &&
		!interaction.options.getString('hexcode')
	) {
		const colorName =
			capitalizeFirstLetter(
				interaction.options.getString('colorname') ?? 'black',
			) ?? 'Black';
		const colorRGBValues = colornames.colors.find(
			(color) => color.name === colorName,
		);
		if (!colorRGBValues) {
			throw new Error('Color not found');
		}
		const red = colorRGBValues.r ?? 0;
		const green = colorRGBValues.g ?? 0;
		const blue = colorRGBValues.b ?? 0;
		await client.setLEDOperationMode({ mode: LEDOperationMode.COLOR });
		await client.setLEDColor({ red, green, blue });
	} else {
		await interaction.reply('Please provide a color name or hex code');
	}
}

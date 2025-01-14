import { type api, discovery } from '@twinklyjs/twinkly';
import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';
import * as config from './config.js';
import { getClient } from './twinkly.js';

let devices: (api.DeviceDetailsResponse & {
	ip: string;
	port: number;
	deviceId: string;
})[];

export async function getDevices(clearCache = false) {
	if (!clearCache && devices) {
		return devices;
	}
	devices = [];
	const simpleDetails = await discovery.discover();
	for (const device of simpleDetails) {
		const client = getClient(device.ip);
		const info = await client.getDeviceDetails();
		devices.push(Object.assign(info, device));
	}
	return devices;
}

export async function autocomplete(interaction: AutocompleteInteraction) {
	const focusedValue = interaction.options.getFocused();
	const devices = await getDevices();
	const choices = devices.map((device) => device.device_name);
	const filtered = choices.filter((choice) => choice.startsWith(focusedValue));
	await interaction.respond(
		filtered.map((choice) => ({ name: choice, value: choice })),
	);
}

export async function addDeviceOption(builder: SlashCommandOptionsOnlyBuilder) {
	return builder.addStringOption((option) =>
		option
			.setName('device')
			.setDescription('The device to target')
			.setAutocomplete(true),
	);
}

export async function configureIP(interaction: ChatInputCommandInteraction) {
	const deviceOption = interaction.options.getString('device');
	const devices = await getDevices();
	const ip = deviceOption
		? devices.find((device) => device.device_name === deviceOption)?.ip ||
			config.twinklyIP
		: config.twinklyIP;
	return ip;
}

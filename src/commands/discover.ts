import {
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { table } from 'table';
import { getDevices } from '../deviceCache.js';

export const data = new SlashCommandBuilder()
	.setName('discover')
	.setDescription('Discover devices running on your network')
	.setContexts([InteractionContextType.Guild]);

export async function execute(interaction: ChatInputCommandInteraction) {
	const result = await getDevices(true);
	const tableData = [['IP Address', 'Device ID', 'Device Name']];
	for (const device of result) {
		tableData.push([device.ip, device.deviceId, device.device_name]);
	}
	const formattedResults = `\`\`\`\n${table(tableData)}\n\`\`\``;
	await interaction.reply(formattedResults);
}

export async function autocomplete(interaction: AutocompleteInteraction) {}

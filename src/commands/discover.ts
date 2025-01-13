import {
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { table } from 'table';
import { discovery } from '../twinkly.js';

export const data = new SlashCommandBuilder()
	.setName('discover')
	.setDescription('Discover devices running on your network')
	.setContexts([InteractionContextType.Guild]);

export async function execute(interaction: ChatInputCommandInteraction) {
	const result = await discovery.discover();
	const tableData = [['IP Address', 'Device ID']];
	for (const device of result) {
		tableData.push([device.ip, device.deviceId]);
	}
	const formattedResults = `\`\`\`\n${table(tableData)}\n\`\`\``;
	await interaction.reply(formattedResults);
}

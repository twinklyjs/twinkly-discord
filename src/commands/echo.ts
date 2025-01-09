import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';
import { api } from '../twinkly.js';

export const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with the content you send!')
	.addStringOption((option) =>
		option
			.setName('content')
			.setDescription('The content to echo')
			.setRequired(true),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	const content = {
		body: interaction.options.getString('content') ?? 'No content provided',
	};
	const result = await api.echo(content);
	await interaction.reply(JSON.stringify(result));
}

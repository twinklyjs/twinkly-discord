import { api } from '@twinklyjs/twinkly';
import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';

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
	api.init('10.0.0.187');
	const result = await api.echo(content);
	await interaction.reply(JSON.stringify(result));
}

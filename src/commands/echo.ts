import {
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { addDeviceOption, autocomplete, configureIP } from '../deviceCache.js';
import { getClient } from '../twinkly.js';

export { autocomplete };

export const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with the content you send!')
	.setContexts([
		InteractionContextType.BotDM,
		InteractionContextType.Guild,
		InteractionContextType.PrivateChannel,
	])
	.addStringOption((option) =>
		option
			.setName('content')
			.setDescription('The content to echo')
			.setRequired(true),
	);

addDeviceOption(data);

export async function execute(interaction: ChatInputCommandInteraction) {
	const ip = await configureIP(interaction);
	const client = getClient(ip);
	const content = {
		body: interaction.options.getString('content') ?? 'No content provided',
	};
	const result = await client.echo(content);
	console.log;
	await interaction.reply(
		`\`\`\`json\n${JSON.stringify(result, null, 2)}\n\`\`\``,
	);
}

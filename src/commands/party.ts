import { LEDOperationMode, sendFrame } from '@twinklyjs/twinkly';
import {
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { addDeviceOption, autocomplete, configureIP } from '../deviceCache.js';
import { getClient } from '../twinkly.js';

export { autocomplete };

export const data = new SlashCommandBuilder()
	.setName('party')
	.setDescription('Puts the lights into party mode 🎊')
	.setContexts([
		InteractionContextType.BotDM,
		InteractionContextType.Guild,
		InteractionContextType.PrivateChannel,
	]);
addDeviceOption(data);

export async function execute(interaction: ChatInputCommandInteraction) {
	const ip = await configureIP(interaction);
	const client = getClient(ip);
	await interaction.deferReply();
	await client.setLEDOperationMode({ mode: LEDOperationMode.RT });
	const token = client.getToken();

	if (!token) {
		throw new Error('unable to obtain token');
	}

	for (let i = 0; i < 100; i++) {
		const nodes = [];
		for (let i = 0; i < 190; i++) {
			nodes.push({
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255),
			});
		}

		await sendFrame(ip, token, nodes);
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
	await client.setLEDOperationMode({ mode: LEDOperationMode.COLOR });
	await interaction.editReply('Party mode complete! 🎊');
}

import {
	type ChatInputCommandInteraction,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import * as config from '../config.js';
import { api, realtime } from '../twinkly.js';

export const data = new SlashCommandBuilder()
	.setName('party')
	.setDescription('Puts the lights into party mode 🎊')
	.setContexts([
		InteractionContextType.BotDM,
		InteractionContextType.Guild,
		InteractionContextType.PrivateChannel,
	]);

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	await api.setLEDOperationMode({ mode: api.LEDOperationMode.RT });
	const token = api.getToken();

	for (let i = 0; i < 100; i++) {
		const nodes = [];
		for (let i = 0; i < 190; i++) {
			nodes.push({
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255),
			});
		}

		await realtime.sendFrame(config.twinklyIP, token, nodes);
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
	await api.setLEDOperationMode({ mode: api.LEDOperationMode.COLOR });
	await interaction.editReply('Party mode complete! 🎊');
}

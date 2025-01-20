import * as fs from 'node:fs';
import { createCanvas } from 'canvas';
import { REST, Routes } from 'discord.js';
import * as config from '../src/config.js';
import emojidata from './emojidata.json' with { type: 'json' };
import colornames from '../src/colornames.json' with {type: 'json'};


const rest = new REST().setToken(config.token);
async function uploademoji() {
	const JSONData = JSON.parse(fs.readFileSync('colors.json', 'utf8'));
	for (const color of JSONData.colors) {
		const name = color.name;
		const rgb = color.rgb.match(/\d+/g).map(Number);

		const canvas = createCanvas(128, 128);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const buffer = canvas.toBuffer('image/png');

		const base64Image = buffer.toString('base64');

		const uri = `data:image/png;base64,${base64Image}`;

		const data = await rest.post(Routes.applicationEmojis(config.clientId), {
			body: { name: name, image: uri },
		});
		console.log(data);
	}
}
async function getemojis() {
	const data = await rest.get(Routes.applicationEmojis(config.clientId), {});
	fs.writeFileSync('emojidata.json', JSON.stringify(data), 'utf8');
}
 interface Color {
	name: string;
	r: number;
	g: number;
	b: number;
	ID: string | undefined;
}
async function setEmojiData() {
	
	for (const color of colornames.colors) {
		const emoji = emojidata.items.find(
			(emoji) => emoji.name === color.name ,
		);
		const emojiId = emoji?.id;
		(color as Color).ID = emojiId;
		fs.appendFileSync('colors.json', `${JSON.stringify(color)},`, 'utf8');

	}
}


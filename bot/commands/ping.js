import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
import {lazyEmbed} from '../lazyEmbed.js';
import * as os from 'os'

export default  {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with server uptime'),
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
	async execute(interaction,client) {
        await interaction.reply({embeds:[lazyEmbed({
            "title":"Pong! :ping_pong:",
            "message":`Server has been up for ${process.uptime()} seconds.`})],
            ephemeral:!(interaction.channel.name.includes("command")||interaction.channel.name.includes("bot"))});
	},
};
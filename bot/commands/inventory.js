import { SlashCommandBuilder, CommandInteraction, Client, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Events } from 'discord.js'
import {lazyEmbed} from '../lazyEmbed.js';




let hasMadePageListener = false

export default  {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('See your inventory'),
        /**
         * 
         * @param {CommandInteraction} interaction 
         * @param {Client} client
         */
	async execute(interaction, client, db) {
        let inventory = await db.getInventory(interaction.member.id)
        let text = inventory.map(e=>{
            let t = "- "+e.name+" x"+e.quantity+" ("+e.id+")"
            return t
        }).join("\n")

        interaction.reply({
            embeds:[
                lazyEmbed({
                    title:"Inventory - Page 1",
                    message:text,
                    addHostToTitle:false
                })
            ]
        })
	},
};
import { SlashCommandBuilder, CommandInteraction, Client, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Events } from 'discord.js'
import {lazyEmbed} from '../lazyEmbed.js';




let hasMadeUseListener = false

export default  {
	data: new SlashCommandBuilder()
		.setName('item')
		.setDescription('Use an item from your inventory'),
        /**
         * 
         * @param {CommandInteraction} interaction 
         * @param {Client} client
         */
	async execute(interaction, client, db) {
        let inventory = (await db.getInventory(interaction.member.id)).filter(e=>e.quantity>=1)

        let i = -1
        const options = inventory.map(item => {
            i++
            return new StringSelectMenuOptionBuilder()
                .setLabel(item.name)
                .setValue(i.toString());
        });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('useItem')
            .setPlaceholder('Choose an item')
            .addOptions(options);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        await interaction.reply({ embeds:[
            lazyEmbed({
                "title":"Pick an item",
                "message":'Select an item from your inventory:'
            })
        ], components: [row], ephemeral:true });

        if(hasMadeUseListener)return
        hasMadeUseListener = true
        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isStringSelectMenu()) return;
        
            if (interaction.customId === 'useItem') {
                const selectedValue = interaction.values[0];

                await interaction.deferReply()
                let items = await db.getItems()
                let item = inventory[selectedValue]
                items[item.id].function(interaction,client,db,item)
            }
        });
	},
};
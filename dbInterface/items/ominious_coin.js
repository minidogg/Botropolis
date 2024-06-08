import { SlashCommandBuilder, CommandInteraction, Client } from 'discord.js'
import {lazyEmbed} from '../../bot/lazyEmbed.js'

export default {
    id:"ominious_coin",
    name:"Ominious Coin",
    description:"???",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    function:(interaction, client, db, item)=>{
        interaction.editReply("*\*it glows ominiously...\**")
    }
}
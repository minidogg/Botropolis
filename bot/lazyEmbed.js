import * as fs from 'fs'
import * as path from 'path'
const config = JSON.parse(fs.readFileSync("./config.json","utf-8"))
const { token, clientId } = config

import { EmbedBuilder } from 'discord.js'
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const added = typeof(config.host)==="string"&&config.host!==" "?` (Being hosted by ${config.host})`:""

export function lazyEmbed ({title="QuoteDB",message,color=("#"+genRanHex(6)),footer="Botropolis 0.1.0a",addHostToTitle=true}){
    let embed = new EmbedBuilder()
	.setTitle(title+(addHostToTitle==true?added:""))
    .setColor(color)
    .setDescription(message+"\n\nRemember that the bot is in alpha and is buggy.")
    .setFooter({"text":footer});

    return embed
}
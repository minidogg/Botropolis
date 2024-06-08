
import {error} from 'console'
import * as fs from 'fs'
import * as path from 'path'
import { Client, Events, GatewayIntentBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, REST, Routes } from 'discord.js'

export async function main(){
    const config = JSON.parse(fs.readFileSync("./config.json","utf-8"))
    const { token, clientId } = config


    // Require the necessary discord.js classes
    const added = typeof (config.host) === "string" && config.host !== " " ? ` (Being hosted by ${config.host})` : "";

    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    // The actual MEAT of the bot goes everywhere below
    const deleteButton = new ButtonBuilder()
        .setCustomId('delete')
        .setLabel('Delete Message')
        .setStyle(ButtonStyle.Danger);
    const deleteRow = new ActionRowBuilder()
        .addComponents(deleteButton);

    client.on("interactionCreate", (i) => {
        try {
            if (config.guilds && !config.guilds.includes(i.guildId)) {
                return;
            }
            if (i.isButton() == false) return;
            if (i.component.customId != "delete") return;
            i.message.delete();


        } catch (err) {
            console.warn(err);
            i.reply("Something went wrong");
        }
    });




    // Command interaction handler
    client.on("interactionCreate", async (i) => {
        try {

            if (config.guilds && !config.guilds.includes(i.guildId)) {
                return;
            }
            if (i.isCommand() !== true) return;
            await commands[i.commandName].execute(i, client);

        } catch (err) {
            console.warn(err);
            i.reply("Something went wrong");
        }
    });


    // Commands
    var commands = {};
    var jsRegex = /^.*\.js$/;
    for(let file of fs.readdirSync("./bot/commands")){
        if (!jsRegex.test(file)) return;
        let rq = await import("file://"+path.resolve("./bot/commands/" + file));
        rq = rq["default"]
        commands[rq.data.name] = rq;
    }
    var commands2 = Object.values(commands).map(e => e.data.toJSON());



    // Log in the bot
    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    const refreshCommandI = async ({ e, i, len }) => {
        return new Promise(async (r) => {
            let guildId = e.id;
            console.log(`Refreshing commands for guild: ${guildId} (${e.name}) (${i}/${len})`);
            const rest = new REST().setToken(token);
            await (async () => {
                try {
                    console.log(`Started refreshing ${commands2.length} application (/) commands.`);

                    // The put method is used to fully refresh all commands in the guild with the current set
                    const data = await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId),
                        { body: commands2 },
                    );

                    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
                } catch (error) {
                    // And of course, make sure you catch and log any errors!
                    console.error(error);
                }
            })();
            console.log(`Done refreshing commands for guild: ${guildId} (${e.name}) (${i}/${len})`);
            r();
        });

    };
    const refreshCommands = async () => {

        return new Promise(async (r) => {
            client.guilds.fetch().then(async (guildData) => {
                let len = guildData.size;

                console.log(`Starting to refresh commands for ${len} guilds`);
                let i = 0;
                guildData.forEach(async (e) => {
                    i++;
                    await refreshCommandI({ e, i, len });

                });

                console.log(`Done refreshing commands for ${len} guilds.`);

                r();
            });
        });


    };

    client.on("guildCreate", (e) => {
        refreshCommandI({ e, i: 1, len: 1 });
    });



    client.login(token).then(async () => {
        await refreshCommands();
        // express()//runs ./express/index.js
    });
}
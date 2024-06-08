import * as fs from 'fs'
import * as path from 'path'

// Add config if it doesn't exist already
if (!fs.existsSync("./config.json")) {
    fs.writeFileSync("./config.json", JSON.stringify(
{
    "token":"Your bot token",
    "clientId":"The user id of your bot.",
    "host":"username or some identifier. or you can just make this a blank string.",
    "port":"3000"
},null,"  "), "utf-8");
}

import * as web from '../web/index.js'
import * as bot from '../bot/index.js'
try{
    web.main()
    bot.main()
}catch(err){
    console.warn(err)
}
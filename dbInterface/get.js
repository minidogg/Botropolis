import * as mongoose from 'mongoose'
import { User } from './schema.js'
import * as fs from 'fs'
import * as path from 'path'

let items = ""

export async function getItems(){
    if(items!="")return items;
    items = {}
    let itemDir = path.resolve("./dbInterface/items")
    for(let p of fs.readdirSync(itemDir)){
        if(!p.endsWith(".js"))return
        let item = await import("file://"+path.join(itemDir,p))
        item = item["default"]
        items[item.id] = item
        console.log("Loaded "+item.id)
    }
    return items
}
getItems()

export async function getInventory(userId){
    await getItems()
    let player = await User.findOne({userId:userId})
    let inv = player.inventory.map((e)=>{

        return({
            id:e.id,
            name:items[e.id].name,
            quantity:e.quantity,
            description:items[e.id].description,
            player: player
        })
    })

    return inv
}
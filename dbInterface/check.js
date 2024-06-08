import * as mongoose from 'mongoose'
import { User } from './schema.js'

export async function userExists(id,create=true){
    let exists = await User.findOne({userId:id})!=null;
    if(exists||!create)return exists
    await createUser(id)
}

export async function createUser(id){
    if(await User.findOne({ userId:id })!=null){
        return {error:"Account already exists"}
    }

    let acc = await new User({
        userId:id,
        inventory:[
            {id:"ominious_coin",quantity:1}
        ]
    }).save()

    return acc
}

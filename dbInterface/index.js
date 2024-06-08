import * as mongoose from 'mongoose'
import { User } from './schema.js'
import { userExists } from './check.js';
import {getInventory,getItems} from './get.js'

//export imported functions
export {userExists, getInventory, getItems};

//connect to mongoDB
let connected = false
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/botropolis');
    connected = true
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Code to wait until mongoDB is connected
const maxCycles = 2000/50
export async function waitUntilConnected(){
    return new Promise((resolve,reject)=>{
        if(connected==true){
            resolve(connected)
            return
        }
        let cycles = 0
        let int = setInterval(()=>{
            cycles+=1
            if(cycles>maxCycles){
                reject("Hit max cycle count: '"+maxCycles+"' when waiting for mongoose to connecet.")
                clearInterval(int)
                return
            }
            if(connected==true){
                resolve(connected)
                clearInterval(int)
                return 
            }
        },50)
    })
}


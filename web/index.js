import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
const config = JSON.parse(fs.readFileSync("./config.json","utf-8"))
const { token, clientId } = config

export async function main(){
    const app = express()
    const port = config.port
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.listen(port, () => {
      console.log(`Express app listening on port ${port}`)
    })
}
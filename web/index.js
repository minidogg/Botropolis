import express from 'express'
export async function main(){
    const app = express()
    const port = 3000
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.listen(port, () => {
      console.log(`Express app listening on port ${port}`)
    })
}
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'  //uso so na fecap, pc é chato
import 'dotenv/config'
import app from './app.js'

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Servidor OnFire em http://localhost:${port}`)
})
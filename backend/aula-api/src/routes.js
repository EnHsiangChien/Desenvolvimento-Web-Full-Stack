import {Router} from 'express'
import { poll } from './db'
const r = Router()

//GET http://localhost:3000/api/db/health
r.get('/db/health', async ( _, res) => {
    try{
        const [rows] = await poll.query('Select 1 As db_ok')
        res.json({ok:true, db: rows[0].db_ok})
    } catch {
        res.status(500).json({ok: false, db: 'down'})
    }
})

r.get('/users', async (_, res) => {
    try{
        const [rows] = await poll.query(
            'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
        )
        res.json(rows)
    } catch{
        res.status(500).json({error: 'Erro ao listar Usuarios'})
    }

})










export default r
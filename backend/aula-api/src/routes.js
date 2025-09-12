import {Router} from 'express'
import { pool } from './db.js'
const r = Router()

//GET http://localhost:3000/api/db/health
r.get('/db/health', async ( _, res) => {
    try{
        const [rows] = await pool.query('SELECT 1 As db ok')
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
//POST http://localhost:3000/api/users
//Body Json{"name": "Fulano", "email": "fulano@teste.com"}
r.post('/users', async (req, res)=>{
    const{name, email} = req.body
    if(!name || !email){
        return res.status(400).json ({error: 'name e email obrigatorios'})
    }
    try{
        const [ins] = await pool.query(
            'INSERT INTO user (name,email) Values (?, ?)',
            [name, email]
        )
        const [rows] = await poll.query(
            'SELECT id, name, email, created_at from users where id = ?',
            [ins.insertID]
        )
        res.status(201).json(rows[0])
    }catch(err){
        if(err.code=== 'ER_DUP_ENTRY'){
            return res.status(409).json({error: 'email ja cadastrado'})
        }
        res.status(500).json({error: 'Erro ao criar usuario'})
    }
})
//GET http://localhost:3000/api/pokemon/pikachu
r.get('/pokemon/:name', async (req, res) =>{
    const {name} =req.params
    try{
        const resp = await fetch(
            `http://pokeapi.co/api/v2/pokeomn/${encodeURIComponent(name)}`
        )
        if(!resp.ok)return res.status(404).json({error: 'Pokemon não encontrado'})
        const data = await resp.json()
        res.json({
            id: data.id,
            name: data.name,
            types: data.types.map(t =>t.types.name)
        })
    } catch{
        res.status(500).json({error: 'Erro ao consultar uma API externa'})
    }
})


export default r
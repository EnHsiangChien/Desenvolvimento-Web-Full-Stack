import express from 'express'
import db from './db.js'
import upload from './uploadConfig.js'
import fs from 'fs'


const r = express.Router()

//POST - http://localhost:3000/api/images
//Body - form-data - key: image (File)
//Iserir Imagem
r.post('/images', upload.single('image'), async(req, res)=>{
    try{
        const filepath = req.file.path
        await db.execute('Insert into images (img) values (?)', [filepath])
        res.status(201).json({message: "Imagem enviada com sucesso", img:filepath})
    }catch(error){
        res.status(500).json({error: error.message})
    }

})

//GET - http://localhost:3000/api/images
//Body - form-data - key: image (File)
//Iserir Imagem
r.get('/images/:id',  async(req, res)=>{
    try{
       const[rows] = await db.execute("select * from images")
       res.status(200).json(rows)
    }catch(error){
        res.status(500).json({error: error.message})
    }

})

//PUT - http://localhost:3000/api/images
//Body - form-data - key: image (File)
//Iserir Imagem
r.delete('/images/:id',  async(req, res)=>{
    try{
        const {id} = req.params
        const{rows} = await db.execute("Select * from images where id = ?", {id})
        if(rows.length === 0) return res.status(404).json({error:"imagem não encontra!"})
        const filePath = rows[0].img
    await db.execute("delete from images where id=?",{id})
    fs.unlink(filePath,(err)=>{
        if(err) console.warn("erro ao remover:", err)
    })
    res.json({nessage:"Imagem excluida com sucesso"})
    }catch(error){
        res.status(500).json({error: error.message})
    }

})

//DELETE - http://localhost:3000/api/images
//Body - form-data - key: image (File)
//Iserir Imagem
r.put('/images/:id',upload.single, async(req, res)=>{
    try{
        const{id} =req.params
        const newPath = req.file.path
        const [old] = await db.execute("select * from images where id =?", [id])
        if(old.length === 0) return res.status(404).json({error:"imagem não encontra!"})
        const oldPath = old[0].img
        await db.execute("update imagens set img = ? where id +?",[newPath, id])
        fs.unlink(filePath,(err)=>{
            if(err) console.warn("erro ao remover:", err)
        })
    }catch(error){
        res.status(500).json({error: error.message})
    }

})

export default r
import express from 'express'
import routes from './routes.js'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
import path from 'path'

const app = express()
app.use(express.json())


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


app.use('/upload', express.static(path.join(__dirname, '../uploads')))


app.use('/api', routes)
export default app
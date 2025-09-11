import 'dotenv/config'
import mysql from 'mysql2/promise'

const{mysql_host, mysql_user, mysql_password, mysql_db} = process.env
const testConnection =async () => {
    try{
        const conn = await mysql.createConnection({
            host: mysql_host,
            user: mysql_user,
            password: mysql_password,
            database: mysql_db
        })
        const [rows] = await conn.query('SELECT NOW() As agora')
        console.log('Conectado ao mysql - Data/Hora:', rows[0].agora)
        await conn.end()
    }catch(err){
        console.error('Erro ao conectar no mysql', err.message)
    }
}
testConnection()
import 'dotenv/config'
import mysql from 'mysql2/promise'

export const pool = await mysql.createPool({
    host: process. env. mysql_host,
    user: process. env. mysql_user,
    password: process. env. mysql_password,
    database: process. env. mysql_db,
    waitForConnections: true,
    connectionLimit: 10
})
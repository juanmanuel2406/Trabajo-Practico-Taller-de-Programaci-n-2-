const mysql = require('mysql2/promise')
const config = require('../config/database')

const pool = mysql.createPool(config)

async function testConnection() {
    try {
        const connection = await pool.getConnection()
        console.info('Conexion exitosa con la DB MySQL')
        connection.release()
        return true
    } catch (error) {
        console.error('Error al conectar con la DB', error.message)
        return false
    }
}

module.exports = {
    pool,
    testConnection
}

const { pool } = require('../db/connection')
const bcrypt = require('bcrypt')

class AlumnoService {
    async get(todos = false) {
        let sql =
            `SELECT usu_id id, usu_nombre nombre, usu_mail mail, usu_usuario usuario,
                    rol_nombre rol, usu_fechaalta fechaAlta
              FROM usuarios
              INNER JOIN roles ON rol_id = usu_id_rol`

        if (!todos) {
            sql += ` WHERE usu_fechabaja IS NULL`
        }

        const [rows] = await pool.query(sql)
        return rows
    }

    async getById(id) {
        const sql =
            `SELECT usu_id id, usu_nombre nombre, usu_mail mail, usu_usuario usuario,
                    rol_nombre rol, usu_fechaalta fechaAlta
              FROM usuarios
              INNER JOIN roles ON rol_id = usu_id_rol
             WHERE usu_id = ?`

        const [rows] = await pool.query(sql, [id])

        if (rows.length === 0) {
            const error = new Error(`El alumno con id ${id} no existe`)
            error.status = 404
            throw error
        }

        return rows[0]
    }

    async post(alumno) {
        const hash = await bcrypt.hash(alumno.pass, 10)

        const sql =
            `INSERT INTO usuarios(usu_nombre, usu_mail, usu_usuario, usu_password, usu_id_rol, usu_usualta, usu_fechaalta)
            VALUES(?, ?, ?, ?, 3, ?, CURRENT_TIMESTAMP())`

        const [result] = await pool.query(sql, [
            alumno.nombre,
            alumno.mail,
            alumno.usuario,
            hash,
            alumno.idUsuario
        ])

        return {
            id: result.insertId,
            nombre: alumno.nombre,
            mail: alumno.mail,
            usuario: alumno.usuario
        }
    }

    async update(id, data) {
        const sql =
            `UPDATE usuarios
                SET usu_nombre = COALESCE(?, usu_nombre),
                    usu_mail = COALESCE(?, usu_mail),
                    usu_usumodif = ?,
                    usu_fechamodif = CURRENT_TIMESTAMP()
              WHERE usu_id = ?`

        await pool.query(sql, [
            data.nombre || null,
            data.mail || null,
            data.idUsuario,
            id
        ])

        return { id, ...data }
    }

    async delete(idUsuario, id) {
        const sql =
            `UPDATE usuarios
                SET usu_usubaja = ?,
                    usu_fechabaja = CURRENT_TIMESTAMP()
              WHERE usu_id = ?`

        await pool.query(sql, [idUsuario, id])

        return { id }
    }
}

module.exports = AlumnoService

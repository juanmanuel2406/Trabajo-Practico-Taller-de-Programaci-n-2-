const { pool } = require('../db/connection')

class MateriaService {
    async get() {
        const sql =
            `SELECT mat_id id, mat_nombre nombre, car_nombre carrera
              FROM materias
              INNER JOIN carreras ON car_id = mat_id_carrera
             WHERE mat_fechabaja IS NULL`

        const [rows] = await pool.query(sql)
        return rows
    }

    async getById(id) {
        const sql =
            `SELECT mat_id id, mat_nombre nombre, car_nombre carrera
              FROM materias
              INNER JOIN carreras ON car_id = mat_id_carrera
             WHERE mat_id = ?`

        const [rows] = await pool.query(sql, [id])

        if (rows.length === 0) {
            const error = new Error(`La materia con id ${id} no existe`)
            error.status = 404
            throw error
        }

        return rows[0]
    }

    async post(materia) {
        const sql =
            `INSERT INTO materias(mat_nombre, mat_id_carrera, mat_usualta, mat_fechaalta)
            VALUES(?, ?, ?, CURRENT_TIMESTAMP())`

        const [result] = await pool.query(sql, [
            materia.nombre,
            materia.id_carrera,
            materia.idUsuario
        ])

        return {
            id: result.insertId,
            nombre: materia.nombre,
            id_carrera: materia.id_carrera
        }
    }

    async update(id, data) {
        const sql =
            `UPDATE materias
                SET mat_nombre = COALESCE(?, mat_nombre),
                    mat_id_carrera = COALESCE(?, mat_id_carrera),
                    mat_usumodif = ?,
                    mat_fechamodif = CURRENT_TIMESTAMP()
              WHERE mat_id = ?`

        await pool.query(sql, [
            data.nombre || null,
            data.id_carrera || null,
            data.idUsuario,
            id
        ])

        return { id, ...data }
    }

    async delete(idUsuario, id) {
        const sql =
            `UPDATE materias
                SET mat_usubaja = ?,
                    mat_fechabaja = CURRENT_TIMESTAMP()
              WHERE mat_id = ?`

        await pool.query(sql, [idUsuario, id])

        return { id }
    }
}

module.exports = MateriaService

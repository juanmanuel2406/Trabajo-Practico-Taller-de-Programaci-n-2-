const { pool } = require('../db/connection')

class InscripcionService {
    async post(data) {
        const sql =
            `INSERT INTO inscripciones(ins_id_alumno, ins_id_materia, ins_usualta, ins_fechaalta)
            VALUES(?, ?, ?, CURRENT_TIMESTAMP())`

        const [result] = await pool.query(sql, [
            data.id_alumno,
            data.id_materia,
            data.idUsuario
        ])

        return {
            id: result.insertId,
            id_alumno: data.id_alumno,
            id_materia: data.id_materia
        }
    }

    async getMateriasDeAlumno(idAlumno) {
        const sql =
            `SELECT mat_id id, mat_nombre nombre, car_nombre carrera
              FROM inscripciones
              INNER JOIN materias ON mat_id = ins_id_materia
              INNER JOIN carreras ON car_id = mat_id_carrera
             WHERE ins_id_alumno = ?
               AND ins_fechabaja IS NULL
               AND mat_fechabaja IS NULL`

        const [rows] = await pool.query(sql, [idAlumno])
        return rows
    }

    async getAlumnosDeMateria(idMateria) {
        const sql =
            `SELECT usu_id id, usu_nombre nombre, usu_mail mail
              FROM inscripciones
              INNER JOIN usuarios ON usu_id = ins_id_alumno
             WHERE ins_id_materia = ?
               AND ins_fechabaja IS NULL
               AND usu_fechabaja IS NULL`

        const [rows] = await pool.query(sql, [idMateria])
        return rows
    }

    async delete(data) {
        const sql =
            `UPDATE inscripciones
                SET ins_usubaja = ?,
                    ins_fechabaja = CURRENT_TIMESTAMP()
              WHERE ins_id_alumno = ?
                AND ins_id_materia = ?
                AND ins_fechabaja IS NULL`

        const [result] = await pool.query(sql, [
            data.idUsuario,
            data.id_alumno,
            data.id_materia
        ])

        if (result.affectedRows === 0) {
            const error = new Error('La inscripción no existe o ya fue dada de baja')
            error.status = 404
            throw error
        }

        return {
            id_alumno: data.id_alumno,
            id_materia: data.id_materia
        }
    }
}

module.exports = InscripcionService

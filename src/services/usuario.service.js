const { pool } = require('../db/connection')
const bcrypt = require('bcrypt')
const { sign } = require('../utils/jwt')

class UsuarioService {
    async login(data) {
        const sql =
            `SELECT u.usu_id id, u.usu_nombre nombre, u.usu_mail mail, u.usu_usuario usuario,
                    u.usu_id_rol id_rol, r.rol_nombre rol, u.usu_password password
              FROM usuarios u
              INNER JOIN roles r ON r.rol_id = u.usu_id_rol
             WHERE u.usu_usuario = ?`

        const [usuario] = await pool.query(sql, [data.usuario])

        if (usuario.length > 0) {
            const { id, nombre, mail, usuario: usu, id_rol, rol, password } = usuario[0]
            const sonIguales = await bcrypt.compare(data.pass, password)

            if (sonIguales) {
                return {
                    message: `Login correcto. Bienvenido ${nombre} (${rol})`,
                    usuario: { id, nombre, mail, usuario: usu, rol }
                }
            } else {
                const error = new Error('Datos de login incorrectos')
                error.status = 401
                throw error
            }
        } else {
            const error = new Error('Datos de login incorrectos')
            error.status = 401
            throw error
        }
    }

    async crearUsuario(usuario) {
        const hash = await bcrypt.hash(usuario.pass, 10)

        const sql =
            `INSERT INTO usuarios(usu_nombre, usu_mail, usu_usuario, usu_password, usu_id_rol, usu_usualta, usu_fechaalta)
            VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())`

        const [result] = await pool.query(sql, [
            usuario.nombre,
            usuario.mail,
            usuario.usuario,
            hash,
            usuario.id_rol,
            usuario.idUsuario || 1
        ])

        const id = result.insertId

        const [rol] = await pool.query(
            `SELECT rol_nombre FROM roles WHERE rol_id = ?`,
            [usuario.id_rol]
        )
        const rolNombre = rol.length > 0 ? rol[0].rol_nombre : 'Desconocido'

        const token = sign({ id, nombre: usuario.nombre, id_rol: usuario.id_rol })

        return {
            message: `Usuario ${usuario.nombre} creado como ${rolNombre}`,
            token,
            usuario: {
                id,
                nombre: usuario.nombre,
                mail: usuario.mail,
                usuario: usuario.usuario,
                rol: rolNombre
            }
        }
    }
}

module.exports = UsuarioService

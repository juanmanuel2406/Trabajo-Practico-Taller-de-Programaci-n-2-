const { decode } = require('../utils/jwt')

const ROLES = {
    ADMIN: 1,
    COORDINADOR: 2,
    ALUMNO: 3
}

function checkRol(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            const error = new Error('Debes ingresar el token para hacer esta acción')
            error.status = 401
            return next(error)
        }

        try {
            const data = decode(req.headers.authorization)
            if (data && rolesPermitidos.includes(data.id_rol)) {
                req.idUsuario = data.id
                req.usuario = data
                return next()
            }
        } catch (error) {
            const err = new Error('Token inválido')
            err.status = 401
            return next(err)
        }

        const error = new Error('Privilegios insuficientes')
        error.status = 401
        next(error)
    }
}

function checkAdmin() {
    return checkRol(ROLES.ADMIN)
}

function obtenerUsuario(req, res, next) {
    if (req.headers.authorization) {
        try {
            const data = decode(req.headers.authorization)
            req.usuario = data
        } catch (error) {
        }
    }
    next()
}

module.exports = { checkAdmin, checkRol, obtenerUsuario, ROLES }

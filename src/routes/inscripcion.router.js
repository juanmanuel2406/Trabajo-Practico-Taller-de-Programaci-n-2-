const express = require('express')
const {
    postInscripcion,
    deleteInscripcion
} = require('../controllers/inscripcion.controller')
const {
    postInscripcionSchema,
    deleteInscripcionSchema
} = require('../schemas/inscripcion.schema')
const { validator } = require('../middlewares/validatorHandler')
const { checkRol, obtenerUsuario, ROLES } = require('../middlewares/secure')

const inscripcionRouter = express.Router()

inscripcionRouter.post('/',
    checkRol(ROLES.ADMIN, ROLES.ALUMNO),
    obtenerUsuario,
    (req, res, next) => {
        if (req.usuario && (req.usuario.id_rol === ROLES.ADMIN || req.usuario.id == req.body.id_alumno)) {
            return next()
        }
        const error = new Error('Privilegios insuficientes')
        error.status = 401
        next(error)
    },
    validator(postInscripcionSchema, 'body'),
    postInscripcion)

inscripcionRouter.delete('/',
    checkRol(ROLES.ADMIN, ROLES.ALUMNO),
    obtenerUsuario,
    (req, res, next) => {
        if (req.usuario && (req.usuario.id_rol === ROLES.ADMIN || req.usuario.id == req.body.id_alumno)) {
            return next()
        }
        const error = new Error('Privilegios insuficientes')
        error.status = 401
        next(error)
    },
    validator(deleteInscripcionSchema, 'body'),
    deleteInscripcion)

module.exports = inscripcionRouter

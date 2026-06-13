const express = require('express')
const {
    getAlumnos,
    getAlumno,
    postAlumno,
    putAlumno,
    deleteAlumno
} = require('../controllers/alumno.controller')
const {
    getMateriasDeAlumno
} = require('../controllers/inscripcion.controller')
const {
    postAlumnoSchema,
    putAlumnoSchema,
    paramIdSchema
} = require('../schemas/alumno.schema')
const { validator } = require('../middlewares/validatorHandler')
const { checkRol, obtenerUsuario, ROLES } = require('../middlewares/secure')

const alumnoRouter = express.Router()

alumnoRouter.get('/',
    checkRol(ROLES.ADMIN, ROLES.COORDINADOR),
    getAlumnos)

alumnoRouter.get('/:id',
    checkRol(ROLES.ADMIN, ROLES.COORDINADOR, ROLES.ALUMNO),
    obtenerUsuario,
    (req, res, next) => {
        if (req.usuario && (req.usuario.id_rol === ROLES.ADMIN || req.usuario.id_rol === ROLES.COORDINADOR || req.usuario.id == req.params.id)) {
            return next()
        }
        const error = new Error('Privilegios insuficientes')
        error.status = 401
        next(error)
    },
    getAlumno)

alumnoRouter.get('/:id/materias',
    checkRol(ROLES.ADMIN, ROLES.COORDINADOR, ROLES.ALUMNO),
    obtenerUsuario,
    (req, res, next) => {
        if (req.usuario && (req.usuario.id_rol === ROLES.ADMIN || req.usuario.id_rol === ROLES.COORDINADOR || req.usuario.id == req.params.id)) {
            return next()
        }
        const error = new Error('Privilegios insuficientes')
        error.status = 401
        next(error)
    },
    getMateriasDeAlumno)

alumnoRouter.post('/',
    checkRol(ROLES.ADMIN),
    validator(postAlumnoSchema, 'body'),
    postAlumno)

alumnoRouter.put('/:id',
    checkRol(ROLES.ADMIN, ROLES.ALUMNO),
    obtenerUsuario,
    (req, res, next) => {
        if (req.usuario && (req.usuario.id_rol === ROLES.ADMIN || req.usuario.id == req.params.id)) {
            return next()
        }
        const error = new Error('Privilegios insuficientes')
        error.status = 401
        next(error)
    },
    putAlumno)

alumnoRouter.delete('/:id',
    checkRol(ROLES.ADMIN),
    deleteAlumno)

module.exports = alumnoRouter

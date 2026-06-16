const express = require('express')
const {
    getMaterias,
    getMateria,
    postMateria,
    putMateria,
    deleteMateria
} = require('../controllers/materia.controller')
const {
    getAlumnosDeMateria
} = require('../controllers/inscripcion.controller')
const {
    postMateriaSchema,
    putMateriaSchema,
    paramIdSchema
} = require('../schemas/materia.schema')
const { validator } = require('../middlewares/validatorHandler')
const { checkRol, ROLES } = require('../middlewares/secure')

const materiaRouter = express.Router()

materiaRouter.get('/',
    checkRol(ROLES.ADMIN, ROLES.COORDINADOR, ROLES.ALUMNO),
    getMaterias)

materiaRouter.get('/:id',
    checkRol(ROLES.ADMIN, ROLES.COORDINADOR, ROLES.ALUMNO),
    getMateria)

materiaRouter.get('/:id/alumnos',
    checkRol(ROLES.ADMIN, ROLES.COORDINADOR),
    getAlumnosDeMateria)

materiaRouter.post('/',
    checkRol(ROLES.ADMIN),
    validator(postMateriaSchema, 'body'),
    postMateria)

materiaRouter.put('/:id',
    checkRol(ROLES.ADMIN),
    putMateria)

materiaRouter.delete('/:id',
    checkRol(ROLES.ADMIN),
    deleteMateria)

module.exports = materiaRouter

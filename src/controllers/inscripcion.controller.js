const InscripcionService = require('../services/inscripcion.service')

const service = new InscripcionService()

async function postInscripcion(req, res, next) {
    try {
        const data = req.body
        data.idUsuario = req.idUsuario
        const resultado = await service.post(data)
        res.status(201).json(resultado)
    } catch (error) {
        next(error)
    }
}

async function getMateriasDeAlumno(req, res, next) {
    try {
        const idAlumno = req.params.id
        const materias = await service.getMateriasDeAlumno(idAlumno)
        res.json(materias)
    } catch (error) {
        next(error)
    }
}

async function getAlumnosDeMateria(req, res, next) {
    try {
        const idMateria = req.params.id
        const alumnos = await service.getAlumnosDeMateria(idMateria)
        res.json(alumnos)
    } catch (error) {
        next(error)
    }
}

async function deleteInscripcion(req, res, next) {
    try {
        const data = req.body
        data.idUsuario = req.idUsuario
        const resultado = await service.delete(data)
        res.status(200).json(resultado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postInscripcion,
    getMateriasDeAlumno,
    getAlumnosDeMateria,
    deleteInscripcion
}

const AlumnoService = require('../services/alumno.service')

const service = new AlumnoService()

async function getAlumnos(req, res, next) {
    try {
        const todos = req.query.todos === 'true'
        const alumnos = await service.get(todos)
        res.json(alumnos)
    } catch (error) {
        next(error)
    }
}

async function getAlumno(req, res, next) {
    try {
        const id = req.params.id
        const alumno = await service.getById(id)
        res.json(alumno)
    } catch (error) {
        next(error)
    }
}

async function postAlumno(req, res, next) {
    try {
        const alumno = req.body
        const alumnoNuevo = await service.post(alumno)
        res.status(201).json(alumnoNuevo)
    } catch (error) {
        next(error)
    }
}

async function putAlumno(req, res, next) {
    try {
        const id = req.params.id
        const data = req.body
        const resultado = await service.update(id, data)
        res.status(200).json(resultado)
    } catch (error) {
        next(error)
    }
}

async function deleteAlumno(req, res, next) {
    try {
        const id = req.params.id
        const idUsuario = req.body.idUsuario
        const resultado = await service.delete(idUsuario, id)
        res.status(200).json(resultado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAlumnos,
    getAlumno,
    postAlumno,
    putAlumno,
    deleteAlumno
}

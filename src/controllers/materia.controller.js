const MateriaService = require('../services/materia.service')

const service = new MateriaService()

async function getMaterias(req, res, next) {
    try {
        const materias = await service.get()
        res.json(materias)
    } catch (error) {
        next(error)
    }
}

async function getMateria(req, res, next) {
    try {
        const id = req.params.id
        const materia = await service.getById(id)
        res.json(materia)
    } catch (error) {
        next(error)
    }
}

async function postMateria(req, res, next) {
    try {
        const materia = req.body
        materia.idUsuario = req.idUsuario
        const materiaNueva = await service.post(materia)
        res.status(201).json(materiaNueva)
    } catch (error) {
        next(error)
    }
}

async function putMateria(req, res, next) {
    try {
        const id = req.params.id
        const data = req.body
        data.idUsuario = req.idUsuario
        const resultado = await service.update(id, data)
        res.status(200).json(resultado)
    } catch (error) {
        next(error)
    }
}

async function deleteMateria(req, res, next) {
    try {
        const id = req.params.id
        const idUsuario = req.idUsuario
        const resultado = await service.delete(idUsuario, id)
        res.status(200).json(resultado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getMaterias,
    getMateria,
    postMateria,
    putMateria,
    deleteMateria
}

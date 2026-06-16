const joi = require('joi')

const id = joi.number().min(1).messages({
    'any.required': 'El id es obligatorio',
    'number.min': 'El id debe ser igual o mayor a {#limit}'
})

const nombre = joi.string().min(2).max(100).messages({
    'any.required': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener por lo menos {#limit} caracteres',
    'string.max': 'El nombre debe tener como máximo {#limit} caracteres'
})

const postMateriaSchema = joi.object({
    nombre: nombre.required(),
    id_carrera: id.required()
})

const putMateriaSchema = joi.object({
    nombre: nombre,
    id_carrera: id,
    idUsuario: id
})

const paramIdSchema = joi.object({
    id: id.required()
})

module.exports = { postMateriaSchema, putMateriaSchema, paramIdSchema }

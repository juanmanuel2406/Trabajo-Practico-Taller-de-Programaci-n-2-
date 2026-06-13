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

const mail = joi.string().email().messages({
    'string.email': 'El mail debe tener un formato válido'
})

const postAlumnoSchema = joi.object({
    nombre: nombre.required(),
    mail: mail.required(),
    usuario: joi.string().min(3).max(30).required(),
    pass: joi.string().min(4).required()
})

const putAlumnoSchema = joi.object({
    nombre: nombre,
    mail: mail,
    idUsuario: id
})

const paramIdSchema = joi.object({
    id: id.required()
})

module.exports = { postAlumnoSchema, putAlumnoSchema, paramIdSchema }

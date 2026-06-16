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

const usuario = joi.string().min(3).max(30).messages({
    'any.required': 'El usuario es obligatorio',
    'string.min': 'El usuario debe tener por lo menos {#limit} caracteres',
    'string.max': 'El usuario debe tener como máximo {#limit} caracteres'
})

const pass = joi.string().min(4).messages({
    'any.required': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener por lo menos {#limit} caracteres'
})

const idRol = joi.number().valid(1, 2, 3).required().messages({
    'any.only': 'El rol debe ser 1 (Admin), 2 (Coordinador) o 3 (Alumno)',
    'any.required': 'El rol es obligatorio'
})

const postUsuarioSchema = joi.object({
    nombre: nombre.required(),
    mail: mail.required(),
    usuario: usuario.required(),
    pass: pass.required(),
    id_rol: idRol
})

const loginSchema = joi.object({
    usuario: joi.string().required(),
    pass: joi.string().required()
})

module.exports = { postUsuarioSchema, loginSchema }

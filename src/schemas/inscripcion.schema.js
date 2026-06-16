const joi = require('joi')

const id = joi.number().min(1).messages({
    'any.required': 'El id es obligatorio',
    'number.min': 'El id debe ser igual o mayor a {#limit}'
})

const postInscripcionSchema = joi.object({
    id_alumno: id.required(),
    id_materia: id.required()
})

const deleteInscripcionSchema = joi.object({
    id_alumno: id.required(),
    id_materia: id.required()
})

module.exports = { postInscripcionSchema, deleteInscripcionSchema }

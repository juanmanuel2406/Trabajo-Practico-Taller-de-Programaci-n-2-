const express = require('express')
const { crearUsuario, login } = require('../controllers/usuario.controller')
const { validator } = require('../middlewares/validatorHandler')
const { loginSchema, postUsuarioSchema } = require('../schemas/usuario.schema')
const usuarioRouter = express.Router()

usuarioRouter.post('/', validator(postUsuarioSchema, 'body'), crearUsuario)
usuarioRouter.post('/login', validator(loginSchema, 'body'), login)

module.exports = usuarioRouter

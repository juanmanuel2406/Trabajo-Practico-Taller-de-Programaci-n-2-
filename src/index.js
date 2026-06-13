const express = require('express')
const usuarioRouter = require('./routes/usuario.router')
const alumnoRouter = require('./routes/alumno.router')
const materiaRouter = require('./routes/materia.router')
const inscripcionRouter = require('./routes/inscripcion.router')
const { errorLog, errorHandler } = require('./middlewares/errorHandler')
const { testConnection } = require('./db/connection')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/usuarios', usuarioRouter)
app.use('/alumnos', alumnoRouter)
app.use('/materias', materiaRouter)
app.use('/inscripciones', inscripcionRouter)

app.get('/', (req, res) => {
    res.end('Servidor desarrollado con express')
})

app.use(errorLog)
app.use(errorHandler)

const puerto = process.env.PUERTO
app.listen(puerto, async () => {
    await testConnection()
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})

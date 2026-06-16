# API RESTful - Gestión de Alumnos, Materias e Inscripciones

Servidor desarrollado con **Node.js** + **Express** para el Trabajo Práctico de Taller de Programación 2.

## Tecnologías

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Joi](https://joi.dev/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Requisitos previos

- Node.js (v18+)
- MySQL Server (8.0+)
- Cliente MySQL (`mysql` en la terminal)

## Setup paso a paso

### 1. Base de datos (MySQL + DbVisualizer)

Ejecutá el script completo en DbVisualizer:
1. Abrí DbVisualizer y conectate a tu MySQL
2. Archivo → Ejecutar SQL → Seleccioná `Base de datos/script_completo.sql`
3. Ejecutalo (crea la DB, tablas, datos iniciales y el admin)

### 2. Variables de entorno

Copiá `.env.example` a `.env` y completá:

```
PUERTO=3000
DB_HOST="localhost"
DB_PORT=3306
DB_DATABASE="dbserveralumnos"
DB_USER="tu_usuario"
DB_PASSWORD="tu_contraseña"
JWT_SECRET="una_clave_secreta_aleatoria"
```

### 3. Dependencias

```bash
npm install
```

### 4. Iniciar servidor

```bash
npm run dev
```

El servidor arranca en `http://localhost:3000`.

### 5. Probar con Postman

1. Abrí Postman
2. Importá `postman/API Alumnos.postman_collection.json`
3. Primero ejecutá **Login** (usuario: `admin`, contraseña: `admin123`)
4. El token se setea automáticamente en las variables de la colección
5. Probá los endpoints en el orden que está la colección

## Usuario predefinido

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin` | `admin123` | Administrador |

Podés crear más usuarios (coordinadores, alumnos) via `POST /usuarios` y `POST /alumnos`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con Nodemon |
| `npm test` | Ejecuta los tests (no configurados aún) |


## Estructura del proyecto

```
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── usuario.controller.js
│   │   ├── alumno.controller.js
│   │   ├── materia.controller.js
│   │   └── inscripcion.controller.js
│   ├── db/
│   │   └── connection.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── validatorHandler.js
│   │   └── secure.js
│   ├── routes/
│   │   ├── usuario.router.js
│   │   ├── alumno.router.js
│   │   ├── materia.router.js
│   │   └── inscripcion.router.js
│   ├── schemas/
│   │   ├── usuario.schema.js
│   │   ├── alumno.schema.js
│   │   ├── materia.schema.js
│   │   └── inscripcion.schema.js
│   ├── services/
│   │   ├── usuario.service.js
│   │   ├── alumno.service.js
│   │   ├── materia.service.js
│   │   └── inscripcion.service.js
│   ├── utils/
│   │   └── jwt.js
│   └── index.js
├── Base de datos/
│   └── script_completo.sql
├── postman/
│   └── API Alumnos.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── readme.md
```

## Endpoints

### Usuarios
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/usuarios/login` | - | Login, devuelve JWT |
| POST | `/usuarios` | Admin | Crear usuario (admin, coordinador, alumno) |

### Alumnos
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/alumnos` | Admin/Coord | Listar alumnos activos. `?todos=true` para todos |
| GET | `/alumnos/:id` | Admin/Coord/Alumno | Ver alumno por ID |
| POST | `/alumnos` | Admin | Crear alumno (rol Alumno auto-asignado) |
| PUT | `/alumnos/:id` | Admin/Alumno | Editar datos del alumno |
| DELETE | `/alumnos/:id` | Admin | Baja lógica |

### Materias
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/materias` | Cualquiera | Listar materias activas |
| GET | `/materias/:id` | Cualquiera | Ver detalle de materia |
| POST | `/materias` | Admin | Crear materia |
| PUT | `/materias/:id` | Admin | Editar materia |
| DELETE | `/materias/:id` | Admin | Baja lógica |

### Inscripciones
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/inscripciones` | Admin/Alumno | Inscribir alumno en materia |
| DELETE | `/inscripciones` | Admin/Alumno | Baja lógica de inscripción |
| GET | `/alumnos/:id/materias` | Admin/Coord/Alumno | Materias de un alumno |
| GET | `/materias/:id/alumnos` | Admin/Coord | Alumnos inscriptos en una materia |

## Roles y permisos

| Rol | ID | Acceso |
|-----|----|--------|
| Administrador | 1 | Acceso total a todos los endpoints |
| Coordinador | 2 | Consulta de alumnos, materias e inscripciones |
| Alumno | 3 | Solo sus propios datos y auto-inscripción |

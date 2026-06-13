-- ============================================================
-- Script SQL - Base de datos: dbserveralumnos
-- Crear la base de datos primero en DbVisualizer y ejecutar este script
-- ============================================================

CREATE DATABASE IF NOT EXISTS dbserveralumnos;
USE dbserveralumnos;

-- ============================================================
-- TABLA: roles
-- ============================================================
CREATE TABLE roles (
    rol_id INT AUTO_INCREMENT,
    rol_nombre VARCHAR(50) NOT NULL,
    rol_usualta INT,
    rol_fechaalta DATETIME,
    rol_usumodif INT,
    rol_fechamodif DATETIME,
    rol_usubaja INT,
    rol_fechabaja DATETIME,
    PRIMARY KEY (rol_id)
);

-- ============================================================
-- TABLA: carreras
-- ============================================================
CREATE TABLE carreras (
    car_id INT AUTO_INCREMENT,
    car_nombre VARCHAR(100) NOT NULL,
    car_usualta INT,
    car_fechaalta DATETIME,
    car_usumodif INT,
    car_fechamodif DATETIME,
    car_usubaja INT,
    car_fechabaja DATETIME,
    PRIMARY KEY (car_id)
);

-- ============================================================
-- TABLA: usuarios
-- ============================================================
CREATE TABLE usuarios (
    usu_id INT AUTO_INCREMENT,
    usu_nombre VARCHAR(100) NOT NULL,
    usu_mail VARCHAR(100),
    usu_usuario VARCHAR(30) NOT NULL,
    usu_password VARCHAR(255) NOT NULL,
    usu_id_rol INT NOT NULL,
    usu_usualta INT,
    usu_fechaalta DATETIME,
    usu_usumodif INT,
    usu_fechamodif DATETIME,
    usu_usubaja INT,
    usu_fechabaja DATETIME,
    PRIMARY KEY (usu_id),
    UNIQUE (usu_usuario),
    CONSTRAINT fk_usuarios_rol FOREIGN KEY (usu_id_rol) REFERENCES roles(rol_id),
    CONSTRAINT fk_usuarios_usualta FOREIGN KEY (usu_usualta) REFERENCES usuarios(usu_id),
    CONSTRAINT fk_usuarios_usumodif FOREIGN KEY (usu_usumodif) REFERENCES usuarios(usu_id),
    CONSTRAINT fk_usuarios_usubaja FOREIGN KEY (usu_usubaja) REFERENCES usuarios(usu_id)
);

-- ============================================================
-- TABLA: materias
-- ============================================================
CREATE TABLE materias (
    mat_id INT AUTO_INCREMENT,
    mat_nombre VARCHAR(100) NOT NULL,
    mat_id_carrera INT NOT NULL,
    mat_usualta INT,
    mat_fechaalta DATETIME,
    mat_usumodif INT,
    mat_fechamodif DATETIME,
    mat_usubaja INT,
    mat_fechabaja DATETIME,
    PRIMARY KEY (mat_id),
    CONSTRAINT fk_materias_carrera FOREIGN KEY (mat_id_carrera) REFERENCES carreras(car_id),
    CONSTRAINT fk_materias_usualta FOREIGN KEY (mat_usualta) REFERENCES usuarios(usu_id),
    CONSTRAINT fk_materias_usumodif FOREIGN KEY (mat_usumodif) REFERENCES usuarios(usu_id),
    CONSTRAINT fk_materias_usubaja FOREIGN KEY (mat_usubaja) REFERENCES usuarios(usu_id)
);

-- ============================================================
-- TABLA: inscripciones
-- ============================================================
CREATE TABLE inscripciones (
    ins_id INT AUTO_INCREMENT,
    ins_id_alumno INT NOT NULL,
    ins_id_materia INT NOT NULL,
    ins_usualta INT,
    ins_fechaalta DATETIME,
    ins_usumodif INT,
    ins_fechamodif DATETIME,
    ins_usubaja INT,
    ins_fechabaja DATETIME,
    PRIMARY KEY (ins_id),
    CONSTRAINT fk_inscripciones_alumno FOREIGN KEY (ins_id_alumno) REFERENCES usuarios(usu_id),
    CONSTRAINT fk_inscripciones_materia FOREIGN KEY (ins_id_materia) REFERENCES materias(mat_id),
    CONSTRAINT fk_inscripciones_usualta FOREIGN KEY (ins_usualta) REFERENCES usuarios(usu_id),
    CONSTRAINT fk_inscripciones_usumodif FOREIGN KEY (ins_usumodif) REFERENCES usuarios(usu_id),
    CONSTRAINT fk_inscripciones_usubaja FOREIGN KEY (ins_usubaja) REFERENCES usuarios(usu_id)
);

-- ============================================================
-- Datos iniciales para dbserveralumnos
-- Ejecutar DESPUÉS del esquema.sql
-- ============================================================

-- Roles
INSERT INTO roles(rol_nombre, rol_fechaalta) VALUES
('Administrador', CURRENT_TIMESTAMP()),
('Coordinador', CURRENT_TIMESTAMP()),
('Alumno', CURRENT_TIMESTAMP());

-- Carreras
INSERT INTO carreras(car_nombre, car_fechaalta) VALUES
('Ingeniería en Sistemas', CURRENT_TIMESTAMP()),
('Licenciatura en Administración', CURRENT_TIMESTAMP()),
('Contador Público', CURRENT_TIMESTAMP()),
('Ingeniería Industrial', CURRENT_TIMESTAMP());

-- Usuario admin por defecto (password: admin123)
-- NOTA: Insertamos primero con NULL en usualta porque es el primer usuario
INSERT INTO usuarios(usu_nombre, usu_mail, usu_usuario, usu_password, usu_id_rol, usu_usualta, usu_fechaalta)
VALUES('Admin', 'admin@test.com', 'admin', '$2b$10$iK0Bk9e.5RnWFWZF8gmBuuiJ.zdUJX6tcmAxB7ofaJXR1fh0Ol39q', 1, NULL, CURRENT_TIMESTAMP());

-- Actualizamos el usu_usualta del admin para que se referencie a sí mismo
UPDATE usuarios SET usu_usualta = 1 WHERE usu_id = 1;

For Database in PGAdmin

CREATE DATABASE gestor_clases;

-- Tabla Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    rol VARCHAR(20) CHECK (rol IN ('Alumno', 'Profesor', 'Administrador')) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    tarifa_hora NUMERIC(10, 2), -- Solo para profesores
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Clases
CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    profesor_id INT REFERENCES usuarios(id),
    alumno_id INT REFERENCES usuarios(id),
    fecha TIMESTAMP NOT NULL,
    enlace_zoom VARCHAR(255),
    duracion NUMERIC(3, 1), -- Duración en horas (ej. 1.5)
    notas TEXT,
    estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Completada', 'Cancelada')) NOT NULL
);

-- Tabla Paquetes
CREATE TABLE paquetes (
    id SERIAL PRIMARY KEY,
    alumno_id INT REFERENCES usuarios(id),
    total_horas NUMERIC(5, 1) NOT NULL,
    horas_restantes NUMERIC(5, 1),
    estado VARCHAR(20) CHECK (estado IN ('Activo', 'Finalizado')) NOT NULL
);

-- Tabla Pagos
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    alumno_id INT REFERENCES usuarios(id),
    monto NUMERIC(10, 2) NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pago VARCHAR(50),
    estado VARCHAR(20) CHECK (estado IN ('Pagado', 'Pendiente')) NOT NULL
);

-- Tabla Informes
CREATE TABLE informes (
    id SERIAL PRIMARY KEY,
    mes DATE NOT NULL,
    profesor_id INT REFERENCES usuarios(id),
    total_horas_impartidas NUMERIC(5, 1),
    ingreso_total NUMERIC(10, 2)
);

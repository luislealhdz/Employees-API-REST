-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS companydb;

-- Conectar a la base de datos
\c companydb;

-- Crear la tabla
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    salary INT
);

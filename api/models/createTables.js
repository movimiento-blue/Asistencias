import { client } from '../config/connectToPostgre.js';

const createTableGrupos = `
CREATE TABLE IF NOT EXISTS grupos (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(45)
)`;

const createTableEstudiantes = `
CREATE TABLE IF NOT EXISTS estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  activo BOOLEAN NOT NULL,
  telefono_contacto VARCHAR(45),
  grupos_id INTEGER NOT NULL,
  CONSTRAINT fk_estudiantes_grupos1
    FOREIGN KEY (grupos_id)
    REFERENCES grupos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)`;

const createTableInaisistencias = `
CREATE TABLE IF NOT EXISTS inaisistencias (
  id SERIAL PRIMARY KEY,
  fecha DATE,
  estado VARCHAR(45),
  estudiante_id INTEGER NOT NULL,
  hora TIMESTAMP,
  CONSTRAINT fk_aisistencias_estudiantes1
    FOREIGN KEY (estudiante_id)
    REFERENCES estudiantes (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)`;

const createTableUsuarios = `
CREATE TABLE IF NOT EXISTS usuarios (
  idusuarios SERIAL PRIMARY KEY,
  nombre VARCHAR(45),
  apellido VARCHAR(45),
  clave VARCHAR(45),
  rol VARCHAR(45)
)`;

const createTableAsistencias = `
CREATE TABLE IF NOT EXISTS asistencias (
  fecha TIMESTAMP NOT NULL,
  id SERIAL NOT NULL,
  estudiantes_id INTEGER NOT NULL,
  PRIMARY KEY (id, estudiantes_id),
  UNIQUE (id),
  CONSTRAINT fk_temp_asistencias_estudiantes1
    FOREIGN KEY (estudiantes_id)
    REFERENCES estudiantes (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)`;

async function createTable() {
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');

    await client.query(createTableGrupos);
    console.log('Tabla grupos creada exitosamente');

    await client.query(createTableEstudiantes);
    console.log('Tabla estudiantes creada exitosamente');

    await client.query(createTableInaisistencias);
    console.log('Tabla inaisistencias creada exitosamente');

    await client.query(createTableUsuarios);
    console.log('Tabla usuarios creada exitosamente');

    await client.query(createTableAsistencias);
    console.log('Tabla asistencias creada exitosamente');

    await client.end();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
}

createTable();

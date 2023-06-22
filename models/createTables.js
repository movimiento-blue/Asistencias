import { client } from '../config/connectToPostgre.js';

const createTableAsistencias = `
CREATE TABLE IF NOT EXISTS asistencias (
  id SERIAL PRIMARY KEY,
  fecha DATE,
  hora TIME,
  estado VARCHAR(20)
)`;

const createTableEstudiantes = `
CREATE TABLE IF NOT EXISTS estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  grupo INTEGER,
  estado BOOLEAN,
  telefono VARCHAR(20)
)`;

async function createTable() {
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');

    await client.query(createTableAsistencias);
    console.log('Tabla creada exitosamente');

    await client.query(createTableEstudiantes);
    console.log('Tabla creada exitosamente');

    await client.end();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
}

createTable();

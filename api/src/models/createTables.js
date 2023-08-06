import pkg from 'pg'
const { Client } = pkg

const client = new Client({
  user: 'default',
  host: 'ep-restless-feather-07309582-pooler.us-east-1.postgres.vercel-storage.com',
  database: 'verceldb',
  password: 'KSk0VeZJMR2b',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

let isConected
const connectToDb = async () => {
  try {
    if (!isConected) {
      await client.connect()
      isConected = true
      console.log('PostgreDB Conectada...')
    }
  } catch (err) {
    console.error('Error al conectar con PostgreSQL:', err.message)
  }
}

const createTableGrupos = `
CREATE TABLE IF NOT EXISTS grupos (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(45) NOT NULL
)`

const createTableEstudiantes = `
CREATE TABLE IF NOT EXISTS estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  activo BOOLEAN NOT NULL,
  telefono_contacto VARCHAR(45),
  grupo_id INTEGER NULL,
  CONSTRAINT fk_estudiantes_grupos1
    FOREIGN KEY (grupo_id)
    REFERENCES grupos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)`

const createTableInasistencias = `
CREATE TABLE IF NOT EXISTS inasistencias (
  id SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL,
  estado VARCHAR(45) NOT NULL,
  estudiante_id INTEGER NOT NULL,
  CONSTRAINT fk_aisistencias_estudiantes1
    FOREIGN KEY (estudiante_id)
    REFERENCES estudiantes (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)`

const createTableUsuarios = `
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  username VARCHAR(45) UNIQUE NOT NULL,
  clave VARCHAR(45) NOT NULL,
  rol VARCHAR(45),
  activo BOOLEAN NOT NULL
)`

const createTableAsistencias = `
CREATE TABLE IF NOT EXISTS asistencias (
  id SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL,
  estudiante_id INTEGER NOT NULL,
  registrada BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT fk_temp_asistencias_estudiantes1
    FOREIGN KEY (estudiante_id)
    REFERENCES estudiantes (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)`

async function createTable () {
  try {
    connectToDb()
    console.log('Conexión exitosa a la base de datos')

    await client.query(createTableGrupos)
    console.log('Tabla grupos creada exitosamente')

    await client.query(createTableEstudiantes)
    console.log('Tabla estudiantes creada exitosamente')

    await client.query(createTableInasistencias)
    console.log('Tabla inaisistencias creada exitosamente')

    await client.query(createTableUsuarios)
    console.log('Tabla usuarios creada exitosamente')

    await client.query(createTableAsistencias)
    console.log('Tabla asistencias creada exitosamente')

    await client.end()
    console.log('Conexión cerrada')
  } catch (error) {
    console.error('Error al crear la tabla:', error)
  }
}

createTable()

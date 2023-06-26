import { client, connectToDb } from '../config/connectToPostgre.js'

class PostgreStudentHelper {
  async getAll () {
    try {
      await connectToDb()
      const query = 'SELECT * FROM estudiantes'
      const result = await client.query(query)
      const estudiantes = result.rows
      return estudiantes
    } catch (error) {
      console.error('Error al obtener los estudiantes:', error)
    }
  }

  async add (student) {
    try {
      await connectToDb()
      const query =
        'INSERT INTO estudiantes (nombre, apellido, activo, telefono_contacto) VALUES ($1, $2, $3, $4)'
      const result = await client.query(query, [
        student.nombre,
        student.apellido,
        true,
        student.telefono
      ])
      return result
    } catch (error) {
      console.error('Error al agregar el estudiante:', error)
    }
  }
}

export const postgreStudentHelper = new PostgreStudentHelper()

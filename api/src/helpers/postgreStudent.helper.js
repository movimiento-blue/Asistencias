import { client, connectToDb } from '../config/connectToPostgre.js'

class PostgreStudentHelper {
  async getAll (req) {
    try {
      await connectToDb()
      let query = 'SELECT * FROM estudiantes WHERE activo = true'
      if (req.key) {
        if (req.key === 'apellido') {
          query += ` AND LOWER(${req.key}) ILIKE LOWER('%${req.value}%')`
        } else {
          query += ` AND ${req.key} = ${req.value}`
        }
      }
      const result = await client.query(query)
      const estudiantes = result.rows
      return estudiantes
    } catch (error) {
      console.error('Error al obtener los estudiantes:', error)
    }
  }

  async add (student) { // Falta ver el caso en que se recibe la informacion de grupo_id
    try {
      await connectToDb()
      const query =
        'INSERT INTO estudiantes (nombre, apellido, activo, telefono_contacto) VALUES ($1, $2, $3, $4)'
      const result = await client.query(query, [
        student.nombre,
        student.apellido,
        true,
        student.telefono_contacto
      ])
      return result
    } catch (error) {
      console.error('Error al agregar el estudiante:', error)
    }
  }

  async modify (student) {
    try {
      await connectToDb()
      const query =
        'UPDATE estudiantes SET nombre = $1, apellido = $2, grupo_id = $3, telefono_contacto = $4 WHERE id = $5'
      const result = await client.query(query, [
        student.nombre,
        student.apellido,
        student.grupo_id,
        student.telefono_contacto,
        student.id
      ])
      return result
    } catch (error) {
      console.error('Error al modificar el estudiante', error)
    }
  }

  async isActive (studentId) {
    try {
      await connectToDb()
      const query = 'SELECT activo FROM estudiantes WHERE id = $1'
      const result = await client.query(query, [studentId])
      return result.rows[0].activo
    } catch (error) {
      console.error('Error al activar el estudiante:', error)
    }
  }

  async delete (studentId) {
    try {
      await connectToDb()
      const query = 'UPDATE estudiantes SET activo = false WHERE id = $1'
      const result = await client.query(query, [studentId])
      return result
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error)
    }
  }

  async undelete (studentId) {
    try {
      await connectToDb()
      const query = 'UPDATE estudiantes SET activo = true WHERE id = $1'
      const result = await client.query(query, [studentId])
      return result
    } catch (error) {
      console.error('Error al restaurar el estudiante:', error)
    }
  }
}

export const postgreStudentHelper = new PostgreStudentHelper()

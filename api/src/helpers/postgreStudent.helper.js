import { client, connectToDb } from '../config/connectToPostgre.js'

class PostgreStudentHelper {
  async getAll (req) {
    try {
      await connectToDb()
      let query = 'SELECT * FROM estudiantes WHERE activo = true'
      if (req.key) {
        query += ` AND LOWER(${req.key}) ILIKE LOWER('${req.value}%')`
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
      console.log(student)
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

  async updateAttendances () {
    try {
      await connectToDb()

      // Obtener todas las fechas con registros de asistencia
      const datesQuery = 'SELECT DISTINCT fecha::date FROM asistencias'
      const datesResult = await client.query(datesQuery)
      const dates = datesResult.rows

      // Recorrer cada fecha
      for (const date of dates) {
        const attendanceDate = date.fecha

        // Obtener todos los estudiantes
        const studentsQuery = 'SELECT id FROM estudiantes WHERE activo = true'
        const studentsResult = await client.query(studentsQuery)
        const students = studentsResult.rows

        // Recorrer cada estudiante
        for (const student of students) {
          const studentId = student.id

          // Verificar si el estudiante tiene un registro de asistencia para la fecha actual
          const attendanceQuery =
            'SELECT id FROM asistencias WHERE estudiante_id = $1 AND fecha::date = $2'
          const attendanceValues = [studentId, attendanceDate]
          const attendanceResult = await client.query(
            attendanceQuery,
            attendanceValues
          )
          const attendanceExists = attendanceResult.rows.length > 0

          // Si no hay registro de asistencia, crear un registro de inasistencia
          if (!attendanceExists) {
            const insertQuery =
              'INSERT INTO inasistencias (fecha, estado, estudiante_id) VALUES ($1, $2, $3)'
            const insertValues = [attendanceDate, 'Ausente', studentId]
            const result = await client.query(insertQuery, insertValues)

            if (result.rowCount > 0) { // Si se registra la inassitencia
              const deleteQuery =
            'DELETE FROM asistencias WHERE estudiante_id = $1 AND fecha::date = $2'
              await client.query(deleteQuery, attendanceValues)
              console.log('Registro de inasistencia creado exitosamente')
            } else {
              console.error('Error al crear el registro de inasistencia')
            }
          }
        }
      }

      console.log('Registros de inasistencias creados y registros de asistencias eliminados exitosamente.')
    } catch (error) {
      console.error('Error al crear registros de inasistencias:', error)
    }
  }

  // Agregar logica de eliminar duplicados (se pueden crear duplicados de inasistencias accidentalemente)
}

export const postgreStudentHelper = new PostgreStudentHelper()

import { client, connectToDb } from '../config/connectToPostgre.js'

class PostgreAttendanceHelper {
  async add (estudianteId) { // Registro de asistencia del estudiante estudianteId
    try {
      await connectToDb()
      const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ')

      // Verificar si ya existe un registro con la fecha actual y el mismo id de estudiante
      const checkQuery = 'SELECT COUNT(*) FROM asistencias WHERE fecha::date = $1 AND estudiante_id = $2'
      const checkResult = await client.query(checkQuery, [fechaActual, estudianteId])
      const count = parseInt(checkResult.rows[0].count)

      if (count === 0) {
        // No existe un registro con la fecha actual y el mismo id de estudiante
        const insertQuery = 'INSERT INTO asistencias (fecha, estudiante_id) VALUES ($1, $2)'
        const insertResult = await client.query(insertQuery, [fechaActual, estudianteId])
        return insertResult.rowCount
      } else {
        console.log('Ya existe un registro con la fecha actual y el mismo id de estudiante.')
        return 2
      }
    } catch (error) {
      console.error('Error al agregar el estudiante:', error)
    }
  }

  async delete (id) {
    try {
      await connectToDb()
      const query = 'DELETE FROM asistencias WHERE id = $1'
      const result = await client.query(query, [id])
      return result.rowCount
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error)
    }
  }
}

export const postgreAttendanceHelper = new PostgreAttendanceHelper()

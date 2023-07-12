import { client, connectToDb } from '../config/connectToPostgre.js'

export const abscenceSave = async () => {
  console.log('Actualizando inasistencias en la base de datos...')
  try {
    await connectToDb()

    // Obtener todas las fechas con registros de asistencia
    const datesQuery = 'SELECT DISTINCT fecha::date FROM asistencias WHERE registrada = false'
    const datesResult = await client.query(datesQuery)
    const dates = datesResult.rows

    // Recorrer cada fecha
    for (const date of dates) {
      const attendanceDate = date.fecha

      // Obtener todos los estudiantes
      const studentsQuery = 'SELECT id, nombre, apellido FROM estudiantes WHERE activo = true'
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

          if (result.rowCount > 0) { // Si se registra la inasitencia
            console.log(`Registro de inasistencia creado exitosamente para el estudiante: ${student.nombre} ${student.apellido}`)
          } else {
            console.error('Error al crear el registro de inasistencia')
          }
        }
      }

      // Registrar asistencias
      const updateQuery = 'UPDATE asistencias SET registrada = true WHERE fecha::date = $1'
      await client.query(updateQuery, [attendanceDate])
    }

    console.log('Registros de inasistencias creados exitosamente.')
  } catch (error) {
    console.error('Error al crear registros de inasistencias:', error)
  }
  console.log('Inasistencias actualizadas')
}

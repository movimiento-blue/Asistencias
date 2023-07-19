import { postgreAttendanceHelper } from '../helpers/postgreAttendance.helper.js'
import { postgreStudentHelper } from '../helpers/postgreStudent.helper.js'
import { validateAttendanceUpdate } from './validationFunctions.js'

export const addAttendanceController = async (estudianteId) => {
  try {
    const studentActive = await postgreStudentHelper.isActive(estudianteId)
    if (studentActive) {
      const result = await postgreAttendanceHelper.add(estudianteId)
      return result
    }
    console.error('El estudiante no esta activo')
    return 0
  } catch (error) {
    console.error('Error al agregar el estudiante:', error)
  }
}

export const deleteAttendanceController = async (estudianteId) => {
  try {
    const result = await postgreAttendanceHelper.delete(estudianteId)
    return result
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error)
  }
}

export const updateAttendanceController = async (data) => {
  try {
    if (validateAttendanceUpdate(data)) {
      if (data.estado === 'Borrar') {
        const result = await postgreAttendanceHelper.deleteInasistencia(data.inasistenciaId)
        return result
      } else {
        const result = await postgreAttendanceHelper.modify(data)
        return result
      }
    }
    return 0
  } catch (error) {
    console.error('Error al modificar el estudiante', error)
  }
}

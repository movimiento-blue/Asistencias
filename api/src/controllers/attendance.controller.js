import { postgreAttendanceDao } from '../dao/postgreAttendance.dao.js'
import { postgreStudentDao } from '../dao/postgreStudent.dao.js'
import { validateAttendanceUpdate } from '../helpers/validationFunctions.js'

export const addAttendanceController = async (estudianteId) => {
  try {
    const studentActive = await postgreStudentDao.isActive(estudianteId)
    if (studentActive) {
      const result = await postgreAttendanceDao.add(estudianteId)
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
    const result = await postgreAttendanceDao.delete(estudianteId)
    return result
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error)
  }
}

export const updateAttendanceController = async (data) => {
  try {
    if (validateAttendanceUpdate(data)) {
      if (data.estado === 'Borrar') {
        const result = await postgreAttendanceDao.deleteInasistencia(data.inasistenciaId)
        return result
      } else {
        const result = await postgreAttendanceDao.modify(data)
        return result
      }
    }
    return 0
  } catch (error) {
    console.error('Error al modificar el estudiante', error)
  }
}

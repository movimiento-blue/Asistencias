import { postgreAttendanceHelper } from '../helpers/postgreAttendance.helper.js'

export const addAttendanceController = async (id) => {
  try {
    const result = await postgreAttendanceHelper.add(id)
    return result
  } catch (error) {
    console.error('Error al agregar el estudiante:', error)
  }
}

export const deleteAttendanceController = async (id) => {
  try {
    const result = await postgreAttendanceHelper.delete(id)
    return result.rowCount
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error)
  }
}

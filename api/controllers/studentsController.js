import { postgreStudentHelper } from '../helpers/postgreStudent.helper.js'

export const getAllStudentsController = async () => {
  try {
    const estudiantes = await postgreStudentHelper.getAll()
    return estudiantes
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error)
  }
}

export const addStudentController = async (student) => {
  try {
    const result = await postgreStudentHelper.add(student)
    return result.rowCount
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error)
  }
}

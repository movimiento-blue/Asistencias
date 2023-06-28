import { postgreStudentHelper } from '../helpers/postgreStudent.helper.js'
import { validateStudentData } from './validationFunctions.js'

export const getStudentsController = async (req) => {
  try {
    if (req.id) {
      const estudiantes = await postgreStudentHelper.getAll({ key: 'id', value: req.id })
      return estudiantes
    }
    if (req.apellido) {
      const estudiantes = await postgreStudentHelper.getAll({ key: 'apellido', value: req.apellido })
      return estudiantes
    }
    if (req.grupo_id) {
      const estudiantes = await postgreStudentHelper.getAll({ key: 'grupo_id', value: req.grupo_id })
      return estudiantes
    }
    const estudiantes = await postgreStudentHelper.getAll({})
    return estudiantes
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error)
  }
}

export const addStudentController = async (student) => {
  try {
    if (validateStudentData(student)) {
      const result = await postgreStudentHelper.add(student)
      return result.rowCount
    }
    return 0
  } catch (error) {
    console.error('Error al agregar el estudiante:', error)
  }
}

export const updateStudentController = async (student) => {
  try {
    if (validateStudentData(student) && student.id && 'grupo_id' in student) {
      const result = await postgreStudentHelper.modify(student)
      return result.rowCount
    }
    return 0
  } catch (error) {
    console.error('Error al modificar el estudiante', error)
  }
}

export const deleteStudentController = async (student) => {
  try {
    if (student.id) {
      const result = await postgreStudentHelper.delete(student.id)
      return result.rowCount
    }
    return 0
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error)
  }
}

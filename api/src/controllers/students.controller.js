import { postgreStudentDao } from '../dao/postgreStudent.dao.js'
import { validateStudentData } from '../helpers/validationFunctions.js'

export const getStudentsController = async (req) => {
  try {
    let estudiantes
    if (req.id) {
      estudiantes = await postgreStudentDao.getAll({ key: 'id', value: req.id })
    } else if (req.apellido) {
      estudiantes = await postgreStudentDao.getAll({ key: 'apellido', value: req.apellido })
    } else if (req.grupo_id) {
      estudiantes = await postgreStudentDao.getAll({ key: 'grupo_id', value: req.grupo_id })
    } else {
      estudiantes = await postgreStudentDao.getAll({})
    }
    return estudiantes
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error)
  }
}

export const addStudentController = async (student) => {
  try {
    if (validateStudentData(student)) {
      const result = await postgreStudentDao.add(student)
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
      const result = await postgreStudentDao.modify(student)
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
      const result = await postgreStudentDao.delete(student.id)
      return result.rowCount
    }
    return 0
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error)
  }
}

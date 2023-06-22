import { postgreStudentDao } from '../DAO/postgreStudentDao.js';

export const getAllStudentsController = async () => {
  try {
    const estudiantes = await postgreStudentDao.getAll();
    return estudiantes;
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
  }
};

export const addStudentController = async (student) => {
  try {
    const result = await postgreStudentDao.add(student);
    return result.rowCount;
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
  }
};

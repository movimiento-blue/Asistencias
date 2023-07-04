import { postgreStudentHelper } from '../helpers/postgreStudent.helper.js'

export const abscenceSave = () => {
  console.log('Actualizando inasistencias en la base de datos...')
  postgreStudentHelper.updateAttendances()
  console.log('Inasistencias actualizadas')
}

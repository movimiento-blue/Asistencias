export const validateStudentData = (student) => {
  if (!student.nombre || !student.apellido || !student.telefono_contacto) {
    return false
  }
  return true
}

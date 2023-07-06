export const validateStudentData = (student) => {
  if (!student.nombre || !student.apellido || !student.telefono_contacto) {
    return false
  }
  return true
}

export const validateAttendanceUpdate = (data) => {
  const estados = ['Ausente', 'Justificada', 'Tarde', 'Borrar']
  if (!data.inasistenciaId || !data.estado) {
    return false
  }
  if (!estados.includes(data.estado)) {
    return false
  }
  return true
}

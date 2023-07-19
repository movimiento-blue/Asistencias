import { Router } from 'express'

import passport from '../middlewares/auth.js'

import {
  addAttendanceController,
  deleteAttendanceController,
  updateAttendanceController
} from '../controllers/attendanceController.js'

import {
  getStudentsController
} from '../controllers/studentsController.js'

const attendanceRouter = Router()

// POST attendance query {id:..} // Se registra asistencia
attendanceRouter.post(
  '/attendance',
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await addAttendanceController(req.query.id)
      const student = await getStudentsController({ id: req.query.id })
      if (result === 1) {
        return res.status(201).json({
          msg: 'asistencia registrada.',
          nombre: student[0].nombre,
          apellido: student[0].apellido
        })
      } else if (result === 2) {
        return res.status(400).json({
          msg: 'asistencia ya registrada.',
          nombre: student[0].nombre,
          apellido: student[0].apellido
        })
      } else {
        return res.status(400).json({
          msg: ' asistencia no registrada.',
          nombre: 'Error al buscar',
          apellido: ' estudiante'
        })
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  })

// DELETE attendance query {id:..} // Elimina asistencia registrada previamente
attendanceRouter.delete(
  '/attendance',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await deleteAttendanceController(req.query.id)
      if (result === 1) {
        return res.status(200).json({ msg: 'Asistencia eliminada.' })
      }
      return res.status(400).json({ msg: 'Asistencia no eliminada.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  })

attendanceRouter.put(
  '/attendance',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await updateAttendanceController(req.body)
      if (result === 1) {
        return res.status(200).json({ msg: 'Asistencia actualizada.' })
      }
      return res.status(400).json({ msg: 'Asistencia no actualizada.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  })

export default attendanceRouter

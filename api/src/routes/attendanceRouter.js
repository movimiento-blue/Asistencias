import { Router } from 'express'

import passport from '../middlewares/auth.js'

import {
  addAttendanceController,
  deleteAttendanceController,
  updateAttendanceController
} from '../controllers/attendanceController.js'

const attendanceRouter = Router()

// POST attendance query {id:..} // Se registra asistencia
attendanceRouter.post(
  '/attendance',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await addAttendanceController(req.query.id)
      if (result === 1) {
        return res.status(201).json({ msg: 'Asistencia registrada.' })
      } else if (result === 2) {
        return res.status(400).json({ msg: 'Asistencia ya registrada.' })
      } else {
        return res.status(400).json({ msg: 'Asistencia no registrada.' })
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
      console.log(req.body)
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

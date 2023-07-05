import { Router } from 'express'

import {
  addAttendanceController,
  deleteAttendanceController
} from '../controllers/attendanceController.js'

const attendanceRouter = Router()

// POST attendance query {id:..} // Se registra asistencia
attendanceRouter.post('/attendance', async (req, res) => {
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
attendanceRouter.delete('/attendance', async (req, res) => {
  try {
    const result = await deleteAttendanceController(req.query)
    if (result === 1) {
      return res.status(200).json({ msg: 'Asistencia eliminada.' })
    }
    return res.status(400).json({ msg: 'Asistencia no eliminada.' })
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default attendanceRouter

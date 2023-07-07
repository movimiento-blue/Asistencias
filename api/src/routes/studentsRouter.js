import { Router } from 'express'
import {
  getStudentsController,
  addStudentController,
  updateStudentController,
  deleteStudentController
} from '../controllers/studentsController.js'
import passport from '../middlewares/auth.js'

const studentsRouter = Router()

// GET students body {id:.., apellido:.., grupo_id:...}
studentsRouter.get(
  '/students',
  async (req, res) => {
    try {
      const { id, apellido, grupo_id } = req.query
      const students = await getStudentsController({ id, apellido, grupo_id })
      if (students.length > 0) {
        return res.status(200).json(students)
      }
      return res.status(404).json({ msg: 'No se encontró estudiante' })
    } catch (error) {
      res.status(500).json(error)
    }
  })

// POST student body {nombre:.., apellido:.., telefono_contacto:.., grupo_id:..?}
studentsRouter.post(
  '/students',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await addStudentController(req.body)
      if (result === 1) {
        return res.status(201).json({ msg: 'Estudiante agregado.' })
      }
      return res.status(400).json({ msg: 'Estudiante no agregado.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  })

// PUT students body {id:.., nombre:.., apellido:.., grupo_id:.., telefono_contacto:..}
studentsRouter.put(
  '/students',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await updateStudentController(req.body)
      if (result === 1) {
        return res.status(200).json({ msg: 'Estudiante actualizado.' })
      }
      return res.status(400).json({ msg: 'Estudiante no actualizado.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  })

// DEL students body {id:..}
studentsRouter.delete(
  '/students',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await deleteStudentController(req.body)
      if (result === 1) {
        return res.status(200).json({ msg: 'Estudiante eliminado.' })
      }
      return res.status(400).json({ msg: 'Estudiante no eliminado.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  })

export default studentsRouter

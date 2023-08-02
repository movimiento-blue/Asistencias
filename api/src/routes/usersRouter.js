import { Router } from 'express'
import {
  getUsersController,
  addUserController,
  modifyUserController,
  loginUserController
} from '../controllers/usersController.js'
import passport, { generateJwtToken } from '../middlewares/auth.js'

const usersRouter = Router()

usersRouter.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  async (_req, res) => {
    try {
      const usuarios = await getUsersController()
      if (usuarios.length > 0) {
        return res.status(200).json(usuarios)
      }
      return res.status(404).json({ msg: 'No se encontraron usuarios' })
    } catch (error) {
      res.status(500).json(error)
    }
  })

// { nombre, apellido, username, clave, rol}
usersRouter.post(
  '/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await addUserController(req.body)
      if (result === 1) {
        return res.status(201).json({ msg: 'Usuario agregado.' })
      }
      return res.status(400).json({ msg: 'Usuario no agregado.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
)

// { id, nombre, apellido, username, clave, rol}
usersRouter.put(
  '/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await modifyUserController(req.body)
      if (result === 1) {
        return res.status(200).json({ msg: 'Usuario actualizado.' })
      }
      return res.status(400).json({ msg: 'Usuario no actualizado.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
)

// { username, clave }
usersRouter.post(
  '/users/login',
  async (req, res) => {
    try {
      const result = await loginUserController(req.body)
      if (result) {
        const jwToken = generateJwtToken(req.body.username)
        return res.status(200).json({ username: req.body.username, token: jwToken })
      }
      return res.status(404).json({ msg: 'Usuario no encontrado.' })
    } catch (error) {
      res.status(500).json(error)
    }
  }
)

export default usersRouter

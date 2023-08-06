import { Router } from 'express'
import abscenceSave from '../services/absenceSave.js'

const servicesRouter = Router()

servicesRouter.get(
  '/services/crons',
  async (_req, res) => {
    try {
      await abscenceSave()
      return res.status(200)
    } catch (error) {
      console.log(error)
      res.status(500)
    }
  }
)

export default servicesRouter

import { Router } from 'express'

const infoRouter = Router()

infoRouter.get('/test', async (_, res) => {
  res.send('TEST2')
})

export default infoRouter

// ----------------- Librarys import
import express from 'express'
import http from 'http'
import cors from 'cors'
import cluster from 'cluster'
import path from 'path'
import cron from 'node-cron'
import { useTreblle } from 'treblle'

// ----------------- Own modules import
import { config, staticFiles, ncores, treblleApiKey, treblleProjectId } from './config/environment.js'
import { abscenceSave } from './services/absenceSave.js'
import studentsRouter from './routes/studentsRouter.js'
import attendanceRouter from './routes/attendanceRouter.js'

import { generateJwtToken } from './middlewares/auth.js'

const PORT = (config.port) ? config.port : 8080

// ----------------- SERVER DECLARATIONS
const createServer = () => {
  const app = express()
  const server = http.createServer(app)

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/doc', express.static(staticFiles))

  // --------------- Treblle Create API DOC
  useTreblle(app, {
    apiKey: treblleApiKey,
    projectId: treblleProjectId
  })

  // --------------- Routes
  app.use('/api', studentsRouter)
  app.use('/api', attendanceRouter)

  // --------------- Not found route
  app.get('*', (req, res, next) => {
    const fileExtension = path.extname(req.url)
    if (fileExtension === '.ico') {
      next()
    } else {
      res.send(`Ruta: ${req.url}, método: ${req.method} no implementada`)
    }
  })

  return server
}

// ----------------- START CLUSTERS (this initializes NCORES servers)

if (cluster.isPrimary) {
// -------------- generate JWT token para desarrollo
  console.log('JWT para desarrollo: ', generateJwtToken('username'))
  console.log('Incluir en el Bearer          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')

  console.log('Server in CLUSTER mode')
  console.log('----------------------')

  // ----------------- Scheluded tasks at 12:00 AM
  cron.schedule('47 9 * * *', () => {
    abscenceSave()
  })

  for (let i = 0; i < ncores; i++) {
    cluster.fork()
  }
} else {
  console.log(`Worker ${cluster.worker.id} started`)
  try {
    const server = createServer()
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`ERROR ${cluster.worker.id} - Puerto en uso: ${error.address}:${error.port}`)
        console.log('Inicie el servidor en otro puerto utilizando el comando: node src/server/server -p <puerto>')
        console.log('Ejemplo: node src/server/server -p 3000')
        process.exit(1)
      } else {
        console.error(error)
        throw error
      }
    })
    server.listen(PORT, () => {
      console.log(`Worker ${cluster.worker.id} listening on port ${PORT}`)
    })
  } catch (error) {
    console.error(`Error starting worker ${cluster.worker.id}: ${error}`)
  }
}

// ----------------- SERVER FORK
/*
createServer().listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
*/

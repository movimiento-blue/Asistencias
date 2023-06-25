// ----------------- Librarys import
import express from 'express'
import http from 'http'
import cors from 'cors'
import cluster from 'cluster'
import path from 'path'

// ----------------- Own modules import
import { staticFiles, PORT, ncores } from '../config/environment.js'
import testRouter from '../routes/testRouter.js'
import studentsRouter from '../routes/studentsRouter.js'
// import attenddanceRouter from '../routes/attenddanceRouter.js';

// ----------------- SERVER DECLARATIONS
const createServer = () => {
  const app = express()
  const server = http.createServer(app)

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(staticFiles))

  // --------------- Routes
  app.use('/', testRouter)
  app.use('/', studentsRouter)
  // app.use('/attenddance', attenddanceRouter);

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
  console.log('Server in CLUSTER mode')
  console.log('----------------------')
  for (let i = 0; i < ncores; i++) {
    cluster.fork()
  }
} else {
  console.log(`Worker ${cluster.worker.id} started`)
  try {
    createServer().listen(PORT, () => {
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

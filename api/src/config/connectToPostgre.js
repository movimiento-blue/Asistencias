import pkg from 'pg'

import {
  postgresuser,
  postgreshost,
  postgresdb,
  postgrespassword,
  postgresport
} from './environment.js'
const { Client } = pkg

export const client = new Client({
  user: postgresuser,
  host: postgreshost,
  database: postgresdb,
  password: postgrespassword,
  port: postgresport,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
})

let isConected

export const connectToDb = async () => {
  if (!isConected) { // Esta logica es para evitar varias conexiones simultaneas
    await client
      .connect()
      .then(() => {
        isConected = true
        console.log('PostgreDB Connected...')
      })
      .catch((err) => console.error(`GrupoBlue PostgreDB ${err}`))
  }
}

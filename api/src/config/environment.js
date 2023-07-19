import dotenv from 'dotenv'
import minimist from 'minimist'

dotenv.config()
const parseArgs = minimist(process.argv.slice(2))

export const config = {
  port: parseArgs.p // puerto escucha
}

export const staticFiles = process.env.STATICFILES
export const ncores = process.env.NCORES

export const postgresuser = process.env.POSTGRESUSER
export const postgreshost = process.env.POSTGRESHOST
export const postgresdb = process.env.POSTGRESDB
export const postgrespassword = process.env.POSTGRESPASSWORD
export const postgresport = process.env.POSTGRESPORT

export const treblleApiKey = process.env.TREBLLEAPIKEY
export const treblleProjectId = process.env.TREBLLEPROJECTID

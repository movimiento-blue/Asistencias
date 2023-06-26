import dotenv from 'dotenv'
dotenv.config()

export const staticFiles = process.env.STATICFILES
export const PORT = process.env.PORT
export const ncores = process.env.NCORES

export const postgresuser = process.env.POSTGRESUSER
export const postgreshost = process.env.POSTGRESHOST
export const postgresdb = process.env.POSTGRESDB
export const postgrespassword = process.env.POSTGRESPASSWORD
export const postgresport = process.env.POSTGRESPORT

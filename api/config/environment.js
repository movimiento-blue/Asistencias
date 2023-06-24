import dotenv from 'dotenv';
dotenv.config();

export const staticFiles = process.env.STATICFILES;
export const PORT = process.env.PORT;
export const NCORES = process.env.NCORES;
export const POSTGRESUSER = process.env.POSTGRESUSER;
export const POSTGRESHOST = process.env.POSTGRESHOST;
export const POSTGRESDB = process.env.POSTGRESDB;
export const POSTGRESPASSWORD = process.env.POSTGRESPASSWORD;

import dotenv from 'dotenv';
dotenv.config();

export const staticFiles = process.env.STATICFILES;
export const PORT = process.env.PORT;
export const NCORES = process.env.NCORES;

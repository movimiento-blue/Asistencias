import pkg from 'pg';
const { Client } = pkg;

import {
  POSTGRESUSER,
  POSTGRESHOST,
  POSTGRESDB,
  POSTGRESPASSWORD
} from './environment.js';

export const client = new Client({
  user: POSTGRESUSER,
  host: POSTGRESHOST,
  database: POSTGRESDB,
  password: POSTGRESPASSWORD,
  port: 5432
});

let isConected;

export const connectToDb = async () => {
  if (!isConected) {
    // Esta logica es para evitar varias conexiones simultaneas
    await client
      .connect()
      .then(() => {
        isConected = true;
        console.log('PostgreDB Connected...');
      })
      .catch((err) => console.error(`GrupoBlue PostgreDB ${err}`));
    return;
  }

  return;
};

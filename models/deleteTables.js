import { client } from '../config/connectToPostgre.js';

async function dropTable(tableName) {
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

    await client.query(dropTableQuery);
    console.log(`Tabla ${tableName} eliminada exitosamente`);

    await client.end();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error(`Error al eliminar la tabla ${tableName}:`, error);
  }
}

//dropTable('asistencias');
dropTable('estudiantes');

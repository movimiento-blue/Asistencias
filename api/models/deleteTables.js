import { client } from '../config/connectToPostgre.js'

async function dropTable (tableName) {
  try {
    await client.connect()
    console.log('Conexión exitosa a la base de datos')

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName} CASCADE`

    await client.query(dropTableQuery)
    console.log(`Tabla ${tableName} eliminada exitosamente`)

    await client.end()
    console.log('Conexión cerrada')
  } catch (error) {
    console.error(`Error al eliminar la tabla ${tableName}:`, error)
  }
}

async function getTables () {
  try {
    const getTablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `

    const result = await client.query(getTablesQuery)

    console.log('Tablas existentes en la base de datos:')
    result.rows.forEach((row) => {
      console.log(row.table_name)
    })
  } catch (error) {
    console.error('Error al obtener las tablas:', error)
  }
}

// dropTable('asistencias')
dropTable('inaisistencias')

getTables()

import { client, connectToDb } from '../config/connectToPostgre.js'

class PosgreUserDao {
  async getAll () {
    try {
      await connectToDb()
      const query = 'SELECT * FROM usuarios WHERE activo = true'
      const result = await client.query(query)
      return result.rows
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  async getByUsername (username) {
    try {
      await connectToDb()
      const query = 'SELECT * FROM usuarios WHERE username = $1 AND activo = true'
      const result = await client.query(query, [username])
      return result.rows
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  async add (user) {
    try {
      await connectToDb()
      const query =
        'INSERT INTO usuarios (nombre, apellido, username, clave, rol) VALUES ($1, $2, $3, $4, $5)'
      const result = await client.query(query, [
        user.nombre,
        user.apellido,
        user.username,
        user.clave,
        user.rol
      ])
      return result
    } catch (error) {
      console.error('Error al agregar el usuario:', error)
    }
  }

  async modify (user) {
    try {
      await connectToDb()
      const query =
        'UPDATE usuarios SET nombre = $1, apellido = $2, username = $3, clave = $4, rol = $5 WHERE id = $6'
      const result = await client.query(query, [
        user.nombre,
        user.apellido,
        user.username,
        user.clave,
        user.rol,
        user.id
      ])
      return result
    } catch (error) {
      console.error('Error al modificar el usuario:', error)
    }
  }
}

export const postgreUserDao = new PosgreUserDao()

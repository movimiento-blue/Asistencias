import { postgreUserHelper } from '../helpers/postgreUsers.helper.js'
import bycrypt from 'bcrypt'

export const getUsersController = async () => {
  try {
    const usuarios = await postgreUserHelper.getAll()
    return usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
  }
}

export const addUserController = async (user) => {
  try {
    // check user data
    user.clave = await bycrypt.hash(user.clave, 10)
    const result = await postgreUserHelper.add(user)
    return result.rowCount
  } catch (error) {
    console.error('Error al agregar el usuario:', error)
  }
}

export const modifyUserController = async (user) => {
  try {
    // check user data
    user.clave = await bycrypt.hash(user.clave, 10)
    const result = await postgreUserHelper.modify(user)
    return result.rowCount
  } catch (error) {
    console.error('Error al modificar el usuario:', error)
  }
}

export const loginUserController = async (data) => {
  try {
    // check user data
    const result = await postgreUserHelper.getByUsername(data.username)
    if (result.length > 0) {
      if (await bycrypt.compare(data.clave, result[0].clave)) {
        return true
      }
    }
    return false
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
  }
}

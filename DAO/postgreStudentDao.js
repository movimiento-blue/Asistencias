import { client, connectToDb } from '../config/connectToPostgre.js';

class PostgreStudentDao {
  async getAll() {
    try {
      await connectToDb();
      const query = 'SELECT * FROM estudiantes';
      const result = await client.query(query);
      const estudiantes = result.rows;
      return estudiantes;
    } catch {
      console.error('Error al obtener los estudiantes:', error);
    }
  }

  async add(student) {
    try {
      await connectToDb();
      const query =
        'INSERT INTO estudiantes (nombre, apellido, grupo, estado, telefono) VALUES ($1, $2, $3, $4, $5)';
      const result = await client.query(query, [
        student.nombre,
        student.apellido,
        student.grupo,
        student.estado,
        student.telefono
      ]);
      return result;
    } catch (error) {
      console.error('Error al obtener los estudiantes:', error);
    }
  }
}

export const postgreStudentDao = new PostgreStudentDao();

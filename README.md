# Backend
## Rutas
Ejemplo de llamado a la api:
const response = await fetch(`http://localhost:8080/students/`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id.value,
      })
  })

### ESTUDIANTES
- **GET: /students** Se pasa un objeto en el body con clave id, apellido o grupo_id y devuelve todos los estudiantes activos con igual valor de la clave. Si no se pasa objeto devuelve todos los estudiantes activos (status 200 si esta ok).
- **POST: /students** Se pasa un objeto que debe contener las claves nombre, apellido y telefono_contacto y se almacena estudiante en la base de datos (status 201 si se almaceno correctamente).
- **PUT: /students** Se pasa un objeto que debe contener las claves id, nombre, apellido, grupo_id y telefono_contacto y modifica el estudiante con el id indicado (stauts 200 si se modifico correctamente).
- **DELETE: /students** Se pasa un objeto que debe contener la clave id y cambia el estado del estudiante a false (stauts 200 si se modifico correctamente).

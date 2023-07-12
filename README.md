# Backend
## Rutas
Ejemplo de llamado a la api:
const response = await fetch(`http://localhost:8080/students?id=1&apellido=and`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
    },
  })

### ESTUDIANTES
- **GET: /students?id=** Se pasan query params id, apellido o grupo_id (si hay mas de un parametro busca por solamente uno de ellos en el siguiente orden: id, apellido y grupo) y devuelve todos los estudiantes activos con igual valor de la clave, en el caso del apellido puede estar incompleto y no importan mayusculas o minusculas. Si no se pasa objeto devuelve todos los estudiantes activos (status 200 si esta ok).
- **POST: /students** Se pasa un objeto que debe contener las claves nombre, apellido y telefono_contacto y se almacena estudiante en la base de datos (status 201 si se almaceno correctamente).
- **PUT: /students** Se pasa un objeto que debe contener las claves id, nombre, apellido, grupo_id y telefono_contacto y modifica el estudiante con el id indicado (stauts 200 si se modifico correctamente).
- **DELETE: /students** Se pasa un objeto que debe contener la clave id y cambia el estado del estudiante a false (stauts 200 si se modifico correctamente).

### ASISTENCIAS
- **POST: /students?id=12** Se pasa id de estudiante por parametros y se registra la asistencia con fecha y hora.
- **DELETE: /students?id=12** Se pasa id de estudiatnte y se borra la asistencia del dia actual.
- **PUT: /students** Se pasa un objeto {inasistenciaId: "12", estado: "justificada"} y se modifica el registro de inasistencias, si el estado es "Borrar" se borra el registro. estados = ['Ausente', 'Justificada', 'Tarde', 'Borrar'].
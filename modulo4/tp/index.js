const express = require('express')
const app = express();
// Settings

app.set('port', process.env.PORT || 3000)



// Middlewares

app.use(express.json());



// Routes
app.use(require('./routes/personas'));

//Starting Server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'));
});
    // POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} - status: 413, {mensaje: } que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"
        // JSON:{nombre: string, apellido: string, alias: string, email: string}
        // SI PUDO CREAR LA NUEVA PERSONA: STATUS 200 Y TODOS LOS CAMPOS QUE CARGO.
        // SI NO: status: 413, {mensaje: } que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"

    // GET '/persona' retorna status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] o bien status 413 y []
        // ARRAY DE JSON: [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] status 200
        // SI NO HAY DATOS: status 413 y [](ARRAY VACIO)

    // GET '/persona/:id' retorna status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string} - status 413 , {mensaje: } "error inesperado", "no se encuentra esa persona"
        // JSON: {id: numerico, nombre: string, apellido: string, alias: string, email; string}
        // SI OK: STATUS 200
        // SI NO: STATUS 413 --> {mensaje: } "error inesperado", "no se encuentra esa persona"

    // PUT '/persona/:id' (PARA MODIFICAR PERSONA)
        // recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413,
        // SI NO SE PUEDE {mensaje: } "error inesperado", "no se encuentra esa persona"

    // DELETE '/persona/:id'
        // retorna: 200 y {mensaje: "se borro correctamente"} o
        // SI NO SE PUEDE: STATUS 413, {mensaje: } "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"



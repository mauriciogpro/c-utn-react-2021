// requerir modulos
const express = require('express')
const mysql = require('mysql')
const util = require('util')
const app = express()

// Cuando recibo de un JSON
app.use(express.json())


// Realizar la conexion
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'persona'
}
);

conexion.connect();

// Transforma el query para que no regrese una callback y si una promise
const query = util.promisify(conexion.query).bind(conexion)


// POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} - status: 413, {mensaje: } que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"
//  JSON:{nombre: string, apellido: string, alias: string, email: string}
//  SI PUDO CREAR LA NUEVA PERSONA: STATUS 200 Y TODOS LOS CAMPOS QUE CARGO.
//  SI NO: status: 413, {mensaje: } que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"


app.post('/api/persona', async(req, res) => {
try {
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const email = req.body.alias
  const alias = req.body.mail
  const respuesta = await query('insert into persona (nombre, apellido, email, alias) values (?, ?, ?, ?)', [nombre, apellido, email, alias])
  //respuesta.insertID (nuevo del json)
  const registroInsertado = await query('select * from persona where id=?', [respuesta, insertId])
    res.json(registroInsertado[0]);
       res.status(200).send();
    } catch (e) {
  res.status(413).send('Missing Data - Mail already registered - Inespered Error')
}})



// GET '/persona' retorna status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] o bien status 413 y []
//  ARRAY DE JSON: [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] status 200
//  SI NO HAY DATOS: status 413 y [](ARRAY VACIO)

app.get('/api/persona', async (req, res) => {
  try {

  const respuesta = await query ('select id, nombre, apellido, email, alias from persona')
    res.status(200).send(respuesta)
    
  } catch (e) {
   res.status(413).send('Missing Data - Mail already registered - Inespered Error')
    res.send(respuesta)
  }
})


// GET '/persona/:id' retorna status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string} - status 413 , {mensaje: } "error inesperado", "no se encuentra esa persona"
//   JSON: {id: numerico, nombre: string, apellido: string, alias: string, email; string}
//   SI OK: STATUS 200
//     SI NO: STATUS 413 --> {mensaje: } "error inesperado", "no se encuentra esa persona"



app.get('/api/persona/:id', async (req, res) => {
  try { 
  const respuesta = await query('select * from persona where id=?', [req.params.id])
    if (respuesta.length==1) {
      res.json(respuesta[0])
      res.status(200).send()
    } else {
      res.status(413).send("no se encuentra esa persona");
    }
  res.send(respuesta) 
    
  } catch(e){
    res.status(413).send("error indesperado");

  }
})



// PUT '/persona/:id' (PARA MODIFICAR PERSONA)
//  recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413,
//  SI NO SE PUEDE {mensaje: } "error inesperado", "no se encuentra esa persona"



app.put('/api/persona/:id', async(req, res) => {
try { 
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const alias = req.body.alias
  const respuesta = await query('update persona set nombre=?, apellido=?, alias=?, email=? where id=?', [nombre, apellido, alias, email, req.params.id])
  const registroInsertado = await query('select * from persona where id=?', [req.params.id])
  res.json(registroInsertado[0]);
} catch (e){
  res.send('Error inesperado');
}})


//DELETE '/persona/:id'
    //retorna: 200 y {mensaje: "se borro correctamente"} o
    //SI NO SE PUEDE: STATUS 413, {mensaje: } "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"


app.delete('/api/persona/:id', async(req, res) => {
  try { 
  const resgistro = await query('select * from persona where id=?', [req.params.id])
  if (registro.length==1) {
    await query('delelete from persona where id=?', [req.params.id]);
    res.status(204).send()
  } else {
    res.status(413).send()
  }
 } catch (e){
  res.status(413).send('Error inesperado');
}   
})




app.listen(8000, () => {console.log('App corriendo en el puerto 8000')})


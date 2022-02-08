// Parece que la forma es mejor
// requerir modulos
const express = require('express')
const mysql = require('mysql')
const util = require('util')
const app = express()

// Cuando ser recibe informacion de un html
// 1. Direccion de todos los archivos estaticos
  // app.use(express.static('public'))
// 2. Decirle a express que vamos a usar formularios
  // app.use(express.urlencoded())
// Cuando recibo de un JSON
app.use(express.json())





// Realizar la conexion
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prueba'
}
);

conexion.connect();

// Transforma el query para que no regrese una callback y si una promise
const query = util.promisify(conexion.query).bind(conexion)

// Trae toda la tabla
// app.get('/', async (req, res) => {
// const respuesta = await query ('select * from persona')
//     console.log(respuesta)
//     res.send('ok')
// })
// Modificaion del atnerior. Agrega la palabra api. Devuelve solo algunos campos.jjj
app.get('/api/personas', async (req, res) => {
const respuesta = await query ('select id, nombre, apellido, edad from persona')
    res.send(respuesta) // Tambien se le puede poner un res.json haria lo mismo. 
})

// No modificado para json
// app.get('/persona/:id', async (req, res) => {
//   try { 
//   const respuesta = await query('select * from persona where id=?', [req.params.id])
//  console.log(respuesta) 
//   res.send('Seleccionaste la persona con nombre ' + respuesta[0].nombre)
    
//   } catch(e){
//     res.send('La persona no existe')
//   }
// })



// Modificado para Json 
app.get('/api/personas/:id', async (req, res) => {
  try { 
  const respuesta = await query('select * from persona where id=?', [req.params.id])
    if (respuesta.length==1) {
      res.json(respuesta[0])
    } else {
      res.status(404).send();
    }
  res.send(respuesta) 
    
  } catch(e){
    res.send('La persona no existe')
  }
})


app.post('/persona', async(req, res) => {
    // Procesar formulario
  //
  // para que me muestre los datos en el navegador asi veo que este todo bien
  // res.send(req.body)

try {
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const edad = req.body.apellido
  const salario = req.body.salario
  const respuesta = await query('insert into persona (nombre, apellido, edad, salario) values (?, ?, ?, ?)', [nombre, apellido, edad, salario])
  //respuesta.insertID (nuevo del json)
  const registroInsertado = await query('select * from persona where id=?', [respuesta, insertId])
  res.json(registroInsertado[0]);
} catch (e) {
  res.status(500).send('Error en la operacion')
}
  // res.send('Ok')
})

app.put('/api/persona/:id', async(req, res) => {
try { 
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const edad = req.body.apellido
  const salario = req.body.salario
  const respuesta = await query('update persona set nombre=?, apellido=?, edad=?, salario=? where id=?', [nombre, apellido, edad, salario, req.params.id])
  const registroInsertado = await query('select * from persona where id=?', [req.params.id])
  res.json(registroInsertado[0]);
} catch (e){
  res.status(500).send('Error en la operacion');
}})

app.delete('/api/personas/:id', async(req, res) => {
  try { 
  const resgistro = await query('select * from persona where id=?', [req.params.id])
  if (registro.length==1) {
    await query('delelete from persona where id=?', [req.params.id]);
    res.status(204).send()
  } else {
    res.status(404).send()
  }
 } catch (e){
  res.status(500).send('Error en la operacion');
}   
})



app.listen(8000, () => {console.log('App corriendo en el puerto 8000')})


//listar
// Devolver un listado JSON de las personas
//
//Obtener un elemento particular
// Devolver un JSON del elemento
//
//Agregar
// Envia los datos en formato json
//
//Modificar
//  
//
//Eliminar

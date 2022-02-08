const express = require('express')
const mysql = require('mysql')

const app = express()

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prueba'
}
);

conexion.connect();


app.get('/',(req, res) => {
  conexion.query('select * from persona', (error, resultado) => {
    // console.log(resultado)
    // res.send('ok')
    //
    // Se puede hacer un html o un motor de template como el Handlebars
    // let html = "<ul>";
    // resultado.forEach(unaPersona => {
    //   html += `<li>"${unaPersona.nombre}</li>`;
    // })
    // html += "</ul>"
    // res.send(html)
  })

})


app.listen(8000, () => {console.log('App corriendo en el puerto 8000')})

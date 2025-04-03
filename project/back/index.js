import express from "express"  
import mysql from "mysql"


const app = express()   // genera un objeto de la clase express
const PORT=8002

app.listen(PORT, () => console.log("Escuchando en el puerto " + PORT)) // Nuestro servidor escucha en el puerto 8000. Cambiar para cada grupo


var con = mysql.createConnection({
   host: "127.0.0.1",
   user: "diez",  // usuario de mysql. Cambiar para cada grupo
   password: "diez",  // clave. Cambiar para cada grupo
   database: 'diez'  // nombre de la base de datos, cambiar para cada grupo
 })


con.connect((err) => {
   if (err) throw err
})  //  conecta con mysql de acuerdo a los datos que le pasamos a con (ver arriba)


app.get("/", (req, res) => {  //  Consulta tipo get en /, es decir, en localhost:8000. req es lo que el servidor recibe y res lo que contesta
   con.query("SELECT * FROM sujeto", (err, result, fields) => {
       if (err) throw err
       res.json(result)
   })
})


app.get("/id/:id", (req, res) => {  // consulta con parametros,. Por ejemplo, localhost:8000/id/1
   const c = req.params //params es un objeto con la lista de parámetros 
   con.query("SELECT * FROM sujeto where id=" + c.id,  (err, result, fields)  => {
       if (err) throw err
       res.json(result)
   })
})


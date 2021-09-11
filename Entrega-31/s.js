const express = require("express");


const app = express();
const compression = require("compression");
app.use(compression());

const PORT = 8080

app.get("/saludo", (req, res)=>{
  var mensaje = "Hola que tal";
  res.send(mensaje.repeat(1000));
})

app.listen(PORT, ()=>{
  console.log(`servidor express escuchando en el http://localhost:${PORT}`);
})

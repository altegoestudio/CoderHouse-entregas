const express = require("express");
const compression = require("compression");

const app = express();
app.use(compression());

const PORT = 8080

app.get("/saludo", (req, res)=>{
  var mensaje = "Hola que tal";
  res.send(mensaje.repeat(1000));
})

app.listen(PORT, ()=>{
  console.log(`servidor express escuchando en el http://localhost:${PORT}`);
})

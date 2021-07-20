const express = require("express");
const app = express();
const http = require("http").Server(app);
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



app.use((err,req,res,next)=>{
  console.log(err.message);
  return res.status(500).send("Algo se rompio")
})

const routerProductos = require('./router/routesProducto');
app.use("/api/productos", routerProductos);

const routerCarrito = require('./router/routesCarrito');
app.use("/api/carrito", routerCarrito);



const server = http.listen(PORT, ()=>{
  console.log("Servidor corriendo en el puerto:", PORT);
})

server.on("error", (error)=>{
  console.log("se produjo el siguiente error en el servidor:", error);
})

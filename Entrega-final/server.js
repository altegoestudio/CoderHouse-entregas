//SERVIDOR
const express = require("express");
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 8080;
const server = http.listen(PORT, () =>{
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
//USES
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
})
//RUTA
app.get('/',(req,res)=>{
  res.json('main');
});
//RUTEADOR
const routerProductos = require("./router/productos");
app.use("/productos",routerProductos);

const routerCarrito = require("./router/carrito");
app.use("/carrito", routerCarrito);

//ON
server.on("error",error =>{
  console.log("error en el servidor: " + error);
})

const express = require('express');
const fs = require('fs');
const productos = require('./api/producto');
const mensajes = require('./api/mensaje');
const app = express();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const io = require('socket.io')(http);
//const rutaMensajes = 'files/mensajes.txt'
//const dbConfig = require("./config/database")
//const knex = require('knex');

require('./mongo/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", __dirname + '/views');


async function leerMensajes(){
  try{
    let data = await mensajes.enlistar();
    return data
  }catch(err){
    throw new Error("q pso")
  }
}


io.on('connection', async socket => {
    socket.emit('productos', await productos.enlistar());
    socket.emit('messages', await leerMensajes());

    socket.on('update',   async function (data) {
        io.sockets.emit('productos',  await productos.enlistar() );
    });
    socket.on('new-message', async function (msj) {
        let a = await mensajes.guardar(msj);
        io.sockets.emit('messages', await leerMensajes())
    });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});


const routerProductos = require('./router/routesProductos');
app.use("/api/productos",routerProductos);

const routerMensajes = require('./router/routesMensajes');
app.use("/api/mensajes",routerMensajes);

const PORT = 8080;


const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


server.on('error', error => {
    console.log('error en el servidor:', error);
});

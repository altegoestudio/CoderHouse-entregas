const express = require('express');
const fs = require('fs');
const productos = require('./api/producto');
const app = express();
const handlebars = require('express-handlebars');
  const http = require('http').Server(app);
    const io = require('socket.io')(http);
const rutaMensajes = 'files/mensajes.txt'

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
    let archivo = await fs.promises.readFile('files/mensajes.txt', "utf-8");
    let data = JSON.parse(archivo,null,"\t")
    return data
  }catch(err){
    throw new Error("q pso")
  }
}

io.on('connection', async socket => {
    socket.emit('productos', productos.enlistar());

    socket.emit('messages', await leerMensajes());
    socket.on('update', data => {
        io.sockets.emit('productos', productos.enlistar());
    });
    socket.on('new-message', async function (data) {

        let archivo = await fs.promises.readFile(rutaMensajes, "utf-8");
        let msg = JSON.parse(archivo,null,"\t")
        msg.push(data);
        await fs.promises.writeFile(rutaMensajes, JSON.stringify(msg))
        io.sockets.emit('messages', await leerMensajes())
    });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});


const router = require('./router/routes');
app.use("/api/productos",router);

const PORT = 8080;


const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


server.on('error', error => {
    console.log('error en el servidor:', error);
});

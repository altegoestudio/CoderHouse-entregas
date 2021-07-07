const express = require('express');
const app = express();
const http = require('http').Server(app);
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

const productosroutes = require("./router/productosroutes");
app.use("/api/productos", productosroutes);

const mensajesroutes = require("./router/mensajesroutes");
app.use("/api/mensajes", mensajesroutes);



const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});

'use strict';

var express = require('express');

// creo una app de tipo express
var app = express();
var puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ejemplo de metodos HTTP con express...
app.get('/', function (req, res) {
    return res.send('Bienvenido al servidor express avanzado');
});

// pongo a escuchar el servidor en el puerto indicado
var server = app.listen(puerto, function () {
    console.log('servidor escuchando en http://localhost:' + puerto);
});

// en caso de error, avisar
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});

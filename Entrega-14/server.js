'use strict';

var express = require('express');

var app = express();
var puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    return res.send('Bienvenido');
});

var server = app.listen(puerto, function () {
    console.log('servidor en http://localhost:' + puerto);
});

server.on('error', function (error) {
    console.log('error en el servidor:', error);
});

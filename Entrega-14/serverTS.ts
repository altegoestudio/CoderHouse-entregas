const express = require('express');

// creo una app de tipo express
const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ejemplo de metodos HTTP con express...
app.get('/', (req, res) => {
    return res.send('Bienvenido al servidor express avanzado');
});

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});

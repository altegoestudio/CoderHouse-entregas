const express = require('express');

const app = express();
/*
const handlebars = require("express-handlebars")
//const router = express.Router();
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
*/


// seteo el motor de plantilla

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('main.pug', { mensaje: 'Usando Pub JS desde express'});
});

const router = require('./router/routes');

app.use("/api/productos",router);
const puerto = 8080;
const server = app.listen(puerto,()=>{
  console.log(`servidor escuchando en http://localhost:${puerto}`);
})

server.on('error', error => {
    console.log('error en el servidor:', error);
});

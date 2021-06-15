const express = require('express');

const app = express();



// seteo el motor de plantilla
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',(req,res)=>{
  res.render('main');
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

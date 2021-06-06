const express = require('express');

const app = express();

//const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',(req,res)=>{
  res.sendFile("index.html");
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

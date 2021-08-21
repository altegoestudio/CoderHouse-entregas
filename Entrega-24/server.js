const express = require('express');
//const fs = require('fs');
const productos = require('./api/producto');
const mensajes = require('./api/mensaje');
const app = express();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
const cookieParser = require("cookie-parser");
const session = require("express-session");
require('./mongo/connection');
//const rutaMensajes = 'files/mensajes.txt'
//const dbConfig = require("./config/database")
//const knex = require('knex');

const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'id'});
const schemaMensaje = new schema.Entity('post', {author: schemaAuthor},{idAttribute: '_id'});
const schemaMensajes = new schema.Entity('posts',{mensajes: [schemaMensaje]},{idAttribute: 'id'});







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({
  secret: "secreto",
  cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: true
}));

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
    let dataID = {
            id: 'mensajes',
            mensajes : data.map( data => ({...data._doc}))
        }
    let dataIDN = normalize(dataID, schemaMensajes)
    return dataIDN
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


app.get("/get", (req,res)=>{
  res.send(req.cookies);
})
/*
//cookies
app.get("/set", (req,res)=>{
  res.cookie("server", "express").send("Cookie set")
})

app.get("/setEX", (req,res)=>{
  res.cookie("server2", "express2",{maxAge: 30000}).send("Cookie setEX");
})




const auth = (req, res, next) => {
  console.log("auth");
    if (req.session.user) {

        return next();
    } else {
        return res.redirect("/login");
    }
};

app.get("/",auth,(req,res)=>{
  return res.redirect("/login");
})


app.get("/clean",(req,res)=>{
  res.clearCookie("server").send("Cookie Clear")
})

app.get("/set-d",(req,res)=>{
  const {name,value,time} = req.query;
  name && value?
  res.cookie(name, value,{maxAge: time | false}).send("Cookie setEX")
  :
  res.status(500).send('Algo se rompio!');
})


app.get("/sin-session", (req,res)=>{
  let contador = 0;
  res.send({contador: ++contador})
})
*/
app.get("/user", (req,res)=>{
  let name = req.session.user
  console.log(name);
  res.json(name);
})

app.get("/login", (req,res)=>{
  let name = req.query.user
  if (req.query.user) {
    req.session.user = name;
    res.redirect("/")
  }else{
    res.send("<h1>ingrese un nombre de ususario</h1><br/><form><input type='text' name='user'/><input type='submit'/></form>")
  }
})



app.get("/logout", (req,res)=>{
  req.session.destroy(err => {
    if(!err) res.send("<h1>Hasta luego</h1>")
    else res.send(err)
  })
})




const PORT = 8080;


const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


server.on('error', error => {
    console.log('error en el servidor:', error);
});

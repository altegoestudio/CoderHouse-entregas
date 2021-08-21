const express = require('express');
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
const MongoStore = require("connect-mongo");
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
require('./mongo/connection');


const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'id'});
const schemaMensaje = new schema.Entity('post', {author: schemaAuthor},{idAttribute: '_id'});
const schemaMensajes = new schema.Entity('posts',{mensajes: [schemaMensaje]},{idAttribute: 'id'});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://user:admin@cluster0.ftmw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
  }),
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

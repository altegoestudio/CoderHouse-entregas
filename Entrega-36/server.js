//EXPRESS
const express = require("express");
const app = express();
const http = require("http").Server(app);
const Carrito = require('./models/carritoMongo');
require('dotenv').config();


//DEPENDENCIES
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bCrypt = require("bCrypt");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");
const log4js = require("log4js");

//MODELS
const User = require("./models/users");

//DB
//require('./mongo/connection');
require('./mongo/connectionAtlas');


log4js.configure({
  appenders:{
    loggerConsole: {type: "console"},
    loggerFile: {type: "file", filename: "info.log"},
    loggerFile2: {type: "file", filename: "info2.log"}
  },
  categories: {
    default: {appenders: ["loggerConsole"], level: "trace"},
    consola: {appenders: ["loggerConsole"], level: "debug"},
    archivo: {appenders: ["loggerFile"], level: "warn"},
    archivo2: {appenders: ["loggerFile2"], level: "info"},
    todos: {appenders: ["loggerConsole","loggerFile"], level: "error"}
  }
})

const logger = log4js.getLogger();
/*
logger.trace("trace");
logger.debug("debug");
logger.warn("warm");
logger.info("info");
logger.error("error");
*/
const handlebars = require("express-handlebars")
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
//APPS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use((err,req,res,next)=>{  logger.error(err.message);return res.status(500).send("Upss! Algo Salio mal")})

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://user:admin@cluster0.ftmw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
  }),
  secret: "secreto",
  cookie: {httpOnly: false, secure: false, maxAge: 60000},
  rolling: true,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());





const routerUser = require('./router/routeUsuario');
app.use("/", routerUser);

const routerProductos = require('./router/routesProducto');
app.use("/api/productos", routerProductos);

const routerCarrito = require('./router/routesCarrito');
app.use("/api/carrito", routerCarrito);

//SERVER
const PORT = process.env.PORT || 8080;
const server = http.listen(PORT, ()=>{
  logger.info("Servidor corriendo en el puerto:", PORT);
})

server.on("error", (error)=>{
  logger.error("se produjo el siguiente error en el servidor:", error);
})

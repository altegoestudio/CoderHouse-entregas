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
const bodyParser = require("body-parser");
const bCrypt = require("bCrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users")

const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'id'});
const schemaMensaje = new schema.Entity('post', {author: schemaAuthor},{idAttribute: '_id'});
const schemaMensajes = new schema.Entity('posts',{mensajes: [schemaMensaje]},{idAttribute: 'id'});




passport.use("login", new LocalStrategy({passReqToCallback: true},function(req, username, password, done){
//  var usuario = usuarios.find(u => u.username === username);
  console.log(username, password);
    User.findOne({"username": username}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        console.log("User Not Found with username");
        return done(null, false, console.log("no encontrado"))
      }else{
        if(!isValidPassword(user,password)){
          console.log("invalid password or username");
          return done(null, false, console.log("contraseña invalida"))
        }else{
          return done(null, user)
        }
      }
    })
}));





passport.use("singup", new LocalStrategy({
  passReqToCallback: true
}, function (req, username, password, done){
  findOrCreateUSer = function () {
    //let usuario = usuarios.find(u => u.username === username);
    User.findOne({"username": username}, function(err, user){
      if(err){
        return done(err)
      }
      if(user){
        console.log("usuario ya existe");
        return done(null, false, console.log("ya existe"))
      }else{
        var newUser =  new User();

        newUser.username = username
        newUser.password = createHash(password);

        newUser.save(function(err){
          if (err) {
            console.log("saving user");
            throw err;
          }
          console.log("succesfull");
          return done(null, newUser)
        })
      }
    })
  }
  process.nextTick(findOrCreateUSer);
}))

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
}

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser(function(user, done){
  done(null, user.id);
})
passport.deserializeUser(function(id, done){
  //let user = usuarios.find(u => u.id == id);
  User.findById(id,function(err,user){
    done(err,user)
  })
})


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
  cookie: {httpOnly: false, secure: false, maxAge: 6000},
  rolling: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

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

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/login")
  }
}

const routerProductos = require('./router/routesProductos');
app.use("/api/productos",routerProductos);

const routerMensajes = require('./router/routesMensajes');
app.use("/api/mensajes",routerMensajes);



app.get("/", checkAuthentication, (req,res)=>{
  res.redirect("/vistas/index.html")
})

app.get("/vistas/index.html", checkAuthentication, (req,res)=>{
  res.redirect("/vistas/index.html")
})

app.get("/user", (req,res)=>{
  res.json(req.session.user)
})

app.get("/login", (req,res)=>{

  res.redirect("/vistas/login.html")
})

app.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), (req,res)=>{
  req.session.user = req.user.username;
  res.redirect("/")
})

app.get("/faillogin", (req,res)=>{
  res.redirect("/vistas/faillogin.html")
})


app.get("/singup", (req,res)=>{
  res.redirect("/vistas/singup.html")
})
app.post("/singup", passport.authenticate("singup", {failureRedirect: "failsingup"}), (req,res)=>{
  res.send(req.body)
})
app.get("/failsingup", (req,res)=>{
  res.redirect("/vistas/failsingup.html")
})

app.get("/logout", (req,res)=>{
  req.logout();
  res.send("deslogeado")
})

app.get("/datos", checkAuthentication, (req,res)=>{
  res.send("hola")
})





const PORT = 8080;


const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


server.on('error', error => {
    console.log('error en el servidor:', error);
});

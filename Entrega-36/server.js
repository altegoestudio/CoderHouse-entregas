//EXPRESS
const express = require("express");
const app = express();
const http = require("http").Server(app);
const Carrito = require('./models/carritoMongo');



//DEPENDENCIES
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bCrypt = require("bCrypt");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");

//MAILER


//SMS
function sendSms(){
  const accountSid = "AC6375e65c271abc92b47b2a5db9d56c15";
  const authToken = "a259f25815a42b41d66096ee32505d18";

  const client = require("twilio")(accountSid,authToken);

  client.messages.create({
    body: "Hola soy un sms",
    from: "+17143861798",
    to: "+54 11 5369-1720"
  })
  .then(message => console.log(message.sid))
  .catch(console.log)
}


//MODELS
const User = require("./models/users");

//DB
require('./mongo/connection');
//require('./mongo/connectionAtlas');


//////////MAILER CONFIG
const nodemailer = require("nodemailer");

async function sendmail(msj, mail){
let a = await Carrito.find({});



const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "cordie.osinski@ethereal.email",
    pass: "e5QMyhdE2jdGffQnQT"
  }
})

const mailOptions = {
  from: "Servidor Node.js",
  to: mail,
  subject: "Mail de Prueba de Productos",
  html:  `<div>${a}</div>`
}


  transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
      console.log(err);
      return err
    }
    console.log(info);
  })
}

//////////////////////////////////////////////////////////////////////////////////handlebars
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
app.use((err,req,res,next)=>{  console.log(err.message);return res.status(500).send("Upss! Algo Salio mal")})
app.use(cookieParser());

//FUNCTIONS
const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
}

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.render("login")
  }
}
//PASSPORT
passport.serializeUser(function(user, done){
  done(null, user.id);
})
passport.deserializeUser(function(id, done){
  //let user = usuarios.find(u => u.id == id);
  User.findById(id,function(err,user){
    done(err,user)
  })
})

//PASSPORT MW
passport.use("singup", new LocalStrategy({
  passReqToCallback: true
}, function (req, username, password, done){
  findOrCreateUSer = function () {
    User.findOne({"username": username}, function(err, user){
      if(err){
        console.log(err);
        return done(err)
      }
      if(user){
        console.log("usuario ya existe");
        return done(null, false, console.log("ya existe"))
      }else{
        var newUser =  new User();

        newUser.username = username;
        newUser.password = createHash(password);
        newUser.avatar = req.body.avatar;
        newUser.mail = req.body.mail;
        newUser.address = req.body.address;
        newUser.age = req.body.age;
        newUser.phone = req.body.phone;

        newUser.save(function(err){
          if (err) {
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




passport.use("login", new LocalStrategy({passReqToCallback: true},function(req, username, password, done){
    User.findOne({"username": username}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, console.log("no encontrado"))
      }else{
        if(!isValidPassword(user,password)){
          return done(null, false, console.log("contraseña invalida"))
        }else{
          console.log(user);
          return done(null, user)
        }
      }
    })
}));

//ROUTES
let usuario = "Desconocido";

app.get("/", checkAuthentication, (req,res)=>{
  res.render("products", {usuario: usuario})
})

app.get("/singup", (req,res)=>{
  res.render("singup")
})
app.post("/singup", passport.authenticate("singup", {failureRedirect: "failsingup"}), (req,res)=>{

  res.render("Bienvenida")
})
app.get("/failsingup", (req,res)=>{
  res.send("as")
})


app.get("/login", (req,res)=>{
  res.render("login")
})
app.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), (req,res)=>{
  req.session.user = req.user.username;
  usuario = req.session.user
  res.redirect("/")
})
app.get("/faillogin", (req,res)=>{
  res.render("fallo")
})

app.get("/logout", (req,res)=>{
  req.logout();
  res.send("El usuario se ha deslogeado correctamente")
})

app.get("/test", (req,res)=>{

  res.send("El usuario se ha deslogeado correctamente")
})


app.post("/sendmail", (req, res)=>{
  console.log("sendMail",req.body);
  sendmail(req.body, req.user.mail);
  res.send("mensaje enviado")
})

//ROUTER
const routerProductos = require('./router/routesProducto');
app.use("/api/productos", routerProductos);

const routerCarrito = require('./router/routesCarrito');
app.use("/api/carrito", routerCarrito);

//SERVER
const PORT = 8080;
const server = http.listen(PORT, ()=>{
  console.log("Servidor corriendo en el puerto:", PORT);
})

server.on("error", (error)=>{
  console.log("se produjo el siguiente error en el servidor:", error);
})

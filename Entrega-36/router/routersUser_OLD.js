//EXPRESS
const express = require("express");
const app = express();
const http = require("http").Server(app);
const router = express.Router();
const Carrito = require('../models/carritoMongo');

require('../mongo/connection');
//require('../mongo/connectionAtlas');


//DEPENDENCIES
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bCrypt = require("bCrypt");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");
const User = require("../models/users");


//MAILER


//SMS
function sendSms(){
  const accountSid = "AC6375e65c271abc92b47b2a5db9d56c15";
  const authToken = "671fdf1ce96d3d6372aeb757fb1cc0cc";

  const client = require("twilio")(accountSid,authToken);

  client.messages.create({
    body: "Hola soy un sms",
    from: "+17143861798",
    to: "+54 11 5369-1720"
  })
  .then(message => console.log(message.sid))
  .catch(console.log)
}

const nodemailer = require("nodemailer");

function sendmail(msj, mail, asunto){
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
    subject: asunto,
    html:  `<div>${msj}</div>`
  }

  transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
      console.log(err);
      return err
    }
    console.log(info);
  })
}


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

router.get("/", checkAuthentication, (req,res)=>{
  console.log(req.session);
  console.log(req.body);
  res.render("products", {usuario: req.session.user, avatar: req.session.avatar})
})

router.get("/singup", (req,res)=>{
  res.render("singup")
})

router.post("/singup", passport.authenticate("singup", {failureRedirect: "failsingup"}), (req,res)=>{

  var msj = `<p>Nuevo Usuario: ${req.user.username}</p><br><p>Mail: ${req.user.mail}</p><br><p>Foto: <img src="${req.user.avatar}" style="width:100px;height:100px;"></p><br>`;
  sendmail(msj, req.user.mail, "Nuevo registro")
  res.render("Bienvenida")
})

router.get("/failsingup", (req,res)=>{
  res.send("as")
})


router.get("/login", (req,res)=>{
  res.render("login")
})
router.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), (req,res)=>{
  req.session.user = req.user.username;
  req.session.avatar = req.user.avatar;
  req.session.mail = req.user.mail
  usuario = req.session.user
  res.redirect("/")
})
router.get("/faillogin", (req,res)=>{
  res.render("fallo")
})

router.get("/logout", (req,res)=>{
  req.logout();
  res.send("El usuario se ha deslogeado correctamente")
})

router.get("/test", (req,res)=>{

  res.send("El usuario se ha deslogeado correctamente")
})


router.post("/sendmail", async (req, res)=>{
  let a = await Carrito.find({});
  sendmail(a, req.user.mail, "Nuevo Pedido");
  sendSms();
  res.send("mensaje enviado")
})


module.exports = router;

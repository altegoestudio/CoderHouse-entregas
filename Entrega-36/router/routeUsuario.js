//EXPRESS
const express = require("express");
const app = express();
const http = require("http").Server(app);
const router = express.Router();
const Carrito = require('../models/carritoMongo');
require('dotenv').config();
const log4js = require("log4js");


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
  const authToken = "671fdf1ce96d3d6372aeb757fb1cc0cc";

  const client = require("twilio")(accountSid,authToken);

  client.messages.create({
    body: "Hola soy un sms",
    from: "+17143861798",
    to: "+54 11 5369-1720"
  })
  .then(message => logger.trace(message.sid))
  .catch(console.log)
}


//MODELS
const User = require("../models/users");

//DB
//require('./mongo/connection');
require('../mongo/connectionAtlas');


//////////MAILER CONFIG
const nodemailer = require("nodemailer");

function sendmail(msj, mail, asunto){
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
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
      logger.error(err);
      return err
    }
    logger.trace(info);
  })
}



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
        logger.error(err);
        return done(err)
      }
      if(user){
        logger.error("usuario ya existe");
        return done(null, false, logger.error("ya existe"))
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
          logger.trace("succesfull");
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
        return done(null, false, logger.error("no encontrado"))
      }else{
        if(!isValidPassword(user,password)){
          return done(null, false, logger.error("contraseña invalida"))
        }else{
          logger.trace(user);
          return done(null, user)
        }
      }
    })
}));

//ROUTES
let usuario = "Desconocido";

router.get("/", checkAuthentication, (req,res)=>{
  logger.trace(req.session);
  logger.trace(req.body);
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

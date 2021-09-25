const express = require("express");
const router = express.Router();
const productos = require("../api/productos");
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

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.send("no registrado")
  }
}

router.get("/listar", async (req,res)=>{
  let producto = await productos.read()
  res.json(producto)
})

router.get("/listar/:id", async (req,res)=>{
  let producto = await productos.readById(req.params.id)
  res.json(producto)
})

router.post("/guardar", checkAuthentication, async (req,res)=>{
  let producto = await productos.create(req.body)
  res.json(producto)
})

router.put("/actualizar/:id", checkAuthentication, async (req,res)=>{
  let producto = await productos.update(req.params.id, req.body)
  res.json(producto)
})

router.delete("/delete/:id", checkAuthentication, async (req,res)=>{
  let producto = await productos.delete(req.params.id)
  res.json(producto)
})

module.exports = router;

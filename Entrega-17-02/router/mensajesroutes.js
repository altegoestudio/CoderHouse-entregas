const express = require('express');
const router = express.Router();
const dbMensajes = require("../models/mensajes");

router.post("/guardar", async (req,res)=>{
  let mensajesGuardados = await dbMensajes.create(req.body);
  res.json(mensajesGuardados);
})

router.get("/", async (req,res)=>{
  let listaMensajes = await dbMensajes.read();
  res.json(listaMensajes);
})

router.put("/actualizar/:id", async (req,res)=>{
  let mensajeActualizado = await dbMensajes.update(req.params.id, req.body);
  res.json(mensajeActualizado);
})

router.delete("/borrar/:id", async (req,res)=>{
  let mensajeBorrado = await dbMensajes.delete(req.params.id);
  res.json(mensajeBorrado);
})
module.exports = router;

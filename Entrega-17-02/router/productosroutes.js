const express = require('express');
const router = express.Router();
const dbProductos = require("../models/productos");

router.post("/guardar", async (req,res)=>{
  let productoGuardado = await dbProductos.create(req.body);
  res.json(productoGuardado);
})

router.get("/", async (req,res)=>{
  let listaProductos = await dbProductos.read();
  res.json(listaProductos);
})

router.put("/actualizar/:id", async (req,res)=>{
  let productoActualizado = await dbProductos.update(req.params.id, req.body);
  res.json(productoActualizado);
})

router.delete("/borrar/:id", async (req,res)=>{
  let productoBorrado = await dbProductos.delete(req.params.id);
  res.json(productoBorrado);
})
module.exports = router;

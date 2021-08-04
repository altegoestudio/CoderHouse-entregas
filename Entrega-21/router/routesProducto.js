const express = require("express");
const router = express.Router();
const productos = require("../api/productos");

router.get("/listar", async (req,res)=>{
  let producto = await productos.read()
  res.json(producto)
})

router.get("/listar/:id", async (req,res)=>{
  console.log();
  let producto = await productos.readById(req.params.id)
  res.json(producto)
})

router.post("/guardar", async (req,res)=>{
  let producto = await productos.create(req.body)
  res.json(producto)
})

router.put("/actualizar/:id", async (req,res)=>{
  let producto = await productos.update(req.params.id, req.body)
  res.json(producto)
})

router.delete("/delete/:id", async (req,res)=>{
  let producto = await productos.delete(req.params.id)
  res.json(producto)
})

module.exports = router;

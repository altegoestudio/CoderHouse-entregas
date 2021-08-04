const express = require("express");
const router = express.Router();
const carrito = require("../api/carrito");
const productos = require("../api/productos");

router.get("/listar", async (req,res)=>{
  let carritoListar = await carrito.read();
  res.json(carritoListar)
})
router.post("/guardar/:idP", async (req,res)=>{
  let nuevoProducto = await carrito.create(req.params.idP);
  res.json(nuevoProducto)
})
router.get("/listar/:id", async (req,res)=>{
  let carritoListar = await carrito.readById(req.params.id)
  res.json(carritoListar)
})
router.delete("/delete/:id", async (req,res)=>{
  let carritoBorrar = await carrito.delete(req.params.id)
  res.json(carritoBorrar)
})
router.put("/actualizar/:id", async (req,res)=>{
  let producto = await carrito.update(req.params.id, req.body)
  res.json(producto)
})

module.exports = router;

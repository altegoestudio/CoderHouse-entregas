const express = require("express");
const router = express.Router();
const productos = require("../api/productos");

router.get("/listar", (req,res)=>{
  let producto = productos.read()
  res.json(producto)
})

module.exports = router;

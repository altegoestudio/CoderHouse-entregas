const express = require("express");
const router = express.Router();
const carrito = require("../api/carrito");

router.get("/listar", (req,res)=>{
  res.json("lista de carrito")
})

module.exports = router;

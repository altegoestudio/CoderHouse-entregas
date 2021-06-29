const express = require('express');
const router = express.Router();
const productos = require('../api/productos');
const usuario = require('../api/usuario')

function global(req,res,next){
  console.log("global");
  next();
}

router.get('/listar/:id?', (req, res)=>{
  let productobyId = productos.listarId(req.params.id)
  res.json(productobyId)
})

router.post('/agregar', auth, (req, res)=>{
  let productoAgregado = productos.agregar(req.body)
  res.json(productoAgregado)
})

router.put('/actualizar/:id', auth, (req, res)=>{
  let productoActualizado = productos.actualizar(req.params.id, req.body)
  res.json(productoActualizado)
})

router.delete('/borrar/:id', auth, (req, res)=>{
  let productoBorrado = productos.borrar(req.params.id)
  res.json(productoBorrado)
})



function auth( req, res, next){
  if(usuario.logged == true){
    console.log("optional");
    next();
    return
  }
  res.json("Sin permisos, usuario no identificado")
}


router.use((err,req,res,next)=>{
  console.error(err.message);
  res.status(500).send("algo se rompio en productos")
})

module.exports = router;

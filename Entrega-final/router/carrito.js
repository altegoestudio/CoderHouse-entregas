const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');
const usuario = require('../api/usuario')

function global(req,res,next){
  console.log("global");
  next();
}

router.get('/listar', (req, res)=>{
  let listacompleta = carrito.listar()
  res.json(listacompleta)
})

router.get('/listar/:id', (req, res)=>{
  let listarId = carrito.listarId(req.params.id)
  res.json(listarId)
})

router.post('/agregar/:id', auth, (req, res)=>{
  let agregarProducto = carrito.agregar(req.params.id)
  res.json(agregarProducto)
})

router.delete('/borrar/:id', auth, (req, res)=>{
  let productoBorrado = carrito.borrar(req.params.id);
  res.json(productoBorrado);
})


router.use((err,req,res,next)=>{
  console.error(err.message);
  res.status(500).send("algo se rompio en carritos")
})


function auth( req, res, next){
  if(usuario.logged == true){
    console.log("optional");
    next();
    return
  }
  res.json(req)
}


module.exports = router;

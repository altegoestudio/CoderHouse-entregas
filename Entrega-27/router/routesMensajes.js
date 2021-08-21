const express = require('express');
const router = express.Router();
const mensajes = require('../api/mensaje');

router.get('/vista', async (req, res) => {
    let prods = await productos.enlistar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

router.get('/listar', async (req,res)=>{
  let lista = await mensajes.enlistar();
  console.log(lista);
  res.json(lista);
});

router.get('/listar/:id', async (req,res)=>{
  let productoEncontrado = await productos.showProductById(req.params.id);
  res.json(productoEncontrado);
});

router.post('/guardar', async (req,res)=>{
  let mensajesGuardado = await mensajes.guardar(req.body)
  res.json("producto Guardaro");
});

router.put('/actualizar/:id', async (req,res)=>{
  let productoActualizado = await productos.actualizar(req.params.id, req.body);
  console.log(productoActualizado);
  res.send("producto actualizado");
})

router.delete('/borrar/:id', async (req,res)=>{
  let productoBorrado = await productos.borrar(req.params.id)
  res.send("producto borrado");
})

router.use((err,req,res,next)=>{
  console.error(err.message);
  res.status(500).send("algo se rompio")
})


module.exports = router;

const express = require('express');
const router = express.Router();
const productos = require('../api/producto');

router.get('/vista', (req, res) => {
    let prods = productos.enlistar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

router.get('/listar',(req,res)=>{
  let lista = productos.enlistar();
  res.json(lista);
});

router.get('/listar/:id',(req,res)=>{
  let productoEncontrado = productos.showProductById(req.params.id);
  res.json(productoEncontrado);
});

router.post('/guardar',(req,res)=>{
  let productoGuardado = productos.guardar(req.body)
  res.redirect('/api/productos/listar')
});

router.put('/actualizar/:id',(req,res)=>{
  let productoActualizado = productos.actualizar(req.params.id, req.body);
  res.send(productoActualizado);
})

router.delete('/borrar/:id',(req,res)=>{
  let productoBorrado = productos.borrar(req.params.id)
  res.send(productoBorrado);
})

router.use((err,req,res,next)=>{
  console.error(err.message);
  res.status(500).send("algo se rompio")
})


module.exports = router;

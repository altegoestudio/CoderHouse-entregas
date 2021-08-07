const express = require('express');
const router = express.Router();
const productos = require('../api/producto');
const faker = require("faker");



router.get('/vista', async (req, res) => {
    let prods = await productos.enlistar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

router.get('/vista-test', async (req, res) => {
  console.log(req.query.cant);
    let cant = req.query.cant || 10;
    var prodList = [];

    for (var i = 0; i < cant; i++) {
      var prods = {
          title: faker.commerce.product(),
          price: faker.commerce.price(),
          thumbnail: faker.image.cats()
        };
        prodList.push(prods);
    }
    res.render('lista', { productos: prodList, hayProductos: prodList.length });
});

router.get('/listar', async (req,res)=>{
  let lista = await productos.enlistar();
  console.log(lista);
  res.json(lista);
});

router.get('/listar/:id', async (req,res)=>{
  let productoEncontrado = await productos.showProductById(req.params.id);
  res.json(productoEncontrado);
});

router.post('/guardar', async (req,res)=>{
  let productoGuardado = await productos.guardar(req.body)
  res.redirect('/api/productos/listar')
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

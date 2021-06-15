const express = require("express");
const productos =  require('../api/productos');
const router = express.Router();


router.get('/listar',(req,res)=>{
  let lista = productos.enlistar();
  if(typeof lista != "string"){
    res.render('list', { productos: lista, hayProductos: true , titulo: "todos los productos"});
  }else{
    res.render('list', { hayProductos: false , titulo: "todos los productos"});
  }

});

router.get('/listar/:id',(req,res)=>{
  let productoEncontrado = productos.showProductById(req.params.id);

  if(typeof lista != "string"){
    res.render('list', { productos: productoEncontrado, hayProductos: true, titulo: "producto seleccionado"});
  }else{
    res.render('list', { hayProductos: false , titulo: "producto seleccionado"});
  }
});

router.post('/guardar',(req,res)=>{
  let productoGuardado = productos.guardar(req.body)
  //res.send(productoGuardado);
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

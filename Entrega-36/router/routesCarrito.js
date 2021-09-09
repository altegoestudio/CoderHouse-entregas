const express = require("express");
const router = express.Router();
const carrito = require("../api/carrito");
const productos = require("../api/productos");
const nodemailer = require("nodemailer");


function sendmail(msj){

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "cordie.osinski@ethereal.email",
    pass: "e5QMyhdE2jdGffQnQT"
  }
})

const mailOptions = {
  from: "Servidor Node.js",
  to: "cordie.osinski@ethereal.email",
  subject: "Mail de Prueba de Productos",
  html:  `<div>${msj}</div>`
}

transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
      console.log(err);
      return err
    }
    console.log(info);
  })
}

router.get("/listar", async (req,res)=>{
  let carritoListar = await carrito.read();
  res.json(carritoListar)
})
router.get("/mail", async (req,res)=>{
  let carritoListar = await carrito.read();
  let carr = []
  for (var i = 0; i < carritoListar.length; i++) {
    var a = `<p>${carritoListar[i].product.title} - ${carritoListar[i].product.price}</p>`
    carr.push(a)
  }
  console.log( carr);
  sendmail(carr.join(" - "))
  res.json(carr.join(" - "))
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

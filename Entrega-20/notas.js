//en mongoose se crean un squema y un modelo.
//npm init -y
//npm i mongoose
//Creamos el modelo
//config de coexion
//


/////usuarios.js
// importo lo libreria
const mongoose = require("mongoose");
//creo un schema
const schema = mongoose.Schema({
  nombre: {type: String, required: true, max: 100},
  apellido: {type: String, required: true, max: 100},
  email: {type: String, required: true, max: 100, unique: true},
  usuario: {type: String, required: true, max: 100},
  password: {type: Number, required: true},
})

// {strict: false}
//creo un modelo
const Usuario = mongoose.model("usuarios", schema);

module. exports = Usuario

/////index.js

const mongoose = require("mongoose");
const ususario = require("usuario.js");
const db = "mongodb://localhost:27017/usuarios"

async function create(){
  let result;

  //conecto a db
  await mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true});

  const data = {
    nombre: "Juan",
    apellido: "Perez",
    email: "juanperez@hotmail.com",
    usuario: "jperez",
    password: 1234
  }

  let usuarioGuardado = await usuario.create(data);

  result = await usuario.findById("_idexapple")
  console.log(result);

  result = await usuario.find()
  console.log(result);//todos los usuarios de la db;

  result = await usuario.find({nonmbre: "Juan"})
  console.log(result);//todos los usuarios que concidan;

  result = await usuario.findOne()
  console.log(result);//un ususario que coincida;

  //UPDATE
  result = await usuario.findOne({nonmbre: "Juan"}))
  result.password = 4321
  result = await result.save();

  await usuario.updateOne({nombre: "emanuel"}, {$set: {password: 132}})ç

  //DELETE
  result = await ususario.deleteMany({nombre: "emanuel"})
  result = await ususario.deleteOne({nombre: "emanuel"})
  result = await ususario.findByIdandDelete({_id: "asdfsaewasad"})
  result = await ususario.deleteMany({edad: {$lte: 18}})

  process.exit(0)
}

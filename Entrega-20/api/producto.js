
const Mongoose = require("../db/mongoProductos.js")

class Productos {
  constructor() {

  }
  async enlistar(){
    try{
      return await Mongoose.read();
    }catch(error){
      throw error
    }
  }
  async showProductById(id){
    try{
      return await Mongoose.read(id);
    }catch(error){
      throw error
    }
  }
  async guardar(data){
    try{
      return await Mongoose.create(data)
    }catch(error){
      throw error
    }
  }
  async actualizar(id,data){
    try{
      return await Mongoose.update(id,data)
    }catch(error){
      throw error
    }
  }
  async borrar(id){
    try{
      return await Mongoose.delete(id)
    }catch(error){
      throw error
    }
  }
}


module.exports = new Productos();

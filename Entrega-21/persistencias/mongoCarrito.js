const Carrito = require('../models/carritoMongo');

class Mongoose{
  constructor(){

  }
  async read(tabla){
    return await Carrito.find({});
  }
  async readById(tabla, id){

    return await Carrito.findById(id);
  }
  async create(tabla, data){
    return await Carrito.create(data);
  }
  async update(tabla,id,data){
    
    return await Carrito.findByIdAndUpdate(id, data);
  }
  async delete(tabla, id){
    return await Carrito.findByIdAndDelete(id);
  }
}

module.exports = new Mongoose

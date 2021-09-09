const Productos = require('../models/productosMongo');

class Mongoose{
  constructor(){

  }
  async read(tabla){
    return await Productos.find({});
  }
  async readById(tabla, id){
    return await Productos.findById(id);
  }
  async create(tabla, data){
    return await Productos.create(data);
  }
  async update(tabla,id,data){
    return await Productos.findByIdAndUpdate(id, data);
  }
  async delete(tabla, id){
    return await Productos.findByIdAndDelete(id);
  }
}

module.exports = new Mongoose

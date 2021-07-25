const Productos = require('../models/productosMongo');

class Mongoose{
  constructor(){

  }
  async read(){
    return await Productos.find({});
  }
  async readById(id){
    return await Productos.findById(id);
  }
  async create(data){
    return await Productos.create(data);
  }
  async update(id,data){
    return await Productos.findByIdAndUpdate(id, data);
  }
  async delete(tabla, id){
    return await Productos.findByIdAndDelete(id);
  }
}

module.exports = new Mongoose

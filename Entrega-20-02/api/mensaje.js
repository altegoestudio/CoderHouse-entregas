
const Mongoose = require("../db/mongoMensajes.js")

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
  async guardar(data){
    try{
      return await Mongoose.create(data)
    }catch(error){
      throw error
    }
  }
}


module.exports = new Productos();

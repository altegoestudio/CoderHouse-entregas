const Mensajes = require('../models/mensajesMongo');

class Mongoose{
  constructor(){

  }
  async read(){
    return await Mensajes.find({});
  }
  async create(data){
    return await Mensajes.create(data);
  }
}

module.exports = new Mongoose

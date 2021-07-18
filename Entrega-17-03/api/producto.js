const options = require('../config/database.js');
const knex = require('knex')(options);

class Productos {
  constructor() {
      this.lista = [],
      this.count = 1
  }
  async enlistar(){
    try{
      let producto = await knex("productos").select('*');
      return producto;
    }catch(error){
      throw error
    }
  }
  async showProductById(id){
    try{
      let producto = await knex("productos").where('id', parseInt(id))
      return producto;
    }catch(error){
      throw error
    }
  }
  async guardar(data){
    try{
      let producto = await knex("productos").insert(data)
      return producto
    }catch(error){
      throw error
    }
  }
  async actualizar(id,data){
    try{
      let producto = await knex("productos").where('id', parseInt(id)).update({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail
      })
      return producto
    }catch(error){
      throw error
    }
  }
  async borrar(id){
    try{
      let producto = await knex("productos").where('id', parseInt(id)).del()
      return producto
    }catch(error){
      throw error
    }
  }
}


module.exports = new Productos();

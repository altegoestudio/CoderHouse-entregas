const options = require('../config/sqlite3.js');
const knex = require('knex')(options);

class Productos {
  constructor() {
      this.lista = [],
      this.count = 1
  }
  async enlistar(){
    try{
      let producto = await knex("mensajes").select('*');
      return producto;
    }catch(error){
      throw error
    }
  }
  async showProductById(id){
    try{
      let producto = await knex("mensajes").where('id', parseInt(id))
      return producto;
    }catch(error){
      throw error
    }
  }
  async guardar(data){
    try{
      let producto = await knex("mensajes").insert(data)
      return producto
    }catch(error){
      throw error
    }
  }
  async actualizar(id,data){
    try{
      let producto = await knex("mensajes").where('id', parseInt(id)).update({
        author: data.author,
        text: data.text
      })
      return producto
    }catch(error){
      throw error
    }
  }
  async borrar(id){
    try{
      let producto = await knex("mensajes").where('id', parseInt(id)).del()
      return producto
    }catch(error){
      throw error
    }
  }
}


module.exports = new Productos();

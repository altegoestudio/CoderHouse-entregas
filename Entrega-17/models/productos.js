const options = require('../config/database.js');
const knex = require('knex')(options);


class Productos{
  constructor(){

  }
  async create(producto){
    try{
      let producto = await knex("productos").insert(producto)
      return producto
    }catch(error){
      throw error
    }
  }
  async read(id,producto){
    try{
      let producto = await knex("productos").where('id', parseInt(id)).update({
        nombre: producto.nombre,
      })
      return producto
    }catch(error){
      throw error
    }
  }
  async update(id,producto){
    try{
      let producto = await knex("productos").where('id', parseInt(id)).update({
        nombre: producto.nombre,
      })
      return producto
    }catch(error){
      throw error
    }
  }
}

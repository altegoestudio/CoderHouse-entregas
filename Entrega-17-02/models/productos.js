const options = require('../config/database.js');
const knex = require('knex')(options);


class Productos{
  constructor(){
    this.null = "hola";
  }
  async create(data){
    try{
      let producto = await knex("productos").insert(data)
      return producto
    }catch(error){
      throw error
    }
  }
  async read(){
    try{
      let producto = await knex("productos").select('*');
      return producto
    }catch(error){
      throw error
    }
  }
  async update(id,data){
    try{
      let producto = await knex("productos").where('id', parseInt(id)).update({
        name: data.name,
        lastname: data.lastname
      })
      return producto
    }catch(error){
      throw error
    }
  }
  async delete(id){
    try{
      let producto = await knex.from('productos').where('id', parseInt(id)).del()
      return producto
    }catch(error){
      throw error
    }
  }
}

module.exports = new Productos()

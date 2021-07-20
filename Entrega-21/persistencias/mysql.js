const options = require('../config/mysql.js');
const knex = require('knex')(options);

class Mysql{
  constructor(){

  }
  async read(){
    try{
      let producto = await knex("productos").select('*');
      return producto;
    }catch(error){
      throw error
    }
  }
  async readById(id){
    try{
      let producto = await knex("productos").where('id', parseInt(id))
      return producto;
    }catch(error){
      throw error
    }
  }
  async create(data){
    try{
      let producto = await knex("productos").insert(data)
      return producto
    }catch(error){
      throw error
    }
  }
  async update(id,data){
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
  async delete(id){
    try{
      let producto = await knex("productos").where('id', parseInt(id)).del()
      return producto
    }catch(error){
      throw error
    }
  }
}

module.exports = new Mysql

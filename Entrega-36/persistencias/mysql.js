const options = require('../config/mysql.js');
const knex = require('knex')(options);

class Mysql{
  constructor(){

  }
  async read(tabla){
    try{
      let obj = await knex(tabla).select('*');
      return obj;
    }catch(error){
      throw error
    }
  }
  async readById(tabla, id){
    try{
      let obj = await knex(tabla).where('id', parseInt(id))
      return obj;
    }catch(error){
      throw error
    }
  }
  async create(tabla, data){
    try{
      console.log("d:",data);
      let obj = await knex("productos").insert(data)
      return obj
    }catch(error){
      throw error
    }
  }
  async update(tabla,id,data){
    try{
      let obj = await knex(tabla).where('id', parseInt(id)).update({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail
      })
      return obj
    }catch(error){
      throw error
    }
  }
  async delete(tabla, id){
    try{
      let obj = await knex(tabla).where('id', parseInt(id)).del()
      return obj
    }catch(error){
      throw error
    }
  }
}

module.exports = new Mysql

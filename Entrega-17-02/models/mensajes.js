const options = require('../config/database.js');
const knex = require('knex')(options);


class Mensajes{
  constructor(){
    this.null = "mensajes";
  }
  async create(data){
    try{
      let mensaje = await knex("mensajes").insert(data)
      return mensaje
    }catch(error){
      throw error
    }
  }
  async read(){
    try{
      let mensaje = await knex("mensajes").select('*');
      return mensaje
    }catch(error){
      throw error
    }
  }
  async update(id,data){
    try{
      let mensaje = await knex("mensajes").where('id', parseInt(id)).update({
        name: data.name,
        email: data.email
      })
      return mensaje
    }catch(error){
      throw error
    }
  }
  async delete(id){
    try{
      let mensaje = await knex.from('mensajes').where('id', parseInt(id)).del()
      return mensaje
    }catch(error){
      throw error
    }
  }
}

module.exports = new Mensajes()

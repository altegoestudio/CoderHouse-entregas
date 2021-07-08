const options = require('../config/sqlite3.js');
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
      console.log("entro");
      // let mensaje = await knex("mensajes").select('*');
      let mensaje = await knex.from('mensajes').select('*')
      console.log(mensaje);
      return mensaje
    }catch(error){
      console.log(error);
      throw error
    }finally{
      console.log("salio");
      await knex.destroy()
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
  async init() {
      try {
        await knex.schema.createTable("mensajes", table =>{
          table.string("name");
          table.string("email");
        })
        await knex("mensajes").insert({name: "pavlo",email:"hola"})
      } catch (error) {
          console.log(error);
      } finally {
        console.log("finalizo");
          knex.destroy();
      }
  }

}

module.exports = new Mensajes()

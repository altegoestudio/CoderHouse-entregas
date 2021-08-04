let config = require("../config/dbconfig.json");
var persitencia = config.mysql;
const db = require(`../persistencias/${persitencia}Carrito`)
const dbp = require(`../persistencias/${persitencia}`)


class Carrito{
  constructor(){

  }
  async create(id){
      let nuevoCarrito = {
        timestamp: "14:21",
        product: await dbp.readById("productos", id)
      }
      return await db.create("carrito",nuevoCarrito)
  }
  async read(){
    let a = await db.read("carrito");
    return a
  }
  async readById(id){
    return db.readById("carrito", id);
  }
  async update(id, data){
    return db.update("carrito", id, data);
  }
  async delete(id){
    return db.delete("carrito",id);
  }
}

module.exports = new Carrito

let config = require("../config/dbconfig.json");
var persitencia = config.mysql;
const db = require(`../persistencias/${persitencia}`)


class Productos{
  constructor(){

  }
  async create(data){
    var nuevoProducto = data
    let a = await db.create("productos", nuevoProducto);
    return a
  }
  async read(){
    let a = await db.read("productos");
    return a
  }
  async readById(id){
    return db.readById("productos", id);
  }
  async update(id, data){
    return db.update("productos", id, data);
  }
  async delete(id){
    return db.delete("productos",id);
  }
}

module.exports = new Productos

let config = require("../config/dbconfig.json");
var persitencia = config.mysql;
const db = require(`../persistencias/${persitencia}`)

class Productos{
  constructor(){

  }
  create(){
    return db.create();
  }
  read(){
    return db.read();
  }
  readById(){
    return db.readById();
  }
  update(){
    return db.update();
  }
  delete(){
    return db.delete();
  }
}

module.exports = new Productos

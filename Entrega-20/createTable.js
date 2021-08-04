const options1 =  require('./config/database');
const knex = require('knex')(options1);
const options2 =  require('./config/sqlite3');
const knex2 = require('knex')(options2);


//creo tabla mysql
knex.schema.createTable('productos', table =>{
  table.increments("id");
  table.string("title");
  table.integer("price");
  table.string("thumbnail")
}).then(()=>{
  console.log("se creo");
}).catch((error)=>{
  console.log(error);
  throw error;
}).finally(()=>{
  console.log("se cerro");
  knex.destroy();
})

//creo tabla Sqlite3
knex2.schema.createTable('mensajes', table =>{
  table.increments("id");
  table.string("author");
  table.string("text")
}).then(()=>{
  console.log("se creo");
}).catch((error)=>{
  console.log(error);
  throw error;
}).finally(()=>{
  console.log("se cerro");
  knex2.destroy();
})

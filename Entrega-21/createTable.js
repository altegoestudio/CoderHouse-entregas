const options1 =  require('./config/mysql');
const knex = require('knex')(options1);




knex.schema.createTable('productos', table =>{
  table.increments("id");
  table.string("title");
  table.integer("price");
  table.string("thumbnail");
}).then(()=>{
  console.log("se creo tabla productos");
}).catch((error)=>{
  console.log(error);
  throw error;
}).finally(()=>{
  console.log("se cerro");
  knex.destroy();
})


knex.schema.createTable('carrito', table =>{
  table.increments("id");
  table.string("timestamp");
  table.string("product");
}).then(()=>{
  console.log("se creo tabla carrito");
}).catch((error)=>{
  console.log(error);
  throw error;
}).finally(()=>{
  console.log("se cerro");
  knex.destroy();
})

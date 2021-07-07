const options = require("./config/database.js");
const knex = require("knex")(options);

knex.schema.createTable("cars", table => {
  table.increments('id');
  table.string("name");
  table.integer("price");
}).then(()=>{
  console.log("tabla cars creada con exito");
}).catch(error =>{
  console.log("error: ", error);
  throw error
}).finnaly(()=>{
  console.log("se cerro la conexion");
  knex.destroy();
})

const cars = [
  {name: "audi prueba", price: 52000},
  {name: "audi prueba", price: 52000},
  {name: "audi prueba", price: 52000},
  {name: "audi prueba", price: 52.000},
  {name: "audi prueba", price: 52000},
  {name: "audi prueba", price: 52000},
  {name: "audi prueba", price: 52000},
  {name: "audi prueba", price: 52000},
  {name: "audi prueba", price: 52000},
]

knex('cars').insert(cars)
.then(()=>{
  console.log("autos agregados");
}).catch(error =>{
  console.log(error);
  throw error;
}).finally(()=>{
  knex.destroy();
})

knex.from('cars').select(*)
then(rows=>{
  for(row of rows){
   console.log(+++******);
  }
})

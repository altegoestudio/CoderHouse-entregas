const knex = require(" ");

knex.schema.createTable("productos", table =>{
  table.increments("id");
  table.string("nombre");
  table.string("descripcion");
  table.integer("codigo");
  table.string("foto");
  table.integer("stock");
  table.timestamp("fecha", {useTz; true}).notNullable().defaultTo(knex.fn.now());
}).then( () => {
  console.log("table productos creada!");
}).catch(error => {
  console.log("error: ", error);
  throw error;
}).finally(()=>{
  console.log("cerrando conexion...");
  precess.exit(0);
})


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

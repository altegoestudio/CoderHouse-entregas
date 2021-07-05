const productos = require('./productos');
const fs = require("fs")

class Carrito {
  constructor() {
      this.lista = [],
      this.count = 0
  }
  listar(){
    return this.lista
  }
  listarId(id){
    var index = this.lista.findIndex(a => a.id == id);
    if(index != -1){
      var result = this.lista.filter(a => a.id == id);
      return result
    }else{
      return "no se encontro el producto";
    }
  }
  agregar(productoId){
    var index = productos.lista.findIndex(a => a.id == productoId)
    if(index != -1){
      var resultado2 = productos.lista[index];
      var carritonuevo = {
        id: this.count,
        timestamp: Date.now(),
        producto: resultado2
      }
      this.count++;
      this.lista.push(carritonuevo);
      this.persistir()
      return resultado2
    }else{
      return "no se encontro producto"
    }
  }
  borrar(id){
    var productoBorrado = this.lista.filter(a => a.id == id);
    var index = this.lista.findIndex(a => a.id == id);

    if(index != -1){
      this.lista.splice(index,1);
      this.persistir()
      return productoBorrado
    }else{
      return "no se encontro producto para borrar";
    }
  }
  async persistir(){
    await fs.promises.writeFile("./persistencia/carrito.txt", JSON.stringify(this.lista))
    await fs.promises.writeFile("./persistencia/carritoCount.txt", JSON.stringify( {count: this.count} ))
    return true
  }
}


module.exports = new Carrito();

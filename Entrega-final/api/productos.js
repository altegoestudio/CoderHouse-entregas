const fs = require("fs")

class Productos {
  constructor() {
      this.lista = [],
      this.count = 1
  }
  listar(){
    if(this.lista.length > 0 || true){
      return this.lista;
    }else{
      return "no se encontraron productos";
    }
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
  agregar(producto){
    let nuevoProducto = producto;
    nuevoProducto.timestamp = Date.now();
    nuevoProducto.id = this.count;
    this.count++;
    this.lista.push(nuevoProducto);
    this.persistir();
    return nuevoProducto
  }
  actualizar(id,info){
    var index = this.lista.findIndex(a => a.id == id);

    if(index != -1){
      var updated = Object.assign(this.lista[index], info)
      this.lista[index].timestamp = Date.now();
      this.persistir();
      return this.lista[index];
    }else{
      return "no se encontro producto para actualizar";
    }
  }
  borrar(id){
    var productoBorrado = this.lista.filter(a => a.id == id);
    var index = this.lista.findIndex(a => a.id == id);

    if(index != -1){
      this.lista.splice(index,1);
      this.persistir();
      return productoBorrado
    }else{
      return "no se encontro producto para borrar";
    }
  }
  async persistir(){
    await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(this.lista))
    await fs.promises.writeFile("./persistencia/productosCount.txt", JSON.stringify( {count: this.count} ))
    return true
  }
}


module.exports = new Productos();

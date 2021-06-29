class Productos {
  constructor() {
      this.lista = [
        {
          id: 0,
          timestamp: "test",
          nombre: "Producto de prueba",
          descripcion: "este es un producto de prueba",
          codigo: 1414,
          fotoUrl: "http://",
          precio: 123.12,
          stock: 5
        }
      ],
      this.count = 1
  }
  listar(){
    if(this.lista.length > 0){
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
    let nuevoProducto = producto
    nuevoProducto.id = this.count;
    this.count++;
    this.lista.push(nuevoProducto);
    return nuevoProducto
  }
  actualizar(id,info){
    var index = this.lista.findIndex(a => a.id == id);

    if(index != -1){
      var updated = Object.assign(this.lista[index], info)
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
      return productoBorrado
    }else{
      return "no se encontro producto para borrar";
    }
  }
}


module.exports = new Productos();

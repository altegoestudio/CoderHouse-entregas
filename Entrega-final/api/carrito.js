const productos = require('./productos');

class Carrito {
  constructor() {
      this.lista = [
        {
          id: 4,
          timestamp: "test",
          nombre: "Producto de carrito de prueba",
          descripcion: "este es un producto de prueba",
          codigo: 1414,
          fotoUrl: "http://",
          precio: 123.12,
          stock: 5
        }
      ]
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
      var resultado2 = productos.lista[index]
      this.lista.push(resultado2);
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
      return productoBorrado
    }else{
      return "no se encontro producto para borrar";
    }
  }
}


module.exports = new Carrito();

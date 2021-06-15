class Productos {
  constructor() {
      this.lista = [],
      this.count = 1
  }
  enlistar(){
    if(this.lista.length > 0){
      return this.lista;
    }else{
      return "no se encontraron productos";
    }
  }
  showProductById(id){
    var index = this.lista.findIndex(a => a.id == id);
    if(index != -1){
      var result = this.lista.filter(a => a.id == id);
      return result
    }else{
      return "no se encontro el producto";
    }
  }
  guardar(producto){
    let nuevoProducto = producto
    nuevoProducto.id = this.count;
    this.count++;
    this.lista.push(nuevoProducto);
    return nuevoProducto
  }
  actualizar(id,info){
    var index = this.lista.findIndex(a => a.id == id);

    if(index != -1){
      var {title,price,thumbnail} = info;
      this.lista[index].title = title;
      this.lista[index].price = price;
      this.lista[index].thumbnail = thumbnail;
      return this.lista[index];
    }else{
      return "no se encontro producto para actualizar";
    }
  }
  actualizar2(id,info){
    var producto = this.productos.map(a =>{
      if(p.id  = id){
        p =  Object.assign(p, info);
        return p
      }else{
        return p
      }
    })
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

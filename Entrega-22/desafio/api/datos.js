class Datos{
  constructor(){
    this.nombres = ["Luis","Lucia","Juan","Augusto","Ana"];
    this.apellidos = ["Pieres","Cacurri","Bezzola", "Alberca", "Mei"];
    this.colores = ["Rojo","Verde","Azul","Amarillo","Magenta"];
    this.personas = [];
  }
  armar(){
    var persona = {
      nombre: this.nombres[Math.floor(Math.random()*this.nombres.length)],
      apellido: this.apellidos[Math.floor(Math.random()*this.apellidos.length)],
      colores: this.colores[Math.floor(Math.random()*this.colores.length)]
    }
    return persona
  }
  generar(num){
    for (var i = 0; i < num; i++) {
      var persona = this.armar();
      this.personas.push(persona)
    }
  }
}


module.exports = new Datos();

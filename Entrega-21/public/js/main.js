console.log("hola desde el Front");
var prodlist = document.getElementById('productList');
var lista =[

]


function getProductos(){
  fetch('/api/productos/listar')
  .then(respuesta => respuesta.json())
  .then(data => {
      tamplate(data);

  })
  .catch(error => {
      console.log('ERROR', error);
  });
}

getProductos();

function print(){
  prodlist.innerHTML = lista
}

function tamplate(data){
  data.map(producto => {
    var card = `<h1>${producto.title}</h1>`;
    lista.push(card)
  })
  print()
}

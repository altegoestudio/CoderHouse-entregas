var prodlist = document.getElementById('productList');
var carlist = document.getElementById('carList');
var ckout = document.getElementById("Checkout");

var lista =[];
var carrito = [];


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

function getCarrito(){
  fetch('/api/carrito/listar')
  .then(respuesta => respuesta.json())
  .then(data => {
      tamplateCarrito(data);
  })
  .catch(error => {
      console.log('ERROR', error);
  });
}
getCarrito();

function print(e,a){
  e.innerHTML = a
}

function tamplate(data){
  data.map(producto => {
    var card = `<div class="card" id="${producto._id}">
                  <a href="#" onclick="return deleteP(this)">Eliminar</a>
                  <img class="card-img"src="./jpg/1.png" alt="">
                  <h1 class="card-title">${producto.title}</h1>
                  <p class="card-price">$${producto.price}</p>
                  <a href="#" onclick="return addToCart(this)" ">Agregar a carrito</a>
                </div>`;
    lista.push(card)
  })
  print(prodlist, lista)
}

function tamplateCarrito(data){
  data.map(producto => {
    var card = `<div>${producto.product.title} - <em>$${producto.product.price}</em></div><br/>
                <a id="${producto._id}" href="#" onclick="return deleteC(this)">Eliminar</a><hr/>`;
    carrito.push(card)
  })
  print(carlist,carrito)
}


function deleteP(e){
  fetch(`/api/productos/delete/${e.parentNode.id}`, {
      headers: {
          'Content-Type': 'application/json'
      },
      method: "DELETE"
  })
  .then(respuesta => respuesta.json())
  .then(productos => {
      //form.reset();
      //socket.emit('update', 'ok');
  })
  .catch(error => {
      console.log('ERROR', error);
  });

}

function deleteC(e){
  fetch(`/api/carrito/delete/${e.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: "DELETE"
  })
  .then(respuesta => respuesta.json())
  .then(productos => {
      carrito = [];
      getCarrito();
  })
  .catch(error => {
      console.log('ERROR', error);
  });
}

function addToCart(e){
  fetch(`/api/carrito/guardar/${e.parentNode.id}`, {
      headers: {
          'Content-Type': 'application/json'
      },
      method: "POST"
  })
  .then(respuesta => respuesta.json())
  .then(productos => {
      carrito = [];
      getCarrito()
      //form.reset();
      //socket.emit('update', 'ok');
  })
  .catch(error => {
      console.log('ERROR', error);
  });

}

const form = document.getElementById('form-productos');
if(form){
  form.addEventListener('submit', event => {
      event.preventDefault();

      const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };
      console.log(data);
      fetch('/api/productos/guardar', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(data)
      })
      .then(respuesta => respuesta.json())
      .then(productos => {
          form.reset();
          //socket.emit('update', 'ok');
      })
      .catch(error => {
          console.log('ERROR', error);
      });
  });
}

if(ckout){
  ckout.addEventListener("click", evento =>{
    event.preventDefault();
    console.log(evento.target);
    fetch('/sendMail', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(evento.target)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        //socket.emit('update', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
  })
}

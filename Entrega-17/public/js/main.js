const socket = io.connect();


socket.on('productos', function (productos) {
    console.log('productos socket client')
    document.getElementById('datos').innerHTML = data2TableHBS(productos)
});

const form = document.getElementById('form-productos');

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
        socket.emit('update', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});


function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    console.log(productos);
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}

function render(data){

  var html = data.map( (elem, index)=> {
    return (`<div>
          <strong>${elem.author}</strong>
          <em>${elem.text}</em>
        </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML = html
}

socket.on("messages",  async (data) => {
  console.log("emit a:" + data);
  await render(data)
})

function addMessage(e) {
  console.log("addMessage");
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = '';
    document.getElementById('texto').focus();

    return false;
}

chat.addEventListener("input", function(){
  if(username.value.length > 3 && texto.value.length > 3){
    boton.disabled = false
  }else{
    boton.disabled = true
  }
})

const express = require("express");
const app = express();
const http = requiere("http").Server(app);
const PORT = 8080;
const api = require("./api/datos.js")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
})


app.get('/test',(req,res)=>{
  var personas = api.generar(10)
  res.json(console.log(personas));
});



const server = http.listen(PORT, ()=>{
  console.log("servidor escuchando");
})

serer.on("error", error =>{
  console.log(error);
})

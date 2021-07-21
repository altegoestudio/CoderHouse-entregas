
const mongoose = require('mongoose');
const url = "mongodb+srv://user:admin@cluster0.ftmw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Conectado a:', url);
});

mongoose.connection.on('error', (err) => {
    console.log('Error:', err);
});

module.exports = connection;

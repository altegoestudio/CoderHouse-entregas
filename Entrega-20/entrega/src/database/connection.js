
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/ecommerce";

const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Conectado a:', url);
});

mongoose.connection.on('error', (err) => {
    console.log('Error:', err);
});

module.exports = connection;

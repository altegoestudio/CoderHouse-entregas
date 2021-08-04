const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp: { type: String, require: true, max: 400 },
    product: { type: String, require: true, max: 100 }
});

const Carrito = mongoose.model('carritos', schema);

module.exports = Carrito;

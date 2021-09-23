const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp: { type: String, required: true, max: 400 },
    product: { type: Object, required: true, max: 100 }
});

const Carrito = mongoose.model('carritos', schema);

module.exports = Carrito;

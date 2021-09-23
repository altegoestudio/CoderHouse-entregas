const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, required: true, max: 400 },
    price: { type: Number, required: true, max: 9999 },
    thumbnail: { type: String, required: true, max: 4000 },
});

const Productos = mongoose.model('productos', schema);

module.exports = Productos;

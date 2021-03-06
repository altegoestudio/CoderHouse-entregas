const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, require: true, max: 400 },
    price: { type: Number, require: true, max: 9999 },
    thumbnail: { type: String, require: true, max: 4000 },

});

const Productos = mongoose.model('productos', schema);

module.exports = Productos;

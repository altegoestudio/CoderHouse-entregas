const mongoose = require('mongoose');

const schema = mongoose.Schema({
    author: { type: String, require: true, max: 400 },
    text: { type: String, require: true, max: 100 }
});

const Mensajes = mongoose.model('mensajes', schema);

module.exports = Mensajes;

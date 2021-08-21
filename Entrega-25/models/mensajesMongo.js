const mongoose = require('mongoose');
/*
const schema = mongoose.Schema({
    id: { type: String, require: true, max: 400 },
    author: { type: String, require: true, max: 400 },
    lastname: { type: String, require: true, max: 400 },
    age: { type: String, require: true, max: 400 },
    nickname: { type: String, require: true, max: 400 },
    avatar: { type: String, require: true, max: 400 },
    text: { type: String, require: true, max: 100 }
});
*/
const schema = mongoose.Schema({
    author: { type: Object, require: true, max: 400 },
    text: { type: String, require: true, max: 100 },
    fyh: { type: String, require: false, max: 100 }
});

const Mensajes = mongoose.model('mensajes', schema);

module.exports = Mensajes;

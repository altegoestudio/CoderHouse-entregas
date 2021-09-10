var mongoose = require('mongoose');

module.exports = mongoose.model('Users',{
    username: String,
    password: String,
    avatar: String,
    mail: String,
    address: String,
    age: Number,
    phone: Number
});

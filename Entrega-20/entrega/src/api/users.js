const User = require('../models/user');


class UsersController {

    constructor() {

    }
    async create(data) {
        return await User.create(data);
    }
    async findById(id) {
        return await User.findById(id);
    }
    async findAll() {
        return await User.find({});
    }
    async update(id, toUpdate) {
        return await User.findByIdAndUpdate(id, toUpdate);
    }
    async remove(id) {
        return await User.findByIdAndDelete(id);
    }

}

module.exports = new UsersController();

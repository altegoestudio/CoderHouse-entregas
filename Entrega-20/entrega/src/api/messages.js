const Message = require('../models/message');


class MessageController {

    constructor() {

    }
    async create(data) {
        return await Message.create(data);
    }
    async findById(id) {
        return await Message.findById(id);
    }
    async findAll() {
        return await Message.find({});
    }
    async update(id, toUpdate) {
        return await Message.findByIdAndUpdate(id, toUpdate);
    }
    async remove(id) {
        return await Message.findByIdAndDelete(id);
    }

}

module.exports = new MessageController();

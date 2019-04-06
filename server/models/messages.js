let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    "messageId":Number,
    "name":String,
    "text":String,
    "time":String
});

module.exports = mongoose.model('Message',messageSchema);

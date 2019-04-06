let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    "commentId":Number,
    "name":String,
    "text":String,
    "time":String,
    "parentId": Number,
    "articleId": Number
});

module.exports = mongoose.model('Comment',commentSchema);

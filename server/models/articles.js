var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
   "articleId":Number,
   "title":String,
    "subtitle":String,
   "text":String,
    "type":Array,
    "time":String
});

module.exports = mongoose.model('Article',articleSchema);


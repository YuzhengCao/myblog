let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String
});

module.exports = mongoose.model("User",userSchema);

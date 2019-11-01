var mongoose = require("mongoose");

var User = mongoose.Schema({
    is_admin: Boolean,
    username: String,
    hash_password: String
})

module.exports = mongoose.model("Users",User,"Users")
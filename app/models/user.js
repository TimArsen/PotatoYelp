var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// define our user model

var userSchema = new mongoose.Schema({
    username: String,
    password: String, 
    favPotatoes: Array(),
    avatarUrl: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
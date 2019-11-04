// var db = require("../Schemas/index");
// var hash = require('object-hash');
// const fs   = require('fs');
// const jwt  = require('jsonwebtoken');

// function hasher(password){
//  return hash({Password:password})
// }
// function genHashCode(username,hash_password){
// jwt.sign({
//     Username:username,
//     Password:hash_password
// },"secret",{
//     expiresIn = "12h"
// })
// }

// module.exports = function(app){
//     app.get("/",function(req,res){
//         res.send("Welcome to the first page")
//     })
//     app.post("/SignUp",function(req,res){
//         var username = req.body.Username;
//         var password = req.body.Password;

//     })
// }
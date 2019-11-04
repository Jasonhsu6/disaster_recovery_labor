const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Users = require("../Schemas/UserSchema");
var hash = require('object-hash');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function hasher(password) {
    return hash({ Password: password })
}
function genJWTCode(username, password) {
    var hashpass = hasher(password);
    var token = jwt.sign({
        "Username": username,
        "Password": hashpass
    },"secret")
    console.log(token)
    return token
}
function verify(token){
   var decoded = jwt.verify(token,"secret");
   Users.find({username:decoded.Username,hash_password:decoded.password},function(err,docs){
       if(err){
           console.log("Error: " + err);
           return "Error: " + err;
       }
      else if(docs.length > 0){
           return true;
       }
       else{
           return false;
       }
   })
return;
}


    //Home Route
    router.get("/", function (req, res) {
        res.send("Welcome to the first page")
    })

    //Signup Route
    router.post("/SignUp", function (req, res) {
        console.log("Username: " + req.body.Username +  " Password: " + req.body.Password)
        var password = req.body.Password;
        var hashpass = hasher(password);
        Users.find({ username: req.body.Username }, function (err, docs) {
            if (err) {
                console.log("Error: " + err)
            }
            else if (docs.length > 0) {
                console.log("Username Taken")
                res.json({ Result: "Username Taken" })
            }
            else {
                Users.create({
                    is_admin: false,
                    username: req.body.Username,
                    hash_password:hashpass
                })
                console.log("username: " + req.body.Username)
                var token = genJWTCode(req.body.Username, hashpass)
                res.json({ Result: "User Successfully Made", JWT: token })
            }
        })

    })

    //Login Route
    router.post("/Login", function (req, res) {
        var username = req.body.Username;
        var password = req.body.Password;
        var hashpass = hasher(password);
        console.log("Hashed Password " + hashpass)
        Users.find({ username: username,hash_password: hashpass }, function (err, docs) {
            if (err) {
                console.log("Error: " + err)
                res.json("Error: " + err)
            }
            else if (docs.length > 0) {
                var token = genJWTCode(username,hashpass)
                console.log("User found: " + docs)
                res.json({ Username: docs[0].username,
                     isAdmin: docs[0].is_admin,
                     JWT: token } )
            }
            else {
                console.log("No User Found")
                res.json({ Result: "No User Found"})
            }
        })
    })
module.exports = router;
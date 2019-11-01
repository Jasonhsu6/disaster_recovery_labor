var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var PORT = 3000;
var url = "mongodb://jasonnelson:jasonnelson1@ds141168.mlab.com:41168/heroku_b67cn7n5"
var cors =require("cors");

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.text());
app.use(cors);

require("./Routes/UserRoutes")(app);

mongoose.connect(url,function(err){
    if(err){
        console.log("Error: "+ err)
    }
    else{
        console.log("Database Connected")
    }
    })

app.listen(PORT,function(){
    console.log("Listening on port " + PORT)
})


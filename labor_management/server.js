var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var PORT = 3000;
var url = "mongodb://jasonnelson:jasonnelson1@ds141168.mlab.com:41168/heroku_b67cn7n5"
var cors = require("cors");
const jobs = require("./Routes/jobs");
const machines = require("./Routes/machines");
const timecards = require("./Routes/timecards");
const users = require("./Routes/UserRoutes");

app.use("/users",users)
app.use('/machines', machines);
app.use('/timecards', timecards);
app.use('/jobs', jobs);


mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true} ,  function(err){
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


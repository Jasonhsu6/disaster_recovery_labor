var express = require("express");
var app = express();
var mongoose = require("mongoose");
var PORT = 3000;
var url = "mongodb://jasonnelson:jasonnelson1@ds141168.mlab.com:41168/heroku_b67cn7n5"
const jobs = require("./Routes/jobs");
const machines = require("./Routes/machines");
const timecards = require("./Routes/timecards");
const users = require("./Routes/UserRoutes");
const cors = require("cors")

app.use("/users",users)
app.use('/machines', machines);
app.use('/timecards', timecards);
app.use('/jobs', jobs);
app.use(cors)

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


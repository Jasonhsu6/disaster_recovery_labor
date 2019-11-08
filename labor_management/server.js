var express = require("express");
var app = express();
var mongoose = require("mongoose");
require('dotenv').config()
var PORT = process.env.PORT;
var url = process.env.MONGOURL
const jobs = require("./Routes/jobs");
const machines = require("./Routes/machines");
const timecards = require("./Routes/timecards");
const users = require("./Routes/UserRoutes");
var cors = require('cors')

app.use(cors())
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


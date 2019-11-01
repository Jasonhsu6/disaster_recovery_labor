var Jobs = require("./JobSchema");
var Users = require("./UserSchema");
var Machine = require("./MachineSchema");
var Timecard = require("./TimecardSchema");

var db ={Jobs,Users,Machine,Timecard}

module.exports = db
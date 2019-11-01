var Jobs = require("./JobSchema");
var Users = require("./UserSchema");
var Machine = require("./MachineSchema");
var Timecard = require("./TimeCardSchema");

var db = { Jobs, Users, Machine, TimeCard }

module.exports = db
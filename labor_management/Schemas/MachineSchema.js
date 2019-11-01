var mongoose = require("mongoose");

var Machine = mongoose.Schema({
    machine_code: String,
    description: String,
    hourly_rate: Number,
    mhpd: Number
})

module.exports = mongoose.model("Machines",Machine,"Machines")
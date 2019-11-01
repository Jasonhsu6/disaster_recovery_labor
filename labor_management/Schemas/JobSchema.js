var mongoose = require("mongoose");

var Job = mongoose.Schema({
    job_code: String,
    description: String,
    hourly_rate: Number,
    mhpd: Number
})

module.exports = mongoose.model("Jobs",Job,"Jobs")
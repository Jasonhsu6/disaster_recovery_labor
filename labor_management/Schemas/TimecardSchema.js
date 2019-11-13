var mongoose = require("mongoose");

var TimeCard = mongoose.Schema({
    site_code: String,
    contractor: String,
    job_code:String,
    total_hours: Number,
    is_approved: Boolean
})

module.exports = mongoose.model("TimeCards",TimeCard,"TimeCards")
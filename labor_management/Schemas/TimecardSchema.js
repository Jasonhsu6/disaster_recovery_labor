var mongoose = require("mongoose");

var TimeCard = mongoose.Schema({
    site_code: String,
    contractor: String,
    total_hours: Number,
    total_amounts: Number,
    is_approved: Boolean
})

module.exports = mongoose.model("TimeCards",TimeCard,"TimeCards")
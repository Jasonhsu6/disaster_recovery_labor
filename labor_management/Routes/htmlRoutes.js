var db = require("../Schemas/index");

module.exports = function(app){
    app.get("/",function(req,res){
        res.send("Welcome to the first page")
    })
}
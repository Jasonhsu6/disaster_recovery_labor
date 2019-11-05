const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TimeCard = require('../Schemas/TimeCardSchema');
var Users = require("../Schemas/UserSchema");
const jwt = require('jsonwebtoken');

async function verify(token){
    try{
         var decoded = jwt.verify(token,"secret");
   const docs = await Users.find({username:decoded.Username,hash_password: decoded.Password})
       if(docs.length > 0){
           console.log("True")
           return true
        }
        else{
            console.log("False")
            return false
        }
    }
    catch{
        console.log("Invalid Signature")
        return false
    }
   
 }
 

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET: localhost/timecards/        get all the timecards
router.post('/', async function(req, res) {
    res.header("Access-Control-Allow-Origin","*");
    if(await verify(req.body.token) === true){
        TimeCard.find(function(err, timecards) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecards);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
  
})

// GET: localhost/timecards/:id     get one timecard with id
router.post('/:id', async function(req, res) {
    if(await verify(req.body.token) === true){
        TimeCard.findById(req.params.id, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    }) 
    } 
    else{
        res.json({Result: "Not a user"})
    }
   
})

// POST: localhost/timecards/       create a new timecard
router.post('/add', async function(req, res) {
    if(await verify(req.body.token) === true){
     TimeCard.create(req.body, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
  
})

// PUT: localhost/timecards/:id     update a timecard
router.put('/:id',async function(req, res) {
    if(await verify(req.body.token) === true){
     TimeCard.findByIdAndUpdate(req.params.id, req.body, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
   
})

// DELETE: localhost/timecards/:id  delete a timecard
router.post('/delete/:id', async function(req, res) {
    if(await verify(req.body.token) === true){
    TimeCard.findByIdAndRemove(req.params.id, req.body, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
  
})
module.exports = router;
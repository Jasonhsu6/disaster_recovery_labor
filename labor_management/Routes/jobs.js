const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Job = require('../Schemas/jobschema')
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

// GET: localhost/jobs/        get all the jobs
router.get('/',async function(req, res) {
    res.header("Access-Control-Allow-Origin","*")
    if(await verify(req.header('token')) === true){
       Job.find(function(err, jobs) {
        if (err) {
            console.log(err);
        } else {
            console.log(jobs)
            res.json(jobs);
        }
   })
        } 
       else{
            res.json({Result: "Not a user"})
        }
})

// GET: localhost/jobs/:id     get one job with id
router.get('/:id',async function(req, res) {
    if(await verify(req.header('token')) === true){
        Job.findById(req.params.id, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
        } 
        else{
            res.json({Result: "Not a user"})
        }
    
})

// POST: localhost/jobs/       create a new job
router.post('/add',async function(req, res) {
   if(await verify(req.header('token')) === true){
     Job.create(req.body, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
       } 
        else{
            res.json({Result: "Not a user"})
        }
   
})

// PUT: localhost/jobs/:id     update a job
router.put('/:id',async function(req, res) {
   if(await verify(req.header('token')) === true){
     Job.findByIdAndUpdate(req.params.id, req.body, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
        } 
        else{
            res.json({Result: "Not a user"})
        }
   
})

// DELETE: localhost/jobs/:id  delete a nachine
router.delete('/delete/:id',async function(req, res) {
   if(await verify(req.header('token')) === true){
        Job.findByIdAndRemove(req.params.id, req.body, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
        } 
        else{
            res.json({Result: "Not a user"})
        }
  
})
module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Machine = require('../Schemas/MachineSchema')
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

// GET: localhost/machines/        get all the machines
router.get('/', async function(req, res) {
    if(await verify(req.body.token) === true){
    Machine.find(function(err, machines) {
        if (err) {
            console.log(err);
        } else {
            res.json(machines);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
  
})

// GET: localhost/machines/:id     get one machine by id
router.get('/:id', async function(req, res) {
    if(await verify(req.body.token) === true){
  Machine.findById(req.params.id, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
   
})

// POST: localhost/machines/       create a new machine
router.post('/', async function(req, res) {
    if(await verify(req.body.token) === true){
    Machine.create(req.body, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
   
})

// PUT: localhost/machines/:id     update a machine
router.put('/:id',async function(req, res) {
    if(await verify(req.body.token) === true){
   Machine.findByIdAndUpdate(req.params.id, req.body, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
  
})

// DELETE: localhost/machines/:id  delete a nachine
router.delete('/:id',async function(req, res) {
    if(await verify(req.body.token) === true){
         Machine.findByIdAndRemove(req.params.id, req.body, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
    } 
    else{
        res.json({Result: "Not a user"})
    }
  
})
module.exports = router;
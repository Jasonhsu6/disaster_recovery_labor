const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Machine = require('../Schemas/MachineSchema')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET: localhost/machines/        get all the machines
router.get('/', function(req, res) {
    Machine.find(function(err, machines) {
        if (err) {
            console.log(err);
        } else {
            res.json(machines);
        }
    })
})

// GET: localhost/machines/:id     get one machine by id
router.get('/:id', function(req, res) {
    Machine.findById(req.params.id, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
})

// POST: localhost/machines/       create a new machine
router.post('/', function(req, res) {
    Machine.create(req.body, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
})

// PUT: localhost/machines/:id     update a machine
router.put('/:id', function(req, res) {
    Machine.findByIdAndUpdate(req.params.id, req.body, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
})

// DELETE: localhost/machines/:id  delete a nachine
router.delete('/:id', function(req, res) {
    Machine.findByIdAndRemove(req.params.id, req.body, function(err, machine) {
        if (err) {
            console.log(err);
        } else {
            res.json(machine);
        }
    })
})
module.exports = router;
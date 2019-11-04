  
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TimeCard = require('../Schemas/TimeCardSchema');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET: localhost/timecards/        get all the timecards
router.get('/', function(req, res) {
    TimeCard.find(function(err, timecards) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecards);
        }
    })
})

// GET: localhost/timecards/:id     get one timecard with id
router.get('/:id', function(req, res) {
    TimeCard.findById(req.params.id, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    })
})

// POST: localhost/timecards/       create a new timecard
router.post('/', function(req, res) {
    TimeCard.create(req.body, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    })
})

// PUT: localhost/timecards/:id     update a timecard
router.put('/:id', function(req, res) {
    TimeCard.findByIdAndUpdate(req.params.id, req.body, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    })
})

// DELETE: localhost/timecards/:id  delete a timecard
router.delete('/:id', function(req, res) {
    TimeCard.findByIdAndRemove(req.params.id, req.body, function(err, timecard) {
        if (err) {
            console.log(err);
        } else {
            res.json(timecard);
        }
    })
})
module.exports = router;
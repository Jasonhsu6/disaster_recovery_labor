const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Job = require('../Schemas/jobschema')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET: localhost/jobs/        get all the jobs
router.get('/', function(req, res) {
    Job.find(function(err, jobs) {
        if (err) {
            console.log(err);
        } else {
            res.json(jobs);
        }
    })
})

// GET: localhost/jobs/:id     get one job with id
router.get('/:id', function(req, res) {
    Job.findById(req.params.id, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
})

// POST: localhost/jobs/       create a new job
router.post('/', function(req, res) {
    Job.create(req.body, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
})

// PUT: localhost/jobs/:id     update a job
router.put('/:id', function(req, res) {
    Job.findByIdAndUpdate(req.params.id, req.body, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
})

// DELETE: localhost/jobs/:id  delete a nachine
router.delete('/:id', function(req, res) {
    Job.findByIdAndRemove(req.params.id, req.body, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
})
module.exports = router;

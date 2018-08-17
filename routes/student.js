const express = require('express');
const router = express.Router();
const dynamo = require('../dynamojs');


router.get('/add', function (req, res) {
    res.render('student/add');
});

router.post('/add', function (req, res) { // this function can be optimised

    dynamo.addNewStudent(req);
    res.end("Data enter, Student added");

});

router.get('/show', function (req, res) {

    dynamo.getStudents(function (req, data) {
        if (data) console.log(data.Items[0].rollno.S); else data.Items = null;
        res.render('student/show', {items: data.Items});
    });

    // awsemail.mail();

});

module.exports = router;
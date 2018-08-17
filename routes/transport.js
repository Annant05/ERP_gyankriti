const express = require('express');
const router = express.Router();
const dynamo = require('../dynamojs');


router.get('/addroute', function (req, res) {
    res.render('transport/addroute');
});

router.post('/addroute', function (req, res) {

    dynamo.addBusRoute(req);
    res.end("Data entered, bus route added");
});


router.get('/showroute', function (req, res) {

    dynamo.getBusRoutes(function (req, data) {
        if (data) console.log(data.Items[0].route_no.S); else data.Items = null;
        res.render('transport/showroute', {items: data.Items});
    });
});


module.exports = router;
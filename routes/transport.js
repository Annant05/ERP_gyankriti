/* declaration of the required base classes of node.js start */

//TODO: proper console logging

const config = require('../config/config.js');
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");  // used bodyparser to get data from all the field in form

/* END: Declaration node.js */
/* Declaration of AWS classes start */

const AWS = require('aws-sdk');
AWS.config.update(config.getAWS_JSONCredentials());

const docClientDynamo = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

//* END: Declaration of AWS classes */
/* Declaration of local file constants, variable, etc */

const TableName = "bus_routes";

/* END: Declaration of constants  */
/* Declaration of database functions */


// all dynamodb operations functions code here. Such as ADD,UPDATE,DELETE, SCAN ,etc

const listTables = function () {
    const params = {};
    dynamodb.listTables(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
};

const createBusRouteTable = function () {
    const params = {
        TableName: TableName,
        AttributeDefinitions: [
            {
                AttributeName: "route_no",  // Primary key
                AttributeType: "S"
            },

        ],
        KeySchema: [
            {
                AttributeName: "route_no",
                KeyType: "HASH"
            },

        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    try {
        dynamodb.createTable(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);
        });
    } catch (err) {
        console.log(err);
    }

    console.log("The table are listed \n");
    listTables();
};

const getBusRoutes = function (callback) {
    const params = {
        Limit: 10,
        TableName: "bus_routes",
    };

    try {

        docClientDynamo.scan(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log("getBusRoutes::  docClient.scan " + data);
                callback(err, data);
            }
        });

    } catch (err) {
        console.log(err);

    }
};

const addBusRoute = function (data) {
    const time = (Math.round((new Date()).getTime() / 1000)).toString();

    const params = {
        TableName: TableName,
        Item: {
            "route_no": data.body.bus.route,
            //date
            "date_registration": data.body.bus.date_registration,
            "date_insurance": data.body.bus.date_insurance,
            "date_fitness": data.body.bus.date_fitness,
            //vehicle specific
            "registration_no": data.body.bus.registration_no,
            "area": data.body.bus.area,
            //human resource
            "driver": data.body.bus.driver,
            "conductor": data.body.bus.conductor,
            "log_time": time
        }
    };

    console.log(params);

    try {
        docClientDynamo.put(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);
        });
    } catch (err) {
        console.log(err);
    }
};

/* END: Declaration of database functions */
/*  all get and post methods start */


router.get('/addroute', function (req, res) {
    res.render('transport/addroute');
});


router.post('/addroute', function (req, res) {
//TODO: Implement this using AJAX and return response for better user experience.
    addBusRoute(req);
    res.end("Data entered, bus route added");
});


router.get('/showroute', function (req, res) {

    getBusRoutes(function (req, data) {
        if (data) console.log(data.Items[0].route_no); else data.Items = null;
        res.render('transport/showroute', {items: data.Items});
    });
});


/*  END: get and post method block */
/*  module export block start  */

module.exports = router;

/*  END: Export block  */
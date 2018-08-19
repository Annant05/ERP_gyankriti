//////////////////////////// declaration of the required base classes of node.js start ///////////////////////////////

const config = require('../config/config.js');
const express = require('express');
const router = express.Router();

///////////////////////////////////////////END: Declaration node.js //////////////////////////////////////////////////
///////////////////////////////////// Declaration of AWS classes start //////////////////////////////////////////////

const AWS = require('aws-sdk');
AWS.config.update(config.getAWS_JSONCredentials());

const docClientDynamo = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

////////////////////////////////////// END: Declaration of AWS classes //////////////////////////////////////////
//////////////////////////////////// Declaration of local file constants, variable, etc /////////////////////////////

const TableName = "students";

////////////////////////////////////// END: Declaration of constants  ///////////////////////////////////////////////
//////////////////////////////////// Declaration of database functions ////////////////////////////////////////


// all dynamodb operations functions code here. Such as ADD,UPDATE,DELETE, SCAN ,etc
// TODO: Create all the database functions

const listTables = function () {
    const params = {};
    dynamodb.listTables(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
};


const createStudentTable = function () {
    const params = {
        TableName: TableName,
        AttributeDefinitions: [
            {
                AttributeName: "rollno",  // Primary key
                AttributeType: "S"
            },

        ],
        KeySchema: [
            {
                AttributeName: "rollno",
                KeyType: "HASH"
            },

        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    dynamodb.createTable(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
    });

    console.log("The table are listed \n");
    listTables();
};


//////////////////////////////////// END: Declaration of database functions //////////////////////////////////////////
///////////////////////////////////  all get and post methods start ///////////////////////////////////


router.get('/add', function (req, res) {
    res.render('student/add');
    console.log(listTables());
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

});

router.post('/show', function (req, res) {
    //get roll no from response
    console.log(req.body.rolln);

    // dynamo.getStudentsfromRollNo(req.body.rolln, function (req, data) {
    //     if (data) console.log("got your data to pass to the page : " + data.Items[0].rollno.S); else data.Items = null;//debug using log
    //     res.send({items: data.Items});
    // });
});


///////////////////////////////////  END: get and post method block  ///////////////////////////////////
///////////////////////////////////  module export block start ///////////////////////////////////

module.exports = router;

///////////////////////////////////  END: Export block  ///////////////////////////////////




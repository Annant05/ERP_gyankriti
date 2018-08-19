/* declaration of the required base classes of node.js start */

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

const TableName = "students";

/* END: Declaration of constants  */
/* Declaration of database functions */


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


const getDataFromRollNo = function (rollno, callback) {
    const params = {
        TableName: TableName,
        KeyConditionExpression: 'rollno = :rn',
        ExpressionAttributeValues: {
            ':rn': rollno
        }
    };
    try {
        docClientDynamo.query(params, function (err, data) {
            if (err) console.log(err);
            else {
                callback(err, data);
                // return data;
            }
        });
    } catch (err) {
        console.log("Catch in line 87 : " + err);
    }
};


const getStudents = function (callback) {
    const params = {
        Limit: 3,
        TableName: TableName,
    };
    try {
        dynamodb.scan(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                callback(err, data);
            }
        });
    } catch (err) {
        console.log("In try catch block line 120  :  " + err);
    }

};

const addNewStudent = function (data) {//try to implement all the data parsing using ajax as it will be optimized. and we can provide a feedback as well to the user.

    const time = (Math.round((new Date()).getTime() / 1000)).toString();

    const params = {
        TableName: TableName,
        Item: {

            "rollno": "GK01" + time,
            "time_of_insertion": time,
            //Student data
            "name": data.body.student.firstname,
            "stud_last_name": data.body.student.lastname,
            "s_gender": data.body.student.gender,
            "s_dob": data.body.student.dob,
            //Father Data
            "father_name": data.body.father.name,
            "father_email": data.body.father.email,
            "father_mobile": data.body.father.mobile,
            //Mother Data
            "mother_name": data.body.mother.name,
            "mother_email": data.body.mother.email,
            "mother_mobile": data.body.mother.mobile

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


router.get('/add', function (req, res) {
    res.render('student/add');
    console.log(listTables());
});

router.post('/add', function (req, res) { // this function can be optimised

    try {
        addNewStudent(req);
        res.end("Data enter, Student added");
    } catch (err) {
        console.log(err);
    }
});

router.get('/show', function (req, res) {

    getStudents(function (req, data) {
        if (data) console.log(data.Items[0].rollno.S); else data.Items = null;
        res.render('student/show', {items: data.Items});
    });

});

router.post('/show', function (req, res) {

    getDataFromRollNo(req.body.rolln, function (req, data) {
        if (data) console.log("logcall:getDataFromRollNo::  " + data.Items[0].name); else data.Items = null;
        res.send({items: data.Items});
    });

});


/*  END: get and post method block */
/*  module export block start  */

module.exports = router;

/*  END: Export block  */



const AWS = require('aws-sdk');
//AWS.config.update({region:'us-east-1'});
AWS.config.update({
    region: "us-east-1",
    // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    /*
      accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB.
      For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    */
    // accessKeyId: "fake",
    // secretAccessKey: "fake"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "students";

function listtables() {
    const params = {};
    dynamodb.listTables(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
}

module.exports.createStudentTable = function () {
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


module.exports.addNewStudent = function (data) {
    const time = (Math.round((new Date()).getTime() / 1000)).toString();
    const rollno = "GK01" + time;

    const s_fname = data.body.student.firstname;
    const s_lname = data.body.student.lastname;
    const s_gender = data.body.student.gender;
    const s_dob = data.body.student.dob;

    const f_name = data.body.father.name;
    const f_email = data.body.father.email;
    const f_mobileno = data.body.father.mobile;

    const m_name = data.body.mother.name;
    const m_email = data.body.mother.email;
    const m_mobileno = data.body.mother.mobile;

    const params = {
        TableName: TableName,
        Item: {
            "rollno": {S: rollno},
            "name": {S: s_fname},
            "time_of_insertion": {S: time},
            "stud_last_name": {S: s_lname},
            "s_gender": {S: s_gender},
            "s_dob": {S: s_dob},
            "father_name": {S: f_name},
            "father_email": {S: f_email},
            "father_mobile": {S: f_mobileno},
            "mother_name": {S: m_name},
            "mother_email": {S: m_email},
            "mother_mobile": {S: m_mobileno}

        }
    };

    console.log(params);

    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
    });
};


module.exports.getStudents = function (callback) {
    const params = {
        Limit: 3,
        TableName: TableName,
    };
    dynamodb.scan(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            callback(err, data);
        }
    });
};


module.exports.getBusRoutes = function (callback) {
    const params = {
        Limit: 3,
        TableName: "bus_routes",
    };
    dynamodb.scan(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            callback(err, data);
        }
    });
};

module.exports.createBusRouteTable = function () {
    const params = {
        TableName: "bus_routes",
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

    dynamodb.createTable(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
    });

    console.log("The table are listed \n");
    listTables();
};


module.exports.addBusRoute = function (data) {
    const time = (Math.round((new Date()).getTime() / 1000)).toString();

    const params = {
        TableName: "bus_routes",
        Item: {
            "route_no": {S: data.body.bus.route},
            "date_registration": {S: data.body.bus.date_registration},
            "date_insurance": {S: data.body.bus.date_insurance},
            "date_fitness": {S: data.body.bus.date_fitness},
            "registration_no": {S: data.body.bus.registration_no},
            "driver": {S: data.body.bus.driver},
            "conductor": {S: data.body.bus.conductor},
            "area": {S: data.body.bus.area},
            "log_time": {S: time}
        }
    };

    console.log(params);

    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
    });
};


module.exports.getStudentsfromRollNo = function (rollno, callback) {

    var params = {
        Key: {
            "rollno": {S: rollno}
        },
        TableName: TableName
    };

    dynamodb.scan(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            callback(err, data);
        }
    });
};

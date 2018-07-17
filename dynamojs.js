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

const dynamodb = new AWS.DynamoDB();

function listtables() {
    const params = {};
    dynamodb.listTables(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
        /*
        data = {
         TableNames: [
            "Forum",
            "ProductCatalog",
            "Reply",
            "Thread"
         ]
        }
        */
    });
}

function createTable() {

    const params = {
        TableName: "gyankriti",
        AttributeDefinitions: [
            {
                AttributeName: "rollno",
                AttributeType: "S"
            },
            {
                AttributeName: "name",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "rollno",
                KeyType: "HASH"
            },
            {
                AttributeName: "name",
                KeyType: "RANGE"
            }
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
    listtables();
}


function putstudent(s_fname, s_lname, s_gender, s_dob, f_name, f_email, f_mobileno, m_name, m_email, m_mobileno) {
    const rollno = "GK0010";
    const params = {
        TableName: "gyankriti",
        Item: {

            "rollno": {S: rollno},
            "name": {S: s_fname},
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

//     var params = {
//     TableName: "gyankriti",
//     Item: {
//   "rollno"         :   "GK01002",
//   "student_name"   :   "Annant Gupta",
//   "father_name"    :   "Ashwin Gupta",
//   "mother_name"    :   "Jagrati Gupta"  }
//     };

    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
    });
}

listtables();
module.exports.putstudent = putstudent; // export your functuion

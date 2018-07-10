var AWS = require('aws-sdk');
//AWS.config.update({region:'us-east-1'});
AWS.config.update({
          region: "ap-south-1",
          // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
          endpoint: 'http://localhost:8000',
          /*
            accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB. 
            For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
          */
          accessKeyId: "fakeMyKeyId",
          secretAccessKey: "fakeSecretAccessKey"
});

var dynamodb = new AWS.DynamoDB();

function listtables(){
    var params = {
 };
 dynamodb.listTables(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
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
 
 function createTable(){
     
     var params = {
            TableName : "gyankriti",
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
     }
    
     dynamodb.createTable(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);
    });
 
    console.log("The table are listed \n");
     listtables();
 }
 
 //createTable();
 listtables();
 
function putstudent(){ 
 
 
    var rollno = "GK0010";
    var stud_name = "Annant Gupta";
    var father_name  ="Ashwin Gupta";
    var mother_name = "Jagrati Gupta";
    
    var params = {
        TableName: "gyankriti",
        Item: {
                "rollno": rollno,
                "stud_name": stud_name,
                "father_name": father_name,
                "mother_name": mother_name
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
 
 dynamodb.put(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data); 
    });
}

putstudent();
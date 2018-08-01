// all requires and delclarations
const express = require("express"), app = express(); // creating express server
const dynamo = require("./dynamojs.js"); // access dynamodb.js file and its fucntions
const request = require('request');//to get public ip of the ec2 server
const bodyParser = require("body-parser");  // used bodyparser to get data from all the field in form 

// Declaration related to servers
const PORT = 8080;

//Main body of the js file
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(express.static('vendors'));
app.use(express.static('src'));
app.set('view engine', 'ejs');
app.set('views', './src/views');


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/index', function (req, res) {
    res.render('index');
});

app.get('/form', function (req, res) {
    res.render('form');
});

app.get('/add-student', function (req, res) {
    res.render('addstudent');
});

app.post('/add-student', function (req, res) { // this function can be optimised

    dynamo.addNewStudent(req);
    res.end("Data enter, Student added");

});


app.get('/bus-routes', function (req, res) {
    res.render('bus-routes');
});

app.get('/base-temp', function (req, res) {
    res.render('base-temp');
});

app.get('/add-bus-route', function (req, res) {
    res.render('add-bus-route');
});

app.post('/add-bus-route', function (req, res) {

    dynamo.addBusRoute(req);
    res.end("Data entered, bus route added");

});

app.get('/show-students', function (req, res) {

    dynamo.getStudents(function (req, data) {
        if (data) console.log(data.Items[0].rollno.S); else data.Items = null;
        res.render('showstudents', {items: data.Items});
    });
});


request('http://169.254.169.254/latest/meta-data/public-ipv4', function (error, response, body) {
    console.log('server started on ip:port : ' + body + ":" + PORT);
});

app.listen(PORT, function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('server started on port : ' + 8080);
});

console.log('Client-side code running');

// all requires and declarations
const express = require("express"), app = express(); // creating express server
const path = require('path');
const dynamo = require("./dynamojs.js"); // access dynamodb.js file and its fucntions
const request = require("request");
const bodyParser = require("body-parser");  // used bodyparser to get data from all the field in form
// const awsemail = require("./ses.js");

// Declaration related to servers
const PORT = process.env.PORT || 8080;

//Main body of the js file
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendors')));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', require('./routes/index'));
app.use('/student', require('./routes/student'));
app.use('/transport', require('./routes/transport'));


app.get('/base-temp', function (req, res) {
    res.render('base-temp');
});


app.put('/serverfunc', function (req, res) {
    console.log("Succesfully called a custom function : newmethod from our client side code");
});


var nos = 0;
app.post('/serverfunc', function (req, res) {

    nos = nos + 1;
    console.log('this is a post request no ' + nos);
    // console.log((res));
    console.log((req.body));

    dynamo.getBusRoutes(function (req, data) {
        if (data) console.log(data.Items[0].area.S); else data.Items = null;
        res.send({items: data.Items});
    });

});

app.get('/serverfunc', function (req, res) {

    res.render('serverfunc');
    console.log("This is a get request");

});


request('http://169.254.169.254/latest/meta-data/public-ipv4', function (error, response, body) {
    console.log('server started on ip:port : ' + body + ":" + PORT);
});

app.listen(PORT, function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('server started on port : ' + 8080);
});

console.log('Client-side code running');

// all requires and declarations
const express = require("express"), app = express(); // creating express server
const path = require('path');
const request = require("request");

// Declaration related to servers
const PORT = process.env.PORT || 8080;

//Main body of the js file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendors')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', require('./routes/index'));
app.use('/student', require('./routes/student'));
app.use('/transport', require('./routes/transport'));
app.use('/tests', require('./routes/tests'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/base-temp', function (req, res) {
    res.render('base-temp');
});

request('http://169.254.169.254/latest/meta-data/public-ipv4', function (error, response, body) {
    if (body !== undefined) console.log('server started on ip:port : ' + body + ":" + PORT);
    else console.log('server started on ip:port : ' + 'http://127.0.0.1' + ":" + PORT);
});

app.listen(PORT, function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('server started on port : ' + 8080);
});

console.log('Server-side code running');

const express = require("express"), app = express();    // creating express server
const dynamo = require("./dynamojs.js");                // access dynamodb.js file and its fucntions
const request = require('request');                     //to get public ip of the ec2 server
const bodyParser = require("body-parser");              // used bodyparser to get data from all the field in form 


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

//============================================================================
//                  STUDENT ROUTES
//============================================================================
app.get('/add-student', function (req, res) {
    res.render('form_wizards');
    // res.render('addstudent');
});

app.post('/add-student', function (req, res) {

    const s_fname = req.body.student.firstname;
    const s_lname = req.body.student.lastname;
    const s_gender = req.body.student.gender;
    const s_dob = req.body.student.dob;

    const f_name = req.body.father.name;
    const f_email = req.body.father.email;
    const f_mobileno = req.body.father.mobile;  

    const m_name = req.body.mother.name;
    const m_email = req.body.mother.email;
    const m_mobileno = req.body.mother.mobile;

    res.end("got your data");

    dynamo.putstudent(s_fname, s_lname, s_gender, s_dob, f_name, f_email, f_mobileno, m_name, m_email, m_mobileno);

});



app.get('/show-students', function (req, res) {
    // let data = dynamo.exportdata();
    // console.log(data.Items);

    dynamo.usingCallback(function (req, data) {
        console.log(data.Items[0].rollno);
        res.render('showstudents', {items: data.Items});
    });
});



app.get('/form', function (req, res) {
    res.render('form');
});




//=============================================================================
//                  Server
//=============================================================================
request('http://169.254.169.254/latest/meta-data/public-ipv4', function (error, response, body) {
    console.log('server staretd on ip:port : ' + body + ":" + PORT);
});

app.listen(PORT, function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('server started on port : ' + 8080);
});

// app.listen(8032 /*process.env.PORT*/, /*process.env.IP,*/ function (err) {
//     if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
//     else console.log('server started on port : ' + "8032"  /*process.env.PORT + '  and  ' + process.env.IP*/);
// });

// app.listen(8032, function (err) {
//     console.log('Server started on port'   +  "  8032");

// });
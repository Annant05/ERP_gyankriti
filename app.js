var express = require("express"),
    app = express();

const dynamo = require("./dynamojs.js");

const bodyParser = require("body-parser");
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

app.get('/add-student', function (req, res) {
    res.render('addstudent');
});
app.get('/form', function (req, res) {
    res.render('form');
});

app.post('/add-student', function (req, res) {
    console.log(req.body.student.firstname);
    console.log(req.body.student.lastname);
    console.log(req.body.student.gender);
    console.log(req.body.student.dob);

    console.log("\n\n Father \n");

    console.log(req.body.father.name);
    console.log(req.body.father.email);
    console.log(req.body.father.mobile);

    console.log("\n\n mother \n");
    console.log(req.body.mother.name);
    console.log(req.body.mother.email);
    console.log(req.body.mother.mobile);

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


app.listen(8032 /*process.env.PORT*/, /*process.env.IP,*/ function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('server started on port : ' + "8032"  /*process.env.PORT + '  and  ' + process.env.IP*/);
});

// app.listen(8032, function (err) {
//     console.log('Server started on port'   +  "  8032");

// });
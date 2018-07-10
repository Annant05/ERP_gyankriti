var express = require("express"),
    app = express();
    
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
    console.log(req.body.user.rollno);
    console.log(req.body.user.name);
    res.end("got your data");
});












app.listen(  8032 /*process.env.PORT*/ ,/*process.env.IP,*/ function(err){
    if(err) console.log("There was some problem in starting the server  : " +  JSON.stringify(err,undefined,2));
    else    console.log('server started on port : ' + "8032"  /*process.env.PORT + '  and  ' + process.env.IP*/);
});

// app.listen(8032, function (err) {
//     console.log('Server started on port'   +  "  8032");

// });
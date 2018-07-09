var express = require("express"),
    app = express();

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

// app.listen(process.env.PORT,process.env.IP,function(err){
//     console.log('server started on port : ' + process.env.PORT);
// });

app.listen(8032, function (err) {
    console.log('Server started on port'   +  "  8032");

});
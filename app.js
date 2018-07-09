var express = require("express"),
    app     = express();

app.use(express.static('public'));
app.use(express.static('src'));
app.set('view engine','ejs');
app.set('views','./src/views');


app.get('/', function(req,res){
   res.render('index'); 
});

app.listen(process.env.PORT,process.env.IP,function(err){
    console.log('server started');
});
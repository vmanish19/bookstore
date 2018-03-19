var express = require('express');
var app = express();
var bodyParser = require('body-Parser');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render('index');
})

app.get("/login",function(req,res){
    res.render('profile')
})

app.get("/product", function (req, res, next) {
    res.render('product',{});
});

const port = 3001;
const host = 'localhost';
const expressConfig = {host: host, port: port};

app.listen(expressConfig, function () {
    console.log(
        'Node server listening on %s:%d within %s environment',
        host, port, app.set('env')
    );
});




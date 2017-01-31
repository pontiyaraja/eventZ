var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var db;

if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/eventAPI_test');

} else {
    db = mongoose.connect('mongodb://localhost/eventAPI');
}

var Login = require('./models/loginModel');
var User = require('./models/userModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

loginRouter = require('./Routes/loginRoutes')(User);

app.use('/api/v0.1/login', loginRouter);
app.use('/api/v0.1', loginRouter);

/*app.post('/registe', function(req,res){
    console.log(req.body);
    console.log('Welcome to my App');
    res.send(req.body);
});*/

app.listen(port, function(){
    console.log('Running on Port: ' + port);
});

module.exports = app;

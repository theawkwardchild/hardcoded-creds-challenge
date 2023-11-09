const express = require('express')

var path = require('path');
var app = express();
var cors = require("cors")
var logger = require('morgan');

app.use(cors())
app.use(logger('short'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', express.static('public'))


app.get('/', function(req, res) {    
    res.render('index');
})

app.listen(8082, function() {
    console.log("Listening! http://localhost:8082")
})


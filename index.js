require('dotenv').config()//grab enviroment variables
var express = require('express');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');//parse form data into object
var app = express();

//configure middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));//log requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));//configure static assets

//routes
app.get('/', function(req, res) {
  res.render('index', {name: "Sterling Archer"});
});

//server
app.listen(3000);
require('dotenv').config()//grab enviroment variables
var express = require('express');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');//parse form data into object
var request = require('request');
var client = require('smartsheet');
var app = express();

//configure middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));//log requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));//configure static assets
var smartsheet = client.createClient({ accessToken: process.env.ACCESS_TOKEN });

//routes
app.get('/', function(req, res) {
  var options = {
    id: 5552382592477060 // Id of Sheet
  };
  // Get sheet
  smartsheet.sheets.getSheet(options)
  .then(function(sheetInfo) {
      console.log(sheetInfo);
      // res.send(sheetInfo)
      res.render('index', {sheetInfo:sheetInfo});
  })
  .catch(function(error) {
      console.log(error);
  });
});

app.post("/new", function(req, res){
  
});

//server
app.listen(3000);
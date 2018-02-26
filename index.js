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
  // var qs = {
  //   Authorization: 'Bearer '
  // };
  // request({
  //   url:'https://api.smartsheet.com/2.0/sheets',
  //   qs:qs
  // }, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log(body) //Show JSON Object.
  //     res.send(body);
  //     // res.render('index', {name: ""});
  //   }else{
  //     console.log(error);
  //   }
  // });

  var options = {
    id: 3326421302044548 // Id of Sheet
  };

  // Get sheet
  smartsheet.sheets.getSheet(options)
      .then(function(sheetInfo) {
          console.log(sheetInfo);
          res.send(sheetInfo)
      })
      .catch(function(error) {
          console.log(error);
      });
  });

//server
app.listen(3000);
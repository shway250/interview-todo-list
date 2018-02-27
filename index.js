require('dotenv').config()//grab enviroment variables
var express = require('express');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');//parse form data into object
var request = require('request');
var client = require('smartsheet');
var app = express();

//sheet id constant
//in future apps I would access this from a SQL database depending on what sheet I was utilizing
var toDoListSheetId = 5552382592477060;

//configure middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));//log requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));//configure static assets
var smartsheet = client.createClient({ accessToken: process.env.ACCESS_TOKEN });

//routes
app.get('/', function(req, res) {
  // Get sheet
  var options = {
    id: toDoListSheetId // Id of Sheet
  };

  smartsheet.sheets.getSheet(options)
  .then(function(sheetInfo) {
    res.render('index', {sheetInfo:sheetInfo});
  })
  .catch(function(error) {
      console.log(error);
  });
});

app.post("/new", function(req, res){
  // Specify rows
  var row = [
    {
      "cells": [
        {
          columnId: 3500371780888452,
          value: req.body.type,
          displayValue: req.body.type
        },
        {
          columnId: 8003971408258948,
          value: req.body.date
        },
        {
          columnId: 685622013781892,
          value: null
        },
        {
          columnId: 2937421827467140,
          value: "Not Started",
          displayValue: "Not Started"
        },
        {
          columnId: 7441021454837636,
          value: req.body.tag,
          displayValue: req.body.tag
        }
      ]
    }
  ];
  // Set options
  var options = {
    sheetId: toDoListSheetId,
    body: row
  };
  // Add rows to sheet
  smartsheet.sheets.addRows(options)
    .then(function(newRows) {
      console.log(newRows);
      res.redirect('/');
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.put('/done/:id', function(req, res) {
  var rowToEdit = req.params.id;
  // Specify updated cell values
  var row = [
    {
      "id": rowToEdit,
      "cells": [
        {
          "columnId": 685622013781892,
          value: JSON.parse(req.body.checked)
        }
      ]
    }
  ];

  // Set options
  var options = {
    sheetId: toDoListSheetId,
    body: row
  };

  // Update rows in sheet
  smartsheet.sheets.updateRow(options)
    .then(function(updatedRows) {
      // console.log(updatedRows);
      res.send({message: 'success'});
    })
    .catch(function(error) {
      // console.log(error);
      res.send({message: 'failure'});
    });
});

app.delete('/delete/:id', function(req, res) {
  var taskToDelete = req.params.id;

  // Set options
var options = {
  sheetId: toDoListSheetId,
  rowId: taskToDelete
};

// Delete row
smartsheet.sheets.deleteRow(options)
  .then(function(results) {
    console.log(results);
  })
  .catch(function(error) {
    console.log(error);
  });

  res.send({message: 'success'});
});

app.put('/edittext/:id', function(req, res) {
  var rowToEdit = req.params.id;
  // Specify updated cell values
  var row = [
    {
      "id": rowToEdit,
      "cells": [
        {
          "columnId": 3500371780888452,
          value: req.body.newTask
        }
      ]
    }
  ];

  // Set options
  var options = {
    sheetId: toDoListSheetId,
    body: row
  };

  // Update rows in sheet
  smartsheet.sheets.updateRow(options)
    .then(function(updatedRows) {
      res.send({message: 'success'});
    })
    .catch(function(error) {
      res.send({message: 'failure'});
    });
});

app.put('/updatecat/:id', function(req, res) {
  var rowToEdit = req.params.id;
  // Specify updated cell values
  var row = [
    {
      "id": rowToEdit,
      "cells": [
        {
          "columnId": 7441021454837636,
          value: req.body.newCat
        }
      ]
    }
  ];

  // Set options
  var options = {
    sheetId: toDoListSheetId,
    body: row
  };

  // Update rows in sheet
  smartsheet.sheets.updateRow(options)
    .then(function(updatedRows) {
      res.send({message: 'success'});
    })
    .catch(function(error) {
      res.send({message: 'failure'});
    });
});

app.put('/updatestat/:id', function(req, res) {
  var rowToEdit = req.params.id;
  // Specify updated cell values
  var row = [
    {
      "id": rowToEdit,
      "cells": [
        {
          "columnId": 2937421827467140,
          value: req.body.newStat
        }
      ]
    }
  ];

  // Set options
  var options = {
    sheetId: toDoListSheetId,
    body: row
  };

  // Update rows in sheet
  smartsheet.sheets.updateRow(options)
    .then(function(updatedRows) {
      res.send({message: 'success'});
    })
    .catch(function(error) {
      res.send({message: 'failure'});
    });
});
//server
app.listen(3000);
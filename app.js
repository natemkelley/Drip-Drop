//setup server
var express = require('express');
var request = require('request')
var path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

//routes
var routes = require('./routes/index');
var http = require('http').Server(app);

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts/charts', express.static(__dirname + '/node_modules/chart.js/dist/'));
app.set('view engine', 'ejs');


//Set up listening port
http.listen(port, function () {
    console.log('Server listening at port %d', port);
});



module.exports = app;

//https://github.com/natemkelley/NodeJS-Chat-Server/blob/master/index.js

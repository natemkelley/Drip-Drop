//setup server
var express = require('express');
var request = require('request')
var path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');

//routes
var routes = require('./routes/index');


//Socket IO addon
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;

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

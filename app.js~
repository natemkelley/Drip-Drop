//setup server
var express = require('express');
var request = require('request')
var path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

//config
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

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

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;

//https://github.com/natemkelley/NodeJS-Chat-Server/blob/master/index.js

var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var firebaseApp = require('./firebase');
var chartData = require('../functions/chartData.js');

router.get('/test', function (req, res, next) {
    var sendBack = "hey";
    var result = firebaseApp.test();
    var result2 = chartData.test();
    
    res.send(sendBack);
});

router.get('/chart', function (req, res, next) {
    var result2 = chartData.test();
    
    res.send(result2);
});



module.exports = router;

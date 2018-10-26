var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var firebaseApp = require('../functions/firebase.js');
var chartData = require('../functions/chartData.js');
var getData = require('../functions/getData.js');


router.get('/wholeDataSet', function (req, res, next) {
    var result = getData.getWholeDataSet();
    res.send(result);
});

router.get('/chart', function (req, res, next) {
    var result2 = chartData.test();
    res.send(result2);
});

router.get('/chart-av30', function (req, res, next) {
    var result = chartData.avtime30();
    res.send(result);
});



module.exports = router;

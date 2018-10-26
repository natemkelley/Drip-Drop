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

router.get('/getAvTime30', function (req, res, next) {
    var result = getData.getPipe1AvTime30();
    res.send(result);
});

router.get('/getBigDay', function (req, res, next) {
    var result = getData.getPipe1BigDay();
    res.send(result);
});

router.get('/chart', function (req, res, next) {
    var result2 = chartData.test();
    res.send(result2);
});



module.exports = router;

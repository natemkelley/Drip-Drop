var express = require('express');
var request = require('request')
const https = require('https');
var router = express.Router();
var express = require('../functions/controlSensors.js');
var firebaseApp = require('../functions/firebase.js');
var chartData = require('../functions/chartData.js');
var getData = require('../functions/getData.js');
var controlSensors = require('../functions/controlSensors.js');


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

router.get('/chart-bigDay', function (req, res, next) {
    var result = chartData.bigDay();
    res.send(result);
});

router.get('/chart-avMonth', function (req, res, next) {
    var result = chartData.avMonth();
    res.send(result);
});

router.get('/chart-weekDay', function (req, res, next) {
    var result = chartData.weekDay();
    res.send(result);
});

router.get('/chart-nowPipe1', function (req, res, next) {
    var result = chartData.nowPipe1();
    res.send(result);
});

router.get('/chart-nowPipe2', function (req, res, next) {
    var result = chartData.nowPipe2();
    res.send(result);
});

router.get('/chart-totalByPipe', function (req, res, next) {
    var result = chartData.totalByPipe();
    res.send(result);
});

router.get('/getSettings', function (req, res, next) {
    var settings = getData.getSettings();
    res.send(settings);
});

router.get('/checkPipeError', function (req, res, next) {
    var status = getData.getGexecutingSolenoid();
    res.send(status);
});

router.get('/executingSolenoid', function (req, res, next) {
    var yesno = getData.getExecutingSolenoid();
    res.send(yesno);
});

router.post('/changeAlert', function (req, res, next) {
    var receivedJSON = req.body;

    firebaseApp.saveSettings(receivedJSON);
    controlSensors.getSettings();

    res.status(200).send({
        success: "IT WORKED!"
    });
});

module.exports = router;

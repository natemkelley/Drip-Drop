var compute = require('./compute.js');

var WHOLEDATASET = {};
var PIPE1AVTIME30 = {};
var PIPE2AVTIME30 = {};
var PIPE1BIGDAY = {};
var PIPE2BIGDAY = {};
var PIPESBIGDAY = {};
var PIPE1AVMONTH = {};
var PIPE2AVMONTH = {};
var PIPE1WEEKDAY = {};
var PIPE2WEEKDAY = {};

exports.setWholeDataSet = function (data) {
    WHOLEDATASET = data
    console.log('getData -> setWholeDataSet')
}

exports.getWholeDataSet = function () {
    console.log('getData -> getWholeDataSet')
    return WHOLEDATASET
}

exports.setPipe1AvTime30 = function (data) {
    PIPE1AVTIME30 = data
    console.log('getData -> setPipe1AvTime30')
}

exports.getPipe1AvTime30 = function () {
    console.log('getData -> getPipe1AvTime30')
    return PIPE1AVTIME30
}




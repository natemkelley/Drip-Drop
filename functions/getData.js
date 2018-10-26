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
    console.log('setData -> setPipe1AvTime30')
}
exports.getPipe1AvTime30 = function () {
    console.log('getData -> getPipe1AvTime30')
    return PIPE1AVTIME30
}
exports.setPipe2AvTime30 = function (data) {
    PIPE2AVTIME30 = data
    console.log('setData -> setPipe2AvTime30')
}
exports.getPipe2AvTime30 = function () {
    console.log('getData -> getPipe2AvTime30')
    return PIPE2AVTIME30
}
exports.setPipe1BigDay = function (data) {
    PIPE1AVTIME30 = data
    console.log('setData -> setPipe1BigDay')
}
exports.getPipe1BigDay = function () {
    console.log('getData -> getPipe2BigDay')
    return PIPE1AVTIME30
}
exports.setPipe2BigDay = function (data) {
    PIPE2AVTIME30 = data
    console.log('setData -> setPipe2BigDay')
}
exports.getPipe2BigDay = function () {
    console.log('getData -> getPipe2BigDay')
    return PIPE2AVTIME30
}

exports.setPipesBigDay = function (data) {
    PIPESAVTIME30 = data
    console.log('setData -> setPipesBigDay')
}
exports.getPipesBigDay = function () {
    console.log('getData -> getPipesBigDay')
    return PIPESAVTIME30
}

var PythonShell = require('python-shell');
var getData = require('./getData.js');

var LITERS = 0;
var TIMER = 0;
var settingsReceived = false;


function getSettings() {
    var settings = getData.getSettings();
    if (!(settings.liters || settings.timer)) {
        setTimeout(function () {
            getSettings();
        }, 300);
    }
    if ((settings.liters || settings.timer)) {
        settingsReceived = true;
        console.log('controlSettings -> ' + 'getSettings');
    }
}

getSettings();

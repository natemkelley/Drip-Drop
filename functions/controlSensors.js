let {
    PythonShell
} = require('python-shell');
var getData = require('./getData.js');
const fs = require('fs');

var LITERS = 0;
var TIMER = 0;
var CURRENTLITERS = null;
var CURRENTUSAGE = 0;
var MINUTESINMILLI = 1000 * 60;
var timer;

function readMeter() {
    var pyshell = new PythonShell('./python/meter-test.py');
    pyshell.send('start');
    pyshell.on('message', function (message) {
        interpretMeter(message);
        readMeter();
    });
}

function interpretMeter(data) {
    data = JSON.parse(data)
    if (data.status == 500) {
        data.usage = 0;
    }
    //console.log('pipe1= '+data.usage)
    //getData.setCurrentPipe1(data.usage)
}

function updateSolenoidAlerts() {
    if (LITERS > 0) {

    }
    if (TIMER > 0) {
        clearTimeout(timer); //cancel the previous timer.
        timer = null;

        timer = setInterval(function () {
            //executeSolenoid();
        }, TIMER * MINUTESINMILLI);
    }
}

function executeSolenoid() {
    console.log('execute solenoid')
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './python',
        args: [LITERS, TIMER, CURRENTUSAGE]
    };
    PythonShell.run('Solenoid.py', options, function (err, results) {
        if (err) throw err;
        console.log(results);
    });
}

function getSettings() {
    var settings = getData.getSettings();
    if (!(settings.liters || settings.timer)) {
        setTimeout(function () {
            getSettings();
        }, 300);
    }
    if ((settings.liters || settings.timer)) {
        console.log('controlSettings -> ' + 'getSettings');
        LITERS = settings.liters || null;
        TIMER = settings.timer || null;
        CHANGES = true;
        updateSolenoidAlerts();
    }
}

exports.getSettings = function () {
    getSettings();
}
getSettings();
readMeter();

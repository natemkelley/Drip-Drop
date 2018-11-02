let {
    PythonShell
} = require('python-shell');
var getData = require('./getData.js');
var firebaseApp = require('./firebase.js');
const fs = require('fs');

var LITERS = 0;
var TIMER = 0;
var CURRENTLITERS = null;
var CURRENTUSAGE = 0;
var MINUTESINMILLI = 1000 * 60;
var MOSTRECENTLITERAGE = 0;
var REQUIREDFLOW = false;
var timer;


function readMeter() {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './python',
        args: [LITERS, TIMER, CURRENTUSAGE]
    };
    PythonShell.run('meter.py', options, function (err, results) {
        if (err) throw err;
        interpretMeter(results);
        readMeter();
    });

}

function interpretMeter(data) {
    data = JSON.parse(data);
    var status = data.status;

    var logginNumber = Math.round((data.usage / 12) * 100) / 100
    console.log('constrolSensors interpretMeter ->  ' + logginNumber)

    if (data.status == 500) {
        data.usage = 0;
    }
    firebaseApp.inputNewDataPoint(data.usage);
    getData.setCurrentPipe1(logginNumber);
    getData.setError(status);
    currentLiterUsage(data.usage);
}

function currentLiterUsage(data) {
    MOSTRECENTLITERAGE = data;
    if (LITERS > 0) {
        CURRENTLITERS += (data / 12)
        if (CURRENTLITERS > LITERS) {
            console.log("\nEXECUTE SOLENOID - USAGE\n")
            executeSolenoid();
            CURRENTLITERS = 0;
        }
    }
}

function timerSolenoidAlert() {
    if (TIMER > 0) {
        clearTimeout(timer); //cancel the previous timer.
        timer = null;
        timer = setInterval(function () {
            if ((MOSTRECENTLITERAGE > 0.25) || REQUIREDFLOW) {
                console.log("\nEXECUTE SOLENOID - TIMER\n")
                executeSolenoid();
            }
        }, TIMER * MINUTESINMILLI);
    }
}

function executeSolenoid() {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './python',
        args: [LITERS, TIMER, CURRENTUSAGE]
    };
    PythonShell.run('Solenoid.py', options, function (err, results) {
        if (err) throw err;
    });
    getData.setExecutingSolenoid(true);
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
        timerSolenoidAlert();
    }
}

exports.getSettings = function () {
    getSettings();
}
exports.changeRequireFlow = function (data) {
    console.log('controlSensors -> changeRequiredFlow');
    REQUIREDFLOW = data.required
}
getSettings();
readMeter();

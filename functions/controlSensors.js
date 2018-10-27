let {
    PythonShell
} = require('python-shell');
var getData = require('./getData.js');
const fs = require('fs');

var LITERS = 0;
var TIMER = 0;
var CURRENTUSAGE = 0;

getSettings();

function executeSolenoid() {
    console.log('execute meter')
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './python',
        args: [LITERS, TIMER, CURRENTUSAGE]
    };
    PythonShell.run('solenoid.py', options, function (err, results) {
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
        executeSolenoid();
    }
}


exports.getSettings = function () {
    getSettings();
}

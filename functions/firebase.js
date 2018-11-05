//establish database connection
var firebase = require('firebase');
var compute = require('./compute.js');
var fs = require('fs');
var getData = require('./getData.js');

//firebase config
var config = {
    apiKey: "AIzaSyDJIPWAjanHdO9WBdmb5cBhaRjSVbNdpYk",
    authDomain: "drip-drop-2d311.firebaseapp.com",
    databaseURL: "https://drip-drop-2d311.firebaseio.com",
    projectId: "drip-drop-2d311",
    storageBucket: "",
    messagingSenderId: "335132131853"
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();

rootRef.on("value", function (snapshot) {
    console.log('received firebase')
    if (snapshot.val() == null) {
        massInputDummyData();
    } else {
        var pipes = makePipes(snapshot.val());
        var settings = makeSettings(snapshot.val())

        //compute.startCompute(pipes);
        //getData.setSettings(settings);
        //cleanDatabase(pipes);
        recentDummyData();
        //deleteRecentDummyData(pipes);
    }
})


var tried = 0;
var success = 0;

function dummyData() {
    var jsondata = {};
    var year = 2018;

    for (month = 0; month < 11; month++) {
        for (dayx = 0; dayx < 2; dayx++) {
            for (hourx = 0; hourx < 2; hourx++) {
                var hourRun = runOnHour();
                for (minutex = 0; minutex < 2; minutex++) {
                    var minuteRun = runOnMinute();
                    for (second = 0; second < 2; second++) {
                        var d = new Date(year, month, day, hour, minute, second, 0);
                        var liters = 0.00;
                        if (minuteRun && hourRun) {
                            liters = randomLiterage();
                        }
                        var data = {
                            liters: liters,
                            timestamp: Date.parse(d)
                        }
                        var day = randomDay();
                        var minute = randomMinute();
                        var hour = randomHour();

                        var stringDot = createStringDot(d);
                        writeDummyData(stringDot, data)
                    }
                }
            }
        }
    }

    function setDat(path, value) {
        var schema = jsondata;
        var pList = path.split('.');
        var len = pList.length;
        for (var i = 0; i < len - 1; i++) {
            var elem = pList[i];
            if (!schema[elem]) schema[elem] = {}
            schema = schema[elem];
        }

        schema[pList[len - 1]] = value;
    }

    function createStringDot(d) {
        var randoPipe = Math.floor(Math.random() * 2);
        var pipe = "pipe" + randoPipe.toString();
        var millseconds = d.getTime();
        var stringDot = pipe + "/" + millseconds;
        return stringDot
    }

    function randomLiterage() {
        let maxLiterage = 17.6555;
        let precision = 1000;
        var returnVal = 0;
        returnVal = Math.floor(Math.random() * (maxLiterage * precision - 1 * precision) + 1 * precision) / (1 * precision);

        return returnVal
    }

    function runOnHour() {
        var prob = Math.floor(Math.random() * 10);
        var returnVal = false;
        if (prob < 9) {
            returnVal = true;
        }
        return returnVal
    }

    function runOnMinute() {
        var rando = Math.floor(Math.random() * 2);
        var returnVal = false;
        if (rando == 1) {
            returnVal = true
        }
        return returnVal
    }

    function randomDay() {
        var rando = Math.floor(Math.random() * 30);
        return rando

    }

    function randomMinute() {
        var rando = Math.floor(Math.random() * 59);
        return rando
    }

    function randomHour() {
        var rando = Math.floor(Math.random() * 24);
        return rando
    }

    function writeDummyData(stringDot, data) {
        tried++;
        if (data.timestamp > 10) {
            firebase.database().ref(stringDot).set(data, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    success++;
                    console.log("success=" + success);
                    console.log('tried=' + tried)
                }
            });
        }
    }
}

function recentDummyData() {
	
    var jsondata = {};
    var year = 2018;

    var currentTime = new Date().getTime();
    var oneWeekAgo = currentTime - (1000 * 60 * 60 * 24 * 9);

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    for (pipe = 0; pipe < 2; pipe++) {
        for (i = 1; i < 5; i++) {
            var day = getRndInteger(oneWeekAgo, currentTime);
            inputLocation = "/pipe" + pipe + "/" + day
            var literage = randomLiterage() * zeroOut()*zeroOut();
				var data = {
                            liters: literage,
                            timestamp: day
            }            
            
            //writeDummyData(inputLocation, data);
        /*firebase.database().ref(inputLocation).set(data, function (error) {
            if (error) {
                console.log(error)
            } else {
                console.log("success")
            }
        })            */
            
            console.log(i)
        }
    }

    function zeroOut() {
        return Math.round(Math.random());
    }

    function randomLiterage() {
        let maxLiterage = 3.6555;
        let precision = 1000;
        var returnVal = 0;
        returnVal = Math.floor(Math.random() * (maxLiterage * precision - 1 * precision) + 1 * precision) / (1 * precision);

        return returnVal
    }

    function writeDummyData(stringDot, data) {
    	//console.log(stringDot)
    	//console.log(data);
        firebase.database().ref(stringDot).set(data, function (error) {
            if (error) {
                console.log(error)
            } else {
                console.log("success")
            }
        })
    }
}

function deleteRecentDummyData(data){
    console.log('cleaning dummy data');
    var sevendaysago = new Date().getTime() - (1000*60*60*24*9);
    for (var key in data.pipe0) {
        if (key > sevendaysago) {
				console.log(key)
            firebase.database().ref('pipe0/' + key).remove();
        }
    }
    for (var key in data.pipe1) {
        if (key > sevendaysago) {

            firebase.database().ref('pipe1/' + key).remove();
        }
    }

}

function massInputDummyData() {
    for (xxx = 0; xxx < 15; xxx++) {
        setTimeout(function () {
            dummyData()
        }, 5000 * xxx);
    }
}

function makePipes(data) {
    var returnJSON = {};
    returnJSON.pipe1 = data.pipe1;
    returnJSON.pipe0 = data.pipe0;
    return returnJSON
}

function makeSettings(data) {
    var returnJSON = {};
    returnJSON.settings = data.settings;
    return returnJSON
}

exports.saveSettings = function (data) {
    console.log('firebase -> saveSettings');

    firebase.database().ref('/settings').set(data, function (error) {
        if (error) {
            console.error(error);
            return 500
        } else {
            console.log('saving settings')
            return 200
        }
    });
}

var DATAPOINTCOUNTER = 0;
var LITERAGECOUNT = 0;
exports.inputNewDataPoint = function (data) {
    var roundedNum = Math.round((data / 12) * 100) / 100
    LITERAGECOUNT += roundedNum
    DATAPOINTCOUNTER++;

    if (DATAPOINTCOUNTER == 11) {
        var now = new Date().getTime();
        var location = 'pipe0/' + now;

        var jsonInput = {
            liters: LITERAGECOUNT,
            timestamp: now
        }

        firebase.database().ref(location).set(jsonInput, function (error) {
            console.log('logging into database -> ' + JSON.stringify(jsonInput));
        });

        DATAPOINTCOUNTER = 0;
        LITERAGECOUNT = 0;
    }
}

function cleanDatabase(data) {
    console.log('cleaning database');
    var now = new Date().getTime();
    for (var key in data.pipe0) {
        if (key > now) {
            console.log(key);
            firebase.database().ref('pipe0/' + key).remove();
        }
    }
    for (var key in data.pipe1) {
        if (key > now) {
            console.log(key);
            firebase.database().ref('pipe1/' + key).remove();
        }
    }
}

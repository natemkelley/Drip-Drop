//establish database connection
var firebase = require('firebase');
var compute = require('./compute.js');

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
    console.log(snapshot.val());
})


exports.test = function () {
    return 'yasss'
}

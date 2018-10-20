var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');


router.get('/test', function (req, res, next) {
    var sendBack = "hey";
    res.send(sendBack);
});


module.exports = router;

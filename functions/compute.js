//from here we update getData
var getData = require('./getData.js');

exports.startCompute = function (data) {
    console.log('compute -> start compute');

    //setData
    getData.setWholeDataSet(data);

    //compute function
    pipesavtime30(data)

    return 'updated data set'
}
exports.returnWholeDataset = function (data) {
    console.log('compute -> returnWholeDataset')
    return WHOLEDATASET
}

async function pipesavtime30(data) {
    var pipes = pipeNames(data);
    var returnJSON = {};
    var stagingArray = [];

    for (var i = 0; i < pipes.length; i++) {
        var obj = data[pipes[i]];
        var sortedObj = sortByDate(obj);
        var checkDate = "";
        var dataPointCount = 0;
        var unique = false;
        var theDailyAverage = 0;
        var theDailyTotal = 0;
        var dayCount = 0;
        for (var key in sortedObj) {
            var date = createDate(sortedObj[key].timestamp);
            var objLiter = sortedObj[key].liters;

            if (date != checkDate) {
                if (unique) {
                    var dayData = {
                        date: checkDate,
                        dayAverage: theDailyAverage
                    }

                    //var stringDot = createStringDot(i, dayData)
                    //setDat(stringDot, dayData);
                    stagingArray[dayCount] = dayData
                    dayCount++;
                    theDailyAverage = 0;
                    theDailyTotal = 0;
                    dataPointCount = 1;
                    unique = false;
                }
            } else {
                unique = true
            }

            dataPointCount++
            theDailyTotal += objLiter;
            theDailyAverage = ((theDailyTotal) / dataPointCount);
            checkDate = date;
        }

        returnJSON['pipe' + i] = limitTo30Days(stagingArray)
    }

    getData.setPipe1AvTime30(returnJSON);

    function limitTo30Days(data) {
        var returnArry = data.slice(Math.max(data.length - 30, 1))
        return returnArry
    }
}

function pipeNames(data) {
    var pipesName = Object.keys(data);
    return pipesName
}

function createDate(dateObj) {
    var dateObj = new Date(dateObj);

    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = year + "/" + month + "/" + day;
    return newdate
}

function sortByDate(obj) {
    const ordered = {};
    Object.keys(obj)
        .sort()
        .forEach(function (v, i) {
            ordered[v] = obj[v];
        });

    return ordered
}

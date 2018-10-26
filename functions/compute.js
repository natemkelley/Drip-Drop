//from here we update getData
var getData = require('./getData.js');

exports.startCompute = function (data) {
    console.log('compute -> start compute');

    //setData
    getData.setWholeDataSet(data);

    //compute function
    pipesavtime30(data);
    pipesbigday(data);
    pipesavmonth(data);

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

        returnJSON['pipe' + i] = limitTo30Days(stagingArray);
    }

    getData.setPipe1AvTime30(returnJSON.pipe1);
    getData.setPipe2AvTime30(returnJSON.pipe2);


    function limitTo30Days(data) {
        var returnArry = data.slice(Math.max(data.length - 30, 1))
        return returnArry
    }

    function createDate(dateObj) {
        var dateObj = new Date(dateObj);

        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        newdate = year + "/" + month + "/" + day;
        return newdate
    }
}
async function pipesbigday(data) {
    var pipes = pipeNames(data);
    var totalUnsortedArray = []

    for (var i = 0; i < pipes.length; i++) {
        var obj = data[pipes[i]];
        var unsortedArray = [];
        var sortedArray = [];

        for (var key in obj) {
            unsortedArray.push(obj[key])
            totalUnsortedArray.push(obj[key])
        }

        sortedArray = sortArrayByLiterage(unsortedArray);
        var limitedArray = limitTo30Days(sortedArray);

        if (i == 0) {
            getData.setPipe1BigDay(limitedArray);
        } else {
            getData.setPipe2BigDay(limitedArray);
        }
    }

    //both pipes combined
    var combinedPipesArray = combinePipes(totalUnsortedArray);
    var totalSortedArray = sortArrayByLiterage(combinedPipesArray);
    var totalLimitedArray = limitTo30Days(totalSortedArray);
    getData.setPipesBigDay(totalLimitedArray);

    function limitTo30Days(data) {
        var returnArry = data.slice(Math.max(data.length - 30, 1))
        //console.log(returnArry)
        return returnArry
    }

    function sortArrayByLiterage(data) {
        var sortedData = data.sort(function (a, b) {
            return a.liters > b.liters;
        });
        return sortedData
    }

    function combinePipes(data) {
        returnArray = [];
        stagingArray = [];
        for (i = 0; i < data.length; i++) {
            var date = data[i].timestamp;

            var newdata = {
                timestamp: data[i].timestamp,
                liters: 0
            }
            if (stagingArray[date] == null) {
                stagingArray[date] = newdata;
                stagingArray[date].liters += data[i].liters;
            } else {
                var oldliters = stagingArray[date].liters
                stagingArray[date].liters = oldliters + data[i].liters;
            }
        }

        for (var key in stagingArray) {
            //console.log(stagingArray[key]);
            returnArray.push(stagingArray[key]);
        }

        return returnArray
    }
}
async function pipesavmonth(data) {
    var pipes = pipeNames(data);
    var returnJSON = {};
    var stagingArray = [];

    for (var i = 0; i < pipes.length; i++) {
        var obj = data[pipes[i]];
        var sortedObj = sortByDate(obj);
        var checkDate = "";
        var dataPointCount = 0;
        var unique = false;
        var theMonthlyAverage = 0;
        var theMonthlyTotal = 0;
        var monthCount = 0;
        for (var key in sortedObj) {
            var date = createDate(sortedObj[key].timestamp);
            var objLiter = sortedObj[key].liters;

            if (date != checkDate) {
                if (unique) {
                    var monthNum = checkDate.split('/')[1];
                    var yearNum = 2018;
                    var monthData = {
                        date: checkDate,
                        monthAverage: (theMonthlyAverage * daysInMonth(yearNum, monthNum))
                    }

                    stagingArray[monthCount] = monthData
                    monthCount++;
                    theMonthlyAverage = 0;
                    theMonthlyTotal = 0;
                    dataPointCount = 1;
                    unique = false;
                }
            } else {
                unique = true
            }

            dataPointCount++
            theMonthlyTotal += objLiter;
            theMonthlyAverage = ((theMonthlyTotal) / dataPointCount);
            checkDate = date;
        }

        returnJSON['pipe' + i] = limitTo30Days(stagingArray);
    }

    getData.setPipe2AvMonth(returnJSON.pipe1);
    getData.setPipe2AvMonth(returnJSON.pipe2);

    function limitTo30Days(data) {
        var returnArry = data.slice(Math.max(data.length - 30, 1));
        return returnArry
    }

    function createDate(dateObj) {
        var dateObj = new Date(dateObj);

        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var year = dateObj.getUTCFullYear();

        newdate = year + "/" + month;
        return newdate
    }
}


function pipeNames(data) {
    var pipesName = Object.keys(data);
    return pipesName
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

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

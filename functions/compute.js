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
    pipebyday(data);

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
async function pipebyday(data) {
    var pipes = pipeNames(data);

    var sundayLiterCount = 0;
    var sundayDayCount = 0;
    var mondayLiterCount = 0;
    var mondayDayCount = 0;
    var tuesdayLiterCount = 0;
    var tuesdayDayCount = 0;
    var wednesdayLiterCount = 0;
    var wednesdayDayCount = 0;
    var thursdayLiterCount = 0;
    var thursdayDayCount = 0;
    var fridayLiterCount = 0;
    var fridayDayCount = 0;
    var saturdayLiterCount = 0;
    var saturdayDayCount = 0;
    var counterFriend = 0;

    var oldDayNum = null;

    for (var i = 0; i < pipes.length; i++) {
        var obj = data[pipes[i]];
        var sortedObj = sortByDate(obj);

        for (var key in sortedObj) {
            var dayNum = createDate(sortedObj[key].timestamp);
            var literage = sortedObj[key].liters;

            if (dayNum == oldDayNum) {
                incrementDay(dayNum, 0, literage);
            } else {
                incrementDay(dayNum, 1, literage);
            }
            oldDayNum = dayNum;
        }


        if (i == 1) {
            getData.setPipe2Weekday(buildDaysJSON());
        } else {
            getData.setPipe1Weekday(buildDaysJSON());
        }
        resetDays();
    }


    function resetDays() {
        sundayLiterCount = 0;
        sundayDayCount = 0;
        mondayLiterCount = 0;
        mondayDayCount = 0;
        tuesdayLiterCount = 0;
        tuesdayDayCount = 0;
        wednesdayLiterCount = 0;
        wednesdayDayCount = 0;
        thursdayLiterCount = 0;
        thursdayDayCount = 0;
        fridayLiterCount = 0;
        fridayDayCount = 0;
        saturdayLiterCount = 0;
        saturdayDayCount = 0;
        counterFriend = 0;
    }

    function createDate(dateObj) {
        var dateObj = new Date(dateObj);
        var day = dateObj.getDay();
        return day
    }

    function incrementDay(dayNum, incDay, literage) {
        switch (dayNum) {
            case 0:
                sundayDayCount += incDay;
                sundayLiterCount += literage
                break;
            case 1:
                mondayDayCount += incDay;
                mondayLiterCount += literage
                break;
            case 2:
                tuesdayDayCount += incDay;
                tuesdayLiterCount += literage
                break;
            case 3:
                wednesdayDayCount += incDay;
                wednesdayLiterCount += literage
                break;
            case 4:
                thursdayDayCount += incDay;
                thursdayLiterCount += literage
                break;
            case 5:
                fridayDayCount += incDay;
                fridayLiterCount += literage
                break;
            case 6:
                saturdayDayCount += incDay;
                saturdayLiterCount += literage
        }
    }

    function buildDaysJSON() {
        var daysJSON = {
            Satuday: {
                saturdayDayCount: saturdayDayCount,
                saturdayLiterCount: saturdayLiterCount,
                dayNum: 6,
                day: "Satuday",
                averageUse: (saturdayLiterCount / saturdayDayCount)
            },
            Friday: {
                fridayDayCount: fridayDayCount,
                fridayLiterCount: fridayLiterCount,
                dayNum: 5,
                day: "Friday",
                averageUse: (fridayLiterCount / fridayDayCount)
            },
            Thursday: {
                thursdayDayCount: thursdayDayCount,
                thursdayLiterCount: thursdayLiterCount,
                dayNum: 4,
                day: "Thursday",
                averageUse: (thursdayLiterCount / thursdayDayCount)
            },
            Wednesday: {
                wednesdayDayCount: wednesdayDayCount,
                wednesdayLiterCount: wednesdayLiterCount,
                dayNum: 3,
                day: "Wednesday",
                averageUse: (wednesdayLiterCount / wednesdayDayCount)
            },
            Tuesday: {
                tuesdayDayCount: tuesdayDayCount,
                tuesdayLiterCount: tuesdayLiterCount,
                dayNum: 2,
                day: "Tuesday",
                averageUse: (tuesdayLiterCount / tuesdayDayCount)
            },
            Monday: {
                mondayDayCount: mondayDayCount,
                mondayLiterCount: mondayLiterCount,
                dayNum: 1,
                day: "Monday",
                averageUse: (mondayLiterCount / mondayDayCount)
            },
            Sunday: {
                sundayDayCount: sundayDayCount,
                sundayLiterCount: sundayLiterCount,
                dayNum: 0,
                day: "Sunday",
                averageUse: (sundayLiterCount / sundayDayCount)
            }
        }
        return daysJSON
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

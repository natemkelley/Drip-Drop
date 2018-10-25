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
    console.log('pipesavtime30')

    var numberOfPipes = Object.keys(data).length;
    var pipesName = Object.keys(data);

    for (var pipeNum = 0; pipeNum < numberOfPipes; pipeNum++) {
        var pipeName = pipesName[pipeNum];
        var pipe = data[pipesName[pipeNum]];
        console.log(pipeName);
        var numberOfYears = Object.keys(pipe).length;
        var yearsName = Object.keys(pipe);

        for (var yearNum = 0; yearNum < numberOfYears; yearNum++) {
            var yearName = yearsName[yearNum];
            var pipe = data[yearsName[yearName]];
        }

    }



    /*for (month = 0; month < 11; month++) {
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
                        var stringDot = createStringDot(year, month, day, hour, minute, second)
                        setDat(stringDot, data)

                        writeDummyData(stringDot, data)
                    }
                }
            }
        }
    }*/

    return 1
}

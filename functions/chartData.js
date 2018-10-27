var Chart = require('chart.js');
var getData = require('./getData.js');


exports.avtime30 = function () {
    var ctx = "av30";
    var chartParams = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Pipe 1',
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                data: [
					],
                backgroundColor: 'rgba(255, 99, 132, 0.05)',
				}, {
                label: 'Pipe 2',
                backgroundColor: 'rgba(54, 162, 235, 0.045)',
                borderColor: chartColors.blue,
                data: [
					],
				}]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Water Usage'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Day'
                    }
					}],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Liters'
                    }
					}]
            }
        }
    }

    var data1 = getData.getPipe1AvTime30();
    var data2 = getData.getPipe2AvTime30();
    var label = make30daylabel(data1);
    var dataset1 = makeLiterage30day(data1);
    var dataset2 = makeLiterage30day(data2);

    chartParams.data.datasets[0].data = dataset1
    chartParams.data.datasets[1].data = dataset2
    chartParams.data.labels = label
    chartParams.ctx = ctx
    return chartParams
}
exports.bigDay = function () {
    var ctx = "bigDay";
    var barChartData = {
        labels: [],
        datasets: [{
            label: 'Pipe 1',
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            borderWidth: 1,
            data: []
			}, {
            label: 'Pipe 2',
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            borderWidth: 1,
            data: []
			}]
    };

    var data1 = getData.getPipe1BigDay();
    var data2 = getData.getPipe2BigDay();

    var label = make30daylabelTimestamp(data1);
    var dataset1 = makeLiterageBigday(data1);
    var dataset2 = makeLiterageBigday(data2);

    var chartParams = {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Days Most Used'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Day'
                    }
					}],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Liters'
                    }
					}]
            }
        }
    }

    chartParams.data.datasets[0].data = dataset1
    chartParams.data.datasets[1].data = dataset2
    chartParams.data.labels = label
    chartParams.ctx = ctx
    return chartParams
}
exports.avMonth = function () {
    var ctx = "avMonth";
    var barChartData = {
        labels: [],
        datasets: [{
            label: 'Pipe 1',
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            borderWidth: 1,
            data: []
			}, {
            label: 'Pipe 2',
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            borderWidth: 1,
            data: []
			}]
    };

    var data1 = getData.getPipe1AvMonth();
    var data2 = getData.getPipe2AvMonth();
    var label = makeMonthLabel(data1);
    var dataset1 = makeLiterageMonthAv(data1);
    var dataset2 = makeLiterageMonthAv(data2);

    var chartParams = {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Liters'
                    }
					}]
            }
        }
    }

    chartParams.data.datasets[0].data = dataset1
    chartParams.data.datasets[1].data = dataset2
    chartParams.data.labels = label
    chartParams.ctx = ctx
    return chartParams
}
exports.weekDay = function () {
    var ctx = "weekDay";
    var barChartData = {
        labels: [],
        datasets: [{
            label: 'Pipe 1',
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            borderWidth: 1,
            data: []
			}, {
            label: 'Pipe 2',
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            borderWidth: 1,
            data: []
			}]
    };

    var data1 = getData.getPipe1Weekday();
    var data2 = getData.getPipe2Weekday();
    var label = makeWeekdayLabel(data1);
    var dataset1 = makeLitersWeekday(data1);
    var dataset2 = makeLitersWeekday(data2);

    var chartParams = {
        type: 'horizontalBar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: 'Day of Week Usage'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Liters'
                    }
					}]
            }
        }
    }

    chartParams.data.datasets[0].data = dataset1
    chartParams.data.datasets[1].data = dataset2
    chartParams.data.labels = label
    chartParams.ctx = ctx
    return chartParams
}
exports.totalByPipe = function () {
    var ctx = "totalByPipe";

    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
					],
                backgroundColor: [
						chartColors.red,
						chartColors.blue
					],
                label: 'Totals'
				}],
            labels: [
					'Pipe 1',
					'Pipe 2'
				]
        },
        options: {
            title: {
                display: true,
                text: 'Total Usage over Time (Liters)'
            },
            responsive: true,
            layout: {
                padding: {
                    left: 15,
                    right: 15,
                    top: 15,
                    bottom: 15
                }
            },
            cutoutPercentage: 39
        }
    };
    config.data.datasets[0].data = computePipeTotals()

    config.ctx = ctx

    return config
}

exports.nowPipe1 = function () {
    var ctx = "nowPipe1";
    var barChartData = {
        labels: [],
        datasets: [{
                label: 'Pipe 1',
                backgroundColor: chartColorsOpacity.red,
                borderColor: chartColors.red,
                borderWidth: 1,
                data: []
			}
        ]
    };

    var chartParams = {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: 'Current Usage - Pipe 1 (HH:MM:SS)'
            },
            tooltips: {
                enabled: false
            },
            hover: {
                mode: null
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Liters'
                    }
					}]
            }
        }
    }

    chartParams.data.datasets[0].data = stumpDataNow();
    chartParams.data.labels = stumpLabelNow();
    chartParams.ctx = ctx
    return chartParams
}
exports.nowPipe2 = function () {
    var ctx = "nowPipe2";
    var barChartData = {
        labels: [],
        datasets: [{
                label: 'Pipe 1',
                backgroundColor: chartColorsOpacity.blue,
                borderColor: chartColors.blue,
                borderWidth: 1,
                data: []
			}
        ]
    };

    var chartParams = {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: 'Current Usage - Pipe 2 (HH:MM:SS)'
            },
            tooltips: {
                enabled: false
            },
            hover: {
                mode: null
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Liters'
                    }
					}]
            }
        }
    }

    chartParams.data.datasets[0].data = stumpDataNow();
    chartParams.data.labels = stumpLabelNow();
    chartParams.ctx = ctx
    return chartParams
}

function randomScalingFactor() {
    var max = 10;
    var min = 1;
    return Math.random() * (max - min) + min;;
}
var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
}
var chartColorsOpacity = {
    red: 'rgba(255, 99, 132, 0.08)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgba(54, 162, 235, 0.09)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
}

function make30daylabel(data) {
    var label = [];

    for (key in data) {
        var date = data[key].date;
        var splitdate = date.split('/');
        var prepForArray = splitdate[1] + "/" + splitdate[2];
        label.push(prepForArray)
    }
    return label
}

function makeMonthLabel(data) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var label = [];

    for (key in data) {
        var date = data[key].date;
        var splitdate = date.split('/');
        var prepForArray = splitdate[1];
        label.push(monthNames[prepForArray])
    }
    return label
}

function make30daylabelTimestamp(data) {
    var label = [];

    for (key in data) {
        var month = new Date(data[key].timestamp).getMonth() + 1;
        var day = new Date(data[key].timestamp).getDay() + 1;
        var date = month + "/" + day;
        label.push(date)
    }

    return label
}

function makeLiterage30day(data) {

    var dataPoints = [];

    for (key in data) {
        var literage = data[key].dayAverage;
        literage = Math.round(literage * 100) / 100;
        dataPoints.push(literage)
    }
    return dataPoints
}

function makeLiterageBigday(data) {
    var dataPoints = [];

    for (key in data) {
        var literage = data[key].liters;
        literage = Math.round(literage * 100) / 100;
        dataPoints.push(literage)
    }
    return dataPoints
}

function computePipeTotals(data) {
    var returnArray = []

    var pipe1 = getData.getPipe1Weekday();
    var pipe2 = getData.getPipe2Weekday()

    var total1 = 0;
    var total2 = 0;

    for (key in pipe1) {
        var literage = pipe1[key];
        for (key2 in literage) {
            if (key2.includes('LiterCount')) {
                total1 += literage[key2];
            }
        }
    }

    for (key in pipe2) {
        var literage = pipe2[key];
        for (key2 in literage) {
            if (key2.includes('LiterCount')) {
                total2 += literage[key2];
            }
        }
    }

    total1 = Math.round(total1 * 100) / 100;
    total2 = Math.round(total2 * 100) / 100;

    returnArray.push(total1)
    returnArray.push(total2)

    return returnArray
}

function makeLiterageMonthAv(data) {
    var dataPoints = [];

    for (key in data) {
        var literage = data[key].monthAverage;
        literage = Math.round(literage * 100) / 100;
        dataPoints.push(literage)
    }
    return dataPoints
}

function makeWeekdayLabel(data) {
    var dataPoints = [];
    for (key in data) {
        dataPoints.push(key)
    }
    return dataPoints
}

function makeLitersWeekday(data) {
    var dataPoints = [];

    for (key in data) {
        var av = data[key].averageUse;
        av = Math.round(av * 100) / 100;

        dataPoints.push(av)
    }
    return dataPoints
}

var CURRENTTIME = [0, 0, 0, 0, 0];

function updatestumpLabelNow() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var second = d.getSeconds();
    var time = hours + ":" + minutes + ":" + second;

    CURRENTTIME.push(time);
    for (i = 0; i < 5; i++) {
        CURRENTTIME[i] = CURRENTTIME[i + 1];
    }
    CURRENTTIME.pop();

    return CURRENTTIME
}

function stumpLabelNow() {
    return CURRENTTIME;
}
var OLDDATAPOINT = [1, 1, 1, 1, 1];

function updatestumpDataNow() {
    var newDataPoint = randomScalingFactor();
    newDataPoint = Math.round(newDataPoint * 100) / 100;
    OLDDATAPOINT.push(newDataPoint);
    for (i = 0; i < OLDDATAPOINT.length; i++) {
        OLDDATAPOINT[i] = OLDDATAPOINT[i + 1];
    }
    OLDDATAPOINT.pop();
    return OLDDATAPOINT

}

function stumpDataNow() {
    return OLDDATAPOINT
}
setInterval(function () {
    updatestumpLabelNow();
    updatestumpDataNow();
}, 5000);

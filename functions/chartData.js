var Chart = require('chart.js');
var getData = require('./getData.js');


exports.test = function () {
    var ctx = "myChart";

    var chartParams = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					],
                fill: false,
				}, {
                label: 'My Second dataset',
                fill: false,
                backgroundColor: chartColors.blue,
                borderColor: chartColors.blue,
                data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
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
                        display: true,
                        labelString: 'Month'
                    }
					}],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
					}]
            }
        }
    }

    chartParams.ctx = ctx
    return chartParams
}

exports.avtime30 = function () {
    var ctx = "myChart";
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
                        display: true,
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

function makeLiterage30day(data) {
    var dataPoints = [];

    for (key in data) {
        var literage = data[key].dayAverage;
        literage = Math.round(literage * 100) / 100
        dataPoints.push(literage)
    }
    return dataPoints
}

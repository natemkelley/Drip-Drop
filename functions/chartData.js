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
    console.log(data2)
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
            }
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

function makeLiterageMonthAv(data) {
    var dataPoints = [];

    for (key in data) {
        var literage = data[key].monthAverage;
        literage = Math.round(literage * 100) / 100;
        dataPoints.push(literage)
    }
    return dataPoints
}

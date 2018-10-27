//load initial chart
$(document).ready(function () {
    loadAv30();
    loadBiggestDays();
    loadAvMonth();
    loadWeekDay();
    loadPipe1Now();
    loadPipe2Now();
    loadTotalByPipe();
});

//runForever
setInterval(function () {
    updatePipe1Now();
    updatePipe2Now();
}, 5000);


function buildChart(params) {
    var ctx = document.getElementById(params.ctx);
    var myChart = new Chart(ctx, params);
}

function loadAv30() {
    var myquery = "/chart-av30";
    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (params) {
            buildChart(params)
        }
    });
}

function loadBiggestDays() {
    $.ajax({
        url: "/chart-bigDay",
        dataType: "json",
        success: function (params) {
            buildChart(params)
        }
    });
}

function loadAvMonth() {
    $.ajax({
        url: "/chart-avMonth",
        dataType: "json",
        success: function (params) {
            buildChart(params)
        }
    });
}

function loadWeekDay() {
    $.ajax({
        url: "/chart-weekDay",
        dataType: "json",
        success: function (params) {
            buildChart(params)
        }
    });
}

function loadTotalByPipe() {
    var myquery = "/chart-nowPipe2";
    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (params) {
            buildChart(params)
        }
    });
}

function updateChart(params) {
    var ctx = document.getElementById(params.ctx);
    var myChart = new Chart(ctx, params);
    myChart.update({
        duration: 300,
        easing: 'easeInOutSine'
    });
}

function loadPipe1Now() {
    var myquery = "/chart-nowPipe1";
    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (params) {
            buildChart(params)
        }
    });
}

function loadPipe2Now() {
    var myquery = "/chart-totalByPipe";
    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (params) {
            buildChart(params)
        }
    });
}

function updatePipe1Now() {
    var myquery = "/chart-nowPipe1";
    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (params) {
            updateChart(params)
        }
    });
}

function updatePipe2Now() {
    var myquery = "/chart-nowPipe2";
    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (params) {
            updateChart(params)
        }
    });
}

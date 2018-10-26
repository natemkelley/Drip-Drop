//load initial chart
$(document).ready(function () {
    loadAv30();
    loadBiggestDays();
    loadAvMonth();
});

function buildChart(params) {
    var ctx = document.getElementById(params.ctx);
    console.log(params.ctx)
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
            //console.log(params);
            buildChart(params)
        }
    });
}

function getLiveData() {

}

function loadAvMonth() {
    $.ajax({
        url: "/chart-avMonth",
        dataType: "json",
        success: function (params) {
            console.log(params);
            buildChart(params)
        }
    });
}

function daysMostUsed() {

}


function fakeUpdate(myChart) {
    /* myChart.options = {
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
     myChart.update({
         duration: 800,
         easing: 'easeOutBounce'
     });*/

}

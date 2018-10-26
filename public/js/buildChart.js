//load initial chart
var myquery = "/chart-av30";
$.ajax({
    url: myquery,
    dataType: "json",
    success: function (params) {
        console.log(params);
        buildChart(params)
    }
});

$.ajax({
    url: "/chart",
    dataType: "json",
    success: function (params) {
        console.log(params);
        //buildChart(params)
    }
});


function buildChart(params) {
    var ctx = document.getElementById(params.ctx);
    console.log(params.ctx)
    var myChart = new Chart(ctx, params);

    //https://www.chartjs.org/docs/latest/developers/api.html
    setTimeout(function () {
        fakeUpdate(myChart);
    }, 3000);
}

function fakeUpdate(myChart) {
    myChart.options = {
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
    });

}

//load initial chart
var myquery = "/chart";
$.ajax({
    url: myquery,
    dataType: "json",
    success: function (params) {
        console.log(params);
        buildChart(params)
    }
});

function buildChart(params) {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, params);


    //https://www.chartjs.org/docs/latest/developers/api.html
    setTimeout(function () {
        fakeUpdate(myChart);
    }, 3000);


}

function fakeUpdate(myChart) {
    myChart.options = {
        title: {
            display: true,
            text: 'Chart.js'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    myChart.update({
        duration: 800,
        easing: 'easeOutBounce'
    });

}

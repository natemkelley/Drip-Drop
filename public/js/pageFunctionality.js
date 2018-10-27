//initialize page
$(document).ready(function () {
    $('select').formSelect();
    refreshInputs();
    sizeStackedCharts();
    $('.sidenav').sidenav();
});

$(window).resize(function () {
    sizeStackedCharts()
});

$(window).scroll(function () {
    startPulse()
});

(function () {
    //event handlers
    $("select").change(function () {
        refreshInputs();
    })

    $("input").focus(function () {
        console.log("Handler for .focus() called.");
        INPUTCHANGE = true;
        $('.save-changes').removeClass('disabled');
    });

    $(".save-changes").click(function () {
        $('.save-changes').addClass('disabled');
    });


}());

function refreshInputs() {
    $('.input-field').hide()
    $("select option:selected").each(function () {
        var val = ($(this).val());
        $('.input-' + val + '-section').show()
    });
}

function sizeStackedCharts(time) {
    if (time == null) {
        time = 200;
    }
    setTimeout(function () {
        var siblingHeight = $('.s9 .chart-container').parent().height();
        $('.row .s3').height(siblingHeight);
    }, time);
}

function refreshGraphs() {
    loadAv30();
    loadBiggestDays();
    loadAvMonth();
    loadWeekDay();
    updatePipe1Now();
    updatePipe2Now();

    M.toast({
        html: 'Updated Graphs!',
        classes: 'rounded'
    })

}

var scrolling = false;
var timer;

function startPulse() {
    addPulse();
    clearTimeout(timer); //cancel the previous timer.
    timer = null;

    timer = setTimeout(function () {
        removePulse();
    }, 800);
}

var oldColor = "red";

function removePulse() {
    $('.pulse').removeClass(oldColor);
    var newColor = randomColor();
    oldColor = newColor;
}

function addPulse() {
    $('.pulse').addClass(oldColor)
}

function randomColor() {
    var chartColors = [
     'red',
    'yellow',
     'purple',
    'orange',
     'pink',
    'lime', 'cyan','amber','deep-orange'
    ]
    var rando = chartColors[Math.floor(Math.random() * chartColors.length)]
    return rando;
}

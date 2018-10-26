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

//initialize page
$(document).ready(function () {
    pushpin();
    $('select').formSelect();
    refreshInputs();
    sizeStackedCharts();
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
        $('.save-changes').addClass('disabled')
    });


}());

function refreshInputs() {
    $('.input-field').hide()
    $("select option:selected").each(function () {
        var val = ($(this).val());
        $('.input-' + val + '-section').show()
    });
}

function pushpin() {
    $('.pushpin-demo-nav').each(function () {
        var $this = $(this);
        var $target = $('#' + $(this).attr('data-target'));

        $this.pushpin({
            top: $target.offset().top,
            bottom: $target.offset().top + $target.outerHeight() - $this.height()
        });
    });
}

function sizeStackedCharts(time) {
    if(time ==null ){
        time = 200;
    }
    setTimeout(function () {
        var siblingHeight = $('.s9 .chart-container').parent().height();
        $('.row .s3').height(siblingHeight);
    }, time);
}

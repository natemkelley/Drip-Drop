//initialize page
$(document).ready(function () {
    $('select').formSelect();
    refreshInputs();
    pushpin();
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
    console.log('wokring')
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

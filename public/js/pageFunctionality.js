//initialize page
$(document).ready(function () {
    $('select').formSelect();
    refreshInputs();
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

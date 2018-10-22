//initialize page
$(document).ready(function () {
    $('select').formSelect();
    refreshInputs();
});

$("select").change(function () {
    refreshInputs();
})

function refreshInputs() {
    console.log('wokring')
    $('.input-field').hide()
    $("select option:selected").each(function () {
        var val = ($(this).val());
        $('.input-' + val + '-section').show()
    });
}

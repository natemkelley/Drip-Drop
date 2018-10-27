$(document).ready(function () {
    getSettings()
});

$(".save-changes").click(function () {
    setSettings();
    $('.save-changes').addClass('disabled');
});

function setSettings() {
    var jsonSend = {
        litersAlert: $('#liters').val(),
        timerAlert: $('#minutes').val()
    }

    $.ajax({
        type: "POST",
        url: "changeAlert",
        data: JSON.stringify(jsonSend),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getSettings() {
    $.getJSON('/getSettings', function (data) {
        $('#minutes').val(data.timer);
        $('#liters').val(data.liters);

        $('.input-field label').addClass('active');
    });


}

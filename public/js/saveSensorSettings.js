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
            M.toast({
                html: 'Updated settings!',
                classes: 'rounded'
            })
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

        if (data.timer) {
            $('#timerOpt').attr('selected', 'selected');
        }

        if (data.liters) {
            $('#usageOpt').attr('selected', 'selected');
        }

        $('.input-field label').addClass('active');
        $('select').formSelect();
        refreshInputs();
    });
}

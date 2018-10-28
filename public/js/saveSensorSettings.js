$(document).ready(function () {
    getSettings()
    checkPipeError();
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

function checkPipeError() {
    console.log('checkPipeError');
    var showToast = true;

    setInterval(function () {
        console.log('gettingCheckPipeError')
        $.getJSON('/checkPipeError', function (data) {
            console.log(data)
            if (data.status == 500) {
                if (showToast) {
                    M.toast({
                        html: 'Meter Error! Inaccurate Reading.',
                        classes: 'red darken-1 rounded'
                    })
                    showToast = false
                    updateShowTrue();
                }
            }
        });
    }, 5000);

    function updateShowTrue() {
        setTimeout(function () {
            showToast = true;
        }, 10000);
    }
}

function getExecutingSolenoid() {
    setInterval(function () {
        $.ajax({
            url: 'executingSolenoid',
            dataType: "json",
            success: function (params) {
                showToast(params)
            }
        });
    }, 1100);

    function showToast(data) {
        console.log(data)
        if (data == true) {
            M.toast({
                html: 'Executing Solenoid!',
                classes: 'green accent-3 rounded'
            })
        }
    }
}

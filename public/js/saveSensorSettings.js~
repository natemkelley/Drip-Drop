$(document).ready(function () {
    getSettings()
    checkPipeError();
    getExecutingSolenoid();
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
    changeFlowRate();
}

function changeFlowRate() {
    var requireFlowJSON = {
        required: true
    }

    var checkbox = $('.switch input:checkbox:checked');
    if (checkbox.length) {
        requireFlowJSON.required = false
    }

    $.ajax({
        type: "POST",
        url: "requireWaterFlow",
        data: JSON.stringify(requireFlowJSON),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
				console.log('flow rate req changed')
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
    var showToast = true;

    setInterval(function () {
        $.getJSON('/checkPipeError', function (data) {
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
        }, 13000);
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
        if (data == true) {
            M.toast({
                html: 'Executing Solenoid!',
                classes: 'green accent-4 rounded'
            })
        }
    }
}

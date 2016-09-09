define([
    "jquery",
    "jQvalidation",
    "jQmessage",
    "jQvalidationRule",
    "plugins/miscs"
], function ($, jQvalidation, jQmessage, jQvalidationRule, miscs) {
    var VALIDATION_OPTIONS = {
        submitHandler: function (form) {
            form.submit();
        },

        errorPlacement: function (errors, element) {
            miscs.validation_errorHandle(errors, element);
        },

        unhighlight: function (element) {
            miscs.validation_unhighlight(element);
        },

        focusCleanup: false,
        focusInvalid: false,
        ignore: ".chzn-search input",
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            var ctx = event.target;
            if (errors) {
                var message = "<li>表单中有错误，请完善表单后再提交。</li>";
                if (!ctx) {
                    $("ul.error_container", "#error_message").html(message);
                    $("#error_message").show();
                } else {
                    $("ul.error_container", ctx).html(message);
                    $(".error_message", ctx).show();
                }
            } else {
                if (!ctx) {
                    $("div.error", "#error_message").hide();
                } else {
                    $("div.error", ctx).hide();
                }
            }
        },

        onkeyup: function () {
            //please do not delete this method
        },
        debug: true
    };

    return {
        init: function () {
            $.validator.setDefaults(VALIDATION_OPTIONS);
        }
    };
});
define(["jquery", "blockUI", "config"], function ($, blockUI, config) {
    $.blockUI.defaults = $.extend({}, $.blockUI.defaults, {
        message: "<img src='" + config.ctx + "/resources/img/loading.gif'>",
        overlayCSS: {
            backgroundColor: "#f1f1f1",
            opacity: "0.6"
        },
        css: {
            border: "0",
            backgroundColor: "transparent"
        }
    });

    return {

        block: function () {
            var e = arguments.length > 0 ? arguments[0] : undefined;
            if (e) {
                $(e).block();
            } else {
                $.blockUI();
            }
        },

        unblock: function () {
            var e = arguments.length > 0 ? arguments[0] : undefined;
            if (e) {
                $(e).unblock();
            } else {
                $.unblockUI();
            }
        }
    };
});

define([
    "jquery",
    "plugins/validation",
    "plugins/datepicker",
    "plugins/citySelector",
    "plugins/pagingSelector",
    "plugins/ajaxfileupload",
    "plugins/miscs",
    "plugins/message",
    "plugins/helper",
    "plugins/dateFormat",
    "plugins/numberFormat",
    "plugins/ajaxlogin",
    "plugins/cometd",
    "plugins/mask",
    "plugins/compatible",
    "config",
    "scrollbar"
], function ($, validation, datepicker, citySelector, pagingSelector, ajaxfileupload, miscs, message, helper, dateFormat, numberFormat,ajaxlogin, cometd, mask, compatible, config, scrollbar) {
    return {
        init: function () {
//            cometd.comet.join();
            miscs.minheight();
            validation.init();
            datepicker.init();
            citySelector.init();
            pagingSelector.init();
            miscs.autoIframeHeight();
            miscs.uploadify();
            miscs.hoverDelay();
            miscs.mCustomScrollbar();
            miscs.choosenModify();
            message.init();
            ajaxlogin.init();
            ajaxfileupload.init();
        }
    }
});
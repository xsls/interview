define(
    [    "jquery"
        , "modules/freight/bookingconfirm"
        , "modules/freight/bookrun"
        , "modules/freight/scheight"
        , "modules/freight/timer"
        , "modules/freight/push"
        , "modules/freight/list"
        , "modules/freight/detail"
        , "modules/freight/console"
    ],
    function ($, bookingconfirm, bookrun, scheight, timer, push, list, detail, freightConsole) {
        return {
            init: function () {
                if ($(".bookingconfirm_view").length > 0) {
                    bookingconfirm.init();
                    bookrun.init();
                    scheight.init();
                    timer.init();
                }

                if ($(".freight_push_page").length > 0) {
                    push.init();
                }

                if ($(".freight_list_page").length > 0) {
                    list.init();
                }

                if ($(".freight_detail_page").length > 0) {
                    detail.init();
                }
                if ($(".freight_console_page").length > 0) {
                    freightConsole.init();
                }

            }
        };

    });
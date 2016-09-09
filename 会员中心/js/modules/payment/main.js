/**
 * 
 */
define(["jquery", "modules/payment/list"], function ($, list, detail) {
        return {
            init: function () {

                if ($(".payment_list_page").length > 0 ) {
                    list.init();
                }
            }
        };

});
/**
 * 运单管理
 * Created by liuchuangui on 2014/4/19.
 */
define(["jquery", "modules/order/list", "modules/order/detail"], function ($, list, detail) {
        return {
            init: function () {

                if ($(".order_list_page").length > 0 ) {
                    list.init();
                }

                if ($(".order_detail_page").length > 0 ) {
                    detail.init();
                }

            }
        };

});
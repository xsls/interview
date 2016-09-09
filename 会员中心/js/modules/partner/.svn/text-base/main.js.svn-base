/**
 * 我的业务伙伴
 */
define(["jquery","modules/partner/list","modules/partner/edit","modules/partner/add"],
    function ($,list,edit,add) {
        return {
            init: function () {
                if ($(".mypartnerlist").length > 0 ) {
                	list.init();
                }
                if ($(".partner_detail").length > 0||$(".partner_edit").length > 0||$(".company_detail").length > 0) {
                	edit.init();
                }
                if ($(".add_mypartner").length > 0 ) {
                	add.init();
                }
            }
        };

    });
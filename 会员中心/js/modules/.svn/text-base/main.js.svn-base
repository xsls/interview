
define(["modules/freight/main", "modules/register", "modules/order/main","modules/companyageCert/cert","modules/truck/main",
        "modules/userManager/userinfo","modules/companyageCert/person","modules/feedback/main","modules/organization/list",
        "modules/resetpwd","modules/homepage/main","modules/complaint/complaint", "modules/framework/framework",
        "modules/partner/main","modules/deport/depot","modules/relatePerson/relatePerson",
        "modules/userManager/userManager","modules/report/report",
        "modules/projectManage/projectManage",
        "modules/projectManage/projectList",
        "modules/billing/main",
        "modules/payment/main"
        ],
		
		function (freight, register, order,cert, truck, 
				  user,person,feedback,organization,resetpwd,
				  homepage,complaint,framework,partner,
				  depot,relatePerson,userManager,report,projectManage,projectList,billing, payment) {
    return {
        init: function () {
            freight.init();
            register.init();
            order.init();
            cert.init();
            truck.init();
            user.init();
            if($(".project_create_page").length>0){
            	projectManage.init();
            }
            if($(".project_manage_list_page").length>0){
            	projectList.init();
            }
            billing.init();
            if($(".org-manage").length>0){
            	organization.init();
            }
            if($(".company-person-div").length>0 ){
            	 person.init();
            }
            if($(".report_uc_excel").length>0){
            	report.init();
            }
            if($("#div-relatePerson").length>0){
            	relatePerson.init();
            }
            
            if($("#userManager").length>0){
            	 userManager.init();
            }
            if($("#divCompany").lenth>0){
            }
            feedback.init();
            resetpwd.init();
            homepage.init();
            if($("#div-depot").length>0){
            	depot.init();
            }
            
            if($(".sitenav").length > 0){
                framework.init();
            }
            partner.init();
            if($("#complaint-feedback-page-load").length > 0){
                complaint.init();
            }
            payment.init();
            
        }
    };
});
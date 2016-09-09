/**
 * 订单列表
 * Created by liuchuangui on 2014/4/19.
 */
define(["jquery","jQvalidation", "jQmessage", "plugins/validation","plugins/miscs", "config"], function($,validator, message, validationRule, miscs, config) {

    /* 翻页提交表单 */
    var page_submit = function (pageNumber) {
        var $pageNumber = $("#pageNumber");
        if ($pageNumber.length > 0) {
            $("input[name=pageNumber]").val(pageNumber);
        } else {
            $(".page_submit").append('<input name="pageNumber" value="' + pageNumber + '" type="hidden" />');
        }
        $(".page_submit").submit();
    };

    return {
        init: function () {
            
            /* 展开关闭 */
            $("#search_collapse", ".billing_list_page").on("click", function () {
                var isColl = $("input[name=isCollapsed]");
                var $parentDiv = $(this).parent("div");
                if (isColl.val() == "true") {
                    isColl.val("false");
                    $(".formlist li:gt(1)").addClass("hide");
                } else {
                    isColl.val("true");
                    $(".formlist li:gt(1)").removeClass("hide");
                }
                $parentDiv.toggleClass("basic-search");
                $parentDiv.toggleClass("full-search");
            });

            /* 查询 */
            $("#search_btn", ".billing_list_page").on("click", function () {
            	$("input[name=barStatus]").val("");
                $(".page_submit").submit();
            });
            
            /* 结算*/
            $("a[name=paymentBilling]", ".billing_list_page").on("click", function (e) {
            	var billingId = $(e.target).data("billingId");
            	$.post(ctx+"/billing/detail",{"billingId":billingId},function(data){
            		if(data){
            			$("#billingId").val(data.id);
            			$("#billingNo").html(data.billingNo);
            			$("#address").text(data.order.fromCommAddrName+"-"+data.order.toCommAddrName);
            			$("#goodsName").text(data.order.goodsName);
            			$("#price").text(data.order.unitPrice+data.order.measureUnitName);
            			$("#truckLicenseNo").text(data.order.truckLicenseNo);
            			$("#carrierUserName").text(data.order.carrierUserName);
            			$("#driverPhone").text(isEmpty(data.order.driverPhone));
            			$("#receiptsTargetBankName").text(isEmpty(data.order.receiptsTargetBankName));
            			$("#receiptsTargetBankAccountNo").text(isEmpty(data.order.receiptsTargetBankAccountNo));
            			
            			$("#huosun").text(data.loadingNetWeight-data.unloadingNetWeight);
            			if(null==data.order.calculatedFee||data.order.calculatedFee=="null"){
            				data.order.calculatedFee=data.unloadingNetWeight*data.order.unitPrice;
            			}
            			if(null==data.order.confirmedFee||data.order.confirmedFee=="null"){
            				data.order.confirmedFee=data.order.calculatedFee;
            			}
            			$("#calculatedFeeLab").text(data.order.calculatedFee+" 元");
            			
            			$("#payment").popup();
            			$("#loadingNetWeight").val(isEmpty(data.loadingNetWeight));
            			$("#unloadingNetWeight").val(isEmpty(data.unloadingNetWeight));
            			$("#confirmedFee").val(data.order.confirmedFee);
            			
            			
            		}else{
            			miscs.alert({
                            title: "结算运费",
                            msgTitle: "结算运费失败!",
                            msgInfo: "结算运费出现异常,可能已在付款中",
                            iconCls: "inoti",
                            sing: true,
                            cancelBtn: "关闭"
                        });
            		}
            	});
            	
            });
            
            
            /* 关闭结算单 */
            $("a[name=closeBilling]", ".billing_list_page").on("click", function (e) {
            	miscs.alert({
                    width: 440,
                    title: "关闭结算单",
                    msgTitle: "您确定要关闭结算单吗!",
                    msgInfo: "请慎重关闭结算单！",
                    sign: true,
                    iconCls: "inoti",
                    successBtn: "确认",
                    cancelBtn: "取消",
                    success:function(){
                    	var billingId = $(e.target).data("billingId");
                    	$.get(ctx+"/billing/closeBilling",{"billingId":billingId},function(data){
                    		if(data=="success"){
                    			$("#closeBillingDiv"+billingId).html('<p class="fl w4em">结算关闭</p>');
                    			$("#closeBillingTd"+billingId).html('<i class="greyrec dib mr5"></i><span class="ft77">结算关闭</span>');
                    			miscs.alert({
    	                            title: "关闭结算单",
    	                            msgTitle: "关闭结算单成功!",
    	                            msgInfo: "您已成功关闭结算单。",
    	                            iconCls: "iok",
    	                            sing: true,
    	                            cancelBtn: "关闭"
    	                        });
                    		}else{
                    			miscs.alert({
    	                            title: "关闭结算单",
    	                            msgTitle: "关闭结算单失败!",
    	                            msgInfo: "关闭结算单出现异常,可能已在付款中",
    	                            iconCls: "inoti",
    	                            sing: true,
    	                            cancelBtn: "关闭"
    	                        });
                    		}
                    	});
                    },
                    cancel: function(){}
                });
            });
            
            
            $(".billingPayment",".billing_list_page").on("click",function(e){
            	$.post(ctx+"/billing/billingPayment",$("#billingPayment").serialize(),function(data){
            		$("#payment").popup({close:true});
            		if(data=="success"){
            			var billingId = $("#billingId").val();;
            			$("#closeBillingDiv"+billingId).html('<p class="fl w4em"><a href="" class="ftblue">支付中</a></p>');
            			$("#closeBillingTd"+billingId).html('<i class="yellowrec dib mr5"></i><span class="ft77">支付中</span>');
            			$(".ofh").find("li[name=1]").find("font").text($(".ofh").find("li[name=1]").find("font").text()-1);
            			$(".ofh").find("li[name=21]").find("font").text($(".ofh").find("li[name=21]").find("font").text()-1+2);
            			miscs.alert({
                            title: "结算运单",
                            msgTitle: "结算运单成功!",
                            msgInfo: "您的运单已结算，正在支付中",
                            iconCls: "iok",
                            sing: true,
                            cancelBtn: "关闭"
                        });
            		}else{
            			miscs.alert({
                            title: "结算运单",
                            msgTitle: "结算运单失败!",
                            msgInfo: "结算运单出现异常,可能已在付款中",
                            iconCls: "inoti",
                            sing: true,
                            cancelBtn: "关闭"
                        });
            		}
            	});
            });
            
            /* 查询 */
            $(".ofh li", ".billing_list_page").on("click", function (e) {
            	var barStatus = $(e.target).data("billingPaymentStatusId");
            	$("input[name=barStatus]").val(barStatus);
                $(".page_submit").submit();
            });
            
          
            
            /* 页面加载 是否打开搜索栏 */
            if ($("input[name=isCollapsed]", ".billing_list_page").val() == "true") {
                $("input[name=isCollapsed]").val("false");
                $("#search_collapse").click();
                $(".formlist li:gt(1)").removeClass("hide");
            }

            /* 分页提交数据 */
            $(".page_a", ".billing_list_page").on("click", function(e){
                var pageNumber = $(e.target).data("pageNumber");
                page_submit(pageNumber);
            });

            /* 初始化select */
            $("[name=freightId]").trigger("chosen:updated").chosen().next().css({"width":"306px"});
            $("[name=creator]", ".billing_list_page").next().css({"width":"129px"});
            $("[name=billingPaymentStatus]", ".billing_list_page").next().css({"width":"129px"});
            $("[name=payerOrgId]", ".billing_list_page").next().css({"width":"306"});


            
            /*诚信等级*/
	        $("[name=sincerity_level]").each(function(i, o){
	        	$(o).after(miscs.calcLevel({level:$(o).val(),type:"user"}));
	        });
	        
	        //JS 去空格
	    	function isEmpty(value){
	        	if(null==value||"null"==value){
	        		return "";
	        	}
	        	return value;
	        }
	    	
	    	
	    	//显示物流承包公司下拉信息
			var showCompanyList=function(){
					$("input[name=payerOrgName]").on("keyup", function(e){
						miscs.initSingleOrgList($(this),{
						  id:"org_relator_list"
						});
					});

					//选择本公司以外的公司
					 $("#org_relator_list").on("click", "li", function(e){
						  var $this = $(e.target);
						  var orgId= $this.data("org-id");
						  var orgName= $this.data("org-name");
						  $("[name=payerOrgName]").val(orgName);
	                      $("[name=payerOrgId").val(orgId);
	                      $(".relate-org-box").addClass("hide");
					 });
					 //选择本公司
					 $("#org_relator_list").on("click", "p", function(e){
						  var $this = $(e.target);
						  var orgId= $this.data("org-id");
						  var orgName= $this.data("org-name");
						  $("[name=payerOrgName]").val(orgName);
	                      $("[name=payerOrgId").val(orgId);
	                      $(".relate-org-box").addClass("hide");
					 });
			};
			
			showCompanyList();
	    	
	        
	        $(function(){
	        	$(".graytab-table tbody tr").hover(
	        		function(){
	        			$(this).addClass("cur");
	        		},function(){
	        			$(this).removeClass("cur")
	        		}
	        	);
	        	// 点击表格行
	        	$(".checkTd").on("click",function(){
	        		if (!$(this).parent().hasClass("current"))
	        		{
	        			$(this).parent().addClass("current");
	        		if($(this).parent().find(".i15").hasClass("ico-check1"))
	        		{
	        			$(this).parent().find(".i15").removeClass("ico-check1").addClass("ico-check3");
	        		}
	        		else
	        		{
	        			$(this).parent().find(".i15").addClass("ico-check1").removeClass("ico-check3");
	        		}
	        		}
	        		else
	        		{
	        			$(this).parent().removeClass("current");
	        			if($(this).parent().find(".i15").hasClass("ico-check1"))
	        		{
	        			$(this).parent().find(".i15").removeClass("ico-check1").addClass("ico-check3");
	        		}
	        		else
	        		{
	        			$(this).parent().find(".i15").addClass("ico-check1").removeClass("ico-check3");
	        		}
	        			
	        		}
	        		
	        	});
	        	
	        	//全选
	        	$(".all_check").on("click",function(){
	        		
	        		if($(this).hasClass("ico-check1") || $(this).hasClass("ico-check2") )
	        		{
	        			$(this).removeClass("ico-check1").addClass("ico-check3");
	        			$(".single_check").removeClass("ico-check1").addClass("ico-check3");
	        			$(".single_check").parents("tr").addClass("current");
	        		}
	        		else
	        		{
	        			$(this).addClass("ico-check1").removeClass("ico-check3");
	        			$(".single_check").addClass("ico-check1").removeClass("ico-check3");
	        			$(".single_check").parents("tr").removeClass("current");
	        		}
	        	})
	        	$(".graytab-table").on("mouseover",".pay-opr",function(){
	        		$(".graytab-table").find(".pay-opr").removeClass("cur");
	        		$(".graytab-table").find(".triangle-p").addClass("hide");
	        		$(".graytab-table").find(".pay-opr").find("em").html("|");
	        		$(".graytab-table td").removeClass("z50");
	        		
	        		var that = $(this);
	        		that.addClass("cur");
	        		that.find(".triangle-p").removeClass("hide");
	        		that.find(".pay-opr").find("em").html("");
	        		that.parents("td").addClass("z50");
	        	})
	        	$(".graytab-table").on("mouseleave",".pay-opr",function(){
	        		var that = $(this);
	        		that.removeClass("cur");
	        		that.find(".triangle-p").addClass("hide");
	        		that.find(".pay-opr").find("em").html("|");
	        		that.parents("td").removeClass("z50");
	        	})
	        	
	        });

        }
    };
});


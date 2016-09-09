/**
 * 
 */
define(["jquery","jQvalidation", "jQmessage", "plugins/validation","plugins/miscs", "config"], function($,validator, message, validationRule, miscs, config) {
    
    /* 翻页提交表单 */
    var page_submit = function (pageNumber) {
        var href = window.location.href;
        if (href.indexOf("stayList") != -1) {
            var index = href.indexOf("/order");
            var stayStatus = href.substr(index + 7, 1);		//获取便利提醒状态
            document.location = config.ctx + "/order/" + stayStatus + "/" + pageNumber + "/stayList";
        } else {
            var $pageNumber = $("#pageNumber");
            if ($pageNumber.length > 0) {
                $("input[name=pageNumber]").val(pageNumber);
            } else {
                $(".page_submit").append('<input name="pageNumber" value="' + pageNumber + '" type="hidden" />');
            }
            $(".page_submit").submit();
        }
    };
    
    var closePayment = function(id){
 	   $.ajax({
 		   type: "POST",
            url: config.ctx + "/payment/closePayment",
            data: {"paymentId": id},
            dataType: "json",
            success: function (data) {
            	if(data==0){
            		//页面重新加载
            		location.reload();
            	}else{
            		miscs.alert({
                        title: "确认关闭",
                        msgTitle: "确认关闭失败!",
                        msgInfo: "支付单可能已被支付！",
                        iconCls: "inoti",
                        sing: true,
                        cancelBtn: "关闭"
                    });
            	}
            },
            error: function () {
         	miscs.alert({
              title: "确认关闭",
              msgTitle: "确认关闭失败!",
              msgInfo: "支付单可能已被支付！",
              iconCls: "inoti",
              sing: true,
              cancelBtn: "关闭"
          });
       }
 	});
  };
    //关闭结算单
    window.miscs = miscs;
    var closedPayment=function(id){
    	 miscs.alert({
    		 
    		 	title: "关闭结算单",msgTitle: "确认关闭结算单吗 ？",iconCls: "iok",successBtn: "确认",cancelBtn: "取消",
    	        success:function(){
    	        	closePayment(id);
    	             //successBtn回调
    	        },
    	        cancel: function(){
    	        	//cancel回调
    	        }
    	   });
    };
   
    //付款 或者 批量付款
    var payfee = function(e){
    	 document.location = config.ctx + "/payment/payfee";
    };
    
    return {
        init: function () {

            /* 展开关闭 */
            $("#search_collapse", ".payment_list_page").on("click", function () {
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
            $("#search_btn", ".payment_list_page").on("click", function () {
                $("#search_form").submit();
            });

            /* 页面加载 是否打开搜索栏 */
            if ($("input[name=isCollapsed]", ".payment_list_page").val() == "true") {
                $("input[name=isCollapsed]").val("false");
                $("#search_collapse").click();
                $(".formlist li:gt(1)").removeClass("hide");
            }

            /* 分页提交数据 */
            $(".page_a", ".payment_list_page").on("click", function(e){
                var pageNumber = $(e.target).data("pageNumber");
                page_submit(pageNumber);
            });
            
            //关闭支付单
            $(".closePayment", ".payment_list_page").on("click", function(e){
            	closedPayment($(e.target).data("pay-id"));
            });
            
            //付款
            $(".payfee", ".payment_list_page").on("click", function(e){
            	//payfee($(e.target).data("pay-id"));  input[name=single_check]
            	var payIds = [];
                var flag = false;
               // alert($(e.target).data("pay-id"));
               // $(".ico-check3").each(function (e) {
                   //alert(i+"--"+o.id);
              //  	alert($(e.target).data("pay-id"));
               // });
                payfee($(e.target).data("pay-id"));
            });
            /* 初始化select */
           // $("[name=freightId]").trigger("chosen:updated").chosen().next().css({"width":"306px"});
            $("[name='payerOrgId']", ".payment_list_page").next().css({"width":"306px"});
            $("[name=payerOpid]", ".payment_list_page").next().css({"width":"129px"});
            /*$("[name=status]", ".order_list_page").next().css({"width":"129px"});
            $("[name=relator]").children()[0].value =  "4";
            $("[name=relator]").children()[0].text =  "请选择";*/
            /*$("[name=relator]").prop("data-placeholder",null).trigger("chosen:updated").chosen().next().css({"width":"80px"});
            $("[name=createUserId]", ".order_list_page").next().css({"width":"129px"});
            
            $("[name='status']").add("[name='order_status']").attr("data-placeholder","运单状态");
            $("[name='status']").add("[name='order_status']").trigger("chosen:updated");
            $("[name='status']").add("[name='order_status']").chosen();*/
            $("select[name='payerOrgId']").val(2).trigger("chosen:updated").chosen();
            $("select[name='payerOpid']").val(2).trigger("chosen:updated").chosen();
          
           
            
            $(".ico-sbplus").click(function(){
        		$(".formlist li").removeClass("hide");
        		$(".uc-searchbox").removeClass("basic-search").addClass("full-search");
        	});
        	
        	$(".graytab-table tbody tr").hover(
        		function(){
        			$(this).addClass("cur");
        		},function(){
        			$(this).removeClass("cur")
        		}
        	);
        	// 点击表格行
        	$(".graytab-table tbody tr").on("click",function(){
        		if (!$(this).hasClass("current"))
        		{
        			$(this).addClass("current");
        		if($(this).find(".i15").hasClass("ico-check1"))
        		{
        			$(this).find(".i15").removeClass("ico-check1").addClass("ico-check3");
        		}
        		else
        		{
        			$(this).find(".i15").addClass("ico-check1").removeClass("ico-check3");
        		}
        		}
        		else
        		{
        			$(this).removeClass("current");
        			if($(this).find(".i15").hasClass("ico-check1"))
        		{
        			$(this).find(".i15").removeClass("ico-check1").addClass("ico-check3");
        		}
        		else
        		{
        			$(this).find(".i15").addClass("ico-check1").removeClass("ico-check3");
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
        	});
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
        	});
        	$(".graytab-table").on("mouseleave",".pay-opr",function(){
        		var that = $(this);
        		that.removeClass("cur");
        		that.find(".triangle-p").addClass("hide");
        		that.find(".pay-opr").find("em").html("|");
        		that.parents("td").removeClass("z50");
        	});
            
        }
    };
});


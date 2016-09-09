/**
 * 订单列表
 * Created by liuchuangui on 2014/4/19.
 */
define(["jquery","jQvalidation", "jQmessage", "plugins/validation","plugins/miscs", "config"], function($,validator, message, validationRule, miscs, config) {
    /* 设置弹窗信息(取消订单、评价车主、投诉车主)*/
    var setPopupInfo = function (_this, status) {
        var orderId = _this.data("orderId");
        var orderNo = _this.data("orderNo");
        var shipperAddrName = _this.data("shipperAddrName");
        var consigneeAddrName = _this.data("consigneeAddrName");
        var trucklicenseNo = _this.data("trucklicenseNo");
        var truckModel = _this.data("truckModel");
        var driverName = _this.data("driverName");
        var driverSincerityLevel = _this.data("driverSincerityLevel");
        $("#crelevel_"+status).html(miscs.calcLevel({
            level:driverSincerityLevel,
            type:"user"
        }));
        $("input[name=order_popup_" + status + "_orderId]").val(orderId);
        $("#order_popup_" + status + "_orderNo").text(orderNo);
        $("#order_popup_" + status + "_shipperAddrName").text(shipperAddrName);
        $("#order_popup_" + status + "_consigneeAddrName").text(consigneeAddrName);
        $("#order_popup_" + status + "_truckModel").text(truckModel);
        $("#order_popup_" + status + "_truckLicenseNo").text(trucklicenseNo);
        $("#order_popup_" + status + "_driverName").text(driverName);
        if(status=="feedback"){
        	$("input[name=order_popup_dirverId]").val(_this.data("carrierId"));//评价的对象
        	$("#order_popup_feedback").popup();
        	$(".feedback_level").mouseleave();
        }else if(status=="complaint"){
        	$("input[name=order_popup_dirverId]").val(_this.data("carrierId"));//评价的对象
        	$("#order_popup_complaint").popup();
        }else if(status=="cancel"){
        	$("#bookingtruck_cancel").popup();
        }
        $("#order_popup_"+status+" .msgLengthArea").val("");
        $(".txtbox-number").html("0/50");
    };

    /* 确认发货    一条或批量 */
    var confirmReceiveGoods = function () {
        var orderId = $("input[name=receivegoods_orderId]").val();
        var orders = orderId.split(",");
        var that = this;
        if (!that.flag){
            that.flag = true;
	        $.ajax({
	            type: "POST",
	            url: config.ctx + "/order/receiveGoods",
	            data: {"ids": orders},
	            dataType: "json",
	            success: function (data) {
	                if (data) {
                        var totalOrder = data.totalOrder ? data.totalOrder : 0;
                        var stayReceiveGoods = data.stayReceiveGoods ? data.stayReceiveGoods : 0;
                        var stayFeedback = data.stayFeedback ? data.stayFeedback : 0;
                        var $order_total_count = $("#order_total_count");
                        var $order_receiveGoods = $("#order_receiveGoods");
                        var $order_feedback = $("#order_feedback");
                        if (stayReceiveGoods){
                            $order_receiveGoods.parent().addClass("ftorange").parent().addClass("stayList").removeClass("curnone tdn");
                        }else{
                            $order_receiveGoods.parent().removeClass("ftorange").parent().addClass("curnone tdn").removeClass("stayList");
                        }
                        if (stayFeedback){
                            $order_feedback.parent().addClass("ftorange").parent().addClass("stayList").removeClass("curnone tdn");
                        }else{
                            $order_feedback.parent().removeClass("ftorange").parent().addClass("curnone tdn").removeClass("stayList");
                        }
                        $order_total_count.text(totalOrder);
                        $order_receiveGoods.text(stayReceiveGoods);
                        $order_feedback.text(stayFeedback);

	                    for (var i = 0; i < data.orders.length; i++) {
	                    	var orderId=data.orders[i].id;
	                        $("#order_ck" +orderId ).data("orderStatus", 4);
	                        //$("#order_ck" +orderId ).attr("checked", "checked");
	                        $("#detail_index3" + orderId).html('<span class="scstatus ftgreen">运单完成</span><span class="scdetail">'
	                            + '<a target="_blank" href="' + config.ctx + '/order/Window/' + orderId + '/detail">运单详情</a></span><span id="feedback_status_str_'+orderId+'"></span></li>');
	                        if(data.certStatusValue==3){
		                        $("#detail_index4" + orderId).html('<span class="scbtn btn-a-white"><a href="javascript:void(0);" class="br3 popup_feedback" data-carrier-id="'+data.orders[i].carrierUserId+'" data-driver-id="'+data.orders[i].truckOwnerId+'"'
		                        	+' data-order-id="'+orderId+'" data-order-no="'+data.orders[i].orderNo+'" data-open-id="order_popup_feedback" data-shipper-addr-name="'+data.orders[i].shipperAddrName+'" data-consignee-addr-name="'
		                        	+ data.orders[i].consigneeAddrName +'" data-trucklicense-no="'+data.orders[i].truckLicenseNo+'" data-truck-model="'+data.orders[i].truckModel+'" data-driver-name="'+data.orders[i].driverName
		                        	+'" title="评价车主">评价车主</a></span>');
                                $("#detail_index5" + orderId).html('<span class="cancelwaybill"><a href="javascript:void(0);" data-carrier-id="'+data.orders[i].carrierUserId+'" data-driver-id="'+data.orders[i].truckOwnerId+'"'
                                    +' data-order-id="'+orderId+'" data-order-no="'+data.orders[i].orderNo+'" data-open-id="order_popup_feedback" data-shipper-addr-name="'+data.orders[i].shipperAddrName+'" data-consignee-addr-name="'
                                    + data.orders[i].consigneeAddrName +'" data-trucklicense-no="'+data.orders[i].truckLicenseNo+'" data-truck-model="'+data.orders[i].truckModel+'" data-driver-name="'+data.orders[i].driverName
                                    +'" title="投诉车主" class="popup_complaint"  data-open-id="order_popup_complaint" >投诉车主</a></span>');
	                        }else{
	                        	$("#detail_index4" + orderId).html('');
	                            $("#detail_index5" + orderId).html('');
	                        }
	                    }

                        var feedbackUrl = "";
                        if (orders.length == 1){
                            feedbackUrl = "<a href='javascript:void(0);'"
                                + " class='ftblue tdu' id='tofeedback' data-order-id='"+orderId+"' title='现在去评价车主'>现在去评价车主？</a>";
                        }else{
                            feedbackUrl = "<a  id='tohreffeedback' href='" + config.ctx + "/feedback/Window/batch?batchIds=" + $("input[name=receivegoods_orderId]").val() + "'" +
                                " class='ftblue tdu' target='_blank' title='现在去评价车主'>现在去评价车主？</a>";
                        }
                        var ts = "";
                        if(data.certStatusValue==3){
                        	ts = "您已成功确认收货，是否" + feedbackUrl;
                        }else{
                        	ts = "您已成功确认收货。";
                        }
                        miscs.alert({
                            title: "确认收货",
                            msgTitle: "确认收货成功!",
                            msgInfo: ts,
                            iconCls: "iok",
                            sing: true,
                            cancelBtn: "关闭"
                        });

	                }
                    that.flag = false;
	            }, error: function () {
	            	
	            	miscs.alert({
                        title: "确认收货",
                        msgTitle: "确认收货失败!",
                        msgInfo: "运单可能被签收",
                        iconCls: "inoti",
                        sing: true,
                        cancelBtn: "关闭"
                    });
	            	
                    that.flag = false;
                }
	        });
        }
    };

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
    window.miscs = miscs;
    var receiveGoods = function(){
        miscs.alert({
            width: 440,
            title: "确认收货",
            msgTitle: "请确认您的货物已经签收 !",
            msgInfo: "请收到货后再确认收货！",
            sign: true,
            iconCls: "inoti",
            successBtn: "确认",
            cancelBtn: "取消",
            success:function(){
                confirmReceiveGoods();
            },
            cancel: function(){

            }
        });
    }

    return {
        init: function () {

            /* 展开关闭 */
            $("#search_collapse", ".order_list_page").on("click", function () {
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
            $("#search_btn", ".order_list_page").on("click", function () {
                $("#search_form").submit();
            });

            /* 点击货源状态搜索刷新 */
            $("[name='order_status']", ".order_list_page").on("change", function () {
                $("[name=status]").val($(this).val());
                $("#search_form").submit();
            });

            /* 页面加载 是否打开搜索栏 */
            if ($("input[name=isCollapsed]", ".order_list_page").val() == "true") {
                $("input[name=isCollapsed]").val("false");
                $("#search_collapse").click();
                $(".formlist li:gt(1)").removeClass("hide");
            }

            /* 点击待确认收货、待评价链接查询 */
            $(".tipinfo", ".order_list_page").on("click","a.stayList", function (e) {
                var $t = $(e.target);
                if($t[0].tagName != "A"){
                    $t = $t.parents("a");
                }
                var stayStatus = $t.data("stayStatus");
                document.location = config.ctx + "/order/" + stayStatus + "/1/stayList";
            });

            /* 分页提交数据 */
            $(".page_a", ".order_list_page").on("click", function(e){
                var pageNumber = $(e.target).data("pageNumber");
                page_submit(pageNumber);
            });

            /* 点击打开确认收货弹窗*/
            $(".popup_receivegoods", ".order_list_page").on("click", function (e) {
                $("input[name=receivegoods_orderId]").val($(e.target).data("orderId"));
                receiveGoods();
            });


            //点击关闭弹窗事件
            $(".popup_cancel", ".order_list_page").on("click", function (e) {
            	$(".itemMsg").addClass("hide");
                $("#" + $(e.target).data("openId")).popup({close:true});
            });

            $(document).on("click", "#tofeedback", function(e){
                var $this =  $(e.target);
                $("#" + $this.parents(".showdialog").prop("id")).popup({close:true});
                var orderId = $this.data("orderId");
                $("#detail_index4" + orderId).find(".popup_feedback").click();
            });
            $(document).on("click", "#tohreffeedback", function(e){
                var $this =  $(e.target);
                $("#" + $this.parents(".showdialog").prop("id")).popup({close:true});
            });

            //点击确认收货
            $(".receivegoods_confirm", ".order_list_page").on("click", function (e) {
                confirmReceiveGoods(this);
            });

            //车主评价 弹窗
            $("div.uc-item",".order_list_page").on("click",".popup_feedback" , function (e) {
                var _this = $(e.target);
                //初始化 信用等级
                $(".feedback_level", ".order_list_page").each(function (i, o) {
                    $(o).data("level", "0");
                });
                setPopupInfo(_this, "feedback");
            });
            // 投诉车主 弹窗
            $("div.uc-item",".order_list_page").on("click",".popup_complaint",function(e){
                var _this = $(e.target);
                setPopupInfo(_this, "complaint");
            });
            
            // 取消运单 弹窗
            $(".popup_bookingtruck_cancel", ".order_list_page").on("click", function (e) {
                var _this = $(e.target);
                setPopupInfo(_this, "cancel");
            });
            
            $("#cancel_form_des").validate({
				rules:{cancel_description:{required:true}}
			});
            //取消运单 提交
            $(".submit_bookingtruck_cancel", ".order_list_page").on("click", function (e) {
                var orderId = $("input[name=order_popup_cancel_orderId]").val();
                var reason = $("[name=cancel-reason]:checked").val();
                var description = $("[name=cancel_description]").val();
                if(reason==4){
                	if (!$("#cancel_form_des").valid()) {
                        return;
                    }
                }
                var that = this;
                if (!that.flag){
                    that.flag = true;
	                $.ajax({
	                    type: "POST",
	                    url: config.ctx + "/order/cancel",
	                    data: {"orderId": orderId,"description": description,"cancelReasonId": reason},
	                    dataType: "json",
	                    success: function (data) {
	                        if (data) {
	                        	$("#order_ck"+orderId).data("orderStatus",5);
	                            $("#order_total_count").text(data.totalOrder ? data.totalOrder : 0);
	                            $("#order_receiveGoods").text(data.stayReceiveGoods ? data.stayReceiveGoods : 0);
	                            $("#order_feedback").text(data.stayFeedback ? data.stayFeedback : 0);
	                            $("#detail_index3"+orderId).html('<span class="scstatus ftgrey">运单取消</span><span class="scdetail"><a target="_blank" href="' + config.ctx + '/order/Window/' +orderId+ '/detail">运单详情</a></span></li>');
	                            $("#detail_index4"+orderId).html("");
	                            $("#detail_index5"+orderId).html("");
	    		                $("#bookingtruck_cancel").popup({close:true});
	                        } else {
	                            $("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
	                        }
	                        that.flag = false;
	                        
	                        miscs.alert({
	                            title: "取消订单",
	                            msgTitle: "取消订单成功!",
	                            msgInfo: "您已成功取消订单。",
	                            iconCls: "iok",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
	                    }, error: function () {
	                    	//$("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
	                    	$("#bookingtruck_cancel").popup({close:true});
	                    	miscs.alert({
	                            title: "取消订单",
	                            msgTitle: "取消订单失败!",
	                            msgInfo: "运单可能已完成",
	                            iconCls: "inoti",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
	                    	
                            that.flag = false;
                        }
	                });
                }   
            });
            //点击全选
            $("#order_all_ck", ".order_list_page").on("click", function (e) {
                $("input[name=all_ids_ck]").prop("checked", e.target.checked);
            });

            $(".uc-main .uc-item").hover(function(){
                    $(this).addClass("cur");
                },
                function(){
                    $(this).removeClass("cur");
                }
            );

            $(".uc-item").on("click", function(e){
                var tagName = e.target.tagName;
                if (tagName != "A" && tagName != "INPUT"){
                    $(e.target).parents(".uc-item").find("[name=all_ids_ck]").prop("checked",!$(e.target).parents(".uc-item").find("[name=all_ids_ck]").prop("checked"));
                }
            });
            //批量确认收货
            $("#batch_receivegoods", ".order_list_page").on("click", function (e) {
                var orderIds = [];
                var flag = false;
                $("input[name=all_ids_ck]").each(function (i, o) {
                    if (o.checked) {
                        if ($(o).data("orderStatus") == 1) {		//待确认收货
                            orderIds.push($(o).data("orderId"));
                            flag = true;
                        }
                    }
                });
                if (flag) {
                    $("input[name=receivegoods_orderId]").val(orderIds.join(","));
                    receiveGoods();
                } else {
                    miscs.alert({
                        title: "确认收货",
                        msgTitle: "请选择需要待确认收货的运单!",
                        msgInfo: "您选择的运单已完成或已取消！",
                        iconCls: "inoti",
                        sing: true,
                        successBtn: "确认"
                    });
                }
            });

            /* 发送通知  弹窗*/
            $(".notice").on("click", function(e){
                var $this = $(e.target);
                var driverid = $this.data("driverId");
                var frId = $this.data("frId");
                $("input[name=frId]").val(frId);
                $("input[name=driverid]").val(driverid);
                $("#sendnotice").popup();
            });
            /*批量发送通知*/
            $("#batch_send_notice").on("click", function(){
                var driverids =[];
                var frIds =[];
                var flag = false;
                $("input[name=all_ids_ck]:checked").each(function (i, o) {
                     if ($(o).data("orderStatus") == 1) {
                    	driverids.push($(o).data("carrierId"));
                    	frIds.push($(o).data("frId"));
                        flag = true;
                     }
                });
                if (flag) {
                    $("input[name=frId]").val(frIds.join(","));
                    $("input[name=driverid]").val(driverids.join(","));
                    $("#sendnotice").popup();
                } else {
                    miscs.alert({
                        title: "批量发送通知",
                        msgTitle: "请选择需要发送通知的订单!",
                        iconCls: "",
                        successBtn: "确认"
                    });
                }	
            });
            var v_options = {
                    rules: {
                        sendnotice: {
                            required: true
                        }
                    },
                    messages: {
                        sendnotice: {
                            required: "通知不能为空!"
                        }
                    }
                };
            $("#sendnoticeform", ".order_list_page").validate(v_options);
            //发送 
            $("#send_notice_submit").on("click", function(){
                if (!$("#sendnoticeform").valid()) {
                    return;
                }
                var driverid = $("input[name=driverid]").val();
                var frId = $("input[name=frId]").val();
                var driverIds =driverid.split(",");
                var frIds = frId.split(",");
                var sendnotice = $("[name=sendnotice]").val();
                var data = {
                    driverids: driverIds,
                    content: sendnotice,
                    freightResponseIds: frIds
                };
                var that = this;
                if (!that.flag) {
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/bookingTruck/batchNotice",
                        data: data,
                        dataType: "json",
                        success: function (data) {
                            if (data.success) {
                                if (!$("#sendnotice_error").hasClass("hide")) {
                                    $("#sendnotice_error").addClass("hide");
                                }
                                //that.close();
                                $("#sendnotice").popup({close:true});
                                $("#sendnotice_info").popup();
                            } else {
                                $("#sendnotice_error").removeClass("hide");
                            }
                            that.flag = false;
                        },
                        error: function () {
                            $("#already_booking_truck_confirm_error_msg").text("系统忙,稍后再试...");
                            that.flag = false;
                        }
                    });
                }                
            });
           //评价提交
            $("#order_popup_feedback_submit", ".order_list_page").on("click", function (e) {
                var orderId = $("input[name=order_popup_feedback_orderId]").val();
                var driverId= $("input[name=order_popup_dirverId]").val();
                var description = $("#description").val();
				var feedbacks = [];
				var score = false;
                $(".feedback_level").each(function (i, o) {
                	if($(o).data("level")==0){
                		score=true;
                	}
                    feedbacks.push($(o).data("level"));
                });
                if(score){
                	$(".itemMsg").removeClass("hide");
                	return;
                }
                var that = this;
                if (!that.flag){
                    that.flag = true;
	                $.ajax({
	                    type: "POST",
	                    url: config.ctx + "/feedback/edit",
	                    data: {
	                    	"orderId": orderId,
	                    	"driverId": driverId,
	                        "description": description,
	                        "feedbacks": feedbacks},
	                    dataType: "json",
	                    success: function (data) {
	                        if (data) {
		                              //$("#order_total_count").text(data.totalOrder ? data.totalOrder : 0);
		                              //$("#order_receiveGoods").text(data.stayReceiveGoods ? data.stayReceiveGoods : 0);
	                        		  $("#order_ck"+orderId).data("feedbackStatus",data.fstatus);
		                              $("#order_feedback").text(data.stayFeedback ? data.stayFeedback : 0);
                                      $("#myFeedback" +orderId).remove();
		                              $("#detail_index4" +orderId).html("");
		                              $("#detail_index5" +orderId).html("");
		                              var str='';
		                              if (data.fstatus == 2) {
		                            	 str='我已评价';
		                              } else if(data.fstatus==4) {
		                             	 str='双方已评';
		                              }
		                              $("#feedback_status_str_" + orderId).html('<span class="scmap ftgrey"><a href="' + config.ctx + '/feedback/Window/' + orderId + '/detail" target="_blank">'+str+'</a></span>');
		                              $("#order_popup_feedback").popup({close:true});
	                        } else {
	                            $("#confirm_feedback_error_msg").text("系统忙,稍后再试...");
	                        }
	                        that.flag = false;
	                        
	                        miscs.alert({
	                            title: "评价车主",
	                            msgTitle: "评价车主成功!",
	                            msgInfo: "您已评价车主。",
	                            iconCls: "iok",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
	                    }, error: function () {
	                    	$("#order_popup_feedback").popup({close:true});
	                    	miscs.alert({
	                            title: "评价车主",
	                            msgTitle: "评价车主失败!",
	                            msgInfo: "该运单可能已完成或者关闭",
	                            iconCls: "inoti",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
	                    	//$("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
                            that.flag = false;
                        }
	                        
	                });
                }    
            });
            //全选
            $("#ck-scall").on("click", function(e){
                $("[name=all_ids_ck]").each(function(i,v){
                    $(v).prop("checked", $(e.target).prop("checked"));
                })
            });

            miscs.areaLength($(".msgLengthArea"));

            //批量评价
            $("#batch_evaluation", ".order_list_page").on("click",function(){
                var orderIds = [];
                var flag = false;
                $("input[name=all_ids_ck]:checked",".order_list_page").each(function (i, o) {
                	var orderStatus=$(o).data("orderStatus");
                	var feedbackStatus=$(o).data("feedbackStatus");
                    if ((orderStatus == 2||orderStatus == 3||orderStatus == 4)&&(feedbackStatus == 1||feedbackStatus==3)) {
                        orderIds.push($(o).data("orderId"));
                        flag = true;
                    }
                });
                if (flag) {
                	$("input[name=batchIds]").val(orderIds.join(","));
                	$("#batch_evaluation_form").submit();
                } else {
                    miscs.alert({
                        title: "批量评价",
                        msgTitle: "请选择需要待评价的运单!",
                        iconCls: "",
                        successBtn: "确认"
                    });
                }
            });
			$("#complaint_form_des").validate({
				rules:{complaint_des:{required:true}}
			}); 
            //投诉提交
            $("#order_popup_complaint_submit", ".order_list_page").on("click", function (e) {
                
                var orderId = $("input[name=order_popup_complaint_orderId]").val();
                var driverId= $("input[name=order_popup_dirverId]").val();
                var description = $("#complaint_des").val();
                var reason = $("[name=complaint-reason]:checked").val();
                if(reason==4){
                	if (!$("#complaint_form_des").valid()) {
                        return;
                    }
                }
                var that = this;
                if (!that.flag){
                    that.flag = true;
	                $.ajax({
	                    type: "POST",
	                    url: config.ctx + "/feedback/complaint",
	                    data: {
	                    	"control": 2,
	                    	"orderId": orderId,
	                    	"driverId": driverId,
	                        "description": description,
	                        "complainId": reason},
                            dataType: "json",
                            success: function (data) {
                                if (data) {
                                    $("#order_popup_complaint").popup({close:true});
                                    //$("#detail_index5"+orderId).html("");
                                } else {
                                    $("#confirm_feedback_error_msg").text("系统忙,稍后再试...");
                                }
                                that.flag = false;
                                
                                miscs.alert({
    	                            title: "投诉车主",
    	                            msgTitle: "投诉车主成功!",
    	                            msgInfo: "您已投诉车主。",
    	                            iconCls: "iok",
    	                            sing: true,
    	                            cancelBtn: "关闭"
    	                        });
                            }, error: function () {
                            	$("#order_popup_complaint").popup({close:true});
                            	
                            	miscs.alert({
    	                            title: "投诉车主",
    	                            msgTitle: "投诉车主失败!",
    	                            msgInfo: "该运单已评价或者关闭。",
    	                            iconCls: "inoti",
    	                            sing: true,
    	                            cancelBtn: "关闭"
    	                        });
                            	
                                //that.$el.find("#booking_truck_confirm_error_msg").text("系统忙,稍后再试...");
                                that.flag = false;
                            }
	                });
                }     
            });
            //评价 内容
            var feedbackarr=["非常不满","不满意","一般","满意","非常满意"];
            $(".feedback_level > i", ".order_list_page").mouseover(function () {
                var _this = $(this);
                _this.prevAll().andSelf().removeClass("ico-stargrey");
                _this.prevAll().andSelf().addClass("ico-starblue");
                _this.parent().next().find("span").text($(this).index() + 1);
                _this.parent().next().next().text(feedbackarr[$(this).index()]);
                _this.nextAll().removeClass("ico-starblue");
                _this.nextAll().addClass("ico-stargrey");
                $(this).parent().data("templevel", $(this).index() + 1);
            });

            $(".feedback_level", ".order_list_page").mouseleave(function () {
                var $this = $(this);
                var level = $this.data("level");
                
                $this.next().next().text(feedbackarr[level - 1]);
                $this.data("templevel", level);		//重置临时level状态
                $this.next().find("span").text(level);
                if (!level||level==0) {
                    level = 0;
                    $this.parent().data("level", 0);
                    $this.parent().data("templevel", 0);
                    $this.next().next().text("");
                }
                

                $this.children().each(function (i, o) {
                    if (i >= level) {
                        $(o).removeClass("ico-starblue");
                        $(o).addClass("ico-stargrey");
                    } else {
                        $(o).addClass("ico-starblue");
                        $(o).removeClass("ico-stargrey");
                    }
                });
            });

            $(".feedback_level > i", ".order_list_page").click(function () {
                $(this).parent().data("level", $(this).parent().data("templevel"));
            });
            /* 初始化select */
            $("[name=freightId]").trigger("chosen:updated").chosen().next().css({"width":"306px"});
            $("[name='order_status']", ".order_list_page").next().css({"width":"120px"});
            $("[name=goodsId]", ".order_list_page").next().css({"width":"307px"});
            $("[name=status]", ".order_list_page").next().css({"width":"129px"});
            $("[name=relator]").children()[0].value =  "4";
            $("[name=relator]").children()[0].text =  "请选择";
            $("[name=relator]").prop("data-placeholder",null).trigger("chosen:updated").chosen().next().css({"width":"80px"});
            $("[name=createUserId]", ".order_list_page").next().css({"width":"129px"});
            
            $("[name='status']").add("[name='order_status']").attr("data-placeholder","运单状态");
            $("[name='status']").add("[name='order_status']").trigger("chosen:updated");
            $("[name='status']").add("[name='order_status']").chosen();
            
            
            $(".msgLengthArea", ".bookingconfirm_view").on("keydown", function (e) {
                var $this = $(e.target);
                msgLength($this, $this.attr("maxLength"));
            }).on("keyup", function (e) {
                var $this = $(e.target);
                msgLength($this, $this.attr("maxLength"));
            });
            
            /*诚信等级*/
	        $("[name=sincerity_level]").each(function(i, o){
	        	$(o).after(miscs.calcLevel({level:$(o).val(),type:"user"}));
	        });
	        
	        
	      //排序
            $("#priceUnitOrder", ".order_list_page").on("click", function(e){
                var $this = $(this);
                var $i = $this.find("i");
                var sign = -1;
                if ($(this).hasClass("crt")){
                    if ($i.hasClass("ico-ordertop")){
                        sign = 1;
                        $i.removeClass("ico-ordertop").addClass("ico-taborder");
                    }else{
                        sign = -1;
                        $i.removeClass("ico-taborder").addClass("ico-ordertop");
                    }
                }else{
                	$(".crt").removeClass("crt");
                    $(this).addClass("crt");
                    if ($i.hasClass("ico-ordertop")){
                        sign = -1;
                    }else{
                        sign = 1;
                    }
                }

                var items = $(".uc-item");
                var pagination = document.getElementById("pagination");
                items.sort(function(v1, v2){
                    var value1= parseInt($(v1).data("unitPrice")||0,10);
                    var value2= parseInt($(v2).data("unitPrice")||0,10);
                    return (value2 - value1) * sign;
                });
                for(var i=0; i < items.length; i++){
                    pagination.appendChild(items[i]);
                }
            });
            $("#freightId", ".order_list_page").on("click", function(e){
                var $this = $(this);
                var $i = $this.find("i");
                var sign = -1;
                if ($(this).hasClass("crt")){
                    if ($i.hasClass("ico-ordertop")){
                        sign = 1;
                        $i.removeClass("ico-ordertop").addClass("ico-taborder");
                    }else{
                        sign = -1;
                        $i.removeClass("ico-taborder").addClass("ico-ordertop");
                    }
                }else{
                	$(".crt").removeClass("crt");
                    $(this).addClass("crt");
                    if ($i.hasClass("ico-ordertop")){
                        sign = -1;
                    }else{
                        sign = 1;
                    }
                }

                var items = $(".uc-item");
                var pagination = document.getElementById("pagination");
                items.sort(function(v1, v2){
                    var value1= parseInt($(v1).data("freightId")||0,10);
                    var value2= parseInt($(v2).data("freightId")||0,10);
                    return (value2 - value1) * sign;
                });
                for(var i=0; i < items.length; i++){
                    pagination.appendChild(items[i]);
                }
            });
            $("#defaultOrder", ".order_list_page").on("click", function(e){
                if ($(this).hasClass("crt")) return;
                $(".crt").removeClass("crt");
                $(this).addClass("crt");
                var items = $(".uc-item");
                var pagination = document.getElementById("pagination");
                items.sort(function(v1, v2){
                var value1= parseInt($(v1).data("id")||0,10);
                var value2= parseInt($(v2).data("id")||0,10);
                return value2 - value1;
                });
                for(var i=0; i < items.length; i++){
                    pagination.appendChild(items[i]);
                }
             });

        }
    };
});


/**
 * Created by liuchuangui on 2014/5/7.
 */
/**
 * 订单列表
 * Created by liuchuangui on 2014/4/19.
 */
define(["jquery","jQvalidation", "jQmessage", "plugins/validation", "plugins/miscs", "config"], function($,validator, message, validationRule, miscs, config) {
    return {
        init: function () {
        	//标签切换
            $("#uc-tab-item", ".order_detail_page").on("click","li",function(e){
            	$("li","#uc-tab-item").removeClass("crt");
            	$(this).addClass("crt");
            	var clickId=$(e.target).data("clickId");
        		$("#tab-"+clickId).removeClass("hide");
            	for (var i= 1; i<5; i++) {
            		if(i!=clickId){
            			$("#tab-"+i).addClass("hide");
            		}				
				}
            });
            // 确认收货 弹窗
            $(".popup_receivegoods", ".order_detail_page").on("click", function () {
                var that = this;
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
                        var freightId = $("[name=freightId]").val();
                        var orderId = $("#orderId").val();
                        var orders =[];
                        orders.push(orderId);
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
                                        $("#freightStatus").addClass("ftgreen").removeClass("ftorange").text("运单完成");
                                        var nowDate = new Date();
                                        $(".orderCancelDate").html(config.dateFormat(nowDate, "yyyy-MM-dd") + "<br/>" + config.dateFormat(nowDate, "hh:mm"));
                                        $(".waybill-detail-timeline").find("dt").removeClass("step1").addClass("step3");
                                        if(data.certStatusValue==3){
                                        	$(".waybillbtn").html('<span class="btn-a-blue"><a title="评价车主" class="br3 popup_feedback" href="javascript:void(0);">评价车主</a></span>'
                                        			+'<span class="btn-a-white"><a title="投诉车主" class="br3 popup_complaint" href="javascript:void(0);">投诉车主</a></span>');
                                        }else{
                                        	$(".waybillbtn").html('');
                                        }
                                        
                                        var feedbackUrl = "";
                                        if (orders.length == 1){
                                            feedbackUrl = "<a href='javascript:void(0);'"
                                                + " class='ftblue tdu' id='tofeedback' data-order-id='"+orderId+"' title='现在去评价车主'>现在去评价车主？</a>";
                                        }else{
                                            feedbackUrl = "<a  id='tohreffeedback' href='javascript:void(0);'" +
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
                                    that.flag = false;
                                }
                            });
                        }
                    },
                    cancel: function(){

                    }
                });
            });
            
            $(document).on("click", "#tofeedback", function(e){
            	var $this =  $(e.target);
                $("#" + $this.parents(".showdialog").prop("id")).popup({close:true});
                //初始化 信用等级
            	$("#order_popup_feedback").popup();
                $(".feedback_level", ".order_detail_page").each(function (i, o) {
                    $(o).data("level", "1");
                });
            });
            
            // 评价车主  弹窗
            $(".waybill-detail-info",".order_detail_page").on("click",".popup_feedback", function () {
            	$("#order_popup_feedback").popup();
                //初始化 信用等级
                $(".feedback_level", ".order_detail_page").each(function (i, o) {
                    $(o).data("level", "1");
                });
            });
            // 投诉车主 弹窗
            $(".waybill-detail-info",".order_detail_page").on("click",".popup_complaint",function(){
            	$("#order_popup_complaint").popup();

            });
            // 取消运单 弹窗
            $(".popup_bookingtruck_cancel", ".order_detail_page").on("click", function () {
            	$("#bookingtruck_cancel").popup();
            });
            
            //点击关闭弹窗事件
            $(".popup_cancel", ".order_detail_page").on("click", function (e) {
                $("#" + $(e.target).data("closeId")).popup({close:true});
            });
            
            //评价 内容
            var feedbackarr=["非常不满","不满意","一般","满意","非常满意"];
            $(".feedback_level > i", ".order_detail_page").mouseover(function () {
                var _this = $(this);
                _this.prevAll().andSelf().removeClass("ico-stargrey");
                _this.prevAll().andSelf().addClass("ico-starblue");
                _this.parent().next().find("span").text($(this).index() + 1);
                _this.parent().next().next().text(feedbackarr[$(this).index()]);
                _this.nextAll().removeClass("ico-starblue");
                _this.nextAll().addClass("ico-stargrey");
                $(this).parent().data("templevel", $(this).index() + 1);
            });

            $(".feedback_level", ".order_detail_page").mouseleave(function () {
                var $this = $(this);
                var level = $this.data("level");
                if (!level) {
                    level = 1;
                    $this.parent().data("level", 1);
                    $this.parent().data("templevel", 1);
                }
                $this.data("templevel", level);		//重置临时level状态
                $this.next().find("span").text(level);
                $this.next().next().text(feedbackarr[level - 1]);

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

            $(".feedback_level > i", ".order_detail_page").click(function () {
                $(this).parent().data("level", $(this).parent().data("templevel"));
            });
            //取消运单 提交
            $("#submit_bookingtruck_cancel", ".order_detail_page").on("click", function (e) {
                var orderId = $("#orderId").val();
                var reason = $("[name=cancel_reason]:checked").val();
                var description = $("[name=cancel_description]").val();
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
                                $("#bookingtruck_cancel").popup({close:true});
                                $("#freightStatus").removeClass("ftorange ftgreen").text("运单取消");
                                var nowDate = new Date();
                                $(".orderCancelDate").html(config.dateFormat(nowDate, "yyyy-MM-dd") + "<br/>" + config.dateFormat(nowDate, "hh:mm"));
                                $(".waybill-detail-timeline").find("dt").removeClass("step1 step3").addClass("step0");
                                $(".waybillbtn").html("");
	                        }
	                        that.flag = false;
	                    }, error: function () {
	                    	//TODO $("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");;
                            that.flag = false;
                        }
	                });
                }   
            });
			$("#complaint_form_des").validate({
				rules:{complaint_des:{required:true}}
			}); 
            //投诉提交
            $("#order_popup_complaint_submit", ".order_detail_page").on("click", function (e) {
                if (!$("#complaint_form_des").valid()) {
                    return;
                }
                var orderId = $("#orderId").val();
                var driverId= $("input[name=order_popup_dirverId]").val();
                var description = $("#complaint_des").val();
                var reason = $("[name=complaint-reason]:checked").val();
                var that = this;
                if (!that.flag){
                    that.flag = true;
	                $.ajax({
	                    type: "POST",
	                    url: config.ctx + "/feedback/complaint",
	                    data: {
	                    	"orderId": orderId,
	                    	"driverId": driverId,
	                        "description": description,
	                        "complainId": reason},
	                    dataType: "json",
	                    success: function (data) {
	                        if (data) {
	                        	$("#order_popup_complaint").popup({close:true});
                                $(".popup_complaint").parent().remove();
	                        } else {
	                            $("#confirm_feedback_error_msg").text("系统忙,稍后再试...");
	                        }
	                        that.flag = false;
	                    }, error: function () {
	                        //TODO that.$el.find("#booking_truck_confirm_error_msg").text("系统忙,稍后再试...");
	                        that.flag = false;
	                    }
	                });
                }     
            });
            //评价提交
            $("#order_popup_feedback_submit", ".order_detail_page").on("click", function (e) {
            	var orderId = $("#orderId").val();
                var driverId= $("input[name=order_popup_dirverId]").val();
                var description = $("#description").val();
				var feedbacks = [];
                $(".feedback_level").each(function (i, o) {
                    feedbacks.push($(o).data("level"));
                });
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
	                          $(".popup_feedback").parent().remove();
                              $(".popup_complaint").parent().remove();
		                      $("#order_popup_feedback").popup({close:true});
	                        } else {
	                           //TODO $("#confirm_feedback_error_msg").text("系统忙,稍后再试...");
	                        }
	                        that.flag = false;
	                    }, error: function () {
	                    	//TODO $("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");;
                            that.flag = false;
                        }
	                        
	                });
                }    
            });
            /*诚信等级*/
	        $("[name=sincerity_level]").each(function(i, o){
	        	$(o).after(miscs.calcLevel({level:$(o).val(),type:"user"}));
	        });
        }    
    };
});


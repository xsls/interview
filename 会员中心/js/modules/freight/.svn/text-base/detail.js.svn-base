/**
 * 货源详情
 */
define(["jquery", "plugins/miscs", "config"], function($, miscs, config){
	//tab切换
	var tab_change = function(){
		$("#t_info").toggleClass("crt");
		$("#t_truck").toggleClass("crt");
		$("#freight_info").toggleClass("hide");
		$("#freight_truck").toggleClass("hide");
	};

	var page_submit = function(pageNumber){
		var freightId = $("[name=freightId]").val();
		var bookingStatus = $("[name=bookingStatus]").val();
		document.location = config.ctx + "/freight/Window/" + freightId +
			"/detail?bookingStatus=" + bookingStatus + "&isTruckView=1&pageNumber=" + pageNumber;
	};

	return {
		init: function(){

			/* tab切换 */
			$(".info_truck", ".freight_detail_page").on("click", function(){
				if (!$(this).hasClass("crt")){
					tab_change();
				}
			});

			/* 确认关闭货源*/
			$("#closeFreight", ".freight_detail_page").on("click", function(){
                var that = this;
                miscs.alert({
                    width: 440,
                    title: "结束发布",
                    msgTitle: "确认结束发布您的货源吗 !",
                    msgInfo: "结束货源后，您仍然可以对响应的车辆进行订车！",
                    sign: true,
                    iconCls: "iok",
                    successBtn: "确认",
                    cancelBtn: "取消",
                    success:function(){
                        var freightId = $("[name=freightId]").val();
                        if (!that.flag) {
                            that.flag = true;
                            $.ajax({
                                type: "GET",
                                url: config.ctx + "/freight/closeFreight",
                                data: {id: freightId},
                                dataType: "json",
                                success: function (data) {
                                    if (data.success){
                                        miscs.alert({
                                            title: "系统消息",
                                            msgTitle: "货源已关闭!",
                                            iconCls: "iok",
                                            successBtn: "关闭"
                                        });
                                        $("#freightStatus").addClass("ftgreen").removeClass("ftorange").text("发布完成");
                                        $("#closeFreight").parent().remove();
                                    }
                                    that.flag = false;
                                },
                                error: function () {
                                    that.flag = false;
                                }
                            });
                        }

                        var freightId = $("[name=freightId]").val();
                        if (!that.flag) {
                            that.flag = true;
                            $.ajax({
                                type: "GET",
                                url: config.ctx + "/freight/closeFreight",
                                data: {id: freightId},
                                dataType: "json",
                                success: function (data) {
                                    $("#freightStatus").val(data.status);
                                    $("#close_freight_btn").parent().remove();
                                    $("#status").text("发布完成");
                                    that.flag = false;
                                },
                                error: function () {
                                    that.flag = false;
                                }
                            });
                        }
                    },
                    cancel: function(){

                    }
                });
			});
			/* 页面加载判断展开tab */
			if($("[name=isCollTruckView]", ".freight_detail_page").val()=="1"){
				tab_change();
			}

			/* 分页查询 */
			$(".page_a", ".freight_detail_page").on("click", function(e){
				var $this = $(e.target);
				page_submit($this.data("pageNumber"));
			});

			/* 点击货源状态搜索刷新 */
			$("[name=bookingStatus]", ".freight_detail_page").on("change", function(){
				page_submit(1);
			});

            /* 全选 */
			$("#freight_detail", ".freight_detail_page").on("click", function(e){
                $("[name=ck-scid]").prop("checked",$("#freight_detail").prop("checked"));
			});

            /* 初始化select */
            $("[name=bookingStatus]", ".freight_detail_page").next().css({"width":"120px"});
            $("[name=bookingStatus]").attr("data-placeholder","订车状态").trigger("chosen:updated").chosen();
            
            /*诚信等级*/
	        $("[name=sincerity_level]").each(function(i, o){
	        	$(o).after(miscs.calcLevel({level:$(o).val(),type:"user",addspan:true}));
	        });
		}
	};
});
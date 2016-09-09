define(["jquery", "config"], function($, config){
    return{
        init:function(){
			var navjson = [
	  			 {"urlname":"发布货源","url":"freight"},
	  			 {"urlname":"货源管理","url":"freight"},
	  			 {"urlname":"订车确认","url":"bookingTruck"},
	  			 {"urlname":"运单管理","url":"order"},
	  			 {"urlname":"磅单管理","url":""},
	  			 {"urlname":"结算管理","url":""},
	  			 {"urlname":"支付管理","url":""},
	  			 {"urlname":"开票管理","url":""},
	  			 {"urlname":"报表中心","url":""},
	  			 {"urlname":"个人资料","url":"userInfo"},
	  			 {"urlname":"公司信息","url":"companyManage"},
	  			 {"urlname":"我的业务伙伴","url":"partner"},
	  			 {"urlname":"我的车辆库","url":"truck"},
	  			 {"urlname":"评价/投诉管理", "url":"complaint"}
	  		];
	  		var url = window.location.href;
	  		urllocation = url.split(/\//)[4];
	  		for (i in navjson){
	  			if( urllocation == navjson[i].url){
	  				//$(".breadcrumb .bc-crt").html(navjson[i].urlname);
	  				if( urllocation == "freight"){
	  					urllocation = url.split(/\//)[5];
	  					if (urllocation == "Window"){
	  						//$(".breadcrumb .bc-crt").html("发布货源");
	  					}else{
	  						//$(".breadcrumb .bc-crt").html("货源管理");
	  					}
		  			}
	  			}
	  			
	  		};
            $(".leftmenu .lm-lv1 li").click(function(){
                $(this).children("ul").slideToggle(100);
                $(this).find("i.ico-arrbtm:eq(0)").toggleClass("ico-arrrgt");
            });


            $(".leftmenu .lm-lv1 li ul li").click(function(event){
                event.stopPropagation();
            });

            $(".navslide").hover(
                function(){
                    $(this).addClass("hover");
                    $(this).find(".welbox").removeClass("hide");
                },
                function(){
                    $(this).removeClass("hover");
                    $(this).find(".welbox").addClass("hide");
                }
            );


            $(".hdlinks .lm-lv1 li .lm-lv2").addClass("none");
            $(".hdlinks .lm-lv1 li .lm-lv2:eq(0)").removeClass("none");


            $(".hdlinks .lm-lv1 li").click(function(){
                $(this).siblings().find("ul").slideUp(100);

                $(this).siblings().find("i.ico-sitetop").html("1").removeClass("ico-sitebtm").addClass("ico-sitetop");
                $(this).find("ul").slideToggle(100).find("i").html();
                if($(this).find("i:eq(0)").html()== true){
                    $(this).find("i.ico-sitetop").addClass("ico-sitebtm");
                    $(this).find("i.ico-sitetop").html("0");
                }else {
                    $(this).find("i.ico-sitetop").removeClass("ico-sitebtm");
                    $(this).find("i.ico-sitetop").html("1");
                }
            })

            $(".lm-lv1").children().last().addClass("noline");

            /*var lis = $("#menuLeft .noline ul li");
            for(var i = 0; i < lis.length; i++){
                var target = $(lis[i]);
                if(target.text() == "我的车辆库" || target.text() == "我的业务伙伴"){
                    target.append("<span class='add-new'><a href='javascript:void(0)' title='添加'><i class='icon i8 iplus'></i></a></span>");
                }
            }*/

            /*$("#menuLeft .noline ul li").has(".add-new").on("click", ".add-new a", function(){

            });*/

            $.ajax({
                url: config.ctx+"/freight/tobookTruckFreight",
                success:function(data, status, e){
                    if(data > 99){
                        data = "99+";
                    }

                    if(data != 0){
                        $("#menuLeft .im304").parent().append("<span class='num-noti'>"+data+"</span>");
                    }

                },
                error:function(){}
            });
            $.ajax({
                url: config.ctx+"/freightResponse/count",
                success:function(data, status, e){
                    var count = data.count;
                    if(count.count > 99){
                        count = "99+";
                    }

                    if(count != 0){
                        $("#menuLeft .im303").parent().append("<span class='num-noti'>"+count+"</span>");
                    }

                },
                error:function(){}
            });

            $("#menuLeft li:first a").attr({"target":"_blank"});

            $("#menuLeft .im303").parent().attr({"target":"_blank"});

            $("#menuLeft .im302").parent().attr({"target":"_blank"});

        }
    };
})
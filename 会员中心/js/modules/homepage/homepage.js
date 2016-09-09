define([ "jquery","config", "plugins/miscs","raphael", "morris"],function($, config, miscs,raphael,morris) {
	/*加载图形界面*/
	var loadMorris=function() {
				var that = $(this);
				if (!that.flag) {
					that.flag = true;
					var beginDate = $("#startDate").val();
					var endDate = $("#endDate").val();
					$.ajax({
						type : "GET",
						url : config.ctx + "/report/morris",
						data : {"beginDate":beginDate,"endDate":endDate,"type":1,"index":1},
						success : function(data) {
							var donutData = [{value:data.f.findCar,label:"找车中"}, {value:data.f.delivering,label:"运输中"},{value:data.f.delivered,label:"运输完成"}];
							Morris.Donut({
								element : 'graph',
								data : donutData,
								backgroundColor : '#f6f6f6',
								labelColor : '#434343',
								colors : ['#ed734b','#45c490','#2d80c9'],
								formatter : function(x) {
									return x + "%";
								}
							});
							$("#total1").text(data.f.total);
							$("#orderCar").text(data.f.orderCar);
							that.flag = false;
						},error : function() {that.flag = false;}
			});
		}
	};
			return {
				init : function() {
					/*初始化加载报表*/
					(function(){
						var today=new Date();
						$("#endDate").val(config.dateFormat(today,'yyyy-MM-dd'));
						today.addDays(-7);
						$("#startDate").val(config.dateFormat(today,'yyyy-MM-dd'));
						loadMorris();
					})();
					$(".uc-index-graphul li").on('click',function(){
						var value=$(this).data("timeId");
						var today=new Date();
						$("#endDate").val(config.dateFormat(today,'yyyy-MM-dd'));
						if(value==1){
							today.addDays(-7);
						}else if(value==2){
							today.addMonths(-1);
						}else if(value==3){
							today.addMonths(-6);
						}else if(value==4){
							today.addYears(-1);
						}						
						$("#startDate").val(config.dateFormat(today,'yyyy-MM-dd'));
						if(!$(this).hasClass("cur")){
							$(this).addClass("cur").siblings().removeClass("cur");
							loadMorris();
						}
					});				
                    $("#crelevel-complaint ").append(miscs.calcLevel({
                            level:$("#crelevel-complaint input").val(),
                            type:"org"
                    }));
		        	$(".uc-index-type i").hover(
		        		function(){
		        			$(this).next(".uc-index-tip").removeClass("hide").next("b").removeClass("hide");  
		        		},
		        		function(){
		        			$(this).next(".uc-index-tip").addClass("hide").next("b").addClass("hide");
		        		}
		        	);		        	
		            function showCoords(coords){
		            	 if(parseInt(coords.w) > 0){
		            		 $("input[name='x']").val(coords.x);
		            		 $("input[name='y']").val(coords.y);
		            		 $("input[name='w']").val(coords.w);
		            		 $("input[name='h']").val(coords.h);
		                     //计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
		                     var rx = $("#img_preview").width() / coords.w; 
		                     var ry = $("#img_preview").height() / coords.h;
		                     //通过比例值控制图片的样式与显示
		                     $("#imgJscropPreview").css({
		                         width:Math.round(rx * $("#imgJscrop").width()) + "px",	//预览图片宽度为计算比例值与原图片宽度的乘积
		                         height:Math.round(rx * $("#imgJscrop").height()) + "px",  //预览图片高度为计算比例值与原图片高度的乘积
		                         marginLeft:"-" + Math.round(rx * coords.x) + "px",
		                         marginTop:"-" + Math.round(ry * coords.y) + "px"
		                     });
		                 }
		            }
				}
			};
	
});
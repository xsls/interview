define(["jquery","config","raphael","morris","datepicker"],function($,config,r,morris,datetimepicker) {
			/*加载图形界面*/
			var loadMorris=function() {
						var that = $(this);
						if (!that.flag) {
							that.flag = true;
							var index = $("[name=indexFlag]").val();
							var beginDate = $("#startDate"+index).val();
							var endDate = $("#endDate"+index).val();
							var type = $("[name=rangeId]").val();
							$.ajax({
								type : "GET",
								url : config.ctx + "/report/morris",
								data : {"beginDate":beginDate,"endDate":endDate,"type":type,"index":index},
								success : function(data) {
									$("#freight_total").text(data.bo.recentCount);
									$("#freight_tonnage").text(data.bo.recentWeight);
									if (index == 2) {
										var lineData = [];
										$.each(data.list,function(i,o){
											lineData.push({"period":o.hisPeriod,"a":o.hisWeight});											
										});
										$("#graphbar").html(null);
										Morris.Line({
											element : 'graphbar',
											data : lineData,
											xkey : 'period',
											ykeys : ['a'],
											labels : ['货量'],
											units : '吨'
										});
										$("#total2").text(data.d);
									} else if (index== 1) {
										$("#total1").text(data.f.total);
										$("#orderCar").text(data.f.orderCar);
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
									}
									that.flag = false;
								},error : function() {that.flag = false;}
					});
				}
			};
			var init=function(){				
				var today=new Date();
				var end=config.dateFormat(today,'yyyy-MM-dd');
				$("#endDate1").val(end).datepicker('update');
				$("#endDate2").val(end).datepicker('update');
				$("#endDate1").datepicker('setStartDate', end);
				$("#endDate2").datepicker('setStartDate', end);
				today.addDays(-7);
				var begin=config.dateFormat(today,'yyyy-MM-dd');
				$("#startDate1").val(begin).datepicker('update');
				$("#startDate2").val(begin).datepicker('update');
				$("#startDate1").datepicker('setEndDate',begin);
				$("#startDate2").datepicker('setEndDate',begin);			
				loadMorris();
			};
			return {
				init : function() { 
					/*初始化加载报表*/
					init();
					$(".uc-index-graphul li").on('click',function(){
						var value=$(this).data("timeId");
						var index=$("[name=indexFlag]").val();
						var today=new Date();
						$("#endDate"+index).val(config.dateFormat(today,'yyyy-MM-dd')).datepicker('update');
						if(value==1){
							today.addDays(-7);
						}else if(value==2){
							today.addMonths(-1);
						}else if(value==3){
							today.addMonths(-6);
						}else if(value==4){
							today.addYears(-1);
						}			
						$("#startDate"+index).val(config.dateFormat(today,'yyyy-MM-dd')).datepicker('update');
						if(!$(this).hasClass("cur")){
							$(this).addClass("cur").siblings().removeClass("cur");
							loadMorris();
						}
					});
					$(".uc-excel .uc-tab li").on('click',function(){
						var index = $(this).index();
						$("[name=indexFlag]").val(index+1);
						$(this).addClass("cur").siblings().removeClass("cur");
						$(this).find("em").fadeIn("fast");
						$(".uc-main > div:eq("+index+")").show().siblings().hide();
						if (index && $("#graphbar").html()==""){
							loadMorris();
						}
					});
					
					$(".date").on("change",function(){
						loadMorris();
					});
					$("[name=rangeId]").on("change",function(){
						loadMorris();
					});
					$("[name=rangeId]").next().css({"width":"100px"});
				}
			};
		});
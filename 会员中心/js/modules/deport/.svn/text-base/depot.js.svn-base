define(
		[ "jquery", "popup","jQvalidation", "jQmessage", "plugins/validation", "config",
		  "plugins/miscs"],
		function($, popup,validator, message, validation, config,miscs) {
			return {		
				init : function() {		
					var startPage = 0;
					var pageSize = 20;
					$("#pages").on("click",$("[v]"),function(e){
						var v=$(e.target).attr("v");
						if(typeof(v)!='undefined'){
							startPage=v;
							getPage();
							renderBody();
						}
					});
					var resetCount = function(){
						$.ajax({
							type : "GET",
							url : config.ctx + "/depot/getCount",
							data : {
							},
							success : function(data) {
									$("#pageCount").val(data);
							}
						});
					};
					$("#simplePage").on("click",$("[v]"),function(e){
						var v=$(e.target).attr("v");
						e.preventDefault();
        			    e.stopPropagation();
						if(typeof(v)!='undefined'){
							startPage=v;
							getPage(); 	
							renderBody();
						}
					});
					var getEndPage = function (){
						if(startPage==0){
							startPage=1;
						}
						return (parseInt(startPage)-1) * pageSize;
					};
					var getPage = function (){
					//	var curPage =1;
						$.ajax({
							type : "GET",
							url : config.ctx + "/page/getPage",
							data : {
								count:$("#pageCount").val(),
								pagesize:pageSize,
								curPage:startPage
							},
							success : function(data) {
								$("#pages").children().remove();
								$("#pages").html(data.pageStr);
								$(".uc-manageadd").removeClass("loading");
							}
					});
						$.ajax({
							type : "GET",
							url : config.ctx + "/page/getSimplePage",
							data : {
								count:$("#pageCount").val(),
								pagesize:pageSize,
								curPage:startPage
							},
							success : function(data) {
								$("#simplePage").children().remove();
								$("#simplePage").html(data.pageStr);
							}
						});
						
					};
					var renderBody = function(){
							$.ajax({
								type : "GET",
								url : config.ctx + "/depot/renderPage",
								data : {
									start:getEndPage(),
									end:pageSize
								},
								success : function(data) {
									var isAdmin = $("#isAdmin").val();
									$("#list").children().remove();
									var html="";
									for(var i=0;i<data.length;i++){
										html+= '<div class="uc-item br3" ><ul class="manage-address">';
										html+= '<li class="col co1">'+data[i].province+'-'+data[i].city+'-'+data[i].area+'</li>';
										html+= '<li class="col co2">'+(data[i].address==null?"":data[i].address)+'</li>';
										html+= '<li class="col co3 ftgrey">'+data[i].formatDate+'</li>';
										if(isAdmin == true || isAdmin == "true"){
											html+= '<li class="col co4"> <p><a href="javascript:void(0)" edit="" v='+data[i].id+'>修改</a></p>';
											html+= '<div id="disableDiv'+data[i].id+'" class="disUser">';
											html+='<p><a href="javascript:void(0)" depotdisbled="1"  ve="'+data[i].id+'" class="close">删除</a></p>';
											html+='</div></li>';
										}
										 html+="</ul></div>";
									}
									$("#list").html(html);
								}
							});
					};
					$(document).ready(function(){
						renderBody();
						getPage();
					});
					
//					$(".adname .txtbox").focus(function()
//							{
//						$(".adnamematch").removeClass("hide");
//							}).blur(function(){
//								$(".adnamematch").addClass("hide");
//							});
					$("#depotForm").validate({
						rules : {
							'areaId':{
								required:true,
								maxlength:20
							},
							'address':{
								required:true,
								maxlength:30
							}
						}
					});
					
				
					$("#list").on("click",$("div").find("p [edit]"),function(e){
						$("#addrTitle").html("修改地址");
						var v = $(e.target).attr("v");
						var vd = $(e.target).attr("vd");
						var ve = $(e.target).attr("ve");
						if(typeof(v)!='undefined'){
						e.preventDefault();
        			    e.stopPropagation();
						$("#hiddenId").val(v);
						$.ajax({
							type : "GET",
							url : config.ctx + "/depot/queryDetail",
							data : {
								"commAddrId" : v
							},
							dataType : "json",
							success : function(data) {
								var depotName =data.commAddrName;
								var address = data.address;
								var depotAddress = data.province+"-"+data.city+"-"+data.area;
								$("#depotDialog").popup(
										{oldWin:false}
								);
								$("#areaId").val(depotAddress);
								$("#depotName").val(depotName);
								$("#addressqwewqeqw").val(address);
								$("#areaId").attr("data-value",data.countyCode);
							}
						});
						}
						if(typeof(vd)!='undefined'){
							openUser(vd);
						}
						if(typeof(ve)!='undefined'){
							disUser(ve);
						}
					});
					
					$("#saveDepot").on("click",function(){
								var valid=$("#depotForm").valid();
								var commAddrName = $("#depotName").val();
								var address = $("#addressqwewqeqw").val();
								var countyCode = $("input[name=areaId]").val();
								if(countyCode == null  || countyCode == "" || isNaN(countyCode)){
									countyCode = $("#areaId").attr("data-value");
								}
								var commAddrId =$("#hiddenId").val();
								if(!valid){
									return false;
								}
							$.ajax({
								type : "POST",
								url : config.ctx + "/depot/saveDepot",
								data : {
									"commAddrId" : commAddrId,
									"commAddrName":commAddrName,
									"address":address,
									"countyCode":countyCode
								},
								success : function(data) {
									resetCount();
									 getPage();
									renderBody();
									$("#depotDialog").popup({close: true});
									$("input[name=areaId]").val("");
								},
								error : function(){
									resetCount();
									 getPage();
									renderBody();
									$("#depotDialog").popup({close: true});
								}
							});	
						
					});
					
					
					$("#close").on("click",function(){
							 $("#depotDialog").popup({close: true});
					});
					
					
					
					$("#addDepot").on("click",function(){
						$("#addrTitle").html("新增地址");
						$("#hiddenId").val("");
						//$("#depotName").val("");
						$("#depotDialog").popup({oldWin:false});	
					});
					
				 
					
					var openUser=function (v){
		                $.ajax({
								type : "GET",
								url : config.ctx + "/depot/disableDepot",
								data : {
								"commAddrId":v,
								"type":2
							},
							success : function(data) {
								$(this).remove();
						  		$("#disableDiv"+v).empty();
			                    $("#disableDiv"+v).append('<p><a href="javascript:void(0);" depotdisbled="1"  ve="'+v+'" class="close">停用</a></p>');
			                    $("#disableLi"+v).empty();
			                    $("#disableLi"+v).html('<span class="ftorange"  >启用</span>');
							}
						});	
					};
					var disUser = function (v){
						miscs.alert({
			                title: "删除地址",
			                msgTitle: '确认删除该地址吗？',
			                msgInfo:'删除后，本单位及业务伙伴在创建项目或发布货源时，将无法选用该货场或地址！',
			                successBtn: "确认",
			                cancelBtn: "取消",
			                iconCls: "inoti",
			                sign: "true",
			                success:function(){
			                     	$.ajax({
										type : "GET",
										url : config.ctx + "/depot/disableDepot",
										data : {
										"commAddrId":v,
										"type":1
										},
										success : function(data) {
											resetCount();
											 getPage();
											renderBody();
//											$(this).remove();
//						                    $("#disableDiv"+v).html('<p><a href="javascript:void(0);" depotdisbled="1"  vd="'+v+'" class="open">启用</a></p>');
//						                    $("#disableLi"+v).empty();
//						                    $("#disableLi"+v).html('<span class="ftgreen">停用</span>');
										}
			                     	});	
			                },
			                cancel: function(){
			                		
			                }
			            });
					};
					 
				}
		};
		
		
		});
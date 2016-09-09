/**
 * 项目管理
 */
define(
		[ "jquery", "popup","jQvalidation", "jQmessage", "plugins/validation", "config","plugins/miscs" ,"CryptoJS"],
		function($, popup,validator, message, validation, config,miscs,CryptoJS) {
			
			//是否展开
			var  isShowCollpase=function(){
				/* 展开关闭 */
					$("#search_collapse", ".project_manage_list_page").on("click", function(){
						var $isColl = $("input[name=isCollapsed]");
						var $parentDiv = $(this).parent("div"); 
						if($isColl.val()=="true"){
							$isColl.val("false");
							$(".formlist li:gt(1)").addClass("hide");
						}else{
							$isColl.val("true");
							$(".formlist li:gt(1)").removeClass("hide");
						}
						$parentDiv.toggleClass("basic-search");
						$parentDiv.toggleClass("full-search");
					});
			   //改变下拉框的长度
			   $("[name='projectType']", ".project_manage_list_page").next().css({"width":"129px"});
			   $("[name='projectStatus']", ".project_manage_list_page").next().css({"width":"129px"});
			   $("[name='projectStatusTh']", ".project_manage_list_page").next().css({"width":"99px"});
			   $("[name='relatorType']", ".project_manage_list_page").next().css({"width":"80px"});
			};
			var projectListManage=function(){
				/* 查询 */
				$("#search_btn", ".project_manage_list_page").on("click", function(){
					var c1 = $("#countyCode1").val();
					var c2 = $("#countyCode2").val();
					//alert($("input[name=isCollapsed]").val());
					$("input[name=countyCode1_addr]").val(c1);
					$("input[name=countyCode2_addr]").val(c2);
					$("#search_form").submit();
				});
			};
			
		
			return {		
				init : function() {	
					//是否展开
					isShowCollpase();
					//list manage
					projectListManage();
				}
			};

		});
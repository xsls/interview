/**
 * 
 */
define(["jquery","datepicker","plugins/paging" ,"config"], function($ , datepicker, paging, config){


	/**
	 * 列表页面右上角排序控制初始化
	 */
	var initLoad = function() {
		//初始选中
		var orderColumnName = jQuery("#orderColumn").val();
		var orderModeName = jQuery("#orderMode").val();
		if(null!=orderColumnName&&orderColumnName!=""){
			$(".crt").removeClass("crt");
			jQuery("a[name='"+orderColumnName+"']").parent().addClass("crt");
			if(orderModeName=="ASC"){
				jQuery("a[name='"+orderColumnName+"']").find("i").removeClass("ico-taborder").addClass("ico-ordertop");
			}else{
				jQuery("a[name='"+orderColumnName+"']").find("i").removeClass("ico-ordertop").addClass("ico-taborder");
			}
		}
		
		
		//排序点击
		$(".orderClass").click(function() {
			jQuery("#orderColumn").val($(this).attr("name"));
			if($(this).find("i").hasClass("ico-ordertop")){
				jQuery("#orderMode").val("ASC");
			}else{
				jQuery("#orderMode").val("DESC");
			}
			
			if($(this).attr("mark")!="ajax"){
				//jQuery("form").submit();
			}
		});
		
	};
	
	

	/* 点击我的待订车 */
	var stayList = function(){
		document.location = config.ctx + "/freight/1/stayList";
	};
	
	var page_submit = function(pageNumber){
		var href = window.location.href;
		if(href.indexOf("stayList") != -1){
			document.location = config.ctx + "/freight/"+pageNumber+"/stayList";
		}else{
			var $pageNumber = $("#pageNumber");
			if($pageNumber.length>0){
				$("input[name=pageNumber]").val(pageNumber);
			}else{
				$(".page_submit").append('<input name="pageNumber" value="'+pageNumber+'" type="hidden" />');
			}
			$(".page_submit").submit();
		}
	};
	
	return {
		init: function(){
			//initLoad();
			/* 展开关闭 */
			$("#search_collapse", ".freight_list_page").on("click", function(){
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
			
			/* 点击待订车 */
			$("#stayList", ".freight_list_page").on("click", function(){
				stayList();
			});
			
			/* 查询 */
			$("#search_btn", ".freight_list_page").on("click", function(){
				var c1 = $("#countyCode1").val();
				var c2 = $("#countyCode2").val();
				$("input[name=countyCode1_addr]").val(c1);
				$("input[name=countyCode2_addr]").val(c2);
				$("#search_form").submit();
			});

			/* 分页提交数据 */
			$(".page_a", ".freight_list_page").on("click", function(e){
				var pageNumber = $(e.target).data("pageNumber");
				page_submit(pageNumber);
			});

			/* 点击货源状态搜索刷新 */
			$("[name=freight_status]", ".freight_list_page").on("change", function(){
				$("[name=status]").val($(this).val());
				$("#search_form").submit();
			});
			
			/* 页面加载 是否打开搜索栏 */
			if($("input[name=isCollapsed]", ".freight_list_page").val()=="true"){
				$("input[name=isCollapsed]").val("false");
				$("#search_collapse").click();
                $(".formlist li:gt(1)").removeClass("hide");
			}

            //点击全选
            $("#freight_all_ck", ".freight_list_page").on("click", function (e) {
                $("input[name=all_ids_ck]").prop("checked", e.target.checked);
            });

            //排序
            $("#priceUnitOrder", ".freight_list_page").on("click", function(e){
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
                    $(this).addClass("crt").prev().removeClass("crt");
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
            $("#defaultOrder", ".freight_list_page").on("click", function(e){
                if ($(this).hasClass("crt")) return;
                $(this).addClass("crt").next().removeClass("crt");
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


            //初始化select长度
            $("[name=status]", ".freight_list_page").next().css({"width":"129px"});
            $("[name=pushUserId]", ".freight_list_page").next().css({"width":"129px"});
            $("[name='freight_status']").attr("data-placeholder","货源状态").trigger("chosen:updated").chosen();

            $("[name=freight_status]", ".freight_list_page").next().css({"width":"100px"});
            $("[name=createTime1]", ".freight_list_page").datepicker("setEndDate", new Date());
            $("[name=createTime2]", ".freight_list_page").datepicker("setEndDate", new Date());
            
            $("[name=relator]").next().css({"width":"80px"});
		}
	};
});
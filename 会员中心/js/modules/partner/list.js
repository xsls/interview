define([ "jquery", "config", "plugins/validation", "plugins/miscs","jQvalidation", "popup" ], function($, config, validation, miscs,jQvalidation, pop) {
	var page_submit = function(pageNumber) {		
		var $pageNumber = $("#pageNumber");
		if ($pageNumber.length > 0) {
			$("input[name=pageNumber]").val(pageNumber);
		} else {
			$(".page_submit").append('<input name="pageNumber" value="' + pageNumber+ '" type="hidden" />');
		}
		$(".page_submit").submit();
	};
	var changeButton=(function(){
		var z=$(".ico-check3","#uc-carlist");
    	if(z.size()>0){
			$("#control_truck_button",".mypartnerlist").html('<span class="btn-a-white"><a href="javascript:void(0);" class="br3 ftgrey" id="batch_delete">批量移除伙伴</a></span> ');
		}else{
			$("#control_truck_button",".mypartnerlist").html('<span class="disable br3">批量移除伙伴</span>');
		}
	});	
	return {
		init : function() {
			$(".page_a", ".mypartnerlist").on("click", function(e) {
				var pageNumber = $(e.target).data("pageNumber");
				page_submit(pageNumber);
			});
			$("a.bygroup", ".mypartnerlist").on("click",function(e) {
				var groupId = $(e.target).data("groupId");
				if(groupId==-1){
					$("#shipbox").val(null);
					$("#group_id",".mypartnerlist").val(null);					
				}else{
					$("#shipbox").val(null);
					$("#group_id",".mypartnerlist").val(groupId);					
				}
				$(".page_submit").submit();
			});
	        $("#default-order",".mypartnerlist").on("click", function(){
	        	$("#orderColumn",".mypartnerlist").val(0);
	        	$(".page_submit").submit();
	        });
	        $("#by-truckmodel-order",".mypartnerlist").on("click", function(){
	        	$("#orderColumn",".mypartnerlist").val(1);
	        	$(".page_submit").submit();
	        });
	        /**添加分组*/
			$("#truck_div_groups",".mypartnerlist").on("click","li",function(e){
				e.stopPropagation();
	        	var target=$(this);
	        	target.siblings("li").removeClass("ckd");
	        	target.addClass("ckd");
	        	$("#selectGroupId").val(target.data("groupId"));
			});
			$("#truck_cancel_group",".mypartnerlist").on("click",function(){
				$(".ckd","#truck_div_groups").removeClass("ckd");
				$("#selectGroupId").val("");
				$("#truck_group_list",".mypartnerlist").addClass("hide").insertAfter($("#batch_edit"));
			});
	        $("#truck_confirm_group",".mypartnerlist").on("click",function(e){
	     			var groupId=$("#selectGroupId").val();
	     			if(groupId){
			        	 var that = $(this);
			             if (!that.flag){
			            	var gContentIds=$("#gContentIds").val();
			     	        $.ajax({
			     	            type: "POST",
			     	            url: config.ctx + "/partner/edit",
			     	            data: {"gContentIds":gContentIds,"targetGroupId":groupId,"editFlag":0},
			     	            dataType: "json",
			     	            success: function (data) {
			     	                if (data) {
miscs.alert({title: "更改分组成功",msgTitle: "更改分组成功!",sign:false,iconCls: "iok",successBtn: "确认",cancelBtn: "取消",success:function(){$(".page_submit").submit();},cancel: function(){}});			     	                	
			     	                }
			     	                that.flag = false;
			     	            },error: function () {
miscs.alert({title: "更改分组失败",msgTitle: "更改分组失败!",sign:false,iconCls: "ierror",successBtn: "确认",cancelBtn: "取消",success:function(){},cancel: function(){}});
			                        that.flag = false;
			                     }   
			     	        });
			             }	        		 
		        	 }else{
miscs.alert({title: "提示",msgTitle: "请选择要修改的组!",sign:false,iconCls:"inoti",successBtn: "确认",cancelBtn: "取消",success:function(){},cancel: function(){}});
		        	 }
	        });
			/*分组列表  新增(+ 新增分组)*/
			$("#truck_add_group",".mypartnerlist").on("click",function(){
				$("#truck_add_span").removeClass("hide");
				$("#truck_add_em").addClass("hide");
			});
			/*分组列表  新增  取消*/
			$("#truck_group_close",".mypartnerlist").on("click",function(e){
		        e.stopPropagation();
				$("#truck_add_group_name").val("");
				$("#truck_add_span").addClass("hide");
				$("#truck_add_em").removeClass("hide");
			});
			/*分组列表  新增 确认*/
			$("#truck_group_ok",".mypartnerlist").on("click", function(e) {
		        e.stopPropagation();
		        var $addGoupName=$("#truck_add_group_name");
	            var groupname=$addGoupName.val();
	            if(!groupname){
	            	miscs.tooltip_global_warning($addGoupName,'此处必填');
	            	return;
	            }
	            if(groupname.length>20){
	            	miscs.tooltip_global_warning($addGoupName,'分组名称不可超过20个字符');
	            	return;	            	
	            }
		        var that=this;
		        if (!that.flag){
		            that.flag = true;
			        $.ajax({
			            type: "POST",
			            url: config.ctx + "/truckGroup/create",
			            data: {"groupName":groupname,"groupDesc":"","type":1},
			            dataType: "json",
			            success: function (data) {
			                if (data) {
				            	if(data.isRepeatName){
miscs.alert({title: "新增失败",msgTitle: "该组名称已存在!",iconCls:"ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
				            	}else{
				    				$("#truck_add_span").addClass("hide");
				    				$("#truck_add_em").removeClass("hide");
				    				$("#truck_add_group_name").val("");
				    	        	$(".ckd","#truck_div_groups").removeClass("ckd");
				    	        	var groupId=data.id;
				    	        	var groupName=data.groupName;
				    				var dom='<li class="ckd" data-group-id="'+groupId+'"><em class="arw">&gt;</em><span class="groupname">'+groupName+'</span></li>';
				    				$("li:last","#truck_div_groups").after(dom);
				    	        	$("#selectGroupId").val(groupId);				    	        	
				            	}
			                }
			                that.flag = false;
			            },error: function () {
miscs.alert({title:"新增失败",msgTitle:"新增失败",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
		                    that.flag = false;
		                }   
			        });
		        }	        
			});		
	        $("#my-truck-edit-group",".mypartnerlist").on("click", function(){
		           $("#group-tab-hd",".mypartnerlist").addClass("hide");
		           $("#group-tab-hd-edit",".mypartnerlist").removeClass("hide");
		        });
		    $("#edit-group-cancel",".mypartnerlist").on("click",function(){
		    	   $("[name=groupName]").val($("[name=editGroupName]").val());
		    	   $("[name=groupDesc]").val($("[name=editGroupDesc]").val());
			       $("#group-tab-hd",".mypartnerlist").removeClass("hide");
			       $("#group-tab-hd-edit",".mypartnerlist").addClass("hide");
		    });
		    
	        $("#plusGroup",".mypartnerlist").on("click",function(e){
		        $("#uc-plusgroup",".mypartnerlist").popup();
		    });
		    $("#cancel-plus-group-button",".mypartnerlist").on("click", function(){
		    	$("#uc-plusgroup",".mypartnerlist").popup({"close":true});
		    });
	        var editoption = {rules:{groupName:{required:true,maxlength:20,minlength:1},groupDesc:{maxlength:50}}};
	        var addoption = {rules:{createGroupName:{required:true, maxlength:20,minlength: 1},creategroupDesc:{maxlength:50}}};	        
	        $("#group-add-form").validate(addoption);
	        $("#group-edit-form").validate(editoption);
	        $("#conf-plus-group-button",".mypartnerlist").on("click",function(){
                if (!$("#group-add-form").valid()) {return;}
                var that = this;
                if (!that.flag){
                    that.flag = true;
        			var groupname = $("input[name=createGroupName]","#group-add-form").val();
        			var groupdesc = $("[name=creategroupDesc]","#group-add-form").val();
        	        $.ajax({
        	            type: "POST",
        	            url: config.ctx + "/truckGroup/create",
        	            data: {"groupName":groupname,"groupDesc":groupdesc,"type":1},
        	            dataType: "json",
        	            success: function (data) {
        	                if (data) {
        		            	if(data.isRepeatName){
miscs.alert({title:"新增失败",msgTitle: "组名称已存在!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
        		            	}else{
        		            		$("#uc-plusgroup",".mypartnerlist").popup({"close":true});
miscs.alert({title:"新增成功",msgTitle: "新增成功",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
        		                		$(".page_submit").submit();
        		                	},cancel: function(){}});	
        		            	}
        	                }
        	                that.flag = false;
        	            },error: function () {
miscs.alert({title: "新增失败",msgTitle:"新增失败",iconCls:"ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel:function(){}});	
                            that.flag = false;
                        }   
        	        });
                }               
	        });
	        $("#edit-group-save",".mypartnerlist").on("click",function(){
                if (!$("#group-edit-form").valid()) {return;}
                var that = this;
                if (!that.flag){
                    that.flag = true;
        			var groupId = $("#group_id").val();
        			var groupname = $("input[name=groupName]","#group-edit-form").val();
        			var groupdesc = $("[name=groupDesc]","#group-edit-form").val();
        	        $.ajax({
        	            type:"POST",
        	            url:config.ctx + "/truckGroup/edit",
        	            data: {"groupId": groupId,"groupName":groupname,"groupDesc":groupdesc,"type":1},
        	            dataType: "json",
        	            success: function (data) {
        	                if (data) {
        		            	if(data.isRepeatName){
        		                	miscs.alert({title:"修改失败",msgTitle: "组名称已存在!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
        		            	}else{
        		            		miscs.alert({title:"修改成功",msgTitle:"修改成功",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){$(".page_submit").submit();},cancel: function(){}});
        		            	}
        	                }
        	                that.flag = false;
        	            },error: function () {
        	            	miscs.alert({title: "修改失败",msgTitle:"修改失败",iconCls:"ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
                            that.flag = false;
                        }   
        	        });
                }                 
	        });
	        $("#batch_edit",".mypartnerlist").on("click",function(){
	        	var flag=false;
	        	var gContentIds=new Array();
	        	$(".ico-check3","#uc-carlist").each(function(i,o){
	        		gContentIds.push($(o).data("gcontentId"));
	        		flag=true;
	        	});
	        	if(flag){
	        		$("#gContentIds").val(gContentIds.join(","));
	        		$("#truck_group_list",".mypartnerlist").removeClass("hide").insertAfter($(this));
	        	}else{
	        		miscs.alert({title: "提示",msgTitle: "请选择业务伙伴!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});  
	        	}
	        });	
	        $("#my-truck-delete-group",".mypartnerlist").on("click",function(){
	        	miscs.alert({title: "删除分组",msgTitle: "确定删除该分组!",iconCls: "iok",successBtn: "确认",cancelBtn: "取消",success:function(){
	                var that = this;
	                if (!that.flag){
	                    that.flag = true;
	                    var groupId = $("#group_id").val();
	                    var noGroupId=$("#noGroupId").val();
	                    $.ajax({
	                        type: "POST",
	                        url: config.ctx + "/truckGroup/delete",
	                        data: {"groupId":groupId,"noGroupId":noGroupId,"type":1},
	                        dataType: "json",
	                        success: function (data){
	                        	/*miscs.alert({title: "提示",msgTitle: "最多添加10个联系人!",sign:false,iconCls: "inoti",successBtn: "确认",cancelBtn: "取消",success:function(){},cancel: function(){}});*/
	                        	miscs.alert({title: "删除成功",msgTitle: "删除组成功!",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
	                        		$("#group_id",".mypartnerlist").val(null);
	                        		$(".page_submit").submit();
	                        	},cancel: function(){}});
	                        	that.flag = false;                      	
	                        },error: function () {
	                        	miscs.alert({title: "删除失败",msgTitle: "删除组失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});
	                        	that.flag = false;
	                        }
	                    });
	                }
	        	},cancel: function(){}});
	        });	        
	        /**列表 开始*/
	        $("#uc-carlist",".mypartnerlist").on("click","dl",function(){
	        	var $this=$(this);
	        	var target=$this.find(".single_check");
	        	if($this.hasClass("current")){
		        	$this.removeClass("current");
	    			target.removeClass("ico-check3").addClass("ico-check1");
	        	}else{
		        	$this.addClass("current");
	    			target.removeClass("ico-check1").addClass("ico-check3");
	        	}
	        	changeButton();
	        });
	        $(".all-check-img",".mypartnerlist").on("click",function(){
	        	var target=$(this);  
	        	if(target.hasClass("ico-check3")){ 
	               //全不选
		           target.removeClass("ico-check3").addClass("ico-check1"); 
		           $(".check-img",".mypartnerlist").removeClass("ico-check3").addClass("ico-check1");
			       $("dl","#uc-carlist").removeClass("current");
	    		}else {
	               //全选 
	               target.removeClass("ico-check1").addClass("ico-check3"); 
	               $(".check-img",".mypartnerlist").removeClass("ico-check1").addClass("ico-check3");
			        $("dl","#uc-carlist").addClass("current");
	    		}
	        	changeButton();
	        });
	        $("#groupCollapsed",".mypartnerlist").on("click", function(){
	        	var $ul=$(".filter-bd ul",".mypartnerlist");
	        	if($ul.hasClass("all-item")){
	        		$("#isCollapsed",".mypartnerlist").val(0);
	        		$("#groupCollapsed").html('展开分组<i class="icon i9-4 ico-arwbtm"></i>');
	        	}else{
	        		$("#isCollapsed",".mypartnerlist").val(1);
	        		$("#groupCollapsed").html('收起分组<i class="icon i9-4 ico-arwtop"></i>');
	        	}
	    		$ul.toggleClass("all-item");
	        });	
	        $(".search_car",".mypartnerlist").on("click","a",function(e){
	        	e.stopPropagation();
	        	e.preventDefault();
	        	var id=$(this).data("gcontentId");
	        	window.open(config.ctx+"/partner/Window/"+id+"/detail");
	        });
	        $(".edit_group",".mypartnerlist").on("click","a",function(e){
	        	e.stopPropagation();
	        	var current=$(e.target);
		        var gcid=$(this).data("gcontentId");
		        $("#gContentIds").val(gcid);
		        $(".edit_group",".mypartnerlist").removeClass("pr z30");
		        $(".uc-item").removeClass("z30");
		        $(this).parent().addClass("pr z30");
		        $(this).parents('dd').parent().addClass("z30");
		        $("#truck_group_list",".mypartnerlist").removeClass("hide").insertAfter(current);
	        });	        
	        /**列表 结束*/
	        /**删除车辆 开始*/
	        $("#control_truck_button",".mypartnerlist").on("click","a",function(){
                var gcontentIds=new Array();
                var flag = false;
	        	$(".ico-check3","#uc-carlist").each(function(i,o){
	        		gcontentIds.push($(o).data("gcontentId"));
	        		flag=true;  
	        	});
	        	if(flag){
	        		$("#gContentIds").val(gcontentIds.join(","));
		        	$("#delete-car").popup();
	        	}
	        });
	        $("#deleteConfirm",".mypartnerlist").on("click",function(){
	        	 var that = $(this);
	             if (!that.flag){
	     			var isDelete=$("#isDelete").prop("checked");
	     			var gContentIds=$("#gContentIds").val();
	     			var noGroupId=$("#noGroupId").val();
	     	        $.ajax({
	     	            type: "POST",
	     	            url: config.ctx + "/partner/delete",
	     	            data: {"gContentIds":gContentIds,"deleteFlag":isDelete?1:0,"noGroupId":noGroupId},
	     	            dataType: "json",
	     	            success: function (data) {
	     	                if (data) {
		     	            	$("#delete-car").popup({"close":true});
		     	            	miscs.alert({title: "删除成功",msgTitle: "删除成功!",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
		     		            	$(".page_submit").submit();
		     	            	},cancel: function(){}});	
	     	                }
	     	                that.flag = false;
	     	            },error: function () {
	     	            	$("#delete-car").popup({"close":true});
 		                	miscs.alert({title: "删除失败",msgTitle: "删除失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
	                        that.flag = false;
	                     }   
	     	        });
	             }         	
	        });
	        $("#cancel_delete_car",".mypartnerlist").on("click",function(){
	        	$("#delete-car").popup({"close":true});
	        });
	        /**删除车辆 结束*/
	        /*加载信用级别*/
	        $("[name=sincerity_level]").each(function(i, o){
	        	var dom=miscs.calcLevel({level:$(o).val(),type:"org",addspan:true});
	        	$(o).after(dom);
	        });
		}
	};

});
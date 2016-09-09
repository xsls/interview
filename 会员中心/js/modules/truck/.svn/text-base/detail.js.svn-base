define([ "jquery","config", "plugins/validation", "plugins/miscs","jQvalidation", "popup" ], function($, config, validation, miscs,jQvalidation, pop) {
	return {
		init : function() {
			/*修改分组  点击*/
			$("#alert_group",".mycardetail").on("click",function(){
				$(".ckd","#div_groups").removeClass("ckd");
				$("#selectGroupId").val("");
				$("#group_list").toggleClass("hide");
			});
			/*分组列表  取消*/
			$("#cancel_group",".mycardetail").on("click",function(){
				$(".ckd","#div_groups").removeClass("ckd");
				$("#selectGroupId").val("");
				$("#group_list").addClass("hide");
			});
	        /*分组列表    选中某一个时*/ 
	        $("#div_groups",".mycardetail").on("click","li",function(){
	        	var target=$(this);
	        	target.siblings("li").removeClass("ckd");
	        	target.addClass("ckd");
	        	$("#selectGroupId").val($(this).data("groupId"));
	        });			
			/*分组列表      确认*/
			$("#confirm_group",".mycardetail").on("click",function(){
	            var selectGroupId=$("#selectGroupId").val();
	            if(selectGroupId){
			        var that=this;
			        if (!that.flag){
			            that.flag = true;
			            var oid=$("#oid").val();
				        $.ajax({
				            type: "POST",
				            url: config.ctx + "/truck/edit",
				            data: {"groupContentId":oid,"targetGroupId":selectGroupId,"editFlag":1},
				            dataType: "json",
				            success: function (data) {
				                if (data) {
				                	var $target=$(".ckd","#div_groups");
				                	$("#alert_group_name").text($target.text().substr(1));
				                	$target.removeClass("ckd");
				    				$("#group_list").addClass("hide");
				    	        	$("#selectGroupId").val("");
				                }
				                that.flag = false;
				            },error: function () {
				            	miscs.alert({title:"修改分组失败",msgTitle:"修改分组失败",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
			                    that.flag = false;
			                }   
				        });
			        }		
	            }else{
	            	miscs.alert({title: "提示",msgTitle: "请选择组!",iconCls:"inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});		
	            }
			});
			/*分组列表  新增(+ 新增分组)*/
			$("#add_group",".mycardetail").on("click",function(){
				$("#add_span").removeClass("hide");
				$("#add_em").addClass("hide");
			});
			/*分组列表  新增  取消*/
			$("#group_close",".mycardetail").on("click",function(e){
		        e.stopPropagation();
				$("#add_group_name").val("");
				$("#add_span").addClass("hide");
				$("#add_em").removeClass("hide");
			});
			/*分组列表  新增 确认*/
			$("#group_ok",".mycardetail").on("click", function(e) {
		        e.stopPropagation();
		        var $addGoupName=$("#add_group_name");
	            var groupname=$addGoupName.val();
	            if(!groupname){
	            	miscs.tooltip_global_warning($addGoupName,'此处必填');
	            	return;
	            }
		        var that=this;
		        if (!that.flag){
		            that.flag = true;
			        $.ajax({
			            type: "POST",
			            url: config.ctx + "/truckGroup/create",
			            data: {"groupName":groupname,"groupDesc":"","type":7},
			            dataType: "json",
			            success: function (data) {
			                if (data) {
				            	if(data.isRepeatName){
				                	miscs.alert({title: "新增失败",msgTitle: "改组名称已存在!",iconCls:"ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
				            	}else{
				            		$("#selectGroupId").val(data.id);
				    				$("#add_span").addClass("hide");
				    				$("#add_em").removeClass("hide");
				    				$("#add_group_name").val("");
				    	        	$(".ckd","#div_groups").removeClass("ckd");
				    				var dom='<li class="ckd" data-group-id="'+data.id+'"><em class="arw">&gt;</em><span class="groupname">'+data.groupName+'</span></li>';
				    				$("li:last",".mycardetail").after(dom);
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
			/*  页面  修改按钮*/
	        $("#carlistedit",".mycardetail").on("click",function(){
	        	$("#description_edit").toggleClass("hide");
	        	$("#description_readonly").toggleClass("hide");
	        });
	        /* 备注信息  修改    保存*/
	        $("#description_edit_save",".mycardetail").on("click",function(){
	        	 var that = $(this);
	             if (!that.flag){
	     	        var oid=$("#oid").val();
	     			var des=$("#description_text").val();
	     	        $.ajax({
	     	            type: "POST",
	     	            url: config.ctx + "/truck/edit",
	     	            data: {"groupContentId":oid,"description":des,"editFlag":2},
	     	            dataType: "json",
	     	            success: function (data) {
	     	                if (data) {
	     		     			var $desc=$("#description_readonly");
	     		     			$desc.text(des);
	     			        	$("#description_edit").toggleClass("hide");
	     			        	$desc.toggleClass("hide");	
	     	                }
	     	                that.flag = false;
	     	            },error: function () {
 		                	miscs.alert({title: "修改失败",msgTitle: "修改失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
	                        that.flag = false;
	                     }   
	     	        });
	             }	        	
	        });
	        /*删除云车辆  删除车辆   按钮*/
	        $("#deleteConfirm",".mycardetail").on("click",function(){
	        	 var that = $(this);
	             if (!that.flag){
	     			var oid=$("#oid").val();
	     			var isDelete=$("#isDelete").prop("checked");
	            	var noGroupId=$("[name=noGroupId]").val();
	     	        $.ajax({
	     	            type: "POST",
	     	            url: config.ctx + "/truck/delete",
	     	            data: {"gContentIds":oid,"targetGroupId":noGroupId,"deleteFlag":isDelete?1:0},
	     	            dataType: "json",
	     	            success: function (data) {
	     	            	$("#delete_car").popup({"close":true});
	     	                if (data) {
		     	            	miscs.alert({title: "删除成功",msgTitle: "删除成功!",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
		     	            		if(!isDelete){
		     	            			$("#alert_group_name").text("未分组车辆");
		     	            		}else{
		     	            			window.close();
		     	            			/*location.reload();*/
		     	            		}
		     	            	},cancel: function(){}});	
	     	                }else{
		     	            	miscs.alert({title: "删除失败",msgTitle: "删除失败!",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
		     	            		location.reload();
		     	            	},cancel: function(){}});	     	                	
	     	                }
	     	                that.flag = false;
	     	            },error: function () {
 		                	miscs.alert({title: "删除失败",msgTitle: "删除失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
	                        that.flag = false;
	                     }   
	     	        });
	             }  
	        });
	        $("#delete_cloud_truck",".mycardetail").on("click",function(){
	        	$("#delete_car").popup();
	        });
	        $("#cancel_delete_car",".mycardetail").on("click",function(){
	        	$("#delete_car").popup({"close":true});
	        });
	        
	        /*加载信用级别*/
	       /* alert(miscs.calcLevel({ level:$(this).val(), type:"user"}));*/
	        $("[name=sincerity_level]",".mycardetail").each(function(index, data){
	        	$(this).after(miscs.calcLevel({
	        		level:$(this).val(),
	        	    type:"user"
	        	}));
	        });
	        
	        /***编辑车辆 模块***/
	        $("#city_selectid_add",".mycaredit").on("click",function(){
	        	$("#city_select_textarea",".mycaredit").text();
	        });
	        $("#edit_truck_button_save",".mycaredit").on("click",function(){
	        	var area1=$("#citySelectId1").val();
	        	var area2=$("#citySelectId2").val();
	        	if(area1&&area2){
	        		var code0=$("[name=commEntitysCountyCode0]").val();
	        		var code1=$("[name=commEntitysCountyCode1]").val();
	        		var id=code0+'_edit_'+code1;
	        		if($("#"+id).size()>0){
	        			return;
	        		}else{
	        			$("#citySelectId1").setCityValue(null);
	        			$("#citySelectId2").setCityValue(null);
			        	$(this).parents("tr").after('<tr id="'+id+'"><input type="hidden" value="'+code0+'" name="cityCode0"><input type="hidden" value="'+code1+'" name="cityCode1" /><td colspan="2">'+area1+' -- '+area2+'</td><td><a class="btn-a-blue edit_carlist_del" href="javascript:void(0);">删除</a></td></tr>');	        			        			
	        		}
	        	}
	        });
	        $(".carlist-table",".mycaredit").on("click",".edit_carlist_del",function(){
	        	$(this).parents("tr").remove();
	        });
	        var v_options = {
                    rules: {
                    	editTruckLicenseNo:{
                    		required: true,
                    		maxlength:10
                    	},
                    	editTruckmodelId: {
                            required: true
                        },
                        editRegTonnage: {
                            required: true,
                            number: true
                        },
                        editTrueName: {
                            required: true,
                            maxlength:10
                        },
                        editTelephone: {
                            required: true,
                            mobileNumber: true
                        }
                    }
                };
            $("#edit_truck_form",".mycaredit").validate(v_options);
	        $("#single_edit_truck_save",".mycaredit").on("click",function(){
	        	var $form=$("#edit_truck_form");
	        	if(!$form.valid()){
	        		 return;
	        	}
	        	 var that = $(this);
	             if (!that.flag){
	     	        $.ajax({
	     	            type: "POST",
	     	            url: config.ctx + '/truck/detail/editTruck',
	     	            data: $form.serialize(),
	     	            dataType: "json",
	     	            success: function (data) {
	     	                if (data.success) {
	     	                	location.reload();
	     	                }else{
		     	            	miscs.alert({title: "修改失败",msgTitle: "修改失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});		     	                	
	     	                }
	     	                that.flag = false;
	     	            },error: function () {
 		                	miscs.alert({title: "保存失败",msgTitle: "保存失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
	                        that.flag = false;
	                     }   
	     	        });
	             } 	        	
	        });
	        $("[name=editTruckmodelId]", ".mycaredit").next().css({"width":"150px"});
		}
	};
});	
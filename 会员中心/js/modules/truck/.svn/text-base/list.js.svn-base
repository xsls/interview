define([ "jquery","config", "plugins/validation", "plugins/miscs","jQvalidation", "popup"], function($, config, validation, miscs,jQvalidation, pop) {
    var trucklicenseNoList = function () {
    	var _this=$(this);
        var no = $(_this).val();
        var _list = $("#already_exist_truck_trucklicenseNo_list");
        _list.addClass("hide");
        $(".plusdrop").addClass("hide");
        if(!no){
        	return;
        }
        if (_this.timer){
            clearTimeout(_this.timer);
        }
        this.timer=setTimeout(function(){
            $.ajax({
                type: "GET",
                url: config.ctx + "/truck/query/trucklicenseNo",
                data: {"trucklicenseNo":no,"flag":0},
                dataType: "json",
                async: false,
                success: function (data) {
                	if(data){
                         var dom = "";
                         $.each(data, function (i, o) {
                         if (o.truckLicenseNo) {
                           	  var addFlag=o.addFlag==1?true:false;
                           	  var clickClass=addFlag?'readOnly_list':'clc';
                           	  dom += '<li class="'+clickClass+'" data-licenseno="'+o.truckLicenseNo+'" data-truck-id="'+o.truckId+'" data-truckmodel-id="'+o.truckModelId+'" data-regtonnage="'+o.regTonnage+'"><span class="key-name">' + o.truckLicenseNo + '</span>';
    	                      if(o.truckCertStatus=='CERTED'){
    	                       	dom +='<em class="icon i31-20 truck-ico-idcerti ml10"></em>';
    	                      }
    	                      if(addFlag){
    	                       	dom +='<span class="ftorange fr">已存在</span>';
    	                      }
    	                        dom += "</li>";
                          }  
                          });
                          _list.html(dom);
                          _list.removeClass("hide");
                	}else{
                    	$("#already_exist_truck_truckId",".mycarlist").val(null);
                        _list.html("");
                    }
                },error: function () {               	
                }
            });        	
        },600);
    };
	var closeTruckLicenseNoList=(function(e){
        var _current = $(e.target);
        if (_current.hasClass("readOnly_list") || _current.parents("li").hasClass("readOnly_list")) {
            return false;
        }
        if(_current.attr("id") != 'already_exist_truck_trucklicenseNo_list') {
            var _list = $("#already_exist_truck_trucklicenseNo_list");
            if (!_list.hasClass("hide")) {
                _list.addClass("hide");
            }
        }
        if (_current.attr("name") == "addTrueName") {
        	return false;
        }else {
        	$(".plusdrop").addClass("hide");
        }
	});
	/**添加车辆  功能函数 结束*/
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
			$("#control_truck_button",".mycarlist").html('<span class="btn-a-white"><a href="javascript:void(0);" class="br3 ftgrey" id="batch_delete">批量移除车辆</a></span> ');
		}else{
			$("#control_truck_button",".mycarlist").html('<span class="disable br3">批量移除车辆</span>');
		}
	});
	return {
		init : function() {
			$(".page_a", ".mycarlist").on("click", function(e) {
				var pageNumber = $(e.target).data("pageNumber");
				page_submit(pageNumber);
			});
			$("a.bygroup", ".mycarlist").on("click",function(e) {
				var groupId = $(e.target).data("groupId");
				if(groupId==-1){
					$("#shipbox").val(null);
					$("#group_id",".mycarlist").val(null);					
				}else{
					$("#shipbox").val(null);
					$("#group_id",".mycarlist").val(groupId);					
				}
				$(".page_submit").submit();
			});
	        $("#default-order",".mycarlist").on("click", function(){
	        	$("#orderColumn",".mycarlist").val(0);
	        	$(".page_submit").submit();
	        });
	        $("#by-truckmodel-order",".mycarlist").on("click", function(){
	        	$("#orderColumn",".mycarlist").val(1);
	        	$(".page_submit").submit();
	        });		        
			$("#truck_div_groups",".mycarlist").on("click","li",function(e){
				e.stopPropagation();
	        	var target=$(this);
	        	target.siblings("li").removeClass("ckd");
	        	target.addClass("ckd");
	        	$("#selectGroupId").val(target.data("groupId"));
			});
			$("#truck_cancel_group",".mycarlist").on("click",function(){
				$(".ckd","#truck_div_groups").removeClass("ckd");
				$("#selectGroupId").val("");
				$("#truck_group_list",".mycarlist").addClass("hide").insertAfter($("#batch_edit"));
			});
	        $("#truck_confirm_group",".mycarlist").on("click",function(e){
	     			var groupId=$("#selectGroupId").val();
	     			if(groupId){
			        	 var that = $(this);
			             if (!that.flag){
			             	that.flag = true;
			            	var gContentIds=$("#gContentIds").val();
			     	        $.ajax({
			     	            type: "POST",
			     	            url: config.ctx + "/truck/edit",
			     	            data: {"gContentIds":gContentIds,"targetGroupId":groupId,"editFlag":0},
			     	            dataType: "json",
			     	            success: function (data) {
			     	                if (data) {
				     	            	miscs.alert({title: "更改成功",msgTitle: "更改成功!",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
				     		            	$(".page_submit").submit();
				     	            	},cancel: function(){}});	
			     	                }
			     	                that.flag = false;
			     	            },error: function () {
		 		                	miscs.alert({title: "更改失败",msgTitle: "更改失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
			                        that.flag = false;
			                     }   
			     	        });
			             }	        		 
		        	 }else{
		             	 miscs.alert({title: "提示",msgTitle: "请选择要修改的组!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
		        	 }	        		
	        });
			$("#truck_add_group",".mycarlist").on("click",function(){
				$("#truck_add_span").removeClass("hide");
				$("#truck_add_em").addClass("hide");
			});
			$("#truck_group_close",".mycarlist").on("click",function(e){
		        e.stopPropagation();
				$("#truck_add_group_name").val("");
				$("#truck_add_span").addClass("hide");
				$("#truck_add_em").removeClass("hide");
			});
			$("#truck_group_ok",".mycarlist").on("click", function(e) {
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
			            data: {"groupName":groupname,"groupDesc":"","type":7},
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
	        $("#plusGroup",".mycarlist").on("click",function(e){
		        $("#uc-plusgroup",".mycarlist").popup();
		    });
		    $("#cancel-plus-group-button",".mycarlist").on("click", function(){
		    	$("#uc-plusgroup",".mycarlist").popup({"close":true});
		    });
	        $("#my-truck-edit-group",".mycarlist").on("click", function(){
		           $("#group-tab-hd",".mycarlist").addClass("hide");
		           $("#group-tab-hd-edit",".mycarlist").removeClass("hide");
		        });
		    $("#edit-group-cancel",".mycarlist").on("click",function(){
		    	   $("[name=groupName]").val($("[name=editGroupName]").val());
		    	   $("[name=groupDesc]").val($("[name=editGroupDesc]").val());
			       $("#group-tab-hd",".mycarlist").removeClass("hide");
			       $("#group-tab-hd-edit",".mycarlist").addClass("hide");
		    });
	        var editoption = {rules:{groupName:{required:true,maxlength:20,minlength: 1},groupDesc:{maxlength:50}}};
	        var addoption = {rules:{createGroupName:{required:true, maxlength:20, minlength: 1},creategroupDesc:{maxlength:50}}};	        
	        $("#group-add-form").validate(addoption);
	        $("#group-edit-form").validate(editoption);
	        $("#conf-plus-group-button",".mycarlist").on("click",function(){
                if (!$("#group-add-form").valid()) {return;}
                var that = this;
                if (!that.flag){
                    that.flag = true;
        			var groupname = $("[name=createGroupName]","#group-add-form").val();
        			var groupdesc = $("[name=creategroupDesc]","#group-add-form").val();
        	        $.ajax({
        	            type: "POST",
        	            url: config.ctx + "/truckGroup/create",
        	            data: {"groupName":groupname,"groupDesc":groupdesc,"type":7},
        	            dataType: "json",
        	            success: function (data) {
        	                if (data) {
        		            	if(data.isRepeatName){
        		                	miscs.alert({title:"新增失败",msgTitle: "组名称已存在!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
        		            	}else{
        		            		$("#uc-plusgroup",".mycarlist").popup({"close":true});
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
	        $("#edit-group-save",".mycarlist").on("click",function(){
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
        	            data: {"groupId": groupId,"groupName":groupname,"groupDesc":groupdesc,"type":7},
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
	        $("#my-truck-delete-group",".mycarlist").on("click",function(){
	        	miscs.alert({title: "删除分组",msgTitle: "确定删除该分组!",iconCls: "iok",successBtn: "确认",cancelBtn: "取消",success:function(){
	                var that = this;
	                if (!that.flag){
	                    that.flag = true;
	                    var groupId = $("#group_id").val();
	                    var noGroupId=$("#noGroupId").val();
	                    $.ajax({
	                        type: "POST",
	                        url: config.ctx + "/truckGroup/delete",
	                        data: {"groupId":groupId,"noGroupId":noGroupId,"type":7},
	                        dataType: "json",
	                        success: function (data){
	                        	miscs.alert({title: "删除成功",msgTitle: "删除组成功!",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
	                        		$("#group_id",".mycarlist").val(null);
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
	        $("#batch_edit",".mycarlist").on("click",function(){
	        	var flag=false;
	        	var gContentIds=new Array();
	        	$(".ico-check3","#uc-carlist").each(function(i,o){
	        		gContentIds.push($(o).data("gcontentId"));
	        		flag=true;
	        	});
	        	if(flag){
	        		$("#gContentIds").val(gContentIds.join(","));
	        		$("#truck_group_list",".mycarlist").removeClass("hide").insertAfter($(this));
	        	}else{
	        		miscs.alert({title: "提示",msgTitle: "请选择车辆!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});  
	        	}
	        });
	        $("#plustruck",".mycarlist").on("click",function(){
	            $("#already_booking_truck_error_msg",".mycarlist").addClass("hide");
	            $("#uc-addcar",".mycarlist").popup();
	        });
	        $("#cancel-plustruck-button",".mycarlist").on("click",function(){
	            $("#uc-addcar",".mycarlist").popup({"close":true});
	        });
            var v_options = {
                    rules: {
                    	trucklicenseNo:{
                    		required: true,
                    		maxlength:10
                    	},
                    	truckmodelId: {
                            required: true
                        },
                        regTonnage: {
                            required: true,
                            number: true
                        },
                        addTrueName: {
                            required: true,
                            maxlength:10
                        },
                        telephone: {
                            required: true,
                            mobileNumber: true
                        },
                       addRemark:{
                           maxlength:50
                       }
                    }
                };
            $("#add_truck_form", ".mycarlist").validate(v_options);
	        $("#uc-addcar-next",".mycarlist").on("click",function(){
	            if (!$("#add_truck_form").valid()) {
	                return;
	            }
	            var $addGroupId=$("[name=addGroupId]");
	            if(!$addGroupId.val()){
	            	var noGroupId=$("[name=noGroupId]").val();
	            	$addGroupId.val(noGroupId);
	            }
	        	 var that = $(this);
	             if (!that.flag){
	     	        $.ajax({
	     	            type: "POST",
	     	            url: config.ctx + "/truck/add",
	     	            data: $("#add_truck_form").serialize(),
	     	            dataType: "json",
	     	            success: function (data) {
	     	                if (data.success){
	        			        var trucklicenseNo=$("#already_exist_truck_trucklicenseNo").val();
	        			        $("#uc-addcar",".mycarlist").popup({"close":true});
	        			        $("#step_add_car").text('成功添加车辆：'+trucklicenseNo+'！');
		     		        	$("#addcar-success",".mycarlist").popup();
	     	                }else{
		     	            	var $msg=$("#already_booking_truck_confirm_error_msg");
		     	            	$msg.parent().removeClass("hide");
		     	            	$msg.text(data.msg);	     	                	
	     	                }
	     	                that.flag = false;
	     	            },error: function () {
	     	            	var $msg=$("#already_booking_truck_confirm_error_msg");
	     	            	$msg.parent().removeClass("hide");
	     	            	$msg.text("添加车辆失败");
 		                	miscs.alert({title: "添加失败",msgTitle: "添加车辆失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
	                        that.flag = false;
	                     }   
	     	       });
	            }
	        });
	        $("#addcar-success-close",".mycarlist").on("click",function(){
	            $(".page_submit").submit();
	        	$("#addcar-success",".mycarlist").popup({"close":true});
	        });
	        $("#plustruck",".mycarlist").on("click",function(){
	            $("#already_booking_truck_error_msg",".mycarlist").addClass("hide");
	            $("#uc-addcar",".mycarlist").popup();
	        });
            $("#already_exist_truck_trucklicenseNo",".mycarlist").on("keyup",trucklicenseNoList);
            $("#already_exist_truck_trucklicenseNo",".mycarlist").on("click", trucklicenseNoList);
            $("#already_exist_truck_trucklicenseNo",".mycarlist").on("blur", function(e){
                e.preventDefault();
                e.stopPropagation();
                var licenseNo = $("#already_exist_truck_trucklicenseNo").val();
                if (licenseNo){
                    $.ajax({
                        type: "GET",
                        url: config.ctx + "/truck/query/trucklicenseNo",
                        data: {"trucklicenseNo":licenseNo,"flag":1},
                        dataType: "json",
                        async: false,
                        success: function (data) {
                        	if(data){                        		
	                        	if (data.succuss) {
		                        	if(data.iscloud){
		            	            	$("[name=truckmodelId]",".mycarlist").val(data.truck.truckModelId).prop("disabled","disabled");
		            	            	$("[name=truckmodelId]",".mycarlist").trigger("chosen:updated");
		            	            	$("[name=truckmodelId]",".mycarlist").chosen();
		            	            	$("#already_exist_truck_trucklicenseNo",".mycarlist").val(licenseNo);
		            	            	$("#already_exist_truck_truckId",".mycarlist").val(data.truck.truckId);
		            	            	$("#add_regTonnage",".mycarlist").val(data.truck.regTonnage).prop("disabled","disabled");
		            	            	$("#already_exist_truck_trucklicenseNo_list",".mycarlist").addClass("hide");
		            	            	if(data.drivers){
		            	                    var dom=''; 
		            	                	$.each(data.drivers, function (i, o) {
		            	                	   var addTrueName=o.trueName;
		            	                	   var addUserId=o.addUserId;
		            	                	   var addTelephone=o.phone;
		            	                	   if(i==0){
		            	                		   $("#addTrueName").val(addTrueName);
		            	                		   $("#already_exist_truck_userId").val(addUserId);
		            	                		   $("#addTelephone").val(addTelephone);
		            	                	   }
		            	                       dom += '<li data-truename="' + addTrueName + '" data-user-id="' +addUserId + '" data-phone="' + addTelephone + '">' +addTrueName + '</li>';
		            	                    });
		                                    $("#plus_car_users ul").html(dom);	            	            		
		            	            	}
		                        	}else{
		                        		/*clean*/
		                        		$("[name=truckmodelId]",".mycarlist").prop("disabled",false);
		            	            	$("[name=truckmodelId]",".mycarlist").trigger("chosen:updated");
		            	            	$("[name=truckmodelId]",".mycarlist").chosen();
		                        		$("#add_regTonnage",".mycarlist").prop("disabled",false);
		                        		$("#already_exist_truck_truckId",".mycarlist").val(null);
		                        		$("#addTrueName").val(null);
	      	                		   	$("#already_exist_truck_userId").val(null);
	      	                		   	$("#addTelephone").val(null);
	      	                		   	$("#plus_car_users li").remove();
		                        	}
	                            }else{
	                            	miscs.tooltip_global_warning($("#already_exist_truck_trucklicenseNo"),data.msg);
	                            }
                        	}	
                        },error: function () {}
                    }); 			            	
                }	            	
            });
            $(document).click(closeTruckLicenseNoList);
            $("#already_exist_truck_trucklicenseNo_list",".mycarlist").on("click",".clc",function(){
	            	var target=$(this);
	                var truckId=target.data("truckId");
	            	var licenseno=target.data("licenseno");
	            	var truckmodelId=target.data("truckmodelId");
	            	$("[name=truckmodelId]",".mycarlist").val(truckmodelId).prop("disabled","disabled");
	            	$("[name=truckmodelId]",".mycarlist").trigger("chosen:updated");
	            	$("[name=truckmodelId]",".mycarlist").chosen();
	            	var regtonnageId=target.data("regtonnage");
	            	$("#already_exist_truck_trucklicenseNo",".mycarlist").val(licenseno);
	            	$("#already_exist_truck_truckId",".mycarlist").val(truckId);
	            	$("#add_regTonnage",".mycarlist").val(regtonnageId).prop("disabled","disabled");
	            	$("#already_exist_truck_trucklicenseNo_list",".mycarlist").addClass("hide");
        	        $.ajax({
        	            type: "GET",
        	            url: config.ctx + "/truck/licenseToTruck",
        	            data: {"truckId":truckId},
        	            dataType: "json",
        	            success: function (data) {
        	                if (data.length>0) {
        	                    var dom='';
        	                	$.each(data, function (i, o) {
        	                	   var addTrueName=o.trueName;
        	                	   var addUserId=o.addUserId;
        	                	   var addTelephone=o.phone;
        	                	   if(i==0){
        	                		   $("#addTrueName").val(addTrueName);
        	                		   $("#already_exist_truck_userId").val(addUserId);
        	                		   $("#addTelephone").val(addTelephone);
        	                	   }
        	                       dom += '<li data-truename="' + addTrueName + '" data-user-id="' +addUserId + '" data-phone="' + addTelephone + '">' +addTrueName + '</li>';
        	                    });
                                $("#plus_car_users ul").html(dom);
        	                }
        	            },error: function () {}   
        	        });
            });
            $("#addTrueName",".mycarlist").on("click", function(){
            	var i=$("#plus_car_users li").size();
            	if(i>0){
            		$("#plus_car_users",".mycarlist").removeClass("hide");
            	}
            });
            $("#addTrueName",".mycarlist").on("keyup", function () {
            	var i=$("#plus_car_users li").size();
            	if(i>0){
            		$("[name=telephone]").val('');
	            	var $this=$(this);
	            	var $input=$this.val();
	            		$("#plus_car_users li").each(function (i, o) {
	            			var liname=$(o).data("truename");
	            			var indexNumber=liname.indexOf($input);
	            			if (indexNumber>=0) {
	            				$(o).removeClass("hide");
	            			}else{
	            				$(o).addClass("hide");
	            			}
	            		});
            	}	
            });            
            $("#plus_car_users",".mycarlist").on("click","li",function(){
            	var curr=$(this);
                $("#addTrueName").val(curr.data("truename"));
                $("#already_exist_truck_userId").val(curr.data("userId"));
                $("#addTelephone").val(curr.data("phone"));
                $("#plus_car_users",".mycarlist").addClass("hide");
            });
            $("#uc-addcar-repeat",".mycarlist").on("click",function(){
            	$("#addcar-success",".mycarlist").popup({"close":true});
            	$("#already_booking_truck_error_msg",".mycarlist").addClass("hide");
            	$("#uc-addcar",".mycarlist").popup();
            });
			/**添加车辆 结束*/
	        
	        /**列表 开始*/
	        $("#uc-carlist",".mycarlist").on("mouseover","dl",function(){
	        	$(this).find(".del").removeClass("hide");
	        });
	        $("#uc-carlist",".mycarlist").on("mouseout","dl",function(){
	        	$(this).find(".del").addClass("hide");
	        });
	        $("#uc-carlist",".mycarlist").on("click","dl",function(){
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
	        $(".all-check-img",".mycarlist").on("click",function(){
	        	var target=$(this);  
	        	if(target.hasClass("ico-check3")){ 
	               /*全不选*/
		           target.removeClass("ico-check3").addClass("ico-check1"); 
		           $(".check-img",".mycarlist").removeClass("ico-check3").addClass("ico-check1");
			       $("dl","#uc-carlist").removeClass("current");
	    		}else {
	               /*全选*/ 
	               target.removeClass("ico-check1").addClass("ico-check3"); 
	               $(".check-img",".mycarlist").removeClass("ico-check1").addClass("ico-check3");
			        $("dl","#uc-carlist").addClass("current");
	    		}
	        	changeButton();
	        });
	        $("#groupCollapsed",".mycarlist").on("click", function(){
	        	var $ul=$(".filter-bd ul",".mycarlist");
	        	if($ul.hasClass("all-item")){
	        		$("#isCollapsed",".mycarlist").val(0);
	        		$("#groupCollapsed").html('展开分组<i class="icon i9-4 ico-arwbtm"></i>');
	        	}else{
	        		$("#isCollapsed",".mycarlist").val(1);
	        		$("#groupCollapsed").html('收起分组<i class="icon i9-4 ico-arwtop"></i>');
	        	}
	    		$ul.toggleClass("all-item");
	        });	
	        $(".search_car",".mycarlist").on("click","a",function(e){
	        	e.stopPropagation();
	        	e.preventDefault();
	        	var id=$(this).data("gcontentId");
	        	window.open(config.ctx+"/truck/Window/"+id+"/cdetail");
	        });
	        $(".edit_group",".mycarlist").on("click","a",function(e){
	        	e.stopPropagation();
	        	var current=$(e.target);
		        var gcid=$(this).data("gcontentId");
		        $("#gContentIds").val(gcid);
		        $(".edit_group",".mycarlist").removeClass("pr");
		        $(".uc-item").removeClass("z30");
		        $(this).parent().addClass("pr");
		        $(this).parents('dd').parent().addClass("z30");
		        $("#truck_group_list",".mycarlist").removeClass("hide").insertAfter(current);
	        });	        
	        /**列表 结束*/
	        /**删除车辆 开始*/
	        $("#uc-carlist dl dt",".mycarlist").on("click", "a", function(e){
	        	e.stopPropagation();
	        	e.preventDefault();
	        	var gContentIds=$(e.target).data("gcontentId");
	        	$("#gContentIds").val(gContentIds);
	        	$("#delete-car").popup();
	        });
	        $("#control_truck_button",".mycarlist").on("click","a",function(){
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
	        $("#deleteConfirm",".mycarlist").on("click",function(){
	        	 var that = $(this);
	             if (!that.flag){
	     			var isDelete=$("#isDelete").prop("checked");
	     			var gContentIds=$("#gContentIds").val();
	            	var noGroupId=$("[name=noGroupId]").val();
	     	        $.ajax({
	     	            type: "POST",
	     	            url: config.ctx + "/truck/delete",
	     	            data: {"gContentIds":gContentIds,"targetGroupId":noGroupId,"deleteFlag":isDelete?1:0},
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
	        $("#cancel_delete_car",".mycarlist").on("click",function(){
	        	$("#delete-car").popup({"close":true});
	        });
	        /**删除车辆 结束*/
            /**文件上传 功能 */
	        $("#import_car_confirm",".mycarlist").on("click",function(){
	        	var truckfilepath = $("#truckfilepath").val();
	            if(!truckfilepath) {
	            	$("#exp_truck_error_msg").removeClass("hide");
	            	$("#exp_truck_view_error_msg").text("请选择要上传的文件！");
	            	return false;
	            }
	            var re_text = /\xls|\xlsx/i;
	            var newFileName = truckfilepath.split('.');
	            newFileName = newFileName[newFileName.length-1];
	            if (newFileName.search(re_text)==-1) {
	            	$("#exp_truck_error_msg").removeClass("hide");
               	 	$("#exp_truck_view_error_msg").text("请选择xls或xlsx格式的文件！");
	                return false;
	            }
	            $("#trucktb").children().remove();
	            $.ajaxFileUpload({
	                 url:config.ctx +"/truck/uptruckexcel",        
	                 secureuri:false,
	                 fileElementId:'truckfilepath',                 
	                 data: {truckGroupId : $("[name=truckGroupId]").val()},
	                 dataType: 'json',   
	                 success: function (data){
	                	 if(data.success){
	                		 var arr = data.trucklist;
	                		 if(arr.length>0){
	                			 var ok = "<td class='ftorange'><spen class='fml-ok'><a></a></spen></td>";
	                			 var exits = '<td class="ftorange col7">车辆已存在</td>';
	                			 var tBody="";
	                			 for(var i=0; i<arr.length; i++){
	                				 var o=arr[i];
	                				 var result='';
	                				 if(o.result==2){
	                					 result=ok;
	                				 }else if(o.result==1){
	                					 result=exits;
	                				 }
	                				 tBody += "<tr><td>" + o.serialNumber + "</td><td class='ftblue ftbold col2'>" + o.trucklicenseNo  
	                				 + "</td><td>" + o.truckModelName + "</td><td>" + o.regTonnage + "</td><td>" +o.addTrueName
	                				 + "</td><td>" +o.telephone+ "</td>" +result+"</tr>";
	                			 }
	                			 $("#trucktb").html(tBody);
	                			 $("#import_success_view",".mycarlist").removeClass("hide");
	                			 $("#import_success_msg",".mycarlist").text("总共导入："+data.sum+" 条数据，导入成功："+data.successNum+" 条数据！");
	                			 $("#import_dialog",".mycarlist").popup({"close":true});
	                			 $("#import_car_list",".mycarlist").popup();
	                		 }else{
	                			 $("#exp_truck_error_msg").removeClass("hide");
	                			 $("#exp_truck_view_error_msg").text("请检查excel文件中数据是否存在异常！");
	                		 }
	                	 }else{
	                		$("#exp_truck_error_msg").removeClass("hide");
	                		$("#exp_truck_view_error_msg").text(data.msg); 
	                	 }
	                 },error: function (){
	                	 $("#exp_truck_error_msg").removeClass("hide");
	                	 $("#exp_truck_view_error_msg").text("批量添加出错，请检查文件是否正确！");
	                 }
	            });
	        });
	        $("#add_file",".mycarlist").on("click",function(){
	        	$("#truckfilepath").click();
	        });

	        $("#import_dialog",".mycarlist").on("change", "#truckfilepath" ,function(){
	        	var changeValue=$("#truckfilepath").val();
	        	$("#export_path").val(changeValue);
	        });
	        $("#import_car",".mycarlist").on("click",function(){
	        	$("#exp_truck_error_msg").addClass("hide");
	        	$("#import_dialog",".mycarlist").popup();
	        });
	        $("[name=truckmodelId]",".mycarlist").next().css({"width":"185px"});
	        $("[name=truckGroupId]",".mycarlist").next().css({"width":"160px"});
	        $("[name=addTruckGroupId]",".mycarlist").next().css({"width":"185px"});
	        /*加载信用级别*/
	        $("[name=sincerity_level]",".mycarlist").each(function(index, data){
	        	$(this).prev().after(miscs.calcLevel({
	        		level:$(this).val(),
	        	    type:"user"
	        	}));
	        });
	        $("#upexcelclose",".mycarlist").on("click",function(){
	        	$(".page_submit").submit();
	        	$("#import_car_list").popup({"close":true});
	        });
		}
	};
});	
define([ "jquery", "config", "plugins/validation", "plugins/miscs","jQvalidation", "popup"], function($, config, validation, miscs,jQvalidation, pop) {
	return {
		init : function() {
	        /**查看伙伴 详情JS 开始*/
			$("#delete_partner", ".partner_detail").on("click", function() {
	        	$("#delete-car").popup();
			});
	        $("#cancel_delete_car",".partner_detail").on("click",function(){
	        	$("#delete-car").popup({"close":true});
	        });
	        $("#deleteConfirm",".partner_detail").on("click",function(){
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
		     	            		if(isDelete){
		     	            			window.close();
		     	            		}else{
		     	            			location.reload();
		     	            		}
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
	        /**查看伙伴 详情JS 结束*/
	        /**编辑伙伴 详情JS 开始*/
			$("[name=grouping]",".partner_edit").next().css({"width":"214px"});
			$("[name=pertnertype]",".partner_edit").next().css({"width":"214px"});
			$("[name=industry]",".partner_edit").next().css({"width":"214px"});
	        $("#list_partner_users",".partner_edit").on("click",".partner_users_edit",function(){
	        	var $v=$("#partner_users_form");
	        	$v[0].reset();
                $v.find("i.ico-warning").addClass("hide");
                $v.find("i.ico-ok").addClass("hide");
                $v.find("strong.wntext").addClass("hide");
                var $tr=$(this).parent().parent();
                var inputs=new Array('partnername','partnerjob','partnercarrner','partnerphone','partnerremoarks');
                $tr.find("td").slice(0,5).each(function(i,o){
                	$("[name="+inputs[i]+"]").val($(o).text());
                });
                $("#partner_users_save").val(null);
	        	$("#partner_users_edit_tr",".partner_edit").removeClass("hide").insertAfter($tr);
	        });
            var v_options = {
                    rules: {
                    	partnername: {
                            required: true,
                            maxlength:20
                        },
                        /*partnerjob: {
                            required: true
                        },
                        partnercarrner: {
                            required: true
                        },*/
                        partnerphone: {
                            required: true,
                            mobileNumber: true
                        }
              }
            };
            $("#partner_users_form", ".partner_edit").validate(v_options);
            var v_options3 = {
                    rules: {
                    	pertnertype: {
                            required: true
                        },
                        areaId: {
                            required: true
                        }
                    }
            };
            $("#first_form_id", ".partner_edit").validate(v_options3);
            var v_option4={rules:{pertnername:{required: true}}};
            $("#partnername_form_id",".partner_edit").validate(v_option4);
            
            $("#partner_users_cancel",".partner_edit").on("click",function(){
            	$("#partner_users_edit_tr",".partner_edit").addClass("hide");
            });
            /*保存 用户信息*/
            $("#partner_users_save",".partner_edit").on("click",function(){
            	var $form=$("#partner_users_form");
	            if (!$form.valid()) {
	                return;
	            }
            	$("#partner_users_edit_tr",".partner_edit").addClass("hide");
                var inputs=new Array('partnername','partnerjob','partnercarrner','partnerphone','partnerremoarks');
	            var val=$(this).val();
	            if(val){
	            	var $preTr=$("#temp_add_users_tr").prev();
	            	var dom='<tr class="user_tr">';
	            	for (var i = 0; i< inputs.length; i++) {
	            		if(i==0){
		            		dom+='<td data-relation-id="">'+$("[name="+inputs[i]+"]").val()+'</td>';	            			
	            		}else{
		            		dom+='<td>'+$("[name="+inputs[i]+"]").val()+'</td>';	            			
	            		}
					}
	            	dom+='<td><em class="ftblue curhand partner_users_edit">编辑</em><em class="ftgrey exp">|</em><em class="ftblue curhand pertner_del">删除</em></td></tr>';
	            	$preTr.after(dom);
	            	$(this).val(null);
	            }else{
		            $form.parents("tr").prev().children().slice(0,5).each(function(i,o){
		            	$(o).text($("[name="+inputs[i]+"]").val());
		            });	            	
	            }
            }); 
            /*编辑 货场*/
	        $("#list_partner_depots",".partner_edit").on("click",".partner-depots-editbtn",function(){
	        	var $v=$("#partner_depots_form");
	        	$v[0].reset();
                $v.find("i.ico-warning").addClass("hide");
                $v.find("i.ico-ok").addClass("hide");
                $v.find("strong.wntext").addClass("hide");
                var $tr=$(this).parent().parent();
                var inputs=new Array('companylocal','companyadress');
                $tr.find("td").slice(0,2).each(function(i,o){
                	if(i==0){
                		var county=$(o).data("selectedcity");
                		$("#companylocalid").setCityValue(county);
                	}else{
	                	$("[name="+inputs[i]+"]").val($(o).text());	
                	}
                });
                $("#partner_depots_save").val(null);
	        	$("#partner_depots_edit_tr",".partner_edit").removeClass("hide").insertAfter($tr);
	        });
            var v_options2 = {
                    rules: {
                        companylocal: {
                            required: true
                        },
                        companyadress: {
                            required: true
                        }
              }
            };
            $("#partner_depots_form", ".partner_edit").validate(v_options2);
            $("#partner_depots_cancel",".partner_edit").on("click",function(){
            	$("#partner_depots_edit_tr",".partner_edit").addClass("hide");
            });
            /*点击 保存 货场*/
            $("#partner_depots_save",".partner_edit").on("click",function(){
            	var $form=$("#partner_depots_form");
	            if (!$form.valid()) {
	                return;
	            }
           	 	$("#partner_depots_edit_tr",".partner_edit").addClass("hide");
	            var inputs=new Array('companylocal','companyadress');
	            var val=$(this).val();
	            if(val){
	            	var $preTr=$("#temp_add_depots_tr").prev();
	            	var dom='<tr class="depot_tr">';
	            	for (var i = 0; i< inputs.length; i++) {
	            		if(i==0){
	            			var selectText=$("#companylocalid").val();
	            			var selectValue=$("[name="+inputs[i]+"]").val();
	            			dom+='<td data-depot-id="" data-selectedcity="'+selectValue+'">'+selectText+'</td>';
	            		}else{
	            			dom+='<td>'+$("[name="+inputs[i]+"]").val()+'</td>';
	            		}
					}
	            	dom+='<td><em class="ftblue curhand partner-depots-editbtn">编辑</em><em class="ftgrey exp">|</em><em class="ftblue curhand pertner_del">删除</em></td></tr>';
	            	$preTr.after(dom);
	            	$(this).val(null);
	            }else{
		            $form.parents("tr").prev().children().slice(0,2).each(function(i,o){
		            	if(i==0){
	            			var selectText=$("#companylocalid").val();
	            			var selectValue=$("[name="+inputs[i]+"]").val();
			            	$(o).text(selectText);
			            	$(o).data("selectedcity",selectValue);
		            	}else{
			            	$(o).text($("[name="+inputs[i]+"]").val());	
		            	}
		            });
	            }
            });
            /**添加联系人*/
            $("#partner_users_add",".partner_edit").on("click",function(){
            	var size=$(".user_tr",".partner_edit").size();
            	if(size>10){
miscs.alert({title: "提示",msgTitle: "最多添加10个联系人!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
            	}else{
    	        	var $v=$("#partner_users_form");
    	        	$v[0].reset();
                    $v.find("i.ico-warning").addClass("hide");
                    $v.find("i.ico-ok").addClass("hide");
                    $v.find("strong.wntext").addClass("hide");
                    var $tr=$(this).parent().parent();
                    $("#partner_users_save").val(1);
    	        	$("#partner_users_edit_tr",".partner_edit").removeClass("hide").insertAfter($tr);	
            	}
            });
            /**添加货场*/
            $("#partner_depots_add",".partner_edit").on("click",function(){
            	var size=$(".depot_tr",".partner_edit").size();
            	if(size>10){
miscs.alert({title: "提示",msgTitle: "最多添加10个货场!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
            	}else{
    	        	var $v=$("#partner_depots_form");
    	        	$v[0].reset();
                    $v.find("i.ico-warning").addClass("hide");
                    $v.find("i.ico-ok").addClass("hide");
                    $v.find("strong.wntext").addClass("hide");
                    var $tr=$(this).parent().parent();
                    $("#partner_depots_save").val(1);
    	        	$("#partner_depots_edit_tr",".partner_edit").removeClass("hide").insertAfter($tr);            		
            	}            	
            });
            /**删除*/
            $("#partner_rel_list",".partner_edit").on("click",".pertner_del",function(){
            	var $currentTr=$(this).parents("tr");
            	var nextTr=$currentTr.next();
            	var nextId=nextTr.attr("id");
            	if(nextId=='partner_users_edit_tr'){
	            	$("#partner_users_edit_tr",".partner_edit").toggleClass("hide");	
            	}else if(nextId=='partner_depots_edit_tr'){
            		$("#partner_depots_edit_tr",".partner_edit").toggleClass("hide");
            	}
            	$currentTr.remove();
            });
            $("#all_partner_savabtn",".partner_edit").on("click",function(){
	        	var that=this;
	            if (!that.flag){ 
	            	var $isCloudTruck=$("[name=isCloudTruck]").val();
	            	var data=null;
		            var pertnername=$("[name=pertnername]").val();
					var objectId=$("[name=objectId]").val();
					var objectContentId=$("[name=objectContentId]").val();
					var pertnertag=$("[name=pertnertag]").val();
					var grouping=$("[name=grouping]").val();
	            	if($isCloudTruck==1){
	            		data={"editFlag":3,"pertnername":pertnername,"objectId":objectId,"objectContentId":objectContentId,"grouping":grouping,"pertnertag":pertnertag};
	            	}else{
		            	var $form=$("#first_form_id");
			            if (!$form.valid()) {
			                return;
			            }
			            var $formpartnername=$("#partnername_form_id");
			            if(!$formpartnername.valid()){
			            	return;
			            }
			            var users=$(".user_tr",".partner_edit");
		            	var us=new Array();
		            	users.each(function(i,o){
		            		var temp=new Array();
		            		$(o).children().each(function(j,k){
			                	if(j < 5){
			                		temp[j]=$(k).text();
			                	}
		                	});
	                		us[i]=temp;
		            	});
		            	if(us.length<1){
miscs.alert({title: "提示",msgTitle: "至少需要添加一个联系人!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});		            		
		            	}
		            	var depots=$(".depot_tr",".partner_edit");
		            	var ds=new Array();
		            	depots.each(function(i,o){
		            		var temp=new Array();
		            		$(o).children().each(function(j,k){
			                	if(j <2){
			                		if(j==0){
			                			temp[j]=$(k).data("selectedcity");
			                			temp[2]=$(k).text();
			                		}else{
				                		temp[j]=$(k).text();	
			                		}
			                	}
		                	});
	                		ds[i]=temp;
		            	});
		            	var relationId=$("[name=relationId]");
		            	var relationIds='';
		            	relationId.each(function(i,o){
		            		if(i!=relationId.size()){
		            			relationIds+=$(o).val()+',';
		            		}
		            	});
		            	var depotId=$("[name=depotId]");
		            	var depotIds='';
		            	depotId.each(function(i,o){
		            		if(i!=depotId.size()){
		            			depotIds+=$(o).val()+',';
		            		}
		            	});
		            	var oldPartnerName=$("[name=oldPartnerName]").val();
						var pertnertype=$("[name=pertnertype]").val();
						var phone=$("[name=phone]").val();
						var industry=$("[name=industry]").val();
						var website=$("[name=website]").val();
						var areaId=$("[name=areaId]").val();
						var detailaddress=$("[name=detailaddress]").val();
						var userarray=JSON.stringify(us);
						var depotarray=JSON.stringify(ds);
						data={"editFlag":2,"oldPartnerName":oldPartnerName,"pertnername":pertnername,"objectId":objectId,"objectContentId":objectContentId,
		     	            	"pertnertype":pertnertype,"phone":phone,"industry":industry,"website":website,
		     	            	"areaId":areaId,'detailaddress':detailaddress,"grouping":grouping,"pertnertag":pertnertag,
		     	            	"relationIds":relationIds,"depotIds":depotIds,"userarray":userarray,"commaddressarray":depotarray};
	            	}	
		            that.flag = true;
	     	        $.ajax({
	     	            type: "POST",
	     	            url: config.ctx + "/partner/detail/edit",
	     	            data:data,
	     	            dataType:"json",
	     	            success: function (data) {
	     	                if (data.success) {
		     	            	miscs.alert({title: "更改伙伴成功",msgTitle: "更改伙伴成功!",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){
		     	            		location.reload();
		     	            	},cancel: function(){}});	
	     	                }else{
		     	            	miscs.alert({title: "更改伙伴失败",msgTitle: data.msg,iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
	     	                }
	     	                that.flag = false;
	     	            },error: function () {
 		                	miscs.alert({title: "更改伙伴成功",msgTitle: "更改伙伴成功!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
	                        that.flag = false;
	                     }   
	     	        });
	            }	
            });
	        /*加载信用级别*/
	        $("[name=sincerity_level]").each(function(i, o){
	        	var dom=miscs.calcLevel({level:$(o).val(),type:"org"});
	        	$(o).after(dom);
	        });
	        /**编辑伙伴 详情JS 结束*/	        
		}
	};

});
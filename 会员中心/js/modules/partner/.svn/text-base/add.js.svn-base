define([ "jquery","config", "plugins/validation", "plugins/miscs","jQvalidation", "popup" ],function($, config, validation, miscs,jQvalidation, pop) {
	var closePartnerNameList=function(e){
        var _current = $(e.target);
        if (_current.hasClass("alreadybook")) {
            return;
        }
        var _list = $("#already_exist_partners_partnerName_list");
        if (_current.attr("id")!='already_exist_partners_partnerName_list') {
            if (!_list.hasClass("hide")) {
                _list.addClass("hide");
            }
        } else {
            if (e.target.value != "") {
                _list.toggleClass("hide");
            }
        }
	};
	/*伙伴 匹配 下拉列表*/  
    var partnerNameList = function () {
    	var _this = $(this);
        var no = $(_this).val();
        var _list = $("#already_exist_partners_partnerName_list");
        _list.addClass("hide");
        if(!no){
        	return;
        }
        if (_this.timer){
            clearTimeout(_this.timer);
        }
        this.timer=setTimeout(function(){
            $.ajax({
                type: "GET",
                url: config.ctx + "/partner/query/partnerName",
                data: {"partnerName":no,"flag":0},
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.length>0) {
                        var dom = "";
                        $.each(data, function (i, o) {
                        	  var addFlag=o.addFlag==1?true:false;
                        	  var clickClass=addFlag?'alreadybook':'clc';
                        	  dom += '<li class="'+clickClass+'" data-org-id="'+o.orgId+'" data-org-name="'+o.orgName+'">'+o.orgName;
                        	  if(o.creditLevel){
                        		  var creditLevel=miscs.calcLevel({level:o.creditLevel,type:"org"});
                        		  dom+=' '+creditLevel;
                        	  }
                        	  if(addFlag){
  	                          	dom +='<span class="ftgrey fr">伙伴库已存在</span></li>';
  	                          }
	                          dom += "</li>"; 
                        });
                        _list.html(dom);
                        _list.removeClass("hide");
                    }else{
                        _list.html("");
                    }
                },error:function(){}
            });        	
        },600);
    }; 
    var changePartnerAddPage=function(data,orgName){
    	$("#truckModel",".add_mypartner").removeClass("hide");
    	$("[name=successPartnerName]").val(orgName);
    	$("[name=totolpartnername]").val(orgName);
		$("#already_exist_partners_partnerName",".add_mypartner").prop("disabled","disabled");
    	$("#already_exist_partners_partnerName_list",".add_mypartner").addClass("hide");
    	$("[name=pertnertype]").val(data.bo.orgTypeId);
    	$("[name=pertnertype]").trigger("chosen:updated");
		$("[name=pertnertype]").chosen();
		$("#pertnertype_add_text").text($("[name=pertnertype] option:selected").text()).next().addClass("hide");
		
		var phoneVal=data.bo.telephone;
		$("[name=phone]").val(phoneVal);
		if(phoneVal){
			$("#phone_add_text").text(phoneVal).next().addClass("hide");
		}else{
			$("#phone_add_text").text("").next().addClass("hide");
		}
		$("[name=industry]").val(data.bo.industryId);
		$("[name=industry]").trigger("chosen:updated");
		$("[name=industry]").chosen();
		$("#industry_add_text").text($("[name=industry] option:selected").text()).next().addClass("hide");
		
		var webSite=data.bo.websiteUrl;
		$("[name=website]").val(webSite);
		if(webSite){				        							
			$("#website_add_text").text(webSite).next().addClass("hide");
		}else{
			$("#website_add_text").text("").next().addClass("hide");
		}
		
		$("#areaId").setCityValue(data.bo.county);
		$("#areaId_add_text").text($("#areaId").val()).next().addClass("hide");
		
		var address=data.bo.address;
		$("[name=detailaddress]").val(address);
		if(address){
			$("#detailaddress_add_text").text(address).next().addClass("hide");
		}else{
			$("#detailaddress_add_text").text("").next().addClass("hide");
		}
		var $user=$("#temp_add_users_header");
		var dom='';
		$.each(data.users, function (i, o) {
        	dom+='<tr class="cloud_user_tr"><td>'+o.trueName+'</td>';
        	dom+='<td>'+(o.departmentName=='null'?"":o.departmentName)+'</td>';
        	dom+='<td>'+(o.positionName=='null'?"":o.positionName)+'</td>';
        	dom+='<td>'+o.telephone+'</td>';
        	dom+='<td>'+o.remark+'</td>';
        	dom+='<td>无</td></tr>';
		});
		$user.after(dom);
		var $depot=$("#temp_add_depots_header");
		var dos='';
		$.each(data.depots, function (i, o) {
        	dos+='<tr class="cloud_depot_tr">';
        	dos+='<td>'+o.depotAddress+'</td>';
        	dos+='<td>'+o.address+'</td>';
        	dos+='<td>无</tr>';
		});
		$depot.after(dos);
    	$("[name=addOrgId]").val(data.orgId);
    	$("#temp_add_users_tr",".add_mypartner").addClass("hide");
    	$("#temp_add_depots_tr",".add_mypartner").addClass("hide");
    	$("#partner_depots_edit_tr").addClass("hide");
    	$("#partner_users_edit_tr").addClass("hide");    	
    };
	return {
				init : function() {
		            var v_options = {
		                    rules: {
		                    	partnername: {
		                            required: true
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
		            var v_option4={rules:{totolpartnername:{required: true}}};
		            $("#first_form_id",".add_mypartner").validate(v_options3);
		            $("#partnername_form_id",".add_mypartner").validate(v_option4);
		            $("#partner_users_form", ".add_mypartner").validate(v_options);
		            $("#partner_depots_form", ".add_mypartner").validate(v_options2);
		            $("#partner_users_cancel",".add_mypartner").on("click",function(){
		            	$("#partner_users_edit_tr",".add_mypartner").addClass("hide");
		            });
					/*编辑联系人*/
					$("#list_partner_users",".add_mypartner").on("click",".partner_users_edit",function(){
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
			        	$("#partner_users_edit_tr",".add_mypartner").removeClass("hide").insertAfter($tr);
			        });
		            /*点击 保存 联系人*/
		            $("#partner_users_save",".add_mypartner").on("click",function(){
		            	var $form=$("#partner_users_form");
			            if (!$form.valid()) {
			                return;
			            }
		            	$("#partner_users_edit_tr",".add_mypartner").addClass("hide");
		                var inputs=new Array('partnername','partnerjob','partnercarrner','partnerphone','partnerremoarks');
			            var val=$(this).val();
			            if(val){
			            	var $preTr=$("#temp_add_users_tr").prev();
			            	var dom='<tr class="user_tr">';
			            	for (var i = 0; i< inputs.length; i++) {
			            		dom+='<td>'+$("[name="+inputs[i]+"]").val()+'</td>';
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
			        $("#list_partner_depots",".add_mypartner").on("click",".partner-depots-editbtn",function(){
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
			        	$("#partner_depots_edit_tr",".add_mypartner").removeClass("hide").insertAfter($tr);
			        });
		            $("#partner_depots_cancel",".add_mypartner").on("click",function(){
		            	$("#partner_depots_edit_tr",".add_mypartner").addClass("hide");
		            });
		            /*点击 保存 货场*/
		            $("#partner_depots_save",".add_mypartner").on("click",function(){
		            	var $form=$("#partner_depots_form");
			            if (!$form.valid()) {
			                return;
			            }
		           	 	$("#partner_depots_edit_tr",".add_mypartner").addClass("hide");
			            var inputs=new Array('companylocal','companyadress');
			            var val=$(this).val();
			            if(val){
			            	var $preTr=$("#temp_add_depots_tr").prev();
			            	var dom='<tr class="depot_tr">';
			            	for (var i = 0; i< inputs.length; i++) {
			            		if(i==0){
			            			var selectText=$("#companylocalid").val();
			            			var selectValue=$("[name="+inputs[i]+"]").val();
			            			dom+='<td data-selectedcity="'+selectValue+'">'+selectText+'</td>';
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
		            /*添加联系人*/
		            $("#partner_users_add",".add_mypartner").on("click",function(){
		            	var size=$(".user_tr",".add_mypartner").size();
		            	if(size>10){
miscs.alert({title: "提示",msgTitle: "最多添加10个联系人!",sign:false,iconCls: "inoti",successBtn: "确认",cancelBtn: "取消",success:function(){},cancel: function(){}});
		            	}else{
		    	        	var $v=$("#partner_users_form");
		    	        	$v[0].reset();
		                    $v.find("i.ico-warning").addClass("hide");
		                    $v.find("i.ico-ok").addClass("hide");
		                    $v.find("strong.wntext").addClass("hide");
		                    var $tr=$(this).parent().parent();
		                    $("#partner_users_save").val(1);
		    	        	$("#partner_users_edit_tr",".add_mypartner").removeClass("hide").insertAfter($tr);	
		            	}
		            });
		            /*添加货场*/
		            $("#partner_depots_add",".add_mypartner").on("click",function(){
		            	var size=$(".depot_tr",".add_mypartner").size();
		            	if(size>10){
miscs.alert({title: "提示",msgTitle: "最多添加10个货场!",sign:false,iconCls: "inoti",successBtn: "确认",cancelBtn: "取消",success:function(){},cancel: function(){}});
		            	}else{
		    	        	var $v=$("#partner_depots_form");
		    	        	$v[0].reset();
		                    $v.find("i.ico-warning").addClass("hide");
		                    $v.find("i.ico-ok").addClass("hide");
		                    $v.find("strong.wntext").addClass("hide");
		                    var $tr=$(this).parent().parent();
		                    $("#partner_depots_save").val(1);
		    	        	$("#partner_depots_edit_tr",".add_mypartner").removeClass("hide").insertAfter($tr);            		
		            	}            	
		            });
		            /*批量保存*/
					$("#btncreatepartner",".add_mypartner").on('click',function(){
			        	var that=this;
			            if (!that.flag){
			            	var $orgId=$("[name=addOrgId]").val();
				            var partnername=$("[name=totolpartnername]").val();
							var pertnertag=$("[name=pertnertag]").val();
							var grouping=$("[name=grouping]").val();
			            	var datas=null;
			            	if($orgId){
			            		datas={"editFlag":4,"objectId":$orgId,"pertnername":partnername,"grouping":grouping, "pertnertag":pertnertag};
			            	}else{
								var $form0=$("#partnername_form_id");
								if(!$form0.valid()) {
					                return;
								}
				            	var $form1=$("#first_form_id");
					            if (!$form1.valid()) {
					                return;
					            }
				            	var size=$(".user_tr",".add_mypartner").size();
				            	if(size<1){
miscs.alert({title: "提示",msgTitle: "至少需要添加一个联系人!",sign:false,iconCls: "inoti",successBtn: "确认",cancelBtn: "取消",success:function(){},cancel: function(){}});
return;
				            	}
					            var users=$(".user_tr",".add_mypartner");
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
				            	var depots=$(".depot_tr",".add_mypartner");
				            	var ds=new Array();
				            	depots.each(function(i,o){
				            		var temp=new Array();
				            		$(o).children().each(function(j,k){
					                	if(j < 2){
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
								var pertnertype=$("[name=pertnertype]").val();
								var phone=$("[name=phone]").val();
								var industry=$("[name=industry]").val();
								var website=$("[name=website]").val();
								var areaId=$("[name=areaId]").val();
								var detailaddress=$("[name=detailaddress]").val();
								var userarray=JSON.stringify(us);
								var depotarray=JSON.stringify(ds);
								datas={"editFlag":1,"pertnername":partnername,"pertnertype":pertnertype, "industry":industry, "phone":phone, "website":website,
		        	            	"areaId":areaId, "detailaddress":detailaddress, "grouping":grouping, "pertnertag":pertnertag,
		        	            	"userarray":userarray,"commaddressarray":depotarray};
			            	}
				            that.flag = true;
							$.ajax({
								type: "POST",
								   url: config.ctx + "/partner/create",
			        	           data:datas ,
			        	           dataType:"json",
			        	           success: function (data) {
			        	            	if(data.success){
			        	            		$("[name=successPartnerId]").val(data.successObjectContentId);
			        	                	$("[name=successPartnerName]").val(partnername);
			        	            		$("#partnername_form_id").submit();
			        	            		/*location.assign(config.ctx + "/partner/addSuccess");*/
			        	            		/*miscs.alert({title:"新增伙伴成功",msgTitle: "新增成功",iconCls: "iok",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});*/	
			        	            	}else{
				        	            	miscs.alert({title: "新增伙伴失败",msgTitle:data.msg,iconCls:"ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel:function(){}});		        	            		
			        	            	}
			        	            	that.flag = false;
			        	           },error: function () {
			        	            	miscs.alert({title: "新增伙伴失败",msgTitle:"新增失败",iconCls:"ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel:function(){}});	
		        	            		that.flag = false;
			        	           }   
		        	        });
			            }	
					});
		            $("#partner_rel_list",".add_mypartner").on("click",".pertner_del",function(){
		            	var $currentTr=$(this).parents("tr");
		            	var nextTr=$currentTr.next();
		            	var nextId=nextTr.attr("id");
		            	if(nextId=='partner_users_edit_tr'){
			            	$("#partner_users_edit_tr",".add_mypartner").toggleClass("hide");	
		            	}else if(nextId=='partner_depots_edit_tr'){
		            		$("#partner_depots_edit_tr",".add_mypartner").toggleClass("hide");
		            	}
		            	$currentTr.remove();
		            });
					$("[name=grouping]",".add_mypartner").next().css({"width":"214px"});
					$("[name=pertnertype]",".add_mypartner").next().css({"width":"214px"});
					$("[name=industry]",".add_mypartner").next().css({"width":"214px"});
					$("#already_exist_partners_partnerName",".add_mypartner").on("keyup", partnerNameList);
			        $("#already_exist_partners_partnerName",".add_mypartner").on("click", partnerNameList);
			        $(document).on("click",closePartnerNameList);
			        $("#already_exist_partners_partnerName",".add_mypartner").on("blur", function(e){
			            e.preventDefault();
			            e.stopPropagation();
				            var licenseNo = $("#already_exist_partners_partnerName").val();
				            if (licenseNo){
				                $.ajax({
				                    type: "GET",
				                    url: config.ctx + "/partner/query/partnerName",
				                    data: {"partnerName":licenseNo,"flag":1},
				                    dataType: "json",
				                    async: false,
				                    success: function (data) {
				                        if (data.success) {
				                        	if(data.iscloud){
				                        		changePartnerAddPage(data,licenseNo);
				                        	}
				                        }else{
				                        	miscs.tooltip_global_warning($("[name=totolpartnername]"),data.msg);
				                        }
				                    },error:function(){}
				                }); 			            	
				            }
			        });
			        /*点击*/
			        $("#already_exist_partners_partnerName_list",".add_mypartner").on("click",".clc",function(e){
		                var that = this;
		                if (!that.flag){
		                	that.flag=true;
				        	var target=$(this);
			                var orgName=target.data("orgName");
			            	var orgId=target.data("orgId");
			            	$.ajax({
			        	            type: "GET",
			        	            url: config.ctx + "/partner/query/getPartnerByOrgId",
			        	            data: {"orgId":orgId},
			        	            dataType: "json",
			        	            success: function (data) {
			        	            	if(data){
			        	            		if(data.bo){
			        	            			changePartnerAddPage(data,orgName);	
			        	            		}else{
miscs.alert({title: "提示",msgTitle: "未找到与之匹配的伙伴 !",sign:false,iconCls: "inoti",successBtn: "确认",cancelBtn: "取消",success:function(){},cancel: function(){}});	
			        	            		}
			        	            }		
			        					that.flag=false;
			        	            },error: function () {
			        	            	that.flag=false;
			                        }   
			        	     });
		                }	
			        });
			        $("#truckModel_del",".add_mypartner").on("click",function(){
			        	location.reload();
			        });
				}
			};
});
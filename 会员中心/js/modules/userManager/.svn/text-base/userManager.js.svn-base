define(
		[ "jquery", "popup","jQvalidation", "jQmessage", "plugins/validation", "config","plugins/miscs" ,"CryptoJS","jquery_passwordStrength"],
		function($, popup,validator, message, validation, config,miscs,CryptoJS,passwordStrength) {
			return {
		init: function(){
			miscs.initDept();
			$(document).ready(function(){
				loadUser();
				loadUserRole('#catp','rolebox');
                loadUserRole('#editcatp','editrolebox');
                $(".uc-manageper").removeClass("loading");

                $("#simplepage").on("click", "a", function(e){
                    e.stopPropagation();
                    var page = $(this).data("page-number");
                    loadUser({
                        currentPage:page
                    });
                });

                $("#completePage").on("click", "a", function(e){
                    e.stopPropagation();
                    var page = $(this).data("page-number");
                    loadUser({
                        currentPage:page
                    });

                });
			});


            $("select[name='gender']").css({"width":"70px"}).next().css({"width":"70px"});
            $("select[name='gender'] option:eq(0)").text("性别").trigger("chosen:updated").chosen();

            $("select[name='editgender']").next().css({"width":"70px"});
            $("select[name='editgender'] option:eq(0)").text("性别").trigger("chosen:updated").chosen();

			 $("#password").on("keyup", function () {
	                var s = getPasswordStrength(this.value);
	                if($(this).val()=="")
	                {
	                    $(".plevel").empty();
	                    $("#passwordStrengthDiv").attr("class","pwdlevel is0");
	                }
	                for(var i=0; i<=s; i++){
	                    if (i==1)
	                    {
	                        $(".plevel").text("弱");
	                        $("#passwordStrengthDiv").attr("class","pwdlevel is0 is1");
	                    }

	                    if (i==2)
	                    {
	                        $(".plevel").text("中");
	                        $("#passwordStrengthDiv").attr("class","pwdlevel is0 is2");
	                    }

	                    if (i==3)
	                    {
	                        $(".plevel").text("强");
	                        $("#passwordStrengthDiv").attr("class","pwdlevel is0 is3");
	                    }
	                }
	            });
			 
			 $("#editpassword").on("keyup", function () {
	                var s = getPasswordStrength(this.value);
	                if($(this).val()=="")
	                {
	                    $(".plevel").empty();
	                    $("#editpasswordStrengthDiv").attr("class","pwdlevel is0");
	                }
	                for(var i=0; i<=s; i++){
	                    if (i==1)
	                    {
	                        $(".plevel").text("弱");
	                        $("#editpasswordStrengthDiv").attr("class","pwdlevel is0 is1");
	                    }

	                    if (i==2)
	                    {
	                        $(".plevel").text("中");
	                        $("#editpasswordStrengthDiv").attr("class","pwdlevel is0 is2");
	                    }

	                    if (i==3)
	                    {
	                        $(".plevel").text("强");
	                        $("#editpasswordStrengthDiv").attr("class","pwdlevel is0 is3");
	                    }
	                }
	            });
			 
			$("[name='dept_id']").next().css({"width": "130px"});
			$("[name='position_id']").next().css({"width": "130px"});
			$("[name='editdept_id']").next().css({"width": "130px"});
			$("[name='editposition_id']").next().css({"width": "130px"});
			$("#userForm").validate({
				rules : {
					'true_name':{
						required:true,
						maxlength:20
					},
					'phone':{
                        required: true,
                        mobileNumber: true,
                        remote:{
                        	url:config.ctx+"/userInfo/checkPhone1",
                            data:{
                                editphone:function(){
                                    return $("input[name='phone']").val()
                                }
                            }
                        }
                    },
					'login_account':{
						required:true
					},
					'roletype':{
						required:true
					},
					'login_account':{
						required:true,
                        stringCheck:true,
                        byteRangeLength:[4,20],
						remote:{
                            url:config.ctx+"/userManager/checkLoginName"
                        }
					},
					'password':{
						required:true,
						maxlength:20,
						minlength:6
					}
				}
			,
			 messages:{
				 login_account:{
                       remote:"该用户已存在 "
                   },
                   phone:{
   	        		remote:"该手机已经验证"
   				}
			}
			});
			
			$("#edituserForm").validate({
				rules : {
					'edittrue_name':{
						required:true,
                        maxlength:20
					},
					'editpassword':{
						maxlength:20,
						minlength:6
					},
					'editphone':{
                        required: true,
                        mobileNumber: true,
                        remote:{
                        	url:config.ctx+"/userInfo/checkPhone1"
                        }
                    },
					'editlogin_account':{
						required:true
					},
					'roletype':{
						required:true
					},
					'editlogin_account':{
						required:true,
                        stringCheck:true,
                        byteRangeLength:[4,20],
						remote:{
                            url:config.ctx+"/userManager/checkEditLoginName",
                            data:{
                            	editlogin_account:function(){
                            		return $("#editloginAccount").val();
                            	},
                            	beforeName:function(){
                            		return $("#beforeName").val();
                            	}
                            }
                        }
					}
				}
			,
			 messages:{
				 editlogin_account:{
                       remote:"该用户已存在 "
                   },
				editphone:{
	        		remote:"该手机已经验证"
				}
			}
			});
			
			
			/*var disCheckBox = function(){
			
				
				var obj=document.getElementsByName("rolebox"); 
				for(var i=0;i<obj.length;i++){ 
					if(obj[i].value==26){
					obj[i].disabled=true;
					}
				}
			};*/
			var getCheckBoxValue = function (id){
				var str="";
				var obj=document.getElementsByName(id); 
				for(var i=0;i<obj.length;i++){ 
					if(obj[i].checked){
						str+= obj[i].value+",";
					}
				}
				return str;
			};
			
			$("#saveUser").on("click",function(){
				var zzz=$("#userForm").valid();
				 if(zzz==false ){
				 	return;
				 }
				 $.ajax({
						type : "POST",
						url : config.ctx + "/companyManage/saveOrUpdateAccount",
						data : {
			             	 userId:$("#userIdHideen").val(),
			            	 true_name:$("input[name='true_name']").val(),
			            	 gender:$("select[name='gender']").val(),
			            	 phone:$("input[name='phone']").val(),
			            	 depotName:$("input[name='depotName']").val(),
			            	 postionName:$("input[name='postionName']").val(),
			            	 role_id:getCheckBoxValue("rolebox"),
			            	 login_account:$("input[name='login_account']").val(),
			            	 password:CryptoJS.MD5($("input[name='password']").val()).toString(),
			            	 disabled:$("input[name='disabled']:checked").val()
						},
						dataType : "json",
						success : function(data) {
			            $("#userManagerDialog").popup({close: true});
		            		 loadUser();
						}
				 });
 
			});
			
			$("#editclose").on("click",function(){
				$("#editManagerUserDialog").popup({close:true});
			});
			$("#addUser").on("click",function(){
				 $("#userIdHideen").val("");
				 $("#userManagerDialog").popup();
				/* disCheckBox();
				 document.getElementById("do").disabled=true;
				 document.getElementById("notdo").disabled=true;*/
				 $("#role26", "#userManagerDialog").attr("disabled","disabled")
			});
			$("#close").on("click",function(){
				$("#userManagerDialog").popup({"close":true});
			});
			
			
			$(function(){
				$("input[name='editlogin_account']").click(function(){
					$(".manage-account").fadeIn("fast");
				}).blur(function(){
					$(".manage-account").fadeOut("fast");
				});
				$("input[name='password']").click(function(){
					$(".manage-password").fadeIn("fast");
				}).blur(function(){
					$(".manage-password").fadeOut("fast");
				});
				
				$("input[name='editpassword']").click(function(){
					$(".manage-password").fadeIn("fast");
				}).blur(function(){
					$(".manage-password").fadeOut("fast");
				});
				
				/*****drop****/
				var rolejson = [
					{"role":"物流负责人","type":false},
					{"role":"财务人员","type":false},
					{"role":"过磅员","type":false}
				];

				$("input[name='roletype']", "#editManagerUserDialog").click(function(e){
					e.stopPropagation();
					$(".plusdrop", "#editManagerUserDialog").removeClass("hide");
				});

                $("input[name='roletype']", "#userManagerDialog").click(function(e){
                    e.stopPropagation();
                    $(".plusdrop", "#userManagerDialog").removeClass("hide");
                });

                //add role
                $("#catp").on("click", "li input[type='checkbox']", function(e){
                    var plusinput= $("#userManagerDialog input[name='roletype']");
                    var checked = $(this).prop("checked");
                    var oldVal = plusinput.val();
                    var oldValArr = oldVal ? oldVal.split(",") : new Array();
                    if(!checked){
                        var exists = false;
                        var newVal = $(this).attr("v");
                        for(var oVal in oldValArr){
                            var odval = oldValArr[oVal];
                            if(odval == newVal){
                                exists = true;
                                oldValArr.splice(oVal,1);
                                break;
                            }
                        }
                        if(!exists){
                            oldValArr.push(newVal);
                        }
                    }else{
                        var exists = false;
                        var newVal = $(this).attr("v");
                        for(var oVal in oldValArr){
                            if(oldValArr[oVal] == newVal){
                                exists = true;
                                break;
                            }
                        }
                        if(!exists){
                            oldValArr.push(newVal);
                        }
                    }
                    oldValArr.slice(1);
                    plusinput.val(oldValArr);
                });

                //edit role
                $("#editcatp").on("click", "li input[type='checkbox']", function(e){
                    var plusinput = $("#roleType");
                    var checked = $(this).prop("checked");
                    var oldVal = plusinput.val();
                    var oldValArr = oldVal ? oldVal.split(",") : new Array();
                    if(!checked){
                        var exists = false;
                        var newVal = $(this).attr("v");
                        for(var oVal in oldValArr){
                            var odval = oldValArr[oVal];
                            if(odval == newVal){
                                exists = true;
                                oldValArr.splice(oVal,1);
                                break;
                            }
                        }
                        if(!exists){
                            oldValArr.push(newVal);
                        }
                    }else{
                        var exists = false;
                        var newVal = $(this).attr("v");
                        for(var oVal in oldValArr){
                            if(oldValArr[oVal] == newVal){
                                exists = true;
                                break;
                            }
                        }
                        if(!exists){
                            oldValArr.push(newVal);
                        }
                    }
                    plusinput.val(oldValArr);
                });

                $(document).click(function(e){
                    var target = e.target;
                    if($(".plusdrop").has(target).length == 0){
                        $(".plusdrop").addClass("hide");
                    }
				});
			});
			var loadUserRole = function(id,name){
				$.ajax({
					type: "GET",
					url:  config.ctx + "/userManager/renderRole",
					data:{
 
					},
					dataType: "json",
					success:function(data){
						var html ="";
                        $(id).empty();
						for(var i=0;i<data.length;i++){
							if(data[i].id==26 || data[i].roleName=="物流负责人"){
                                html +="<li><input type='checkbox' disabled='disabled' v="+data[i].roleName+" value="+data[i].id+" name ="+name+" class='vam' id=role"+data[i].id+"><label for='wuliu'><em class='ml10 ftblack'>"+data[i].roleName+"</em>"+data[i].remark+"</label></li>";
							}else{
								html +='<li><input type="checkbox" v='+data[i].roleName+'  value='+data[i].id+' name ="'+name+'"  class="vam" id="role'+data[i].id+'"><label for="wuliu"><em class="ml10 ftblack">'+data[i].roleName+'</em>'+data[i].remark+'</label></li>';
							}
							
						}
						$(id).html(html);
					}
				});
			};


			$("#company").on("click",function(){
				window.location = config.ctx + "/companyManage/getOrgInfo";
			});
			
			//add role
			$("#editUser").on("click",function(){
				var zzz=$("#edituserForm").valid();
				 if(zzz==false ){
				 	return;
				 }
				 $.ajax({
						type : "POST",
						url : config.ctx + "/companyManage/saveOrUpdateAccount",
						data : {
			             	 userId:$("#editId").val(),
			            	 true_name:$("#edit_true_name").val(),
			            	 gender:$("select[name='editgender']").val(),
			            	 phone:$("input[name='editphone']").val(),
			            	 depotName:$("input[name='editdepotName']").val(),
			            	 postionName:$("input[name='editpostionName']").val(),
			            	 role_id:getCheckBoxValue("editrolebox"),
			            	 login_account:$("input[name='editlogin_account']").val(),
			            	 password:CryptoJS.MD5($("input[name='editpassword']").val()).toString(),
			            	 disabled:$("input[name='editdisabled']:checked").val()
						},
						dataType : "json",
						success : function(data) {
			            $("#editManagerUserDialog").popup({close: true});
		            		 loadUser();
						}
				 });
			});

			$("#dataId").on("click",$("div").find("ul").find("li.opclisa").find("p").find("[e]"),function(e){
					var eId = $(e.target).attr("e");
					var status = $(e.target).attr("status");
					if(typeof(eId)!='undefined'){
						$("#editId").val(eId);
							$.ajax({
							 type: "POST",
				             url:config.ctx + "/companyManage/getUserDetail",
				             data: {userId:eId},
				             dataType: "json",
				             success:function(data){
				            	 var roleName = "";
				            	 var value = "";
				            	 
				            	 
				            	 var trueName = data.trueName;
				            	 var phone = data.phone;
				            	 var depId = data.deptId;
				            	 var depName = data.departName;
				            	 var posName = data.posName;

				            	 var loginAccount = data.loginAccount;
				            	 $("#beforeName").val(loginAccount);
				            	 var positionId = data.positionId;
				            	 var disabled = data.disabled;
				            	 var gender = data.genderValue;
				            	 var idStatus = data.idstatus;
				            	 var phoneStatus = data.phoneStatus;
				            	 if(status=='3'){
                                     var edituserhtml = "";
                                     $("#edituserdiv").html("");
				            		 edituserhtml = "<span class='ftblue ftbold ft14'>"+trueName+" "+(gender==1?"先生":"女士")+"</span><span class='versuc vm'><span class='fl ml10'><i class='icon i14 ico-ok'></i>已验证</span>"
                                     $("#edituserdiv").html(edituserhtml);
				            	 }else{
                                     $("#edituserdiv").html("");
                                     $("#edituserdiv").addClass("hide");
                                     $("#edituserdiv2").removeClass("hide");
                                 }


				            	 var editphonehtml = "";
				            	 if(phoneStatus=='2'){
				            		 
				            		 editphonehtml = "<span class='ftblue ftbold ft14'>"+phone+"</span><span class='versuc vm'><span class='fl ml10'><i class='icon i14 ico-ok'></i>已验证</span>";
				            	 }else{
				            		 
				            		 editphonehtml = "<input class='br3 txtbox' value='"+phone+"' name='editphone' id='editphone' type='text'>";
				            	 }
				            	 $("#editphonediv").html(editphonehtml);
				            	 var value ="";
				            	 for(var i = 0 ; i <data.roleNameList.length;i++){
				            	 	 for(var d in data.roleNameList[i]){
				            	 	   if(d=="id"){
				            	 	   		value += data.roleNameList[i][d]+",";
				            	 	   }
				            	 	   if(d=="role_name"){
				            	 	   		roleName += data.roleNameList[i][d]+",";
				            	 	   }
				            	 }
				            	 }
                                 $("#editManagerUserDialog").popup();
                                 $("select[name='editgender'] option:eq(0)").text("性别").trigger("chosen:updated").chosen();
                                 if(status !='3'){
                                     $("select[name='editgender']").val(gender).trigger("chosen:updated").chosen()
                                 }
                                 $("#role26", "#editManagerUserDialog").attr("disabled","disabled")
				            	 var splitValue = value.split(",");
				            	 var obj=document.getElementsByName("editrolebox");
				            	/* for(var x=0;x<obj.length;x++){
				            		 obj[x].checked=false;
				            		 obj[x].disabled=false;
				            	 }*/
				            	 
				            	 for(var i =0 ;i<splitValue.length ; i++){
				            		 for(var x=0;x<obj.length;x++){ 
				     					if(obj[x].value ==splitValue[i]){
				     						 obj[x].checked=true;
				     					}			  
				            		 }
				            	 }
				            	var self=$("#selfValue").val();
                                /* for(var x=0;x<obj.length;x++){
				            		 if(eId==self &&obj[x].value=="26"){
				            			 obj[x].disabled=true;
				            		 }
				            	 }
				            	 for(var x=0;x<obj.length;x++){
				            		 if(eId != self && obj[x].value=="26" && status!="3"){
				            			 obj[x].disabled=true;
				            		 }
				            	 }*/
				            	 for(var j=0;j<obj.length;j++){
				            		 if(eId != self && obj[j].value=="26" && status =="3"){
				            			 obj[j].disabled=false;
				            		 }
				            	 }
				            	 $("#editphone").val(phone);
				            	 $("#editloginAccount").val(loginAccount);
                                 $("#roleType").val(roleName.substring(0,roleName.length-1));
                                 $("#edit_true_name").val(trueName);
                                 $("[name=editdepotName]").val(depName);
                                 $("#editpostionName").val(posName);
				             }
				             });
					}
			});
			
				var chekedSelect = function(element,value){
 					 	$(element).val(value);
                    	$(element).trigger("chosen:updated");
                    	$(element).chosen();
 					};
			$("#dataId").on("click",$("div").find("ul").find("li.opclisa").find("p").find("[dis]"),function(e){
				var dis = $(e.target).attr("dis");
				var nm = $(e.target).attr("nm");
				if(typeof(dis)!='undefined'){
					miscs.alert({
		                title: "启用用户",
		                msgTitle: '确认启用'+nm+'的账户吗？',
		                msgInfo:'启用后，该人员将可以登录156平台，但需要重新进行实名认证、手机号验证！',
		                successBtn: "确认",
		                sign: true,
		                iconCls: "inoti",
		                cancelBtn: "取消",
		                success:function(){
		                	$.ajax({
		   					 type: "POST",
		   					 contentType: "application/x-www-form-urlencoded; charset=utf-8",
		   		             url:config.ctx + "/companyManage/closeUser",
		   		             data: {
		   		            	 userId:dis,
		   		            	 closeFlag:2,
		   		            	 type:2
		   		             },
		   		             dataType: "json",
		   		             success:function(data){
		   		            	 loadUser();
		   		             }
		   				});
		                }
					});
			
				}
			});
			$("#dataId").on("click",$("div").find("ul").find("li.opclisa").find("p").find("[en]"),function(e){
				var dis = $(e.target).attr("en");
				if(typeof(dis)!='undefined'){
				var nm = $(e.target).attr("nm");
				miscs.alert({
			                title: "停用用户",
			                msgTitle: '确认停用'+nm+'的账户吗？',
			                msgInfo:'停用后，该人员将无法登录156平台。并且实名认证和手机验证状态将被置为“未验证”！',
			                successBtn: "确认",
			                sign: true,
			                iconCls: "inoti",
			                cancelBtn: "取消",
			                success:function(){
			                     $.ajax({
					 type: "POST",
					 contentType: "application/x-www-form-urlencoded; charset=utf-8",
		             url:config.ctx + "/companyManage/closeUser",
		             data: {
		            	 userId:dis,
		            	 closeFlag:1,
		            	 type:1
		             },
		             dataType: "json",
		             success:function(data){
		            	 loadUser();
		             }
				});
			                },
			                cancel: function(){
			                		
			                }
			            });
					
				}
			});
			
			var loadUser = function(options){
                var defaults = {
                    currentPage:1
                };
                var opts = $.extend(defaults, options);
				$.ajax({
					type: "GET",
					url:  config.ctx + "/userManager/renderPage",
					data:{
                        "pageNumber": opts.currentPage
					},
					dataType: "json",
					success:function(result){
						var isAdmin=$("#isAdmin").val();
						var selfid=$("#selfId").val();
						var html ='';
						var flag = false;
                        var data = result.users;
						for(var i=0;i<data.length;i++){
							html += '<div class="uc-item br3"> <ul><li class="col co1">'+data[i].trueName;
							if(data[i].certStatus == "3"){
								html+="<i class='icon i24 ico-cerstatus ico-cerpassed'></i>";
							}
							html+="</li>";
							html+=' <li class="col co2"><p>'+data[i].phone+'</p>';
							if(data[i].phoneStatus=="2"){
								html+= '<p class="ftgreen">已认证</p>';
							}else{
								html+= '<p class="ftorange">未认证</p>';
							}
							html+= "</li>";
							html +='<li class="col co3">'+data[i].roleNames+'</li>';
							html+='<li class="col co4">'+data[i].loginAccount+'</li>';
							if(data[i].formatDateTime != null && data[i].formatDateTime != "null"){
								html+= '<li class="col co5 ftgrey"><p>'+data[i].formatDateTime+'</p> </li>';
							}else{
								html+= '<li class="col co5 ftgrey"><p>'+""+'</p> </li>';
							}
							html+="<li class='col co6'>";
							if(data[i].disabled==true){
								html += '<span class="ftorange">停用</span>';
							}else{
								html+= '<span class="ftgreen">启用 </span>';
							}
							html+="</li>";
							if(data[i].admin==true){
								flag = true;
							}
							if(isAdmin=='true'){
								html+= '<li class="col co7 ftblue opclisa" id="opclisa">';
								if(data[i].disabled==false){
								html+='<p><a href="javascript:void(0);" id="editId" status='+data[i].certStatus+' e='+data[i].id+' data-id-no="'+data[i].id+'" class="editId">编辑</a></p>';
								}
								if(data[i].disabled==true){
									html += '<a href="javascript:void(0);" id="openUser" dis="'+data[i].id+'" nm='+data[i].trueName+' class="openUser">启用</a>';
								}else{
									if(data[i].roleNames.indexOf("物流负责人")==-1 ){
										html += '<a href="javascript:void(0);" id="close" en="'+data[i].id+'" nm='+data[i].trueName+' class="closeUser">停用</a>';
									}
								}
							}
							html+="</li></ul></div>";
							
						}
						//html+="</ul></div>";
						
						$("#dataId").empty();
						$("#dataId").html(html);
						if(isAdmin=='false'){
							$("#edit").remove();
						}
                        miscs.simplePage({
                            currentPage:result.currentPage,
                            pages:result.pages
                        });

                        miscs.completePage({
                            currentPage:result.currentPage,
                            pages: result.pages
                        })
					}
				});
			};
		}
	}
	});
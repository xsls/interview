/**
 * 人员管理
 */
define(
		[ "jquery", "popup","jQvalidation", "jQmessage", "plugins/validation", "config","plugins/miscs" ,"CryptoJS"],
		function($, popup,validator, message, validation, config,miscs,CryptoJS) {
			return {		
				init : function() {						
					$(".uc-tab>ul>li ").on("click",function(e){
					
					});
					
					$("#personLi").on("click",function(){
						window.location = config.ctx + "/userManager/showList";
					});
					$("input[name='account']").click(function(){
						$(".manage-account").fadeIn("fast")
					}).blur(function(){
						$(".manage-account").fadeOut("fast");
					});
					$("input[name='password']").click(function(){
						$(".manage-password").fadeIn("fast");
					}).blur(function(){
						$(".manage-password").fadeOut("fast");
					});
					
					
					
					/*****drop****/
					var rolejson = [
						{"role":"物流负责人","type":true},
						{"role":"磅房过磅员","type":true},
						{"role":"财务人员","type":true}
					];
					var plusinput = $("input[name='roletype']");
					$("input[name='roletype']").click(function(e){
						e.stopPropagation();
						$(".plusdrop").removeClass("hide");	
						$(".plusdrop li").click(function(e){
							e.stopPropagation();
							
							
						});
					});
					$(window).click(function(){
						$(".plusdrop",".user-Manager").addClass("hide");
					});
 					var chekedSelect = function(element,value){
 					 	$(element).val(value);
                    	$(element).trigger("chosen:updated");
                    	$(element).chosen();
 					};
					$(".opclisa").on("click",".editId",function(e){
						$("#addName").html("编辑用户");
						$("#winFormId").popup();
						
						var id = $(this).attr("data-id-no");
						$("#userIdHideen").val(id);
						$.ajax({
							 type: "POST",
				             url:config.ctx + "/companyManage/getUserDetail",
				             data: {userId:id},
				             dataType: "json",
				             success:function(data){
				            	 var roleName = "";
				            	 var value = "";
				            	 
				            	 
				            	 var trueName = data.trueName;
				            	 var phone = data.phone;
				            	 var depId = data.deptId;
				            	 
				            	 
				            	 var loginAccount = data.loginAccount;
				            	 var positionId = data.positionId;
				            	 var disabled = data.disabled;
				            	
				            	 
				            	 for(var i = 0 ; i <data.roleNameList.length;i++){
				            	 	 for(var d in data.roleNameList[i]){
				            	 	   if(d=="role_name"){
				            	 	   		roleName += data.roleNameList[i][d]+",";
				            	 	   }
				            	 	   if(d=="id"){
				            	 	   		value += data.roleNameList[i][d]+",";
				            	 	   }
				            	 }
				            	 }
				            	 $("#trueName").val(trueName);
				            	 $("#phone").val(phone);
				            	 $("[icz]").each(function(z){
				            	 
										
								
				            	 		var v =$(this).attr("v");
				            	 		$(this).removeClass("ico-check1");
				            	 		$(this).removeClass("ico-check3");
				            	 		var splitRoleName = roleName.split(",");
				            	 	
				            	 		for(var i = 0 ;i<splitRoleName.length;i++){
				            	 			if(splitRoleName[i]!=''){
				            	 			if(splitRoleName[i]==v){
				            	 				$(this).addClass("ico-check3");
				            	 			}else{
				            	 				$(this).addClass("ico-check1");
				            	 			}
				            	 			}
				            	 		}
				            	 		
				            	 });
				            	 $("#roleH").val(value);
				            	 $("#roleType").val(roleName.substring(0,roleName.length-1));
				            	 $("#loginAccount").val(loginAccount);
				            	 if(data.disabled==true){
				           		 	 document.getElementById('stop').checked=true; 
				            	 }else{
				        		   document.getElementById('start').checked=true; 
				            	 }
				             
				            
				            	 
				            	 
				            	 chekedSelect("[name=dept_id]",depId);
				            	 chekedSelect("[name=position_id]",positionId);
				            	 
				             }
						});
						
						//$.ajax({
						//	 type: "POST",
				        //     url:config.ctx + "/companyManage/saveOrUpdateAccount",
				        //     data: {userId:$editId},
				        //     dataType: "json",
				        //     success:function(data){
				            	 
				        //     }
						//});
							
					});
					var checkVal = function(value,element){
						var splitValue = value.split(",");
						var realValue = "";
						for(var i =0; i < splitValue.length;i++){
								if(splitValue[i]!='')
								realValue += splitValue[i]+",";		
							}
							$(element).val("");
							$(element).val(value);
					};
					var unCheckVal = function(value,element){
						
						var beforeVal = $(element).val();
						var splitValue = beforeVal.split(",");
						var realVal = "";
						for(var i =0; i < splitValue.length;i++){
							if(splitValue[i]!=value &&splitValue[i]!=''){
								realVal += splitValue[i]+",";
							}	
						}
						$(element).val("");
						$(element).val(realVal.substring(0,realVal.length-1));
					};
					$('[icz]').on("click",function(){
						var v = $(this).attr("v");
						if($("#userIdHideen").val()==''&& v=='物流负责人'){
							return;
						}
						
						var id = $(this).attr("i");
						var beforeValue = $("#roleType").val();
						var beforeId = $("#roleH").val();
						if($(this).hasClass ( 'icon i15 ico-check1') ){
									$(this).removeClass("ico-check1");
									$(this).addClass("ico-check3");
									var realValue ="";
									var realId ="";
									if(beforeValue==''){
									   realValue +=v;
									}else{
									   realValue = beforeValue+","+v;
									}
									if(beforeId ==''){
										realId +=id;
									}else{
										realId = beforeId +","+id;
									}
									 
									 
									
									checkVal(realValue,"#roleType");
									checkVal(realId,"#roleH")
						}else{
							$(this).removeClass("ico-check3");
							$(this).addClass("ico-check1");
							if(beforeValue.indexOf(v)!='-1'){
								
							//	$("#roleType").val(beforeValue.replace(v,""));
							 	var unval = $("#roleType").val();
								unCheckVal(v,"#roleType");
								unCheckVal(id,"#roleH");
							}
							
						}
					});
					$(".opclisa").on("click",".closeUser",function(){
						var t = $(this);
						var id = $(this).attr("data-id-no");
						var closeFlag = $(this).attr("closeFlag");
						$.ajax({
							 type: "POST",
							 contentType: "application/x-www-form-urlencoded; charset=utf-8",
				             url:config.ctx + "/companyManage/closeUser",
				             data: {
				            	 userId:id,
				            	 closeFlag:closeFlag,
				            	 type:1
				             },
				             dataType: "json",
				             success:function(data){
				            	 $("#enable"+id).empty();
				            	  t.remove();
				            	  $("#div"+id).html('<p><a href="javascript:void(0);" id="close" data-id-no="'+id+'"  class="openUser">启用</a></p>');
				            	  $("#enable"+id).html('<span class="ftorange">停用 </span>');
				             }
						});
					});
					
					$(".opclisa").on("click",".openUser",function(){
						var t = $(this);
						var id = $(this).attr("data-id-no");
						var closeFlag = $(this).attr("closeFlag");
						$.ajax({
							 type: "POST",
							 contentType: "application/x-www-form-urlencoded; charset=utf-8",
				             url:config.ctx + "/companyManage/closeUser",
				             data: {
				            	 userId:id,
				            	 closeFlag:closeFlag,
				            	 type:2
				             },
				             dataType: "json",
				             success:function(data){
				            	 	 $("#enable"+id).empty();
				            	 	 t.remove();  
				            	 	 $("#div"+id).append('	<p><a href="javascript:void(0);" id="close" data-id-no="'+id+'"  class="closeUser">停用</a></p>');
				            	 
				            	  $("#enable"+id).html('<span class="ftgreen">启用 </span>');
				            	  
				            	  
				             }
						});
					});
					
					
					 
					
					$("#addId").click(function(){
						$("#addName").html("添加新人员");
						$("#winFormId").popup();
						$("#userIdHideen").val("");
						
					});
				
					$("#personForm").validate({
						rules : {
							'true_name':{
								required:true,
								maxlength:20
							},
							'phone':{
								required:true,
								maxlength:20,
								mobileNumber:true
							},
							'login_account':{
								required:true
							},
							'roletype':{
								required:true
							},
							'login_account':{
								required:true,
								maxlength:20
							},
							'password':{
								required:true,
								maxlength:20
							}
						}
					});
				 
					
					$("#saveFormInfo").click(function(){
						
					
					//var ccc=$("#personForm2").valid();
					
					if($("#userIdHideen").val()!=''){
						 $("#personForm").validate().settings.rules["password"]= null;
					}else{
						 $("#personForm").validate().settings.rules["password"]= {require:true,maxlength:20};
					}
					var zzz=$("#personForm").valid();
						 if(zzz==false ){
						 	return;
						 }

						//alert($("#roleH").val());
						var id = $("#userIdHideen").val();
						
						$.ajax({
							 type: "POST",
							 contentType: "application/x-www-form-urlencoded; charset=utf-8",
				             url:config.ctx + "/companyManage/saveOrUpdateAccount",
				             data: {
				             	 userId:id,
				            	 true_name:$("input[name='true_name']").val(),
				            	 gender:$("#gender option:selected").val(),
				            	 phone:$("input[name='phone']").val(),
				            	 dept_id:$("select[name='dept_id']").val(),
				            	 position_id:$("select[name='position_id']").val(),
				            	 role_id:$("#roleH").val(),
				            	 login_account:$("input[name='login_account']").val(),
				            	 password:CryptoJS.MD5($("input[name='password']").val()).toString(),
				            	 disabled:$("input[name='disabled']").val()
				             },
				             dataType: "json",
				             success:function(data){
				            	 $("#winFormId").popup({
                                     close: true
                                 });
				            	 if(data){
				            	 }else{
				            	 }
				             }
						});
						
					});
				
				
				}
			};

		});
/**
 * 公司认证
 */
define(
		[ "jquery", "jQvalidation", "jQmessage", "plugins/validation", "config","plugins/miscs","popup" ],
		function($, validator, message, validation, config,miscs,popup) {
			return {				
				init : function() {
                    $("#crelevel-complaint ").append(miscs.calcLevel({
                        level:$("#org-level input").val(),
                        type:"org"
                    }));

					//初始化所属行业select下拉框宽度
					$("[name='orgEntity.industryId']").next().css({"width": "235px"});
					$("[name='dept_id']").next().css({"width": "130px"});
					$("[name='position_id']").next().css({"width": "130px"});
					var  flag1=true;
					var companyOptions = {
							rules:{
								'areaId':{
									maxlength:20
								},
								'orgEntity.telephone':{
									maxlength:12,
									checkTel:true
								}
							}
					};
					$("#editCanle").on("click",function(){
						
						$("#editInfoId").addClass("hide");
						$("#viewInfoId").removeClass("hide");
						$("#hideSpan").attr("class","btn-a-white ml10 hide");
						$("#hideSpan2").attr("class","btn-a-white ml10 hide");
					});
					$("#canel").click(function(){
						$("#baseInfoComangeId").addClass("hide");
						$("#updateBaseInfoComangeId").removeClass("hide");
						$("#form2")[0].reset();
						$("#areaId").val($("#areaContent").val());
					});
					$("#orgName").blur(function(){
						if($("input[name='orgName']").val()!=null){
							var $orgName = $("#orgName").val();
							var $orgId = $("#orgId").val();
							$.ajax({
								type : "GET",
								url : config.ctx + "/companyManage/queryOrgByName",
								data : {
									"orgId" : $orgId,
									"orgName" : $orgName
								},
								dateType : "json",
								success : function(data) {
									if(data==false){
										$("#messageId1").removeClass("hide");
									}else{
										$("#messageId1").addClass("hide");
									}
									if($("input[name='orgName']").val()==""){
										$("#messageId2").removeClass("hide");
										flag1=false;
									}else{
										$("#messageId2").addClass("hide");
										$("#editCompany").on("click", function() {
										saveCompanyInfo();
										});
									}
								},
								error:function(){
									$("#messageId1").removeClass("hide");
									flag1=false;
								}
							});
							};						
					});
					$("#editCompany").on("click", function() {
						saveCompanyInfo();
					});
					//保存修改的公司名称
					var saveCompanyInfo=function(){
						var $orgName = $("#orgName").val();
						var $orgId = $("#orgId").val();
						if($orgName !=""){
						$.ajax({
							type : "GET",
							url : config.ctx + "/companyManage/updateOrgName",
							data : {
								"orgId" : $orgId,
								"orgName" : $orgName,
								"orgType":$('input[name="orgTypeId"]:checked').val()
							},
							dateType : "json",
							success : function(data) {
								if(data=='0'){
									$("#editInfoId").addClass("hide");
									$("#viewInfoId").removeClass("hide");
									$("#hideSpan").attr("class","btn-a-white ml10 hide");
									$("#hideSpan2").attr("class","btn-a-white ml10 hide");
									$("#companyName").empty();
									$("#companyName").html($("#orgName").val());
									$("#orgType").empty();
									$("#orgType").html($('input[name="orgTypeId"]:checked').val() =="1"?"货主":"物流公司");
									location.reload();
								}else{
									//alert("操作失败");
								}
							}});
						}else{
							$("#messageId2").removeClass("hide");
							flag1=false;
						}
					}
					//公司证件
					$("#updateInfoId").on("click", function() {
						$("#orgName").val($("#companyName").text());
						$("#messageId1").addClass("hide");
						$("#editInfoId").removeClass("hide");
						$("#viewInfoId").addClass("hide");
						$("#hideSpan").attr("class","btn-a-blue ml10 ");
						$("#hideSpan2").attr("class","btn-a-white ml10 ");
					});
					
					$("input[name='orgName']").focus(function(){
						if($("input[name='orgName']").val()==""){
							$("#messageId2").removeClass("hide");
							flag1=false;
						}	
					});
/*					setInterval(function(){
						if(($("input[name='bizLicenceFileId']").length<1) &&  $("input[name='hiddenValue1']").val()!=3 ){
							$("#bizLicenceFileErrorId").removeClass("hide");
						}
						
						if(($("input[name='orgCodeFileId']").length<1) && $("input[name='hiddenValue2']").val()!=3){
							$("#orgCodeFileErrorId").removeClass("hide");	
						}
						
						if(($("input[name='taxRegFileId']").length<1) && $("input[name='hiddenValue3']").val()!=3){
							$("#taxRegFileErrorId").removeClass("hide");
						}
						
						if(($("input[name='identityPath1Id']").length<1) && $("input[name='hiddenValue4']").val()!=3 ){
							$("#identityPath1ErrorId").removeClass("hide");
						}
					},10);*/
					
					$("#bt1").on("click",function(){	
						bindBtn();
						
					});
					var bindBtn = function (){
												//	alert($("input[name='identityPath1Id']").length);
											//		alert($("input[name='identityPath1Id']").val());
											//		alert($("input[name='identityPath2Id']").val());
													$("#bizLicenceFileErrorId").addClass("hide");
													$("#orgCodeFileErrorId").addClass("hide");
													$("#taxRegFileErrorId").addClass("hide");
													$("#identityPath1ErrorId").addClass("hide");
													var  flag2=true;
													var  flag3=true;
													var  flag4=true;
													var  flag5=true;
														if(($("input[name='bizLicenceFileId']").length<1) &&  ($("input[name='hiddenValue1']").val()==1 ||$("input[name='hiddenValue1']").val()==4) ){
															$("#bizLicenceFileErrorId").removeClass("hide");
															//alert("2");
															flag2=false;
														}
														if(($("input[name='orgCodeFileId']").length<1) &&  ($("input[name='hiddenValue2']").val()==1 || $("input[name='hiddenValue2']").val()==4)){
															$("#orgCodeFileErrorId").removeClass("hide");	
															//alert("3");
															flag3=false;
														}
														if(($("input[name='taxRegFileId']").length<1) &&  ($("input[name='hiddenValue3']").val()==1 ||$("input[name='hiddenValue3']").val()==4)){
															$("#taxRegFileErrorId").removeClass("hide");
															//alert("4");
															flag4=false;
														}
														if(($("input[name='idUpCard1']").length<1 || $("input[name='idUpCard2']").length<1) && ($("input[name='hiddenValue4']").val() ==4 || $("input[name='hiddenValue4']").val() ==1) ){
															$("#identityPath1ErrorId").removeClass("hide");
//															alert("5");
//															alert($("input[name='idUpCard2']").val()); //5
//															alert($("input[name='hiddenValue4']").val()); //0
//															alert($("input[name='idUpCard1']").val()); //2
															flag5=false;
														}
													/*alert($("input[name='hiddenValue4']").val()+"------"+$("input[name='idUpCard1']").length);*/
							/*						alert($("input[name='identityPath1Id']").length);*/	
													//alert(flag1+"-- "+flag2 +"--- "+flag3+" ---"+flag4+ "---"+flag5);			
													if(flag1 && flag2 && flag3 && flag4 && flag5){
														if($("#updateInfoId").is(":visible")==false){
															$("#messageId3").removeClass("hide");
														}else{
															$("#form1").submit();
														}
													}else{
													//	alert("错误..");
													}
					};


					//营业执照
					$("#deletebizLicenceFileId").on("click",function(e){
					 if(confirm("是否要删除")){
							e.preventDefault();
							$.ajax({
									type: "POST",
									url:  config.ctx + "/companyManage/deleteFile",
									data:{
										bizLicenceFileId:1
									},
									dataType: "json",
									success:function(data){
										$("#resText1").empty();   //清空resText4里面的所有内容								
											var html=	
															'<span class="fmtit"><i class="icon i24 ico-cerstatus"></i>未认证</span>'+
															'<span class="fmcont">营业执照</span>'+
															'<span class="fmright upsucess ftblue">'+
															'<input id="repeatload1" type="file"'+
															'	name="bizLicenceFileId"'+
															'	class="fileUpload invisible"'+
															'	data-uploader="'+config.ctx+'/companyManage/uploadLicense"'+
															'	data-height="22" data-width="73" data-button-text="重新上传证件"'+
															'	style="width: 48px;">'+
															'</span>';
											
										$("#resText1").html(html);
										showButton();
										miscs.initSingleUploadify('#repeatload1');
									}								
							});
						     return false;
						}
					});
					
					
					//组织机构代码
					$("#deleteorgCodeFileId").on("click",function(e){
						 if(confirm("是否要删除")){
							e.preventDefault();
							$.ajax({
									type: "POST",
									url:  config.ctx + "/companyManage/deleteFile",
									data:{
										orgCodeFileId:1
									},
									dataType: "json",
									success:function(data){
										$("#resText2").empty();   //清空resText2里面的所有内容								
											var html=	
															'<span class="fmtit"><i class="icon i24 ico-cerstatus"></i>未认证</span>'+
															'<span class="fmcont">组织机构代码证</span>'+
															'<span class="fmright upsucess ftblue">'+
															'<input id="repeatload2" type="file"'+
															'	name="orgCodeFileId"'+
															'	class="fileUpload invisible"'+
															'	data-uploader="'+config.ctx+'/companyManage/uploadLicense"'+
															'	data-height="22" data-width="73" data-button-text="重新上传证件"'+
															'	style="width: 48px;">'+
															'</span>';
											
										$("#resText2").html(html);
										showButton();
										miscs.initSingleUploadify('#repeatload2');
									}								
							});
						 }
					});
					
					
					//税务登记证件
					$("#deletetaxRegFileId").on("click",function(e){
						 if(confirm("是否要删除")){
							e.preventDefault();
							$.ajax({
									type: "POST",
									url:  config.ctx + "/companyManage/deleteFile",
									data:{
										taxRegFileId:1
									},
									dataType: "json",
									success:function(data){
										$("#resText3").empty();   //清空resText4里面的所有内容								
											var html=	
															'<span class="fmtit"><i class="icon i24 ico-cerstatus"></i>未认证</span>'+
															'<span class="fmcont">税务登记证</span>'+
															'<span class="fmright upsucess ftblue">'+
															'<input id="repeatload3" type="file"'+
															'	name="taxRegFileId"'+
															'	class="fileUpload invisible"'+
															'	data-uploader="'+config.ctx+'/companyManage/uploadLicense"'+
															'	data-height="22" data-width="73" data-button-text="重新上传证件"'+
															'	style="width: 48px;">'+
															'</span>';
											
										$("#resText3").html(html);
										showButton();
										miscs.initSingleUploadify('#repeatload3');
									}								
							});
						 }
					});
					var showButton=function (){
						if($("#validateSubmit").html().indexOf("提交认证")==-1){
							$("#validateSubmit").html('<a href="javascript:void(0)" class="br3" title="提交认证" id="bt1"  >提交认证</a>');
							bindBtn();
						}
					};
					
					//身份证件已认证时删除重新上传
					$("#deleteIdentityId").on("click",function(e){
						 if(confirm("是否要删除")){
								e.preventDefault();
								$.ajax({
										type: "POST",
										url:  config.ctx + "/companyManage/deleteFile",
										data:{
											identityPath1Id:1,
											identityPath2Id:1
										},
										dataType: "json",
										success:function(data){
											$("#resText4").empty();   //清空resText4里面的所有内容								
												var html=	
																'<span class="fmtit"><i class="icon i24 ico-cerstatus"></i>未认证</span>'+
																'<span class="fmcont">申请人身份证</span>'+
																'<a href="javascript:void(0);" id="reploadIdCard" class="fr">重新上传证件</a>';									
											$("#resText4").html(html);
											
											/*miscs.initSingleUploadify('#idUpCard2');*/
										}								
								});
						 }
					});
								
					
					// 修改公司基本信息
					$("#updateCompanageId").on("click", function() {
							$("#baseInfoComangeId").removeClass("hide");
							$("#updateBaseInfoComangeId").addClass("hide");
					});


					//公司验证信息
/*					var option1={
							
			                messages:{
			                	orgName:{
			                		remote:"名称已存在"
			                	},
			                },
							bizLicenceFileId:{
								required: true
							},
							orgCodeFileId:{
								required: true
							},
							taxRegFileId:{
								required: true
							},
							identityPath1Id:{
								required: true
							}
					};		*/
					
/*					var formOption = {
							
					};*/
						
					
					//公司验证证件，名称提交
					
					//公司基本信息
					$("#form2").validate({
						rules : {
							'orgEntity.address':{
								required:false,
								maxlength:20
							},
							'orgEntity.telephone' : {
								required : false
							},
							'areaId':{
								required : true,
								maxlength:20
							},
							'orgEntity.websiteUrl':
							{
								maxlength:50
							},
							'orgEntity.yearBusinessMoney':{
								number:true,
								maxlength:20
							},
							'orgEntity.mainBusiness':
							{
								maxlength:30
							}
							
						}
					});
					
					
					$("#resText4").on("click","#reploadIdCard",function(){
						//删除身份证后移除窗口中的值。
						$("#imgCard1").attr("src","0");
                    	$("#imgCard2").attr("src","0");
                    	$("#idCard1").popup();	//显示窗口
					});
					
					
					$("#uploadIdCard").bind("click",function(){
						//删除身份证后移除窗口中的值。
						$("#imgCard1").attr("src","0");
                    	$("#imgCard2").attr("src","0");
						$("#idCard1").popup();	
					});
					
					$("#goOnId").bind("click",function(){
						if($("#identityPath1Id").val()!=""){
							$("#idCard1").popup({
                                close: true
                            });
							$("#idCard1").addClass("hide");
							$("#idCard2").popup();	
						}
						 $("#messageCard1-3").removeClass("hide");
					});
					
					$("#submitBtn").bind("click",function(){
						$("#idCard2").popup({
                            close: true
                        });
						$("#idCard2").addClass("hide");
					});
					
					$("#cacelUpId1").on("click",function(){
						$("#idCard1").popup({
                            close: true
                        });
						$("#idCard1").addClass("hide");
					});
					
					$("closeWin1").on("click",function(){
						$("#idCard1").popup({
                            close: true
                        });
						$("#idCard1").addClass("hide");
					});
					
					$("#cacelUpId2").on("click",function(){
						$("#idCard2").popup({
                            close: true
                        });
						$("#idCard2").addClass("hide");
					});
					
					$("closeWin2").on("click",function(){
						$("#idCard2").popup({
                            close: true
                        });
						$("#idCard2").addClass("hide");
					});
					
					
				}

			};

		});
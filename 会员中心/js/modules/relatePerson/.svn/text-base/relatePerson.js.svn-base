define(["jquery", "popup","jQvalidation", "jQmessage", "plugins/validation", "config","plugins/miscs"],
		function($, popup,validator, message, validation, config,miscs) {
			var loadUserList=(function(e){
		        var _current = $(e.target);
		        var $input=_current.parents('input');
		        var typeId=$input.data("typeId");
				var that=this;
				if (!that.flag){
		            that.flag = true;
					var $this=$(this);
					var value=$this.data("orgId");
					var name= $this.data("orgName");
					$input.val(name);
					var li=$("#companyUl");
					li.addClass("hide");
	            	li.prev().addClass("hide");
	            	/*li.next(1).addClass("hide");*/
					$("[name=shiperOrgId]").val(value);
					$.ajax({
						type : "GET",
						url : config.ctx + "/relatePerson/loadUserInfo",
						data : {"orgId":value},
						dateType : "json",
						success : function(data) {
							 var dom='';
	                         $.each(data, function (i, o) {
	                        	 if(i==0){
	                        		 $("[name=shiperUserId]").val(o.userId);
	                        		 $("#conName").val(o.trueName);
	                        		 $("#phone1").val(o.telephone);
	                        	 }
	                        	 dom+='<li class="curhand" data-user-id="'+o.userId+'" data-user-name="'+o.trueName+'" data-telephone="'+o.telephone+'"><em class="text-split">'+o.trueName+'</em></li>';
	                         });
							 $("#dulCat").html(dom);
							 that.flag = false;
						},error: function () {
							that.flag = false;
						}
					});
				}
				/*var that=this;
				if (!that.flag){
		            that.flag = true;
					var $this=$(this);
					var value=$this.data("orgId");
					var name= $this.data("orgName");
					$("#company2").val(name);
					var li=$("#companyUl2");
					li.addClass("hide");
	            	li.prev().addClass("hide");
	            	li.next(1).addClass("hide");
					$("[name=consigneeOrgId]").val(value);
					$.ajax({
						type : "GET",
						url : config.ctx + "/relatePerson/loadUserInfo",
						data : {"orgId":value},
						dateType : "json",
						success : function(data) {
							 var dom='';
	                         $.each(data, function (i, o) {
	                        	 if(i==0){
	                        		 $("[name=consigneeUserId]").val(o.userId);
	                        		 $("#conName2").val(o.trueName);
	                        		 $("#phone2").val(o.telephone); 
	                        	 }
	                        	 dom+='<li class="curhand" data-user-id="'+o.userId+'" data-user-name="'+o.trueName+'" data-telephone="'+o.telephone+'"><em class="text-split">'+o.trueName+'</em></li>';
	                         });
							 $("#dulCat2").html(dom);
							 that.flag = false;
						},error: function () {
							that.flag = false;
						}
					});
				}*/
			});
			var loadOrgList=(function(){
		    	var _this=$(this);
		        var no = $(_this).val();
		        var _list =null;
		        var userList=null;
		        if(_this.attr("id")=='company1'){
		        	_list=$("#companyUl");
		        	userList=$("#dname");
		        }else{
		        	_list=$("#companyUl2");
		        	userList=$("#dname2");
		        }
		        _list.addClass("hide");
		        userList.addClass("hide");
            	_list.prev().addClass("hide");
            	/*_list.next(1).addClass("hide");*/
		        if(!no){
		        	return;
		        }
		        if (_this.timer){
		            clearTimeout(_this.timer);
		        }
		        this.timer=setTimeout(function(){
		            $.ajax({
		                type:"GET",
		                url :config.ctx + "/relatePerson/orgList",
		                data:{"name":no},
		                dataType: "json",
		                async: false,
		                success: function (data) {
		                	_list.prev().removeClass("hide");
		                	var dom = "";
		                	if(data.length>0){
		                         $.each(data, function (i, o){
		                        	 dom+='<li class="curhand" data-org-id="'+o.orgId+'" data-org-name="'+o.orgName+'"><em class="text-split fl mr5">'+o.orgName+'</em>';
		                        	 if(o.creditLevel){
		                        		 var creditLevel=miscs.calcLevel({level:o.creditLevel,type:"org"});
		                        		 dom+=' '+creditLevel;
		                        	 }
		                        	 if(o.resource==1){
		                        		 dom+='<span class="ftgrey fr">伙伴库</span>';
		                        	 }
		                        	 dom+='</li>';
		                         });
		                         _list.html(dom);
		                	}
		                	/*_list.next(1).removeClass("hide");*/
		                	_list.removeClass("hide");
		                },error: function () {}
		            });        	
		        },600);				
			}); 
			return {	
				 init:function(){
						/*添加监管方 开始*/
						$(".svlist").on('mouseover','li',function(){
							var textwidth = parseInt($(this).find("a").css("width"));
							$(this).children(".svlistfr").css("width",204-textwidth);
							$(this).css("color","#1d75c3");
							$(this).parent("li").css("background","#f6f6f6");
						});
						$(".svlist").on('mouseleave','li',function(){
							$(this).css("color","#000");	
						});
						$(".svlist").on('mouseover','.svlistfr',function(){
							$(this).parent().css("background","#fff");
							$(this).find("i").removeClass("hide");
						});
						$(".svlist").on('mouseleave','.svlistfr',function(){
							$(this).parent().css("background","#f8f8f8");
							$(this).find("i").addClass("hide");
						});
						$(".svlist").on('click','.ico-redx',function(){
							$(this).parents("li").fadeOut("fast",function(){
								$(this).remove();
							});
						});
						$(".svlist").on("click",".ico-redx",function(e){
							e.stopPropagation();
							var that=this;
					        if (!that.flag){
					            that.flag = true;
					            var $li=$(this).parents("li");
					            var orgname=$li.data("orgName");
					            var rid=$li.data("relatorId");
				     	        $.ajax({
				     	            type: "POST",
				     	            url: config.ctx + "/relatePerson/deleteSupervisor",
				     	            data: {"id":rid},
				     	            dataType: "json",
				     	            success: function (data) {
				     	                if (data.success) {	
					     	            	$li.fadeOut("fast",function(){
					     	            		$(this).remove();
					     	            	});
				     	                }else{
				 		                	miscs.alert({title: "删除监管方失败",msgTitle: "监管方("+orgname+")删除失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
				     	                }
				     	                that.flag = false;
				     	            },error: function () {
			 		                	miscs.alert({title: "删除监管方失败",msgTitle: "监管方("+orgname+")删除失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
				                        that.flag = false;
				                    }   
				     	       });
				            }
						});
						$("#add_relate_person").on('click',function(){
							$("#add_relate_person_a").addClass("hide");
							$("#add_relate_person_input").removeClass("hide");
						});
						$("#add_relate_person_input_text").keyup(function(){
					    	var _this = $(this);
					        var no = $(_this).val();
					        var _list = $("#observer");
					        _list.addClass("hide");
					        if(!no){
					        	return;
					        }
					        if (_this.timer){
					            clearTimeout(_this.timer);
					        }
					        this.timer=setTimeout(function(){
					        	var freightId=$("#hiddenHeigthId").val();
					            $.ajax({
					                type: "GET",
					                url: config.ctx + "/relatePerson/supervisor",
					                data: {"orgName":no,"freightId":freightId},
					                dataType: "json",
					                async: false,
					                success: function (data) {
					                	var dom = "";
					                    if (data.length>0) {
					                        $.each(data, function (i, o) {
					                        	if(o.addFlag==1){
					                        		dom+='<li><em class="curhand ftgrey">'+o.orgName+'</em></li>';
					                        	}else{					                        		
					                        		dom += '<li  class="curhand click_btn" data-org-id="'+o.orgId+'" data-org-name="'+o.orgName+'"><em class="fl mr5 text-split">'+o.orgName+'</em>';
					                        		if(o.resource==1){
					                        			dom+='<span class="ftgrey fr">伙伴库</span>';
					                        		}
					                        		if(o.creditLevel){
					                        			var creditLevel=miscs.calcLevel({level:o.creditLevel,type:"org"});
					                        			dom+=' '+creditLevel;
					                        		}
					                        		dom += "</li>"; 
					                        	}
					                        });
					                        _list.html(dom);
					                        _list.removeClass("hide");
					                    }
					                },error:function(){}
					            });        	
					        },600);							
						});
						$(".relateperson .fml-close").on('click',function(){
							$("#add_relate_person_input").addClass("hide");
							$("#observer").addClass("hide");
							$("#add_relate_person_input_text").val(null);
							$("#add_relate_person_a").removeClass("hide");
						});
						$("#observer").on('click','.click_btn',function(e){
							e.stopPropagation();							
							var that=this;
							if (!that.flag){
					            that.flag = true;
					            var orgname = $(this).data("orgName");
					            var orgId=$(this).data("orgId");
					            var freightId=$("#hiddenHeigthId").val();
				     	        $.ajax({
				     	            type: "POST",
				     	            url: config.ctx + "/relatePerson/saveSupervisor",
				     	            data: {"freightId":freightId,"orgId":orgId},
				     	            dataType: "json",
				     	            success: function (data) {
				     	                if (data.success) {	
					     	            	$(".svlist").append('<li data-relator-id="'+data.rid+'" data-org-name="'+orgname+'"><a href="'+config.ctx+'/partner/Window/'+orgId+'" target="_blank" class="fl ftblue">'+orgname+'</a><div class="svlistfr dib" ><i class="icon i14 ico-redx ml10 hide curhand"></i></div></li>');
					     	            	$("#add_relate_person_input_text").val(null);
					     	            	$("#add_relate_person_input").addClass("hide");
					     	            	$("#observer").addClass("hide");
					     	            	$("#add_relate_person_a").removeClass("hide");
				     	                }else{
				 		                	miscs.alert({title: "监管方添加失败",msgTitle: "监管方("+orgname+")添加失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
				     	                }
				     	                that.flag = false;
				     	            },error: function () {
			 		                	miscs.alert({title: "监管方添加失败",msgTitle: "监管方("+orgname+")添加失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});	
				                        that.flag = false;
				                    }   
				     	       });
				            }
						});
						/*添加监管人 完毕*/
						$(".ico-edit").click(function(e){
							e.stopPropagation();
							var current = $(e.target);
							var type=current.data("typeId");
							var array=new Array("company","conName","phone");
							var $div=$("#div"+type);
							$div.find(".refcon").slice(0,3).each(function(i){
								var value=$(this).text();
								if(value){
									$("#"+array[i]+type).val(value);
								}
							});
							if(type==1){
								$("[name=shiperOrgId]").val($("[name=temp_shiperOrgId]").val());
								$("[name=shiperUserId]").val($("[name=temp_shiperUserId]").val());
							}else if(type==2){
						 		$("[name=consigneeOrgId]").val($("[name=temp_consigneeOrgId]").val());
						 		$("[name=consigneeOrgId]").val($("[name=temp_consigneeOrgId]").val());
							}
					 		$div.addClass("hide");
					 		$("#editDiv"+type).removeClass("hide");
					 		$("#addClassDiv"+type).addClass("refedit");
					 		$("#iEdit"+type).addClass("hide");
						});
					 	$("#canle1").on("click",function(){
					 		$("#shipper_form")[0].reset();
					 		$("#div1").removeClass("hide");
					 		$("#editDiv").addClass("hide");
					 		$("#addClassDiv").removeClass("refedit");
					 		$("#iEdit").removeClass("hide");
					 	});
					 	$("#canle2").on("click",function(){
					 		$("#consignee_form")[0].reset();
					 		$("#div2").removeClass("hide");
					 		$("#editDiv2").addClass("hide");
					 		$("#addClassDiv2").removeClass("refedit");
					 		$("#iEdit2").removeClass("hide");
					 	});
					 	$("#btn2").click(function(){
							var that=this;
					        if(!that.flag){
					            that.flag = true;
						 		var fid = $("#hiddenHeigthId").val();
						 		var form=$("#consignee_form").serialize()+'&freightId='+fid+"&role="+2;
					 			$.ajax({
									type : "GET",
									url : config.ctx + "/relatePerson/saveRelator",
									data:form,
									dateType : "json",
									success : function(data) {
										if(data.success){
											var array=new Array();
											array.push($("#company2").val());
											array.push($("#conName2").val());
											array.push($("#phone2").val());
											$("#div2 .refcon").slice(0,3).each(function(i){
												$(this).text(array[i]);
											});
											$("#editDiv2").addClass("hide");
											$("#div2").removeClass("hide");
											$("#addClassDiv2").removeClass("refedit");
											$("#iEdit2").removeClass("hide");
											$("[name=temp_consigneeOrgId]").val($("[name=consigneeOrgId]").val());
											$("[name=temp_consigneeOrgId]").val($("[name=consigneeOrgId]").val());
											if(data.isremark){
												$("#cc_refinfo").addClass("hide");
												$("#detail_cc_address").text($("#remark2").val());
											}
										}else{
miscs.alert({title: "保存失败",msgTitle: "保存收货方失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});		
										}
										that.flag=false;
									},error:function(){
										that.flag=false;
									}	
					 			});
					        }	
					 	});
					 	$("#btn1").click(function(){
							var that=this;
					        if(!that.flag){
					            that.flag = true;
						 		var fid = $("#hiddenHeigthId").val();
						 		var form=$("#shipper_form").serialize()+'&freightId='+fid+"&role="+1;
						 		$.ajax({
									type : "GET",
									url:config.ctx + "/relatePerson/saveRelator",
									data:form,
									dateType:"json",
									success:function(data) {
										if(data.success){
											var array=new Array();
											array.push($("#company1").val());
											array.push($("#conName").val());
											array.push($("#phone1").val());
											$("#div1 .refcon").slice(0,3).each(function(i){
												$(this).text(array[i]);
											});
											$("#editDiv").addClass("hide");
											$("#div1").removeClass("hide");
											$("#addClassDiv").removeClass("refedit");
											$("#iEdit").removeClass("hide");
											$("[name=temp_shiperOrgId]").val($("[name=shiperOrgId]").val());
											$("[name=temp_shiperUserId]").val($("[name=shiperUserId]").val());
											if(data.isremark){
												$("#sc_refinfo").addClass("hide");
												$("#detail_sc_address").text($("#remark1").val());
											}
										}else{
miscs.alert({title: "保存失败",msgTitle: "保存发货方失败!",iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});		
										}
										that.flag=false;	
									},error:function(){that.flag=false;}
							});
					      }		
					 	});						
						$("#companyUl2").on("click","li",function(e){
							e.stopPropagation();							
							var that=this;
							if (!that.flag){
					            that.flag = true;
								var $this=$(this);
								var value=$this.data("orgId");
								var name= $this.data("orgName");
								$("#company2").val(name);
								var li=$("#companyUl2");
								li.addClass("hide");
				            	li.prev().addClass("hide");
				            	/*li.next(1).addClass("hide");*/
								$("[name=consigneeOrgId]").val(value);
								$.ajax({
									type : "GET",
									url : config.ctx + "/relatePerson/loadUserInfo",
									data : {"orgId":value},
									dateType : "json",
									success : function(data) {
										 var dom='';
				                         $.each(data, function (i, o) {
				                        	 if(i==0){
				                        		 $("[name=consigneeUserId]").val(o.userId);
				                        		 $("#conName2").val(o.trueName);
				                        		 $("#phone2").val(o.telephone); 
				                        	 }
				                        	 dom+='<li class="curhand" data-user-id="'+o.userId+'" data-user-name="'+o.trueName+'" data-telephone="'+o.telephone+'"><em class="text-split">'+o.trueName+'</em></li>';
				                         });
										 $("#dulCat2").html(dom);
										 that.flag = false;
									},error: function () {
										that.flag = false;
									}
								});
							}
						});
						$("#companyUl").on("click","li",function(e){
							e.stopPropagation();
							var that=this;
							if (!that.flag){
					            that.flag = true;
								var $this=$(this);
								var value=$this.data("orgId");
								var name= $this.data("orgName");
								$("#company1").val(name);
								var li=$("#companyUl");
								li.addClass("hide");
				            	li.prev().addClass("hide");
				            	li.next(1).addClass("hide");
								$("[name=shiperOrgId]").val(value);
								$.ajax({
									type : "GET",
									url : config.ctx + "/relatePerson/loadUserInfo",
									data : {"orgId":value},
									dateType : "json",
									success : function(data) {
										 var dom='';
				                         $.each(data, function (i, o) {
				                        	 if(i==0){
				                        		 $("[name=shiperUserId]").val(o.userId);
				                        		 $("#conName").val(o.trueName);
				                        		 $("#phone1").val(o.telephone);
				                        	 }
				                        	 dom+='<li class="curhand" data-user-id="'+o.userId+'" data-user-name="'+o.trueName+'" data-telephone="'+o.telephone+'"><em class="text-split">'+o.trueName+'</em></li>';
				                         });
										 $("#dulCat").html(dom);
										 that.flag = false;
									},error: function () {
										that.flag = false;
									}
								});
							}	
						});
						$("#company2").on("keyup",loadOrgList);
						$("#company1").on("keyup",loadOrgList);
						$("#conName").on("click",function(){
							if($("#dulCat li").size()>0){
								$("#dname").removeClass("hide");
							}
						});
						$("#conName2").on("click",function(){
							if($("#dulCat2 li").size()>0){								
								$("#dname2").removeClass("hide");
							}
						}); 
						$("#dulCat").on("click","li",function(){
							var $this=$(this);
							$("#phone1").val($this.data("telephone"));
							$("#conName").val($this.data("userName"));
							$("[name=shiperUserId]").val($this.data("userId"));
							$("#dname").addClass("hide");
						});
						
						$("#dulCat2").on("click","li",function(){
							var $this=$(this);
							$("#phone2").val($this.data("telephone"));
							$("#conName2").val($this.data("userName"));
							$("[name=consigneeUserId]").val($this.data("userId"));
							$("#dname2").addClass("hide");
						});
						$(".relate-org-p").on("click",function(e){
							e.stopPropagation();
							loadUserList();
						});
				        $("[name=sincerity_level]").each(function(i, o){var dom=miscs.calcLevel({level:$(o).val(),type:"org"});$(o).after(dom);});
				 }
			};
		});
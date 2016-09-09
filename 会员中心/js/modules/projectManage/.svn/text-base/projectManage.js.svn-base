/**
 * 项目管理
 */
define(
		[ "jquery", "popup","jQvalidation", "jQmessage", "plugins/validation", "config","plugins/miscs" ,"CryptoJS"],
		function($, popup,validator, message, validation, config,miscs,CryptoJS) {
			//点击自动生成项目的checkfunction
			var selectIcoCheck=function(){
				$(".project_ico_check",".project_create_page").on("click",function(e){
					 var $this = $(e.target);
					 if ($this.hasClass("ico-check1")) {
		                    $this.removeClass("ico-check1").addClass("ico-check3");
		                    //自动生成项目名称规则逻辑
		                     $("#projectName").attr("readonly","readonly"); 
		                     $("#projectName").attr("title","只读！");
		                     //生成项目名称规则
		                     autoCreateProjectName();
		                }else{
		                	 $this.removeClass("ico-check3").addClass("ico-check1");
		                	 $("#projectName").removeAttr("readonly");
		                	 $("#projectName").removeAttr("title");
		                	 
		                }
				});
				
			};
			//选择起始目的地
			var selectStartToEnd=function(){
					 //关闭弹出框
		            $("#winClose", ".project_create_page").on("click", function () {
		                $("#showdialog").popup({close:true});
		            });
					//弹出层
		            $("#popup", ".project_create_page").on("click", function () {
		                var flag = submitForm();
		                if(!flag){
		                    return;
		                }
		                if ($("#ck-agree").prop("checked")) {
		                    $("#ckinfo").addClass("hide");
		                    $("#showdialog").popup();
		                } else {
		                    $("#ckinfo").removeClass("hide");
		                }
		            });
				//点击显示起始目的的窗口
				  $(".ico-psperson-project").on("click", function(e){
		                if ($(this).data("partner") == "1"){
		                    $("#org_title").text("选择起运地");
		                }else{
		                    $("#org_title").text("选择目的地");
		                }
		                $(".btn-search").click();
		                $("#partner_dialog").popup();
		                partnerList();
		                var partner = $(e.target).data("partner");
		                $("[name=partner]").val(partner);
		                var countyCode = $("[name='commEntitys["+(partner-1)+"].countyCode']").val();
		                var select3 = $("#citySelectId3");
		                select3.setCityValue(countyCode||"");
		                if (!select3.val()){
		                    $("[name=county]").val("");
		                }else{
		                    $(".btn-search", "#partner_dialog").trigger("click");
		                }

		            });
				  $("#partner_dialog", ".project_create_page").on("click", "a.selectorPartner", function(e){
		                var address = $(e.target).data("address");
		                var county = $(e.target).data("county");
		                var orgName = $(e.target).data("orgname");
		                var orgId = $(e.target).data("orgid");
		                var partner = $("[name=partner]").val();
		                var citySelect = $("#citySelectId" + ((partner-1)==0?"":"2"));
		                citySelect.setCityValue(county);
		                citySelect.blur();
		                $("[name='commEntitys["+(partner-1)+"].address']").val(address);
		                $("[name='commEntitys["+(partner-1)+"].address']").next().text(orgName).removeClass("hide").append("<i class='icon i14 ico-redx ml10 curhand'></i>");
		                $("[name='relators["+(partner-1)+"].orgId']").val(orgId);
		                $("#partner_dialog").popup({close:true});
		            });

		            $("#departureAddress").parent().on("click","i", function(){
		                $("#departureAddress").val("").next().addClass("hide");
		                $("[name='relators[0].orgId']").val(null);
		            });

		            $("#destinationAddress").parent().on("click","i", function(){
		                $("#destinationAddress").val("").next().addClass("hide");
		                $("[name='relators[1].orgId']").val(null);
		            });
		            
		            $("#citySelectId").on("change", function(){
		                $("#departureAddress").val(null).next().addClass("hide");
		                $("input[name='relators[0].orgId']").val(null);
		            });
		            $("#citySelectId2").on("change", function(){
		                $("#destinationAddress").val(null).next().addClass("hide");
		                $("input[name='relators[1].orgId']").val(null);
		            });
		          
		            $(".citySelector").focus(function(){
		            	$(this).nextAll(".iconmaskinput").css("background","#ebf5ff");
		            }).blur(function(){
		            	$(this).nextAll(".iconmaskinput").css("background","#ffffff");
		            })
		            
				  $(".btn-search",".project_create_page").on("click", function(){
		                var county = $("[name=county]").val();
		                var groupId = $("[name=groupId]").val();
		                var orgTypeId = $("[name=orgTypeId]").val();
		                var orgName = $("[name=orgName]").val();
		                $.ajax({
		                    type: "GET",
		                    url: config.ctx + "/freight/queryMyPartner",
		                    data:{
		                        county: county,
		                        groupId: groupId,
		                        orgTypeId: orgTypeId,
		                        orgName: orgName
		                    },
		                    async: false,
		                    dataType: "json",
		                    success: function (data) {
		                        var partnerEl = $(".oddbg").find("tbody").eq(1);
		                        partnerEl.html("");
		                        if (data.length>0){
		                            $.each(data, function(i, v){
		                                partnerEl.append('<tr><td>'+(i+1)+'</td><td>'+(v.orgName||"")+'</td><td>'+ v.orgTypeName+'</td>'
		                                    + '<td>'+ (v.orgAddress||"")+'</td><td>'+ (v.address||"")+'</td>'
		                                    +'<td><a href="javascript:void(0);" class="selectorPartner ftblue" data-orgName="'+ v.orgName+'" data-address="'+ (v.address||"")
		                                    +'" data-county="'+ (v.county||"")+'" data-orgid="'+ (v.orgId||"")+'">选择</a></td></tr>');
		                            });
		                        }else{
		                            partnerList();
		                        }
		                    },
		                    error: function () {

		                    }
		                });
		            });
			};
			 //货物列表
			 var goodsList = function (){
		            $.ajax({
		                type: "GET",
		                url: config.ctx + "/freight/goodslist",
		                data: {goodsName:jQuery("input[name='projectEntity.goodsDesc']").val()},
		                async: false,
		                dataType: "json",
		                success: function (data) {
		                    if (data.length){
		                        var listView = "";
		                        window.goodsStore = [];
		                        $.each(data,function(i,v){
		                            listView += "<li data-id='"+ v.id+"' data-Name='"+ v.goodsName+"' data-class-id='"+ v.goodsClassificationId+"'>"+ v.goodsName +"</li>";
		                            window.goodsStore.push({
		                                name: v.goodsName,
		                                id: v.id,
		                                classId: v.goodsClassificationId
		                            });
		                        });
		                        $(".plusdrop ul").html(listView);
		                    }else{
		                        $(".plusdrop ul").html("");
		                    }
		                },
		                error: function () {
		                }
		            });
	            };
	          //显示货物
			var showGoodsDrop=function(){
				 $(document).click(function (e) {
		                var $this = $(e.target);
		                //货物标签
		                if ($this.attr("name") == "projectEntity.goodsDesc") {
		                    $(".plusdrop").toggleClass("hide");
		                } else {
		                    if (!$this.parents(".plusdrop").length && !$this.hasClass("plusdrop")) {
		                        $(".plusdrop").addClass("hide");
		                    } else if ($this[0].tagName == "LI") {
		                        $("[name='projectEntity.goodsDesc']").val($this.data("name"));
		                        $("[name='projectEntity.goodsId']").val($this.data("id"));
		                        $("[name='projectEntity.goodsDesc']").blur();
		                        $(".plusdrop").addClass("hide");
		                    }
		                }
		                //公司标签
						 if ($this.attr("name") == "relatorName") {
			                    $(".relate-org-box").toggleClass("hide");
			                } else {
			                    if (!$this.parents(".relate-org-box").length && !$this.hasClass("relate-org-box")) {
			                        $(".relate-org-box").addClass("hide");
			                    } 
			                }
		                //自动生成项目名称
		                if($(".project_ico_check").hasClass("ico-check3")){
		                	autoCreateProjectName();
		                }
		            });
		            /* 自定义货物 */
		            $("input[name='projectEntity.goodsDesc']").on("keyup", function(e){
		            	$(".plusdrop").removeClass("hide");
		            	goodsList();
		            });

		            /* 自定义货物 */
		            $("input[name='projectEntity.goodsDesc']").on("blur", function(e){
		                var $this = $(e.target);
		                var flag = true;
		                $.each(window.goodsStore, function (i, v) {
		                    if (v.name == $this.val()) {
		                        flag = false;
		                        $("[name='projectEntity.goodsId']").val(v.id);
		                        return;
		                    }
		                });
		                if (flag) {
		                    $("[name='projectEntity.goodsId']").val(null);
		                }
		            });

			};
			//显示物流承包公司下拉信息
			var showCompanyList=function(){
					$("input[name='relatorName']").on("keyup", function(e){
						miscs.initSingleOrgList($(this),{
						  id:"org_relator_list"
						});
					});

					//选择本公司以外的公司
					 $("#org_relator_list").on("click", "li", function(e){
						  var $this = $(e.target);
					  var orgId= $this.data("org-id");
					  var orgName= $this.data("org-name");
					  $("[name='relatorName']").val(orgName);
                      $("[name='relatorId").val(orgId);
                      $(".relate-org-box").addClass("hide");
					 });
					 //选择本公司
					 $("#org_relator_list").on("click", "p", function(e){
						  var $this = $(e.target);
						  var orgId= $this.data("org-id");
						  var orgName= $this.data("org-name");
						  $("[name='relatorName']").val(orgName);
	                      $("[name='relatorId").val(orgId);
	                      $(".relate-org-box").addClass("hide");
					 });
			};
			//项目管理
			var projectManage=function(){
				
				$(".relatorMsg").on("click",function(){
					$(this).addClass("hide");
				});
			   	//增加承包方
				$("#add_contractor_relator").on("click",function(){
					var relatorName=$("[name='relatorName']").val();
					var relatorId=$("[name='relatorId").val();
					if(relatorName ==""){
						 $(".relatorMsg").text("请填写你要添加的承包方！");
		                 $(".relatorMsg").removeClass("hide");
		                 $(".relatorMsg").addClass("curhand");
		                 return false;
					}else{
						// alert(relatorId+"config.ctx=="+config.ctx);
						 $(".relatorMsg").addClass("hide");
						 $(".relatorMsg").text();
						$.ajax({
							type: "GET",
							url: config.ctx + "/projectManage/getOrgInfoByOrgId",
							data:{
								orgId: relatorId
							},
							async: false,
							dataType: "json",
							success: function (data) {
								var jsonObj=eval(data); 
								var orgInfoBo=jsonObj["orgInfoBo"];
								//alert("id=="+orgInfoBo.orgId);
								var partnerEl = $(".oddbg-project").find("tbody").eq(1);
								//var len=$(".oddbg-project tr").length;
								var orgStr='<tr id="relator_'+orgInfoBo.orgId+'">';
								orgStr+='<td>'+relatorName+':'+orgInfoBo.orgId+'</td>';
								//信用总等级
								var creditLevel=miscs.calcLevel({level:orgInfoBo.creditLevel,type:"org"});
								orgStr+='<td>'+creditLevel+'</td>';
								orgStr+='<td>'+orgInfoBo.orgTypeName+'</td>';
								orgStr+='<td>'+orgInfoBo.orgAddress+'</td>';
								orgStr+='<td><span class="gtotal pr ml6">   <div class="pr">'+
									     '<input type="text" name="" id="" value="" class="txtbox br3 txtshort"/>'+
									    '<strong class="wntext br3 pa errormsg hide"><div></strong> <em class="pa">吨</em> </span></td>';
								orgStr+='<td><a href="javascript:void(0);" id="delete_cur_relator" name="'+orgInfoBo.id+'" onclick="javascript:deleteRelatorRow()" class="ftblue">删除</a></td>';
								orgStr+='</tr>';
								partnerEl.append(orgStr);
							   
							},
							error: function () {
								
							}
						});
					}
					
				});
				
				$("#relator_Tbody").on("click",function(){ 
					$.each($("#relator_Tbody tr"), function(i){    
				    	if(i<1){
				    	$(this).on("click",function(){
							 //alert($(this).attr("id"));
						});
				    	}
				    });  
				});
			};
			
			//删除物流承包方信息通过ID
			$("#delete_cur_relator").on("click",function(){
				// alert($(this).attr("name"));
			});
			$("tr:eq(2)",".project_create_page").bind("click",function(){
				//alert($(this).attr("id"));
			});
			 function deleteRelatorRow(){
				//alert("nihao ");
			}
			//起始目的地无数据置空
			function partnerList(){
			        var partnerEl = $(".oddbg").find("tbody").eq(1);
			        partnerEl.html("");
			        for (var i = 0; i < 6; i++){
			            partnerEl.append('<tr><td style="height:35px"></td><td></td><td></td><td></td><td></td><td></td></tr>');
			        }
			    }
			//生成项目名称规则
			function autoCreateProjectName(){
				 var autoProjectName="";
                 autoProjectName+=$("#citySelectId").val();
                 if($("#citySelectId").val() !=""){
                	 autoProjectName+="---";
                 }
                 autoProjectName+=$("#citySelectId2").val();
                 if($("#citySelectId2").val() !=""){
                	 autoProjectName+=" , ";
                 }
                 autoProjectName+=$("#goodsDesc").val();
                 autoProjectName+=$("#planTransportVolume").val();
                 if($("#planTransportVolume").val() !=""){
                	 autoProjectName+="吨";
                 }
                 autoProjectName+="运输项目";
                 $("#projectName").val(autoProjectName);
			}
			return {		
				init : function() {	
					//点击自动生成项目的checkfunction
					selectIcoCheck();
					//选择起始和目的地
					selectStartToEnd();
					//货物列表
				    goodsList();
					//显示货物
					showGoodsDrop();
					//显示公司下拉信息
					showCompanyList();
					//项目管理总模块
					projectManage();
					
				}
			};

		});
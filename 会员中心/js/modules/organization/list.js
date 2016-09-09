define([ "jquery", "config", "plugins/validation", "plugins/miscs","jQvalidation","popup"], function($,config,validation,miscs,jQvalidation,pop) {
	var changeCheckbox=function(z){
		if(z.hasClass("ico-check1")){z.removeClass("ico-check1").addClass("ico-check3");return;}
		z.removeClass("ico-check3").addClass("ico-check1");
	};
	var checkOne=function(li,type){
        if(li.length==0){miscs.alert({title:"提示",msgTitle: "请至少选择一个部门!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});return false;}
        if(li.data('level')==1){miscs.alert({title:"提示",msgTitle: "此部门不可"+(type==3?'编辑':'删除')+"!",iconCls: "inoti",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});return false;}
        return true;
	};
	var loadTree = function($li, boo){
		$(".department_treelist").addClass("loading");
		var deptId='',level=1,init=true, bb=boo;
		if($li){
			var $d=$li.children('.xuli');
			deptId=$d.data("deptId");
			level=$d.data("level");
			init=false;
		}
		var that=$(this);
		if(!that.flag){
			that.flag = true;
			$.ajax({
				type : "GET",
				url : config.ctx + "/organization/tree",
				data : {"deptId":deptId,"level":level},
				success : function(data) {
					var dom = '';
					if(init){
						var obj=data.first;
						if(bb){
							$("[name=whereDeptId]").val(obj.id);
							loadTable();
						}
						dom+='<li class="tree_node_'+obj.id+'">'+(obj.hasChildren?'<i class="icon i13 ico-plus ico-minus"></i>':'')+'<span data-level="'+obj.level+'" data-dept-id="'+obj.id+'" data-des="'+obj.description+'" data-dept-name="'+obj.deptName+'" class="xuli ftbold crt">'+obj.deptName+'<em class="ftorange">'+obj.userCounts+'</em></span>';
					}
					var len=data.nodes.length;
					if (len > 0) {
						dom+='<ul class="treelist">';
						$.each(data.nodes, function(i, o) {
							dom +='<li class="tree_node_'+o.id+(i==len-1?' last':'')+'">'+(o.hasChildren?'<i class="icon i13 ico-plus"></i>':'')+'<span data-level="'+o.level+'" data-parent-id="'+o.parentDeptId+'" data-dept-id="'+o.id+'" data-des="'+o.description+'" data-dept-name="'+o.deptName+'" class="xuli">'+o.deptName+'<em class="ftorange">'+o.userCounts+'</em></span></li>';
						});
						dom+='</ul>';
					}
					if(init){
						dom+="</li>";
						$(".department_treelist").html(dom);
					}else{
						$li.append(dom);
						var className=$li.attr("class").split(" ");
						var div='dropdown-treelist';
						var boo=$li.parents("div").hasClass(div);
						if(boo){div='left_tree';}
						$("."+className,'.'+div).append(dom).children("ul").addClass("hide");
					}
					that.flag = false;
					$(".department_treelist").removeClass("loading");
				},error : function(){
					that.flag = false;
					$(".department_treelist").removeClass("loading");
				}				
			});
		}
	};
	var editDep=function($li){
		var that=$(this);
		if(!that.flag){
			that.flag = true;
			var type=$("[name=type]").val();
			var form='';
			if(type==2){
				form={"type":type,"deptId":$li.data('deptId')};
			}else{
				form=$("#edit_dep_form").serialize();
			}
			$.ajax({
				type : "POST",
				url : config.ctx + "/organization/editDep",
				data : form,
				success : function(data) {
					var div=".left_tree";
					if(data.success){
						var li=null;
						var bs=false;
						if(type!=2){
							$("#exp_truck_view_error_msg").text('').parent().addClass('hide');
							$("#department_alert_dialog").popup({"close" : true});
						}else{
							if($li.data("level")!=2){
								li=$li.parent('li').parent().parent();
								$(".tree_node_"+$li.data("parentId")).children('ul').remove();
							}else{
								bs=true;
							}
						}
						if(type==1){
							var o=data.bo;
							if(o.level!=2){
								li =$(".tree_node_"+o.parentDeptId,div);
								lis=$(".tree_node_"+o.parentDeptId);
								var i=li.children('i');
								if(i.length==0){
									lis.children('span').before('<i class="icon i13 ico-plus ico-minus"></i>');
								}
								lis.children('ul').remove();
							}
						}
						if(type==3){
							
						}
						loadTree(li,bs);
						/*if(){
							var shu=$(".tree_node_"+o.parentDeptId,".dropdown-treelist");
							shu.children("i").addClass("ico-minus");
							var ul=shu.children("ul");
							ul.removeClass("hide");
						}*/
					}else{						
						if(type!=2){
							$("#exp_truck_view_error_msg").text(data.msg).parent().removeClass('hide');
						}else{
							miscs.alert({title:"删除失败",msgTitle:data.msg,iconCls: "ierror",successBtn: "确认",cancelBtn: "",success:function(){},cancel: function(){}});
						}
					}
					that.flag = false;
				},error : function(){
					$("#exp_truck_view_error_msg").text('系统异常，请稍后再试！').parent().removeClass('hide');
					that.flag = false;
				}				
			});
		}		
	};
	var editUser=function(id){
		var that=$(this);
		if(!that.flag){
			that.flag = true;
			var isLeaderUser=0;
			if($("#is_department_leader").hasClass("ico-check3")){
				isLeaderUser=1;
			}
			$("[name=isLeaderUser]").val(isLeaderUser);
			$.ajax({
				type : "POST",
				url : config.ctx + "/organization/editUser",
				data :$("#edit_user_form").serialize(),
				success : function(data) {
					if(data.success){
						$("#edit_user_view_error_msg").text('').parent().addClass('hide');
						$("#users_alert_dialog").popup({"close" : true});
						loadTable();
					}else{						
						$("#edit_user_view_error_msg").text(data.msg).parent().removeClass('hide');
					}
					that.flag = false;
				},error : function(){
					$("#edit_user_view_error_msg").text('系统异常，请稍后再试！').parent().removeClass('hide');
					that.flag = false;
				}				
			});
		}		
	};	
	var loadTable=function(){
		var that=$(this);
		if(!that.flag){
			that.flag = true;
			var deptId=$("[name=whereDeptId]").val();
			var currentPage=$("[name=whereCurrentPage]").val();
			var isView=$("[name=whereIsView]").val();
			$.ajax({
				type : "GET",
				url : config.ctx + "/organization/table",
				data : {"deptId":deptId,"currentPage":currentPage,"isView":isView},
				success : function(data) {
					if(data.bos){
						var dom='';
						$.each(data.bos,function(i,o){
dom+='<tr class="'+((i+1)%2==0?'odd':'even')+'"><td>'+(i+1)+'</td><td>'+(o.isLeader?'<i class="icon i18 ico-orgperson curhand" title="部门负责人"></i>':'')+o.trueName+'</td><td>'+o.deptName+'</td><td>'+o.positionName+'</td><td>'+o.phone+'</td><td><a href="javascript:void(0);" class="edit fr" title="编辑人员"><i class="icon i16 ico-edit" data-isLeader="'+(o.isLeader?1:0)+'" data-orgUserRelId="'+o.orgUserRelId+'" data-deptUserId="'+o.userId+'" data-positionId="'+(o.positionId==0?'':o.positionId)+'" data-dept-id="'+o.id+'"></i></a></td></tr>';
						});
						$("#dep_users_list").html(dom);
						var result=data.page;
						miscs.completePage({"currentPage":result.currentPage,"pages":result.pages});
					}
					that.flag = false;
				},error : function(){
					that.flag = false;
				}				
			});
		}		
	};	
	return {
		init : function() {
			loadTree(null,true);				
			$(".department_alert").on("click", function(e) {
				var console=".left_tree";
				var div="#department_alert_dialog";
				var type = $(e.target).data("typeId");
				$("[name=type]").val(type);
				if(type!=2){
					$("#exp_truck_view_error_msg").text('').parent().addClass('hide');				
					$(".dropdown-treelist").addClass("hide");
				}
				if (type == 1) {
					$("#alter_department_title").text("新增部门");
					$("#department_alert_dialog").popup();
				}else{
					var $li=$(".crt",console);
					if(checkOne($li,type)){
						if(type==3){
							$("#alter_department_title").text("编辑部门");
							$(div).popup();							
							$("[name=deptName]").val($li.text());
							$("[name=deptDes]").val($li.data("des"));
							$("[name=deptId]",div).val($li.data("deptId"));
							var parentId=$li.data('parentId');
							var $prevLi=$(".tree_node_"+parentId,console).children('.xuli');
							$("[name=selectDeptId]",div).val(parentId);
							$("[name=selectDeptName]",div).val($prevLi.data('deptName'));
							$("[name=selectDeptLevel]",div).val($prevLi.data('level'));
						}else{
							editDep($li);
						}
					}
				}				
			});
			$(".close_dialog").on("click",function(e){
				var dialog = $(this).data("dialog");
				$("#" + dialog + "").popup({"close" : true});
			});
			$(".org-tbl").on("click",".ico-edit",function(e){
				var div="#users_alert_dialog";
				$(".dropdown-treelist").addClass("hide");
				$(div).popup();
				var current=$(this);
				var l=current.data("isleader");
				$("[name=positionId]").val(current.data("positionid"));
				$("[name=isLeaderUser]").val(l);
				$("[name=orgUserRelId]").val(current.data("orguserrelid"));
				$("[name=depUserId]").val(current.data("deptuserid"));
				$("[name=selectDeptId]",div).val(current.data("deptId"));
				var $tr =current.parents("tr");
				var $tds=$tr.children("td");
				var z=$("#is_department_leader");
				z.removeClass("ico-check3").addClass("ico-check1");
				if(l==1){
					z.removeClass("ico-check1").addClass("ico-check3");					
				}
				$("#trueName").text($($tds[1]).text());
				$("[name=selectDeptName]",div).val($($tds[2]).text());
				$("[name=newPositionName]").val($($tds[3]).text());
			});
			$(".i15").on("click",function(e){
				var type=$(this).data("type");
				if(type==1){
					$("[name=whereIsView]").val($(this).hasClass("ico-check3")?0:1);
					loadTable();
				}
				changeCheckbox($(this));
			});
			$(".department_treelist").on("click",".xuli",function(e){
				var current=$(this);
				var $div=current.parents(".dropdown-treelist");
				if($div.length>0){
					$("[name=selectDeptId]").val(current.data('deptId'));
					$("[name=selectDeptName]").val(current.data('deptName'));
					$("[name=selectDeptLevel]").val(current.data('level'));
					$div.addClass("hide");
				}else if(!current.hasClass('crt')){						
					var des=current.data('des');
					if(!des){des='暂无描述';}
					$('.depdesp').text(des);					
					$("[name=whereDeptId]").val(current.data("deptId"));
					loadTable();
				}
				current.parents(".first").find(".crt").removeClass("crt");
				current.addClass("crt");
			});
			$(".department_treelist").on("click",".ico-plus",function(){
				var e=$(this);
				var $li=e.parent();
				var $ul=$li.children(".treelist");
				if(e.hasClass('ico-minus')){
					e.removeClass('ico-minus');
					$ul.addClass("hide");
					return;
				}else{
					e.addClass('ico-minus');
					if($ul.length>0){
						$ul.removeClass("hide");
						return;
					}
				}
				loadTree($li,false);
			});
			$("[name=selectDeptName]").on("click",function(e){
				var dom=$(this);
				var type=dom.data("type");
				if(type==2){
					dom=dom.next();
				}
				$(".dropdown-treelist").removeClass('hide').insertAfter(dom);
			});
			$("#edit_department").on("click",function(){
				editDep();
			});
			$("#users_edit_confirm").on("click",function(){
				editUser();
			});
			$("#completePage").on("click", "a", function(e){
			  e.stopPropagation();
			  var page = $(this).data("page-number");
			  $("[name=whereCurrentPage]").val(page);
			  loadTable();
			});
		}
	};
});
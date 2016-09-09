define(["jquery", "popup", "config", "CryptoJS","jQvalidation","jQmessage","jQvalidationRule","jcrop", "plugins/miscs"], function($, popup, config, CryptoJS, jQvalidation, jQmessage, jQvalidationRule, jcrop, miscs){
	return {
		init: function(){
            //update pwd
			$("#updatePwdId").click(function(e){
                e.preventDefault();
                $("#dialog_updatepwdId").popup();
            });
            //cancel update pwd
            $("#cancel_update_pwd").click(function(e){
                e.preventDefault();
                $("#dialog_updatepwdId").popup({"close":true});
            });
            //verify update pwd
            var updatePwdOption = {
                rules:{
                    initPwd:{
                        required:true,
                        remote:{
                            url:config.ctx+"/userInfo/checkUserPwd",
                            data:{
                                initPwd:function(){
                                    var $pwd = $("#initPwd").val();
                                    var $md5Pwd = CryptoJS.MD5($pwd).toString();
                                    return $md5Pwd;
                                }
                            }
                        }
                    },
                    newPwd:{
                        required:true,
                        minlength:6,
                        maxlength:20
                    },
                    confirmPwd:{
                        required:true,
                        minlength:6,
                        maxlength:20,
                        equalTo: "#newPwd"
                    }
                },
                messages:{
                    initPwd:{
                        remote:"原始密码不正确"
                    }
                },
                submitHandler:function(form){
                	var target = $("#newPwd");
                    var $newPwd = target.val();
                    var $newMd5Pwd = CryptoJS.MD5($newPwd).toString();
                    target.val($newMd5Pwd);
                    form.submit();
                }
            };
             $("#update-pwd-form").validate(updatePwdOption);

            var phoneVerifyOption = {
                rules:{
                    mobile_phone:{
                        required: true,
                        mobileNumber: true,
                        remote:{
                        	url:config.ctx+"/userInfo/checkPhone"
                        }
                    },
                    phone_valid_code: {
                        required: true,
                        remote:{
                            url: config.ctx+"/userInfo/validCode",
                            data:{
                                usermobile: function(){
                                    return $("#mobile_phone").val();
                                },
                                validcode: function(){
                                    return $("#phone_valid_code").val();
                                }
                            }
                        }
                    }
                },
                messages:{
                	mobile_phone:{
                		remote:"该手机已经验证"
                	},
                    phone_valid_code:{
                        remote:"验证码不匹配"
                    }
                }
            };
            var phone_verify_validator =  $("#account_center_phone_verify").validate(phoneVerifyOption);

            //verify phone
            $("#phoneValidateId").click(function(e){
                e.preventDefault();
                $("#validateMobId").popup();
                var phone = $(this).parent().parent().parent().find(".ftblue").text();
                $("input[name='mobile_phone']").val(phone);
                phone_verify_validator.element(mobile_phone);

            });

            $("select[name='entity.gender']").next().css({"width":"80px"});
            $("select[name='entity.gender']").attr("data-placeholder","性别").trigger("chosen:updated").chosen();

            //verify phone
            $("#phonelModifyId").click(function(){
            	miscs.alert({
                   title: "解绑手机号",
                   msgTitle: "您确认解绑手机号吗？",
                   msgInfo: "解绑后，你将不能使用手机号作为用户名登录156平台，也不能通过手机号找回登录密码！",
                   successBtn:"确认",
                   cancelBtn:"取消",
                   sign: true,
                   iconCls: "inoti",
                   success:function(){
                       var phone = $("input[name='mobile_phone']").val();
                       window.location.href = config.ctx + "/userInfo/resetPhone?phone="+phone;
                   },
                   cancel:function(){}
                });
            });
            

            function timecount(t){
                window.setTimeout(function(){
                    t--;
                    if(t == 0){
                        var $send_btn = $("#send-valid-code");
                        $send_btn.removeClass("hide");
                        $("#text-message-record").addClass("hide");
                        $send_btn.text("重新获取验证码");
                        $("#show_num_count").text("60");
                    }else{
                        $("#show_num_count").text(t);
                        timecount(t);
                    }
                },1000);
            };
            
            function showCoords(coords){
            	 if(parseInt(coords.w) > 0){
            		 $("input[name='x']").val(coords.x);
            		 $("input[name='y']").val(coords.y);
            		 $("input[name='w']").val(coords.w);
            		 $("input[name='h']").val(coords.h);
                     //计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
                     var rx = $("#img_preview").width() / coords.w; 
                     var ry = $("#img_preview").height() / coords.h;
                     //通过比例值控制图片的样式与显示
                     $("#imgJscropPreview").css({
                         width:Math.round(rx * $("#imgJscrop").width()) + "px",	//预览图片宽度为计算比例值与原图片宽度的乘积
                         height:Math.round(rx * $("#imgJscrop").height()) + "px",  //预览图片高度为计算比例值与原图片高度的乘积
                         marginLeft:"-" + Math.round(rx * coords.x) + "px",
                         marginTop:"-" + Math.round(ry * coords.y) + "px"
                     });
                 }
            }

            //send valid code
            $("#send-valid-code").click(function(e){
                e.preventDefault();
                if(phone_verify_validator.element("#mobile_phone")){
                    var mobilephone = $("#mobile_phone").val();
                    $(this).addClass("hide");
                    $("#text-message-record").removeClass("hide");
                    timecount(60);
                    var url = config.ctx + "/userInfo/generateCode";
                    $.ajax({
                        url:url,
                        data:{"usermobile": mobilephone},
                        success:function(){},
                        error: function(){
                        	miscs.alert({
                                title: "信息提示",
                                msgTitle: "服务器错误!",
                                msgInfo:"服务器段错误,请联系管理员!",
                                iconCls: "sd-error",
                                successBtn: "确认",
                                success: function(){
                                    var $send_btn = $("#send-valid-code");
                                    $send_btn.removeClass("hide");
                                    $("#text-message-record").addClass("hide");
                                }
                        	});
                        }
                    });
                }
            });

            //cancel verify phone
            $("#cancel_verify_phone").click(function(e){
                e.preventDefault();
                $("#validateMobId").popup({"close":true});
            });

            //open verify email window
            $("#emailValidateId").click(function(e){
                e.preventDefault();
                $("#validateEmailId").popup();
            });

       
            $("#verifyBtn").click(function() {
            	var name =$("#trueName").val();
            	if(name==''){
            		alert("请填写名称");
            		return;
            	}
            	if($("#identityPath1Id").val()==''){
            		alert("请上传正面图片");
            		return;
            	}
            	if($("#identityPath2Id").val()==''){
            		alert("请上传反面图片");
            		return;
            	}
            	$("#verifyForm").submit();
            	//var 
            });
            //edit user base info
            $("#show_user_base_info .fr").on("click", "a", function(e){
                e.preventDefault();
                $("#show_user_base_info").addClass("hide");
                $("#edit_user_base_info").removeClass("hide");
            });

            //cancel edit user base info
            $("#cancel_edit_info").click(function(e){
                e.preventDefault();
                $("#show_user_base_info").removeClass("hide");
                $("#edit_user_base_info").addClass("hide");
            });

          //verify user base info
            var userOption = {
                rules:{
                	'entity.trueName':{
                    	required: true
                    }
                }
            };
            $("#edit_user_base_info_form").validate(userOption);

            //open uploadify window
            $("#uploadifyBtn").click(function(e){
                e.preventDefault();
                $("#uploadfiy_window").popup();
                $("#imgJscrop").Jcrop({
                	onSelect: showCoords,
                	onChange: showCoords,
                	aspectRatio:1
                });
            });
            
            $("#cancel-uploady-photo").click(function(e){
            	e.preventDefault();
            	 $("#uploadfiy_window").popup({close:true});
            });
            
            //cancel uploadify window
            $("#uploadify_window_cancel").click(function(e){
                e.preventDefault();
                $("#uploadfiy_window").popup("close");
            });

            //bind file choose
            $("#file_uploadify_btn").on("change", function(e){
                e.preventDefault();
                var $target = e.target;
                //alert($target.result);
                $("#img_crop").attr("src", $target.value);
            });
            
            $("#save-cut-photo").click(function(e){
            	e.preventDefault();
            	$("input[name='filePath']").val($("#imgJscropPreview").attr("src"));
            	$("#cut-form").submit();
            });
		}
	};
});
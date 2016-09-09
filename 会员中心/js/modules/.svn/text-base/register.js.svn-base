define(["jquery","jQvalidation","jQmessage","jQvalidationRule","jquery_passwordStrength","config", "CryptoJS", "plugins/miscs"],
    function($, validator,message,validationRule,passwordStrength,config, CryptoJS, miscs){

    return {
        init:function(){

            var invite_option={
                rules:{
                    invite_code:{
                        required:true,
                        remote:config.ctx+"/user/registration/inviteCode"
                    }
                },
                messages:{
                    invite_code:{
                        remote:"邀请码无效"
                    }
                }
            }
            $("#invite-form").validate(invite_option);

            $("input[name='invitesubmit']").click(function(){
                if( $("#invite-form").valid()){
                    $("#invite-dialog").addClass("hide");
                    $(".blackmask").addClass("hide");
                    $("#maskLayer").addClass("hide")
                }
            });

            $.ajax({
                url: config.ctx + "/user/registration/openCode",
                dataType: "json",
                success: function (data, status, e) {
                    if(data == false){
                        $("#invite-dialog").addClass("hide");
                        $(".blackmask").addClass("hide");
                        $("#maskLayer").addClass("hide")
                    }
                }
            });

            //STEP0 VALIDATION
            var step0_option = {
                rules:{
                    companyName:{
                        required:true,
                        remote:{
                            url:config.ctx+"/user/registration/verifyOrgName"
                        }
                    },
                    companyAddress:{
                        required:true,
                        remote:{
                            url:config.ctx+"/user/registration/isExistAddr",
                            data:{
                                id:function(){
                                    return $("input[name='companyAddress']").val();
                                },
                                address:function(){
                                    return $("#citySelectId").val();
                                }
                            }
                        }
                    },
                    trueName:{
                        required:true
                    }
                },
                messages:{
                    companyName:{
                        remote: "公司名称已经存在,<a href='javascript:void(0);'>申请加入</a>"
                    },
                    companyAddress:{
                        remote: "地址输入有误"
                    }
                },
                errorPlacement: function(errors,element){
                    var target = $(element);
                    var error = errors[0];
                    if(element.context.name == 'companyAddress'){
                        var prevElement = $(element).prev();
                        if(prevElement.length != 0){
                            target = prevElement;
                            if(error.innerHTML == '必填字段'){
                                error.innerHTML = "地区输入有误！";
                            }
                        }
                    }
                    var targetParent = target.parent();
                    if (!targetParent.hasClass("pr")) {
                        target.wrap("<div class='pr'></div>");
                    }
                    ;
                    targetParent = target.parent();
                    targetParent.find(".ico-ok").remove();
                    targetParent.find("strong").remove();
                    targetParent.append("<i class='icon i14 pa ico-warning'></i>");
                    targetParent.append("<strong class='wntext br3 pa'><i class='num-san pa'></i>" + error.innerHTML + "</strong>");
                },
                unhighlight: function(element){
                    var target = $(element);
                    if(target.attr("name") == 'companyAddress'){
                        var prevElement = $(element).prev();
                        if(prevElement.length != 0){
                            target = prevElement;
                        }
                        var targetParent = target.parent();
                        targetParent.find(".ico-warning").remove();
                        targetParent.find("strong").remove();
                        targetParent.find(".cityselect").before("<i class='icon i14 pa ico-ok'></i>");
                    }else{
                        var targetParent = target.parent();
                        targetParent.find(".ico-warning").remove();
                        targetParent.find("strong").remove();
                        targetParent.append("<i class='icon i14 pa ico-ok'></i>");
                    }
                }
            }
            $("#register-step0").validate(step0_option);

            //STEP1 VALIDATION
            var STEP1_OPTION = {
                rules:{
                    username:{
                        required:true,
                        stringCheck:true,
                        byteRangeLength:[4,20],
                        remote:{
                            url:config.ctx+"/user/registration/checkUserName"
                        }
                    },
                    password:{
                        required:true,
                        minlength:6,
                        maxlength:20
                    },
                    password2:{
                        required:true,
                        equalTo:"#password"
                    },
                    usermobile:{
                        required:true,
                        mobileNumber: true,
                        remote:{
                            url:config.ctx+"/user/registration/checkPhone"
                        }
                    },
                    valicode:{
                        required:true,
                        remote:{
                            url:config.ctx+"/user/registration/validCode",
                            data:{
                                usermobile: function(){
                                    return $("#usermobile").val();
                                },
                                validcode : function(){
                                    return $("#valicode").val();
                                }

                            }
                        }
                    }
                },
                messages:{
                    username:{
                        remote:"该用户已存在，立刻<a href='"+config.ctx+"'>登录</a>"
                    },
                    usermobile:{
                        remote:"该手机已经注册"
                    },
                    valicode:{
                        remote:"验证码错误"
                    }
                },
                errorPlacement: function(errors,e){
                    miscs.validation_errorHandle(errors, e);
                },
                unhighlight: function(e){
                    miscs.validation_unhighlight(e);
                },
                submitHandler:function(form){
                    var $pwd = $("#password").val();
                    var $md5Pwd = CryptoJS.MD5($pwd).toString();
                    $("#md5Pwd").val($md5Pwd);
                    form.submit();
                }
            };
            var $form1 = $("#register-step1");
            var $form1_validator = $form1.validate(STEP1_OPTION);

            //GENERATION VALIDATION CODE
            function timecount(t){
                window.setTimeout(function(){
                    t--;
                    if(t == 0){
                        $(".btnCode").text("重新获取验证码").removeClass("hide");
                        $("#btnCount").addClass("hide");
                        $(".num-count").text("60");
                    }else{
                        $(".num-count").text(t);
                        timecount(t);
                    }

                },1000);
            };
            $(".btnCode").on("click",function(){
            	if($form1_validator.element("#usermobile")){
            		$(this).addClass("hide");
            		$("#btnCount").removeClass("hide");
            		var mobilePhone = $("#usermobile").val();
            		timecount(60);
            		var _url = config.ctx+"/user/registration/generalCode";
            		var url = encodeURI(_url);
            		$.ajax({
            			type:"post",
            			url:url,
            			dataType:"json",
            			data:{"usermobile":mobilePhone},
            			success:function(){
            				$(this).text("验证码已发送");
            			},
            			error: function(){}
            		});
            	}
            });

            //VALIDATION PASSWORD STRENGTH
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

            $("input[name='companyName']").parent().on("click", "a", function(e){
                var companyName = $("#companyName").val();
               $.ajax({
                    url: config.ctx + "/user/registration/getCompanyInfo",
                    dataType: "json",
                    data: {"companyName": companyName},
                    success: function(data, status, e){
                        $("#exists_companyName").text(companyName);
                        $("#exists_company_contact").text(data.trueName);
                        $("#exists_company_contact1").text(data.trueName);
                        $("#exists_company_department").text(data.departName);
                        $("#show-exists-company").popup();
                    },
                    error: function(){}
                });
            });

            $("#show-exists-company .fmbtm ").on("click", "a", function(e){
                $("#show-exists-company").popup({"close":true});
            });

            $("#finish_register").click(function(e){
                var form1 = $("form[name='finish_form']");
                form1.submit();
            });

             $(document).on("click", ".sugnamelist  a", function(e){
                 e.preventDefault();
                 $("#username").val($(this).text());
                 $("#username").parent().find(".unamesug").addClass("hide");
                 $form1_validator.element("#username");
             });

             $(document).on("click", function(e){
                 $("#username").parent().find(".sugnamelist").find("li").remove();
                 $("#username").parent().find(".unamesug").addClass("hide");
             });

            $("#uname-advice-close").click(function(){
                $(".unamesug").addClass("hide");
            });

             $("#username").on("keyup", function(e){
             var that = $(this).parent();
             $form1_validator.element("#username");
             var userName = $("#username").val();
             if(userName){
                 $.ajax({
                     url: config.ctx + "/user/registration/checkUserName",
                     dataType: "json",
                     data: {"username": userName},
                     success: function (data, status, e) {
                         if (!data) {
                             $.ajax({
                                 type: "post",
                                 url: config.ctx + "/user/registration/generalUserName",
                                 dataType: "json",
                                 data: {"username": $("input[name='username']").val()},
                                 success: function (data, status, es) {
                                     that.find(".unamesug").removeClass("hide");
                                     var target = that.find(".sugnamelist");
                                     target.find("li").remove();
                                     var $dom = "";
                                     $.each(data, function (i, o) {
                                         $dom += "<li><a href='javascript: void(0);'>" + o + "</a></li>";
                                     });
                                     target.append($dom);
                                 },
                                 error: function () {
                                     miscs.alert({
                                         title: "服务器端错误",
                                         msgTitle: "服务器端错误 !",
                                         msgInfo: "服务器端未知错误,请联系管理员",
                                         iconCls: "sd-error",
                                         successBtn: "确认"
                                     });
                                 }
                             })
                         } else {
                             that.find(".unamesug").addClass("hide");
                         }
                     }
                 });
                 }
             });

        }

    }
});
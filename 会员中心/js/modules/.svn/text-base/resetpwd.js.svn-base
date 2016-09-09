define(["jquery","jQvalidation","jQmessage","jQvalidationRule", "config", "plugins/miscs", "CryptoJS"], function($, jQvalidation, jQmessage, jQvalidationRule, config, miscs, CryptoJS){
    return {
        init:function(){
            var step1_option = {
                rules:{
                    username:{
                        required:true,
                        remote:{
                            url:config.ctx+"/pwd/reset/checkUserName"
                        }
                    },
                    valicode:{
                        required:true,
                        remote:{
                            url:config.ctx+"/pwd/reset/validCode",
                            data:{
                                usermobileOrName: function(){
                                    return $("#username").val()
                                },
                                validcode: function(){
                                    return $("#valicode").val()
                                }
                            }
                        }
                    }
                },
                messages:{
                    username:{
                        remote:"输入的用户名或者手机号不存在"
                    },
                    valicode:{
                        remote:"验证码输入有误"
                    }
                }
            };
           var step1Validator =  $("#reset-form-step1").validate(step1_option);
            function timecount(t){
                window.setTimeout(function(){
                    t--;
                    if(t == 0){
                        $(".butCountMinute").text("重新获取验证码").removeClass("hide");
                        $("#countMinute").addClass("hide");
                        $(".num-count").text("60");
                    }else{
                        $(".num-count").text(t);
                        timecount(t);
                    }

                },1000);
            };
            $(".butCountMinute").click(function(e){
                e.preventDefault();
                if(step1Validator.element("#username")){
                    $(this).addClass("hide");
                    $("#countMinute").removeClass("hide");
                    var loginAccount = $("#username").val();
                    timecount(60);
                    var _url = config.ctx+"/pwd/reset/generalCode";
                    var url = encodeURI(_url);
                    $.ajax({
                        type:"post",
                        url:url,
                        dataType:"json",
                        data:{"loginAccount": loginAccount},
                        success:function(){
                            $(this).text("验证码已发送");
                        },
                        error: function(){
                            miscs.alert({
                                title: "服务器端错误",
                                msgTitle: "服务器端错误 !",
                                msgInfo:"服务器端未知错误,请联系管理员",
                                iconCls: "sd-error",
                                successBtn: "确认"
                            });
                        }
                    });
                }
            });

            var step2_option = {
                rules:{
                    newpwd:{
                        required:true
                    },
                    newpwdagain:{
                        required:true,
                        equalTo: "#newpwd"
                    }
                },
                submitHandler:function(form){
                    var $pwd = $("#newpwd").val();
                    var $md5Pwd = CryptoJS.MD5($pwd).toString()
                    $("#md5NewPwd").val($md5Pwd);
                    form.submit();
                }
            }
            $("#reset-step2-form").validate(step2_option);

            var $numCount = $(".num-count-reset-pwd");
            if($numCount.length > 0){
                timecount_resetpwd(10)
            }

            function timecount_resetpwd(t){
                window.setTimeout(function(){
                    t--;
                    if(t == 0){
                        window.location.href = config.ctx;
                    }else{
                        $(".num-count-reset-pwd").text(t);
                        timecount_resetpwd(t);
                    }
                },1000);
            };
        }
    }
});
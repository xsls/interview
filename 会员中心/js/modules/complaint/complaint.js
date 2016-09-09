define(["jquery", "config", "plugins/miscs"], function($, config, miscs){
    return{
        init:function(){
            $(".chosen-container").css({"width":"80px"});
            $("[name='feedBackForOrgResult']").attr("data-placeholder","全部");
            $("[name=feedBackForOrgResult]").trigger("chosen:updated");
            $("[name=feedBackForOrgResult]").chosen();
            $("[name='feedBackForUserResult']").attr("data-placeholder","全部");
            $("[name=feedBackForUserResult]").trigger("chosen:updated");
            $("[name=feedBackForUserResult]").chosen();

            $("select[name=complaintForUserStatus]").next().css({"width":"100px"})
            $("[name='complaintForUserStatus']").attr("data-placeholder","全部");
            $("[name=complaintForUserStatus]").trigger("chosen:updated");
            $("[name=complaintForUserStatus]").chosen();

            $("select[name=complaintForOrgStatus]").next().css({"width":"100px"})
            $("[name='complaintForOrgStatus']").attr("data-placeholder","全部");
            $("[name=complaintForOrgStatus]").trigger("chosen:updated");
            $("[name=complaintForOrgStatus]").chosen();
            $("#tab-complaint-feedback").on("click", "li", function(e){
                var $li = $("#tab-complaint-feedback ul li");
                var length = $li.length;
                var index = $(this).index();
                for(var i = 0; i<length;i++){
                    if(i != index){
                        $("#tab-complaint-feedback ul li:eq("+i+")").removeClass("crt");
                    }else{
                        $("#tab-complaint-feedback ul li:eq("+i+")").addClass("crt");
                    }
                }

                if(index == 1){
                    $("#complaint-div").removeClass("hide");
                    $("#feedback-div").addClass("hide");
                }else{
                    $("#complaint-div").addClass("hide");
                    $("#feedback-div").removeClass("hide");
                }
            });

            var $tabli=$(".evtab li");
            $tabli.click(function(){ $(this).addClass("crt").siblings().removeClass("crt");
                var $curindex=$tabli.index(this);
                $(".comlist").eq($curindex).show().siblings(".comlist").hide();
                return false;
            });

         /*   var leng = $("[name=feedBackResult]").length;
            for(var i = 0; i<leng; i++){
                var $feed = $("[name='feedBackResult']")[i];
                $($feed.options[0]).text('全部').val(0)
            }*/
            $("[name=feedBackForOrgResult]").on("change", function(){
                $.ajax({
                    url: config.ctx+"/feedback/org/view",
                    data:{"resultValue": $(this).val()},
                    success:function(data, status, e){
                        var $dom = "";
                        $("#feedback-org ul:gt(1)").remove();
                        if(data.length > 0){
                            $.each(data, function(index,d){
                                $dom += "<ul class='combd'>"
                                $dom += "<li class='col col1'>"
                                if(d.resultValue == 1){
                                    $dom += "<i class='icon i14 i-evalflower'></i>";
                                }else if(d.resultValue == 2){
                                    $dom += "<i class='icon i14 i-evalflower2'></i>";
                                }else if(d.resultValue == 3){
                                    $dom += "<i class='icon i14 i-evalflower3'></i>";
                                }
                                $dom += "</li>";
                                $dom += "<li class='col col2'>"+ d.content+"</li>";
                                $dom += "<li class='col col3'>"+d.targetUserName+"</li>";
                                $dom += "<li class='col col4'>"+config.dateFormat(new Date(d.feedbackDate), "yyyy-MM-dd: hh:mm:ss")+"</li>";
                                $dom += "<li class='col col5'><a href='"+config.ctx+"/order/Window/"+ d.orderId+"/detail' target='_blank'>"+d.orderNo+"</a></span></li>";
                                $dom += "</ul>";
                            });
                            $("#feedback-org ul:eq(0)").after($dom);
                        }
                    },
                    error: function(){}
                });
            });

            $("[name=feedBackForUserResult]").on("change", function(){
                $.ajax({
                    url: config.ctx+"/feedback/user/view",
                    data:{"resultValue": $(this).val()},
                    success:function(data, status, e){
                        var $dom = "";
                        $("#feedback-user ul:gt(1)").remove();
                        if(data.length > 0){
                            $.each(data, function(index,d){
                                $dom += "<ul class='combd'>"
                                $dom += "<li class='col col1'>"
                                if(d.resultValue == 1){
                                    $dom += "<i class='icon i14 i-evalflower'></i>";
                                }else if(d.resultValue == 2){
                                    $dom += "<i class='icon i14 i-evalflower2'></i>";
                                }else if(d.resultValue == 3){
                                    $dom += "<i class='icon i14 i-evalflower3'></i>";
                                }
                                $dom += "</li>";
                                if(null == d.content){
                                    $dom += "<li class='col col2'></li>";
                                }else{
                                    $dom += "<li class='col col2'>"+ d.content+"</li>";
                                }
                                $dom += "<li class='col col3'>"+d.targetUserName+"</li>";
                                $dom += "<li class='col col4'>"+config.dateFormat(new Date(d.feedbackDate), "yyyy-MM-dd: hh:mm:ss")+"</li>";
                                $dom += "<li class='col col5'><a href='"+config.ctx+"/order/Window/"+ d.orderId+"/detail' target='_blank'>"+d.orderNo+"</a>";
                                $dom += "</ul>";
                            });
                            $("#feedback-user ul:eq(0)").after($dom);
                        }
                    },
                    error: function(){}
                });
            });

            $("[name=complaintForOrgStatus]").on("change", function(){
                $.ajax({
                    url: config.ctx+"/complaint/org/view",
                    data:{"complaintStatus": $(this).val()},
                    success:function(data, status, e){
                        var $dom = "";
                        $("#complaint-org ul:gt(1)").remove();
                        if(data.length > 0){
                            $.each(data, function(index,d){
                                $dom += "<ul class='combd'>";
                                $dom += "<li class='col col1'>"+d.complaintNo+"</li>";
                                $dom += "<li class='col col2'>"+d.orderId+"</li>";
                                $dom += "<li class='col col3'><span class='ftorange'>"+d.complaintItemName+"</span>"+d.complaintDescription+"</li>";
                                $dom += "<li class='col col4'>"+d.targetUserName+"</li>";
                                $dom += "<li class='col col5'>"+config.dateFormat(new Date(d.cTime), 'yyyy-MM-dd: hh:mm:ss')+"</li>";
                                $dom += "<li class='col col6'><span class='ftorange ftbold'>"+d.cStatusName+"</span></li>";
                                $dom += "</ul>";
                            });
                            $("#complaint-org ul:eq(0)").after($dom);
                        }
                    },
                    error: function(){}
                });
            });

            $("#crelevel-complaint ").append(miscs.calcLevel({
                level:$("#crelevel-complaint em").text(),
                type:"org"
            }));

            $(".cre-table tr:odd").addClass("odd");
            $(".cre-table tr:even").addClass("even");

            $(".eccont").hover(function(){$(this).find("em").show();},function(){$(this).find("em").hide();});

            $("[name=complaintForUserStatus]").on("change", function(){
                $.ajax({
                    url: config.ctx+"/complaint/user/view",
                    data:{"complaintStatus": $(this).val()},
                    success:function(data, status, e){
                        var $dom = "";
                        $("#complaint-user ul:gt(1)").remove();
                        if(data.length > 0){
                            $.each(data, function(index,d){
                                $dom += "<ul class='combd'>";
                                $dom += "<li class='col col1'>"+d.complaintNo+"</li>";
                                $dom += "<li class='col col2'>"+d.orderId+"</li>";
                                $dom += "<li class='col col3'><span class='ftorange'>"+d.complaintItemName+"</span>"+d.complaintDescription+"</li>";
                                $dom += "<li class='col col4'>"+d.targetUserName+"</li>";
                                $dom += "<li class='col col5'>"+config.dateFormat(new Date(d.cTime), 'yyyy-MM-dd: hh:mm:ss')+"</li>";
                                $dom += "<li class='col col6'><span class='ftorange ftbold'>"+d.cStatusName+"</span></li>";
                                $dom += "</ul>";
                            });
                            $("#complaint-user ul:eq(0)").after($dom);
                        }
                    },
                    error: function(){}
                });
            });
        }
    }
})
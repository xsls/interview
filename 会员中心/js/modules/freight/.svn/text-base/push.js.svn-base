/**
 * 货源发布
 */
define(["jquery", "jQvalidation", "jQmessage", "jQvalidationRule" , "datepicker" , "plugins/miscs", "config", "_"], function ($, validator, message, validationRule, datepicker, miscs, config, _) {

    var pushSwitch = function(){
        $(".psource-auto").removeClass("hide");
        $("input[name=truckck]:checked").each(function(i,v){
            if (v.value == "myTruckPush"){
                $(".psource-auto").addClass("hide");
            }
        })
    };

    /***数组去重复**/
    Array.prototype.repeat= function () {
        var self = this;
        for (var i = 0; i < this.length; i++) {
            var item = this[i];
            for (var j = i + 1; j < this.length; ) {
                if (item === this[j]) {
                    this.splice(j, 1);
                    continue;
                }
                j++;
            }
        }
        return self;
    };

    /* 计算分组车辆选择总人数 */
    var recountTruckCount = function(){
        var count = 0;
        $(".psource-person dd").each(function(i ,v){
            if($(v).find("i").hasClass("ps-ok")){
                count++;
            }
        });
        $("#truckCount").text(count);
    };

    var truckgroupInput = function(){
        var count = 0;
        var truckgroup = $("#truckgroup");
        truckgroup.html("");
        $(".psource-person dd").each(function(i ,v){
            if($(v).find("i").hasClass("ps-ok")){
                truckgroup.append('<input type="hidden" name="driverIds[' + count + ']" value="'+$(v).data("id")+'"/>');
                count++;
            }
        });
    };

    var loadGroupTruck = function(dl, isLoading){
        if (isLoading) dl.addClass("loading");
        $.ajax({
            type: "GET",
            url: config.ctx + "/freight/grouptruck",
            data: {groupId: dl.data("id")},
            async: false,
            dataType: "json",
            success: function (data) {
                $.each(data,function(i,v){
                    dl.append('<dd s="0" data-id="'+ v.driverId +'"><i class="ps-unok ps-icon"></i><div class="ps-info"><span>'+ v.truckLicenseNo+'</span><span>'+ v.trueName+'</span><span>'+ (v.telephone || "") +'</span></div></dd>');
                });
                dl.removeClass("loading");
                dl.hide().show();
                if (dl.find("dt i:eq(1)").hasClass("ps-ok")){
                    dl.find("dd i").click();
                }
            },
            error: function () {
                dl.removeClass("loading");
            }
        });
    }

    var setPriceMethod = function(){
        var priceMethod = $("[name='freightEntity.priceMethod']:checked").val();
        if (priceMethod == 1){
            $("[name='priceUnitId2']").attr("name","freightEntity.priceUnitId");
        }else{
            $("[name='freightEntity.unitPrice']").remove();
            $("[name='priceUnitId']").attr("name","freightEntity.priceUnitId");
        }
    };

    /* 验证地址是否存在 */
    var existAddr = function (name, id, name1, id1) {
        var flag = true;
        var flag1 = true;
        var addrCode = $("[name='" + name + "']").val();
        var addrName = $("#" + id).val();
        var addrCode1 = $("[name='" + name1 + "']").val();
        var addrName1 = $("#" + id1).val();

        if(!addrName || !addrCode){
			showError(false,id);
            flag = false;
            if(!addrName1 || !addrCode1){
                showError(false,id1);
                flag1 = false;
            }
            return false;
		}
        if (flag && flag1){
            $.ajax({
                type: "GET",
                url: config.ctx + "/freight/isExistAddr",
                data: {address: addrName, id: addrCode},
                async: false,
                dataType: "json",
                success: function (data) {
                    flag = data.result;
                    showError(data.result, id);
                    if (flag){
                        $.ajax({
                            type: "GET",
                            url: config.ctx + "/freight/isExistAddr",
                            data: {address: addrName1, id: addrCode1},
                            async: false,
                            dataType: "json",
                            success: function (result) {
                                flag1 = result.result;
                                showError(result.result, id1);
                            }
                        });
                    }
                },
                error: function () {
                }
            });
        }
        return flag && flag1;
    };

    var showError = function (flag, id) {
        setTimeout(function () {
            var _addr = $("#" + id).nextAll("strong").eq(0);
            if (!flag) {
                _addr.text("选择的地址不合法");
                if (_addr.is(":hidden")) {
                    _addr.removeClass("hide");
                }
            } else {
                if (!_addr.hasClass("hide")) {
                    _addr.text("");
                    _addr.addClass("hide");
                }
            }
        }, 50);
    };

    //确认发布
    var submitForm = function (isAjax) {            //验证，或提交
        var flagck = false;
        var flag = true;
        if(isAjax){
            $("[name=truckck]:checked").each(function () {
                flagck = true;
                $("submit_ck").addClass("hide");
            });
            if (!flagck){
                $("#submit_error").text("请选择至少一种车辆推送方式！");
                $("#submit_ck").removeClass("hide");
                return flagck;
            }
        }

        if (flag || !isAjax) {
            var flag = existAddr('commEntitys[0].countyCode', "citySelectId", 'commEntitys[1].countyCode', "citySelectId2");	//验证地址是否存在
            if (!$("#push").valid() || !flag) {
                return false;
            }

            $.ajax({
                url: config.ctx+"/userInfo/permission",
                async: false,
                success:function(data){
                    if(data == false){
                        miscs.alert({
                            title: "友情提醒",
                            msgTitle: "你尚未进行个人实名认证或公司认证,无法发布货源!",
                            successBtn: "公司认证",
                            iconCls: "inoti",
                            btnLink:"<a href='"+config.ctx+"/userInfo/view' target='_blank' class='mr10'>&gt; 先进行<em class='tdu'>个人实名认证</em></a>",
                            success: function(){
                                window.open(config.ctx + "/companyManage/getOrgInfo","_blank");
                            }
                        });
                        flag = false;
                    }else{
                        $.ajax({
                            type: "GET",
                            url: config.ctx + "/freight/mobileVerify",
                            data: "",
                            async: false,
                            success: function (data) {
                                if (isAjax){
                                    if(data){
                                        truckgroupInput();
                                        setPriceMethod();
                                        $("#push").append('<input type="hidden" name="freightEntity.departureAddrName" value="'+$("#citySelectId").val()+'"/>');
                                        $("#push").append('<input type="hidden" name="freightEntity.destinationAddrName" value="'+$("#citySelectId2").val()+'"/>');
                                        $("#showdialog").popup({close:true});
                                        $("#process_push").popup();
                                        $.ajax({
                                            type: "POST",
                                            async: false,
                                            url: config.ctx + "/freight/push",
                                            data: $("#push").serialize(),
                                            success: function (data) {
                                                $("#process_push").popup({"close":true});
                                                if(data){
                                                    if(data == "ERROR"){
                                                        window.location.href=config.ctx+"/freight/push/error";
                                                    }else{
                                                        window.location.href=config.ctx+"/freight/push/"+data;
                                                    }
                                                }
                                            },
                                            error:function(){
                                                window.location.href=config.ctx+"/push/error";
                                            }
                                        });

                                    }else{
                                        $("#showdialog").popup({close:true});
                                        miscs.alert({
                                            title: "系统信息",
                                            msgTitle: "您的手机号码未验证，请验证后发布货源!",
                                            msgInfo: "点击“确认”前往验证手机号码",
                                            sign: true,
                                            iconCls: "ierror",
                                            successBtn: "确认",
                                            cancelBtn: "取消",
                                            success: function () {
                                                window.open(config.ctx + "/userInfo/view", "_blank");
                                            },
                                            cancel: function () {
                                            }
                                        });
                                        flag = false;
                                        return false;
                                    }
                                }else{
                                    if(data){
                                        return data;
                                    }else{
                                        $("#showdialog").popup({close:true});
                                        miscs.alert({
                                            title: "系统信息",
                                            msgTitle: "您的手机号码未验证，请验证后发布货源!",
                                            msgInfo: "点击“确认”前往验证手机号码",
                                            sign: true,
                                            iconCls: "ierror",
                                            successBtn: "确认",
                                            cancelBtn: "取消",
                                            success: function () {
                                                window.open(config.ctx + "/userInfo/view", "_blank");
                                            },
                                            cancel: function () {
                                            }
                                        });
                                        flag = data;
                                        return flag;
                                    }
                                }
                            }
                        });
                    }
                },
                error:function(){}
            });
        }
        return flag;
    };

    function partnerList(){
        var partnerEl = $(".oddbg").find("tbody").eq(1);
        partnerEl.html("");
        for (var i = 0; i < 6; i++){
            partnerEl.append('<tr><td style="height:35px"></td><td></td><td></td><td></td><td></td><td></td></tr>');
        }
    }

    return {
        init: function () {

            $.ajax({
                url: config.ctx+"/userInfo/permission",
                success:function(data){
                    if(data == false){
                        miscs.alert({
                            title: "友情提醒",
                            hideClose: true,
                            msgTitle: "你尚未进行个人实名认证或公司认证,无法发布货源!",
                            successBtn: "公司认证",
                            iconCls: "inoti",
                            btnLink:"<a href='"+config.ctx+"/userInfo/view' class='mr10'>&gt; 先进行<em class='tdu'>个人实名认证</em></a>",
                            success: function(){
                                location.href = config.ctx + "/companyManage/getOrgInfo";
                            }
                        });
                    }
                },
                error:function(){}
            });

            var v_options = {
                rules: {
                    "freightEntity.totalTransport": {
                        required: true,
                        number: true,
                        decimalOne: 1
                    },
                    "freightEntity.goodsDesc": {
                        required: true
                    },
                    "freightEntity.loadingDate": {
                        required: true
                    },
                    "freightEntity.infoExpirationDate": {
                        required: true
                    },
                    lowerValue: {
                        decimalOne: 1,
                        lessThanNum: 100
                    },
                    "priceUnitId": {
                        required: true
                    }
                },

                errorPlacement: function (errors, element) {
                    var error = errors[0];
                    var _this = $(element);
                    _this.nextAll("strong:eq(0)").removeClass("hide");
                    _this.nextAll("strong:eq(0)").text(error.innerHTML);
                },
                unhighlight: function (element) {
                    var _this = $(element);
                    _this.nextAll("strong:eq(0)").addClass("hide");
                }
            };
            $("#push", ".freight_push_page").validate(v_options);

            $("#truckModel_text", ".freight_push_page").on("click", function () {
                $("#truckModel_detail").toggleClass("hide");
            });

            $.ajax({
                type: "GET",
                url: config.ctx + "/freight/trucklist",
                data: "",
                async: false,
                success: function (data) {
                    $.each(data, function (i, o) {
                        $("#truckModel_detail > ul", ".freight_push_page").append('<li><i class="icon i15 ico-check1" data-name="'+ o.truckModelName+'" name="truckModels" data-value="' + o.id + '" id="ckb' + i + '" ></i><label class="cklb">' + o.truckModelName + '</label></li>');
                    });
                }
            });

            $("#truckModel_detail > ul ", ".freight_push_page").on("click", "li", function (e) {
                var $this = $(e.target), tagName = e.target.tagName;
                if (tagName == "LI"){
                    $this = $this.find("i");
                }else if (tagName == "LABEL"){
                    $this = $this.prev();
                }
                if ($this.hasClass("ico-check3")) {
                    $this.removeClass("ico-check3").addClass("ico-check1");
                    $("#truckModel_error").removeClass("ftorange").text("可同时选择多个车型要求。");
                } else {
                    if ($("#truckModel_detail_form > input").length > 8) {
                        $("#truckModel_error").addClass("ftorange").text("最多只能选择5种车型。");
                        return false;
                    } else {
                        $("#truckModel_error").removeClass("ftorange").text("可同时选择多个车型要求。");
                    }
                    $this.removeClass("ico-check1").addClass("ico-check3");
                }
                if($("[name=truckModels].ico-check3").length>0){
                    $("#truckModel_del").removeClass("hide");
                }else{
                    $("#truckModel_del").addClass("hide");
                }

                var $form = $("#truckModel_detail_form");
                var $text = $("#truckModel_text");
                $form.html("");

                if ($this.hasClass("ico-check3")) {
                    $text.append("，" + $this.next("label").text());
                } else {
                    var arr = $text.text().split("，");
                    $.each(arr, function (i, o) {
                        if ($this.next("label").text() == o) {
                            arr.splice(i, 1);
                        }
                    });
                    $text.text(arr.join("，"));
                }

                var i = 0;
                $("[name=truckModels].ico-check3").each(function () {
                    $form.append('<input type="text" name="projectFreightTruckmodels[' + (i) + '].truckModelId" value="' + $(this).data("value") + '"/>');
                    $form.append('<input type="text" name="projectFreightTruckmodels[' + (i++) + '].truckModelName" value="' + $(this).data("name") + '"/>');
                });

                $text.text($text.text().trim());
                if ($text.text() != "") {

                    var $textFirst = $text.text();
                    if ($textFirst.indexOf("，") == 0) {
                        $text.text($textFirst.substring(1, $textFirst.length));
                    }

                    var $textLast = $text.text();
                    if ($textLast.lastIndexOf("，") == $textLast.length - 1) {
                        $text.text($textLast.substring(0, $textLast.length - 1));
                    }
                }
            });

            //弹出层
            $("#popup", ".freight_push_page").on("click", function () {
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

            //关闭弹出框
            $("#winClose", ".freight_push_page").on("click", function () {
                $("#showdialog").popup({close:true});
            });

            $(".ico-psperson", ".freight_push_page").on("click", function(e){
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

            $("#partner_dialog", ".freight_push_page").on("click", "a.selectorPartner", function(e){
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

            $(".btn-search", ".freight_push_page").on("click", function(){
                var county = $("[name=county]").val();
                var orgName = $("[name=orgName]").val();
                $.ajax({
                    type: "GET",
                    url: config.ctx + "/freight/queryMyPartner",
                    data:{
                        county: county,
                        orgName: orgName
                    },
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        var partnerEl = $(".oddbg").find("tbody").eq(1);
                        partnerEl.html("");
                        if (data.length>0){
                            $.each(data, function(i, v){
                                partnerEl.append('<tr><td>'+(i+1)+'</td><td>'+(v.resource||"")+'</td><td>'+ v.orgName+'</td>'
                                    + '<td>'+ (v.addressName||"")+'</td><td>'+ (v.address||"")+'</td>'
                                    +'<td><a href="javascript:void(0);" class="selectorPartner ftblue" data-orgName="'+ v.orgName+'" data-address="'+ (v.address||"")
                                    +'" data-county="'+ (v.countyCode||"")+'" data-orgid="'+ (v.orgId||"")+'">选择</a></td></tr>');
                            });
                        }else{
                            partnerList();
                        }
                    },
                    error: function () {

                    }
                });
            });

            //车辆推送范围
            $(".sd-bd", ".freight_push_page").on("click", "li", function (e) {
                e.stopPropagation();
                $("#submit_ck").addClass("hide");	//隐藏车辆推送消息(错误提示)

                if (this.id == "156Truck") {
                    if ($(this).hasClass("crt")) {
                        $(this).removeClass("crt");
                        $("#ck-fw1").prop("checked", false);
                    } else {
                        $(this).addClass("crt");
                        $("#ck-fw1").prop("checked", true);
                    }
                } else {
                    if ($(this).hasClass("crt")) {
                        $(this).removeClass("crt");
                        $("#ck-fw2").prop("checked", false);

                        $(".ps-mask").show().animate({"display":"block","opacity":".8"},"normal");
                        $(".psourcefr .angle").attr("src",config.ctx + "/resources/img/angleleft-hover.jpg");
                        $(".psource-auto-title .fr").animate({opacity:0},'normal',function(){
                            $(this).hide();
                        });
                    } else {
                        $(this).addClass("crt");
                        $("#ck-fw2").prop("checked", true);
                        $(".psourcefr .angle").attr("src",config.ctx + "/resources/img/angleleft.jpg");
                        $(".ps-mask").animate({opacity:0},'normal',function(){
                            $(this).hide();
                        });
                        $(".psource-auto-title .fr").show().animate({"display":"block","opacity":".8"},"normal");
                    }
                }

                $("#truck_ckecked").html("");
                $("[name=truckck]:checkbox").each(function (i, o) {
                    if ($(this).prop("checked")) {
                        $("#truck_ckecked").append('<input type="hidden" name="' + $(o).val() + '" value="true"/>');
                    }
                });
                pushSwitch();
            });
            //设置装货日期初始化时间
            $("[name='freightEntity.loadingDate']").datepicker("setStartDate", config.dateFormat(new Date(), "yyyy-MM-dd"));
            $("[name='freightEntity.loadingDate']").datepicker("setEndDate", config.dateFormat(new Date(new Date().getTime() + 86400000 * 6), "yyyy-MM-dd"));
            $("[name='freightEntity.infoExpirationDate']").datepicker("setStartDate", config.dateFormat(new Date(), "yyyy-MM-dd"));
            $("[name='freightEntity.infoExpirationDate']").datepicker("setEndDate", config.dateFormat(new Date(new Date().getTime() + 86400000 * 6), "yyyy-MM-dd"));

            $("[name='freightEntity.loadingDate']").on("change", function(e){
                var infoExpirationDate = $("[name='freightEntity.infoExpirationDate']");
                if (!infoExpirationDate.val()){
                    infoExpirationDate.val($(e.target).val());
                    infoExpirationDate.blur();
                }
            });

            $(".citySelector").on("blur", function(){
                if ($(this).next().next().css("display") == "none"){
                    var departureCode = $("input[name='commEntitys[0].countyCode']").val();
                    var destinationCode = $("input[name='commEntitys[1].countyCode']").val();
                    if (departureCode && destinationCode){
                        $.ajax({
                            type: "GET",
                            url: config.ctx + "/freight/api/distance",
                            data: {departureCode:departureCode,destinationCode:destinationCode},
                            async: false,
                            dataType: "json",
                            success: function (distance) {
                                $("[name='freightEntity.transportDistance']").val((distance/1000).toFixed(2));
                                if (distance <= 200){
                                    $("input[name='freightEntity.distanceType']:eq(0)").prop("checked", true);
                                }else{
                                    $("input[name='freightEntity.distanceType']:eq(1)").prop("checked", true);
                                }
                            },
                            error: function () {

                            }
                        });
                    }
                }
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
            
            //提交表单
            $("#submitForm", ".freight_push_page").on("click", function (e) {
                if (!$("#ck-fw2").prop("checked") || ($("#ck-fw2").prop("checked") && $("#truckCount").text() != "0" && $("#truckCount").text())){
                    $("#submit_ck").addClass("hide");
                    submitForm(true);
                }else{
                    $("#submit_error").text("您已选择”人工派车“，请至少选择一个车辆进行指定推送！");
                    $("#submit_ck").removeClass("hide");
                }
            });

            $(document).click(function (e) {
                var $this = $(e.target);
                if ($this.attr("id") != 'truckModel_detail' && !$this.parents("div").is("#truckModel_detail") && $this.attr("id") != "truckModel_text" && $this.attr("id") != "truckModel_del") {
                    if (!$("#truckModel_detail").is(":hidden")) {
                        $("#truckModel_detail").addClass("hide");
                    }
                }

                if ($this.attr("name") == "freightEntity.goodsDesc") {
                    $(".plusdrop").toggleClass("hide");
                } else {
                    if (!$this.parents(".plusdrop").length && !$this.hasClass("plusdrop")) {
                        $(".plusdrop").addClass("hide");
                    } else if ($this[0].tagName == "LI") {
                        $("[name='freightEntity.goodsDesc']").val($this.data("name"));
                        $("[name='freightEntity.goodsId']").val($this.data("id"));
                        $("[name='freightEntity.goodsClassificationId']").val($this.data("classId"));
                        $("[name='freightEntity.goodsDesc']").blur();
                        $(".plusdrop").addClass("hide");
                    }
                }
            });

            var goodsList = function (){
	            //车型要求
	            $.ajax({
	                type: "GET",
	                url: config.ctx + "/freight/goodslist",
	                data: {goodsName:jQuery("input[name='freightEntity.goodsDesc']").val()},
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
            }
            goodsList();
            
            
            /* 自定义货物 */
            $("input[name='freightEntity.goodsDesc']").on("keyup", function(e){
            	goodsList();
            });

            /* 自定义货物 */
            $("input[name='freightEntity.goodsDesc']").on("blur", function(e){
                var $this = $(e.target);
                var flag = true;
                $.each(window.goodsStore, function (i, v) {
                    if (v.name == $this.val()) {
                        flag = false;
                        $("[name='freightEntity.goodsId']").val(v.id);
                        $("[name='freightEntity.goodsClassificationId']").val(v.classId);
                        return;
                    }
                });

                if (flag) {
                    $("[name='freightEntity.goodsId']").val(null);
                    $("[name='freightEntity.goodsClassificationId']").val(null);
                }
            });

            //展开扩展信息
            $(".mwbd-text", ".freight_push_page").on("click", function(){
                if(!$(this).hasClass("mwbdslide-icon")){
                    $(this).addClass("mwbdslide-icon");
                    $(".mwbd-slidebox").slideToggle('fast');
                    $("#slide").text("收缩");
                }else {
                    $("#slide").text("展开");
                    $(this).removeClass("mwbdslide-icon");$(".mwbd-slidebox").slideToggle('fast');
                }
            });

            /* 删除车型 */
            $("#truckModel_del", ".freight_push_page").on("click", function(e){
                $("[name=truckModels].ico-check3").each(function(i,v) {
                    $(v).removeClass("ico-check3").addClass("ico-check1");
                });
                $("#truckModel_detail_form").html("");
                $("#truckModel_text").html("");
                $("#truckModel_error").removeClass("ftorange").text("可同时选择多个车型要求。");
                $(this).addClass("hide");
            });

            miscs.areaLength($("[name='freightEntity.description']"));

            /* 报价方式 */
            $("input[name='freightEntity.priceMethod']", ".freight_push_page").on("click", function(e){
                var $this = $(e.target);
                $("input[name='freightEntity.priceMethod']").parent().next().next().addClass("hide");
                $this.parent().next().next().removeClass("hide");
                if ($this.attr("id") == "direprice"){
                    $("#push").validate().settings.rules["priceUnitId"]= null;
                    $("#push").validate().settings.rules["priceUnitId2"] = {required: true};
                    $("#push").validate().settings.rules["freightEntity.unitPrice"] = {required: true,decimalOne: 1};
                }else{
                    $("#push").validate().settings.rules["priceUnitId2"]= null;
                    $("#push").validate().settings.rules["freightEntity.unitPrice"] = null;
                    $("#push").validate().settings.rules["priceUnitId"]= {required:true};
                }
                var priceUnitId = $("[name=priceUnitId2]");
                if (!priceUnitId.val()){
                    priceUnitId.val(21).trigger("chosen:updated").chosen();
                }
            });

            $(".psource-person").on("click",".greygradient", function(){
                var $this = $(this);
                var dl = $this.parents("dl");
                var dtLength = dl.children().length;
                if($this.html().trim() == "+"){
                    if (dtLength == 1){
                        loadGroupTruck(dl, true);
                    }
                    dl.find("dd").show();
                    $(this).html("-");
                }else if(dtLength > 1){
                    $this.html("+");
                    dl.find("dd").hide();
                }
            });

            $(".refreshTruckGroup").on("click", function(){
                var inner = $(".psource-inner");
                inner.html("");
                $(".refreshTruckGroup").parent().prev().prev().removeClass("ps-ok").addClass("ps-unok");
                $("#truckCount").text(0);
                inner.removeClass("loading");
                $.ajax({
                    type: "GET",
                    url: config.ctx + "/freight/api/truckGroups",
                    dataType: "json",
                    success: function (data) {
                        $.each(data,function(i,v){
                            var sign = "";
                            if (v.count < 1){
                                sign = "-";
                            }else{
                                sign = "+";
                            }
                            inner.append('<dl data-id="'+(v.id || "")+'" s="0"><dt s="0"><i class="greygradient curhand">'+sign+'</i>'
                            + '<i class="ps-unok ps-icon"></i>'+(v.groupName || "")+'<span class="ftorange truckCount">'+(v.count || "0")+'</span>'
                            + '</dt></dl>');
                        });
                        $(".psource-inner").removeClass("loading");
                    },
                    error: function () {
                        inner.removeClass("loading");
                    }
                });
            });


            var dtlen = [],pslen=[];
            $(".psource-person").on("click","dt .ps-icon" ,function(){
                var $this = $(this);
                var greygradient = $this.prev();
                var dl = greygradient.parents("dl");
                var dtLength = dl.children().length;
                var dt_titlen = $(".psource-person").find("dl").length;
                if(!$this.hasClass("ps-unok")){
                    $this.removeClass("ps-ok ps-half").addClass("ps-unok");
                    $this.parents("dl").find("dd .ps-icon").removeClass("ps-ok ps-half").addClass("ps-unok")
                }else{
                    $this.removeClass("ps-unok ps-half").addClass("ps-ok");
                    $this.parents("dl").find("dd .ps-icon").removeClass("ps-unok ps-half").addClass("ps-ok");
                    if(greygradient.html().trim() == "+"){
                        if (dtLength == 1){
                            loadGroupTruck(dl, false);
                        }
                    }
                };
                if (!$this.hasClass("ps-ok")) {
                    dtlen.push($this.parents("dl").index());
                    dtlen.repeat();
                }
                else {
                    dtlen.splice($.inArray($this.parents("dl").index(),dtlen),1);
                };
                if (dtlen.length == dt_titlen){
                    $(".psource-auto-title .ps-icon").removeClass("ps-ok ps-half").addClass("ps-unok");

                }
                else if (dtlen.length < dt_titlen && dtlen.length !== 0){
                    $(".psource-auto-title .ps-icon").removeClass("ps-unok ps-ok").addClass("ps-half");
                }
                else if (dtlen.length == 0){
                    $(".psource-auto-title .ps-icon").removeClass("ps-unok ps-half").addClass("ps-ok");
                }
                recountTruckCount();
            });

            $(".psource-person").on("click", "dd .ps-icon", function(){
                var ddlen = $(this).parents("dl").find("dd").length;
                if($(this).hasClass("ps-ok")){
                    $(this).removeClass("ps-ok ps-half").addClass("ps-unok");
                }
                else {
                    $(this).removeClass("ps-unok ps-half").addClass("ps-ok");
                };
                if (!$(this).hasClass("ps-ok")) {
                    pslen.push($(this).parents("dd").index());
                    pslen.repeat();
                }
                else {
                    pslen.splice($.inArray($(this).parents("dd").index(),pslen),1);
                }
                if (pslen.length == ddlen){
                    $(this).parents("dl").find("dt .ps-icon").removeClass("ps-ok ps-half").addClass("ps-unok");

                }
                else if (pslen.length < ddlen && pslen.length !== 0){
                    $(this).parents("dl").find("dt .ps-icon").removeClass("ps-unok ps-ok").addClass("ps-half");
                }
                else if (pslen.length == 0){
                    $(this).parents("dl").find("dt .ps-icon").removeClass("ps-unok ps-half").addClass("ps-ok");
                }
                recountTruckCount();
            });

            $(".psource-auto-title .ps-icon").on("click", function(){
                if($(this).hasClass("ps-ok")){
                    $(this).removeClass("ps-ok").addClass("ps-unok");
                    $(".psource-person dl").find(".ps-icon").removeClass("ps-ok ps-half").addClass("ps-unok");
                }else {
                    $.each($(".psource-person").find("dt"), function(i, d){
                        var dl = $(d).parent();
                        var dtLength = dl.children().length;
                        var count = dl.find(".truckCount").text();
                        if (dtLength == 1 && count != 0){
                            loadGroupTruck(dl, false);
                        }
                    });
                    recountTruckCount();
                    $(this).removeClass("ps-unok").addClass("ps-ok");
                    $(".psource-person dl").find(".ps-icon").removeClass("ps-unok ps-half").addClass("ps-ok");
                }
                recountTruckCount();
            });

            //初始化select长度
            $("[name='freightEntity.goodsId']", ".freight_push_page").next().css({"width": "153px"});
            $("[name=groupId]", ".freight_push_page").next().css({"width": "237px"});
            $("[name=orgTypeId]", ".freight_push_page").next().css({"width": "237px"});
            $(".priceUnitId", ".freight_push_page").next().css({"width": "123px"});
            $("[name=priceUnitId] option:eq(0)").text("选择报价单位").trigger("chosen:updated").chosen();
            $("[name=priceUnitId2] option:eq(0)").text("选择报价单位").trigger("chosen:updated").chosen();
            //清空form值，防缓存
            $("#ck-fw2").prop("checked", false);

            //再次发布
            if ($("[name=againPush]").val()){
                var goodsId = $("[name=again_goodsId]").val();
                var goodsDesc = $("[name=again_goodsDesc]").val();
                var goodsClassificationId = $("[name=again_goodsClassificationId]").val();
                var truckModelIds = $("[name=again_truckModelId]");

                var lowerValue = $("[name=again_lowerValue]").val();
                var priceMethod = $("[name=again_priceMethod]").val();
                var priceUnitId = $("[name=again_priceUnitId]").val();
                var unitPrice = $("[name=again_unitPrice]").val();
                var distanceType = $("[name=again_distanceType]").val();

                $("[name='freightEntity.goodsClassificationId']").val(goodsClassificationId);
                $("[name='freightEntity.goodsId']").val(goodsId);
                $("[name='freightEntity.goodsDesc']").val(goodsDesc).blur();

                $("[name=truckModels]").each(function(i ,v){
                    var val = $(v);
                    $.each(truckModelIds, function(ci, cv){
                        if (val.data("value") == $(cv).val()){
                            val.click();
                        }
                    });
                });

                $("[name=lowerValue]").val(lowerValue);
                if (priceMethod == 1){
                    $("[name='freightEntity.unitPrice']").val(unitPrice);
                    $("[name=priceUnitId2]").val(priceUnitId).trigger("chosen:updated").chosen();
                    $("[name='freightEntity.priceMethod']:eq(1)").click();
                }else{
                    $("[name=priceUnitId]").val(priceUnitId).trigger("chosen:updated").chosen();
                    $("[name='freightEntity.priceMethod']:eq(0)").click();
                }
                $("[name='freightEntity.distanceType']:eq("+(distanceType-1)+")").prop("checked", true);
            }
        }
    };
});
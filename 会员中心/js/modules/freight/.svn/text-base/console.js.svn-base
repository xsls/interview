define(["jquery", "backbone", "_", "config", "hbs!../template/console/freight", "hbs!../template/console/order","plugins/models", "dateFormat", "raphael", "morris", "CYMap", "coordinate", "json3", "plugins/mask", "plugins/miscs"],
    function ($, Backbone, _, config, freightTmpl, orderTmpl, Models, dateFormat, raphael, morris, CYMap, coordinate, JSON, mask, miscs) {

        var isFreightMode = false;
        var currFreightId = 0;
        var routeKey = "line";

        var redDlg = "<div class='Map_bubble_sign br3 ftblue'>"+
            "<div class='ftblue Map_bubble_title'>$1<span class='ml10 ftgrey'>$2 &nbsp; $3</span></div>"+
            "<p class='ftorange'><i class='icon i17-16 ico-caution'></i>车辆发生故障，正在维修中。</p>"+
            "</div>";

        var orangeDlg = "<div id='popupdlg' class='Map_bubble_bus'>"+
            "<div class='Map_bubblebg'>"+
            "<div class='ftblue Map_bubble_title clearfix'>"+
            "<div class='ftbold ft14'>$1<i class='icon i31-20 ico-idcerti ml10'></i></div>"+
            "</div>" +
            "<div class='Map_bubble_content'>"+
            "<dl class='clearfix'>"+
            "<dt>车主：</dt>"+
            "<dd>$2 &nbsp; $3"+
            "<span class='userlevel'>"+
            "###"+
            "</dd>"+
            "<dt>车型：</dt>"+
            "<dd>$4</dd>"+
            "<dt>车辆位置：</dt>"+
            "<dd class='ftorange'>$5</dd>"+
            "</dl>"+
            "<div class='Map_bubble_btn'> <span class='btn-a-white'><a href='"+config.ctx+"/truck/Window/$6' class='ftgrey br3' target='_blank'>车辆详情</a></span> <span class='btn-a-white'><a href='' class='br3 booking_confirm'>订车确认</a></span> </div>"+
            "</div>"+
            "</div>"+
            "</div>";

        var grayDlg = "<div id='popupdlg' class='Map_bubble_bus'>"+
            "<div class='Map_bubblebg'>"+
            "<div class='ftblue Map_bubble_title clearfix'>"+
            "<div class='ftbold ft14'>$1<i class='icon i31-20 ico-idcerti ml10'></i></div>"+
            "</div>" +
            "<div class='Map_bubble_content'>"+
            "<dl class='clearfix'>"+
            "<dt>车型：</dt>"+
            "<dd>$2</dd>"+
            "<dt>车辆位置：</dt>"+
            "<dd class='ftorange'>$3</dd>"+
            "</dl>"+
            "<dl class='bdt clearfix'>"+
            "<dd class='ftgrey'>如需预订该车辆，请先向该车推送货源！</dd>"+
            "</dl>"+
            "<div class='Map_bubble_btn'> <span class='btn-a-white'><a href='"+config.ctx+"/truck/Window/$4' class='ftgrey br3' target='_blank'>车辆详情</a></span> <span class='btn-a-white'><a href='' class='ftgrey br3'>加入我的车辆库</a></span> <span class='btn-a-white'><a href='' class='br3'>推送货源</a></span> </div>"+
            " </div>"+
            "</div>"+

            "</div>";

        var transitDlg = "<div id='popupdlg' class='Map_bubble_bus'>"+
            "<div class='Map_bubblebg'>"+
            "<div class='ftblue Map_bubble_title clearfix'>"+
            "<div class='ft14 ftbold'>$1<i class='icon i31-20 ico-idcerti ml10'></i></div>"+
            "</div>" +
            "<div class='Map_bubble_content'>"+
            "<dl class='clearfix'>"+
            "<dt>车主：</dt>"+
            "<dd>$2 &nbsp; $3"+
            "###"+
            "</dd>"+
            "<dt>车型：</dt>"+
            "<dd>$4</dd>"+
            "<dt>车辆位置：</dt>"+
            "<dd class='ftorange'>$5</dd>"+
            "</dl>"+
            "<dl class='bdt clearfix'>"+
            "<dt>运单号：</dt>"+
            "<dd>$6<span class='ml10'><a href='"+config.ctx + "/order/Window/$7/detail' class='ftblue' target='_blank'>详情 ></a></span></dd>"+
            "<dt>所属货源：</dt>"+
            "<dd>$8<span><a href='"+config.ctx + "/freight/Window/$9/detail' class='ftblue' target='_blank'>详情 ></a></span></dd>"+
            "<dt>状态：</dt>"+
            "<dd class='ftorange ftbold'>运输中</dd>"+
            "</dl>"+
            "<div class='Map_bubble_btn'>"+
            "<span class='btn-a-white'><a href='"+config.ctx+"/truck/Window/$10' target='_blank' class='br3'>车辆详情</a></span>"+
            "<span class='btn-a-blue'><a href='javascript:void(0);' class='br3 confirm_receive'>确认收货</a></span>"+
            "</div>"+
            "</div>"+
            "</div>"+

            "</div>";

        var finishDlg = "<div id='popupdlg' class='Map_bubble_bus'>"+
            "<div class='Map_bubblebg'>"+
            "<div class='ftblue Map_bubble_title clearfix'>"+
            "<div class='ft14 ftbold'>$1<i class='icon i31-20 ico-idcerti ml10'></i></div>"+
            "</div>" +
            "<div class='Map_bubble_content'>"+
            "<dl class='clearfix'>"+
            "<dt>车主：</dt>"+
            "<dd>$2 &nbsp; $3"+
            "###"+
            "</dd>"+
            "<dt>车型：</dt>"+
            "<dd>$4</dd>"+
            "<dt>车辆位置：</dt>"+
            "<dd class='ftorange'>$5</dd>"+
            "</dl>"+
            "<dl class='bdt clearfix'>"+
            "<dt>运单号：</dt>"+
            "<dd>$6<span class='ml10'><a href='"+config.ctx + "/order/Window/$7/detail' class='ftblue' target='_blank'>详情 ></a></span></dd>"+
            "<dt>所属货源：</dt>"+
            "<dd>$8<span><a href='"+config.ctx + "/freight/Window/$9/detail' class='ftblue' target='_blank'>详情 ></a></span></dd>"+
            "<dt>状态：</dt>"+
            "<dd class='ftorange ftbold'>运输完成</dd>"+
            "</dl>"+
            "<div class='Map_bubble_btn'>"+
            "<span class='btn-a-white'><a href='"+config.ctx+"/truck/Window/$10' class='br3' target='_blank'>车辆详情</a></span>"+
            "<span class='btn-a-blue'><a href='' class='br3 feedback_truck'>评价车主</a></span>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</div>";

        var orgDlg = "<div id='popupdlg' class='Map_bubble_company'>"+
            "<div class='Map_bubblebg'>"+
            "<div class='ftblue Map_bubble_title clearfix'>"+
            "<div class='ftbold ft14'>$1"+
            "###"+
            "</div></div>"+
            "<div class='Map_bubble_content'>"+
            "<dl class='clearfix'>"+
            "<dt>所在地区：</dt>"+
            "<dd>$2</dd>"+
            "<dt>详细地址：</dt>"+
            "<dd>$3</dd>"+
            "</dl>"+
            "<div class='Map_bubble_btn'>"+
            "#$#"+
            "</div>"+

            "</div>"+
            "</div>"+

            "</div>";

        var userRouteDlg = "<div class='Map_bubble_trucker'>"+
            "<div class='Map_bubblebg'>"+
            "<div class='ftblue Map_bubble_title clearfix'>"+
            "<div class='ftbold ft14'>$1"+
            "###"+
            "</div>"+
            "</div>"+
            "<div class='Map_bubble_content'>"+
            "<dl>"+
            "<dt>手机号：</dt>"+
            "<dd>$2&#</dd>"+
            "<dt>车辆数：</dt>"+
            "<dd><span class='ftbold ftorange'>$3</span>辆</dd>"+
            "</dl>"+//            "<div class='Map_bubble_btn'> <span class='btn-a-white'><a href='' class='ftgrey br3'>查看详情</a></span></div>"+
            "</div>"+
            "</div>"+
            "</div>";

        var orgTip = "<div class='Map_bubble_tip br3 ftblue'>$1</div>";

        var truckDetailTip = "<div class='Map_bubble_phone br3 ftblue'>$1<span class='ml10 ftgrey'>$2 &nbsp;  $3</span> </div>";

        var parseDataForDlg = function(dlgStr, arr, maxIndex) {
            if(dlgStr && arr && arr.length >= 1 && maxIndex && maxIndex >= 1) {
                var cmpStr = dlgStr;
                var prefix = "$";
                for(var i=1; i <= maxIndex; i++) {
                    cmpStr = cmpStr.replace(prefix + i, arr[i-1]);
                }
                return cmpStr;
            }
            return dlgStr;
        };

        var getValueOrNull = function(str) {
            if(str) {
                return str;
            }
            return "";
        };

        var scheight = function(){
            var container = $(window).height(),
                top = $(".header").outerHeight(),
                ctrl = $(".uc-ctrl").outerHeight(),
                graphmain = $(".graphmain").outerHeight(),
                ucpages = $(".uc-pages").outerHeight(),
                leftit = $(".leftit").outerHeight();
            freinfo = $(".freightinfo").outerHeight();
            wbhd = $(".ctrlbill .uchd").outerHeight();
            wbtab = $(".ctrlbill .uc-tab").outerHeight();
            var max_height = container - top-ctrl;
            $(".ctrl-arrangement").css("height",max_height - graphmain - leftit*2 - ucpages - 20);
            $(".ctrl-mainwrapper").css("height",max_height);
            $(".ctrl-listwp .uc-main").css("height",max_height-freinfo-wbhd-wbtab-80);
        };


        var drawPanel = function () {
            /**graph**/
            new GraphPanel;
            /***slide***/
            $(".map-tool-arrowmax").click(function () {
                if (!$(this).hasClass("map-tool-arrowmin")) {
                    $(this).addClass("map-tool-arrowmin");
                    $(this).parents(".map-tool").animate({"width": 0}, "fast").find("dd").hide();
                } else {
                    $(this).removeClass("map-tool-arrowmin");
                    $(this).parents(".map-tool").animate({"width": 210}, "fast").find("dd").show();
                }
                ;
            });
            $(".map-info").on("mouseenter", "li", function () {
                if ($(this).hasClass("map-infoli")) {
                    $(this).addClass("cur");
                }
                $(this).find("dl").removeClass("hide");
            }).on("mouseleave", "li", function () {
                $(this).find("dl").addClass("hide");
                $(this).removeClass("cur");
            });


            $(".map-infoli").on("click", function () {
                var $this = $(this);
                if ($this.find(".ico-fullscreen").length > 0) {
                    $("dl.ctrl-list").removeClass("cur");
                    $(".header,.uc-ctrl .fl:eq(1),.leftinfo").hide();
                    $(".ctrl-mainwrapper").css({"margin": "0"});
                    $this.html("<i class='icon i12 ico-quitfullscreen'></i>退出全屏");
                } else if ($this.find(".ico-quitfullscreen").length > 0) {
                    $(".header,.uc-ctrl .fl:eq(1),.leftinfo").show();
                    $(".ctrl-mainwrapper").css({"margin-left": "328px"});
                    $this.html("<i class='icon i12 ico-fullscreen'></i>全屏");
                } else if($this.find(".ico-screenshot").length > 0) {
                    isFreightMode = false;
                    if(window.cslmap) {
                        window.cslmap.removePolyline(routeKey);
                        window.cslmap.setZoom(4);
                        window.cslmap.enableCustomMap(true);
                        window.cslmap.clearAll();
                        window.cslmap.addCustomMap();
                    }
                }
                $this = null;
            });

            /**height**/
            scheight();
            $(window).resize(function () {
                scheight();
            });

            /***icon-fold**/
            $(".ud-ctrlfold").click(function () {
                var $e = $(".ctrl-arrangement");
                var ch = $e.outerHeight();
                if (!$(this).hasClass("ud-ctrlfolddown")) {
                    $(this).addClass("ud-ctrlfolddown");
                    $(".graphmain").animate({height: 0}, 'fast');
                    $e.css("height", ch + 150);
                } else {
                    $(this).removeClass("ud-ctrlfolddown");
                    $(".graphmain").animate({height: 170}, 'fast');
                    $e.css("height", ch - 190);
                }
            });
        };

        var Paging = Backbone.Model.extend({
            defaults: {
                currentPage: 1,
                pageSize: 10,
                pages: 0,
                records: 0,
                startRecord: 0,
                endRecord: 0,
                firstPage: true,
                lastPage: true
            }
        });

        var TruckRelInfo = Backbone.Model.extend({
            url: config.ctx + "/console/api/truckRelatedInfo"
        });

        var truckRelInfo = new TruckRelInfo();

        var TruckFreeInfo = Backbone.Model.extend({
            url: config.ctx + "/console/api/freeTruckRelatedInfo"
        });

        var truckFreeInfo = new TruckFreeInfo();

        var TruckBookedInfo = Backbone.Model.extend({
            url: config.ctx + "/console/api/bookedTruckRelatedInfo"
        });

        var truckBookedInfo = new TruckBookedInfo();

        var ExpOrgInfo = Backbone.Model.extend({
            url: config.ctx + "/console/api/exptruck"
        });

        var expInfo = new ExpOrgInfo();

        var OrgInfo = Backbone.Model.extend({
            url: config.ctx + "/console/api/org"
        });

        var orgInfo = new OrgInfo();

        var TruckUserInfo = Backbone.Model.extend({
            url: config.ctx + "/console/api/userInfo"
        });

        var truckUserInfo = new TruckUserInfo();

        var Node = Backbone.Model.extend({
            degree: 22.5,

            getPos: function () {
                var llon = this.get("longitude");
                var llat = this.get("latitude");
                if(llon && llat) {
                    var pointDt = wgs84_gaode(llon, llat);
                    return CYPoint.create(pointDt.lng, pointDt.lat);
                }
                return null;
            },

            getMapKey: function () {
                return "Node" + this.get("id");
            },

//            getPicIndex: function () {
//                var index = Math.round(this.get("direction") % this.degree);
//                return this.padding(Math.floor(index * this.degree));
//            },

            padding: function (value) {
                if (value == 0) {
                    return "00";
                } else {
                    return value;
                }
            },

            getPicType: function () {
                var picType;
                switch (this.get("type")) {
                    case "transits":
                        picType = "green";
                        break;
                    case "hasExp":
                        picType = "green-2";
                        break;
                    case "free":
                        picType = "gray";
                        break;
                    case "booked":
                        picType = "orange";
                        break;
                    case "userRoute":
                        picType = "blue";
                        break;
                    case "finish":
                        picType = "dark";
                        break;
                    default :
                        picType = "green";
                }

                return picType;
            }
        });
        var NodeView = Backbone.View.extend({

            initialize: function (options) {
                this.map = options.map;
                this.ctx = options.ctx;

            },

            bindListener: function () {
                this.map.setOnMouseClickListener(this.model.getMapKey(), 1, _.bind(this.click, this));
                this.map.setOnMouseOverListener(this.model.getMapKey(), 1, _.bind(this.showInfoWindow, this));
                this.map.setOnMouseOutListener(this.model.getMapKey(), 1, _.bind(this.closeInfoWindow, this));

            },

            render: function () {
                var mapKey = this.model.getMapKey();
                if (mapKey) {
                    this.showMarker(mapKey, this.determinePic());
                    this.bindListener();
                }
            },

            showMarker: function (mapKey, picUrl) {
                var pos = this.model.getPos();
                if(pos) {
                    this.map.deleteImageLabel(mapKey);
                    this.map.addImageLabel(mapKey, 1, pos, picUrl);
                    this.map.rotateImageLabel(mapKey, null, this.model.get("direction"));
                }
            },

            markHighlight: function () {
                this.showMarker("_highlight_",this.ctx + "/resources/img/map/maker.png");
            },

            determinePic: function () {
                return this.ctx + "/resources/img/map/" + this.model.getPicType() + "/arrow_90.png";
            },

            click: function (e) {
                var picType = this.model.getPicType();
                var mapKey = this.model.getMapKey();
                var pos = this.model.getPos();
                if(mapKey) {
                    var id = parseInt(mapKey.substring(4));
                    if(picType=="green-2" ||
                        picType=="green") {
                        truckRelInfo.fetch({data: {truckId:id, freightId:currFreightId}, success: function(md, result) {
                            var arr = new Array();
                            arr.push(result.licenseNo?result.licenseNo:"&nbsp;");
                            arr.push(result.driverName?result.driverName:"&nbsp;");
                            arr.push(result.mobile?result.mobile:"&nbsp;");
                            arr.push(result.truckModel?result.truckModel:"&nbsp;");
                            arr.push(getValueOrNull(result.province) + getValueOrNull(result.city) + getValueOrNull(result.area) + "&nbsp;");
                            arr.push(result.orderNo?result.orderNo:"&nbsp;");
                            arr.push(result.id?result.id:"&nbsp;");
                            arr.push(result.freightName?result.freightName:"&nbsp;");
                            arr.push(currFreightId?currFreightId:"&nbsp;");
                            arr.push(id?id:"&nbsp;");
                            var normalDlg = transitDlg;
                            var tmpDlg = parseDataForDlg(normalDlg, arr, 10);
                            if(result.level) {
                                var opt = {level:result.level, type:"user"};
                                var levelstr = miscs.calcLevel(opt);
                                tmpDlg = tmpDlg.replace("###", levelstr);
                            }else {
                                tmpDlg = tmpDlg.replace("###", "");
                            }
                            if(tmpDlg) {
                                window.cslmap.showInfoWindow(pos, "车辆信息", tmpDlg);
                            }
                        }});
                    }else if(picType=="gray") {
                        truckFreeInfo.fetch({data: {truckId:id}, success: function(md, result) {
                            var arr = new Array();
                            arr.push(result.licenseNo?result.licenseNo:"&nbsp;");
                            arr.push(result.truckModel?result.truckModel:"&nbsp;");
                            arr.push(getValueOrNull(result.province) + getValueOrNull(result.city) + getValueOrNull(result.area) + "&nbsp;");
                            arr.push(id?id:"&nbsp;");
                            var normalDlg = grayDlg;
                            var tmpDlg = parseDataForDlg(normalDlg, arr, 4);
                            if(tmpDlg) {
                                window.cslmap.showInfoWindow(pos, "车辆信息", tmpDlg);
                            }
                        }});
                    }else if(picType=="orange") {
                        truckBookedInfo.fetch({data: {truckId:id, freightId:currFreightId}, success: function(md, result) {
                            var arr = new Array();
                            arr.push(result.licenseNo?result.licenseNo:"&nbsp;");
                            arr.push(result.driverName?result.driverName:"&nbsp;");
                            arr.push(result.mobile?result.mobile:"&nbsp;");
                            arr.push(result.truckModel?result.truckModel:"&nbsp;");
                            arr.push(getValueOrNull(result.province) + getValueOrNull(result.city) + getValueOrNull(result.area) + "&nbsp;");
                            arr.push(id?id:"&nbsp;");
                            var normalDlg = orangeDlg;
                            var tmpDlg = parseDataForDlg(normalDlg, arr, 6);
                            if(result.level) {
                                var opt = {level:result.level, type:"user"};
                                var levelstr = miscs.calcLevel(opt);
                                tmpDlg = tmpDlg.replace("###", levelstr);
                            }else {
                                tmpDlg = tmpDlg.replace("###", "");
                            }
                            if(tmpDlg) {
                                window.cslmap.showInfoWindow(pos, "车辆信息", tmpDlg);
                            }
                        }});
                    }else if(picType=="blue") {
                        truckUserInfo.fetch({data: {id:id}, success: function(md, result) {
                            var arr = new Array();
                            arr.push(result.username?result.username:"&nbsp;");
                            arr.push(result.mobile?result.mobile:"&nbsp;");
                            arr.push(result.trucknum?result.trucknum:"0");
                            var normalDlg = userRouteDlg;
                            if(result.validate && result.validate == 2) {
                                normalDlg = normalDlg.replace("&#", "<i class='icon i24 ico-greyphone ml10'></i>");
                            }else {
                                normalDlg = normalDlg.replace("&#", "");
                            }

                            var tmpDlg = parseDataForDlg(normalDlg, arr, 3);
                            if(result.level) {
                                var opt = {level:result.level, type:"user"};
                                var levelstr = miscs.calcLevel(opt);
                                tmpDlg = tmpDlg.replace("###", levelstr);
                            }else {
                                tmpDlg = tmpDlg.replace("###", "");
                            }
                            if(tmpDlg) {
                                window.cslmap.showInfoWindow(pos, "车辆信息", tmpDlg);
                            }
                        }});
                    }else if(picType=="dark") {
                        truckRelInfo.fetch({data: {truckId:id, freightId:currFreightId}, success: function(md, result) {
                            var arr = new Array();
                            arr.push(result.licenseNo?result.licenseNo:"&nbsp;");
                            arr.push(result.driverName?result.driverName:"&nbsp;");
                            arr.push(result.mobile?result.mobile:"&nbsp;");
                            arr.push(result.truckModel?result.truckModel:"&nbsp;");
                            arr.push(getValueOrNull(result.province) + getValueOrNull(result.city) + getValueOrNull(result.area) + "&nbsp;");
                            arr.push(result.orderNo?result.orderNo:"&nbsp;");
                            arr.push(result.id?result.id:"&nbsp;");
                            arr.push(result.freightName?result.freightName:"&nbsp;");
                            arr.push(currFreightId?currFreightId:"&nbsp;");
                            arr.push(id?id:"&nbsp;");

                            var normalDlg = finishDlg;
                            var tmpDlg = parseDataForDlg(normalDlg, arr, 10);
                            if(result.level) {
                                var opt = {level:result.level, type:"user"};
                                var levelstr = miscs.calcLevel(opt);
                                tmpDlg = tmpDlg.replace("###", levelstr);
                            }else {
                                tmpDlg = tmpDlg.replace("###", "");
                            }
                            if(tmpDlg) {
                                window.cslmap.showInfoWindow(pos, "车辆信息", tmpDlg);
                            }
                        }});
                    }
                }

            },

            showInfoWindow: function (e) {
                var picType = this.model.getPicType();
                if(picType=="green-2") {
                    var tmpRedDlg = redDlg;
                    var mapKey = this.model.getMapKey();
                    var pos = this.model.getPos();
                    if(mapKey) {
                        var id = parseInt(mapKey.substring(4));
                        expInfo.fetch({data: {truckId:id}, success: function(md, result) {
                            if(result) {
                                var arr = new Array();
                                arr.push(result.orgName?result.orgName:"&nbsp;");
                                arr.push(result.driverName?result.driverName:"&nbsp;");
                                arr.push(result.mobile?result.mobile:"&nbsp;");
                                var sRedDlg = parseDataForDlg(tmpRedDlg, arr, 3);
                                if(sRedDlg) {
                                    window.infoWindow = window.cslmap.showInfoWindow(pos, "组织信息", sRedDlg);
                                }
                            }
                        }});
                    }
                }
            },

            closeInfoWindow: function (e) {
                if(window.infoWindow) {
                    this.map.closeInfoWindow(window.infoWindow);
                    window.infoWindow = null;
                }
            },

            move: function () {
            }
        });

        var FixedObj = Backbone.Model.extend({

            getPos: function () {
                var llon = this.get("longitude");
                var llat = this.get("latitude");
                if(llon && llat) {
            	   var pointDt = wgs84_gaode(llon, llat);
                   return CYPoint.create(pointDt.lng, pointDt.lat);
                }
                return null;
            },

            getMapKey: function () {
                var objType = this.getObjType();
                var id = this.get("id");
                if(objType && id) {
                    if(objType == "org") {
                        return "FOrg" + id;
                    }else if(objType == "start") {
                        return "FObjstart" + id;
                    }else if(objType == "finish") {
                    	return "FObjfinish" + id;
                    }
                }
                return null;
            },

            getPicName: function () {
                return this.get("pic");
            },

            getObjType: function () {
                var objType;
                switch (this.get("type")) {
                    case "start":
                        objType = "start";
                        break;
                    case "finish":
                        objType = "finish";
                        break;
                    case "org":
                        objType = "org";
                        break;
                    default :
                        objType = "org";
                }
                return objType;
            }

        });

        var routestart = new FixedObj;
        var routefinish = new FixedObj;
        var orgofroute = new FixedObj;

        var FixedObjView = Backbone.View.extend({

            initialize: function (options) {
                this.map = options.map;
                this.ctx = options.ctx;
            },

            bindListener: function () {
                this.map.setOnMouseClickListener(this.model.getMapKey(), 1, _.bind(this.click, this));
            },

            render: function () {
                var mapKey = this.model.getMapKey();
                if (mapKey) {
                    this.showMarker(mapKey, this.determinePic());
                    this.bindListener();
                }
            },

            showMarker: function (mapKey, picUrl) {
                var pos = this.model.getPos();
                if(pos) {
                    this.map.deleteImageLabel(mapKey);
                    this.map.addImageLabel(mapKey, 1, pos, picUrl);
                }
            },

            determinePic: function () {
                var picname = this.model.getPicName();
                return this.ctx + "/resources/img/map/" + picname;
            },

            click: function (e) {
                var startOrgDlg = orgDlg;
                var objType = this.model.getObjType();
                var mapKey = this.model.getMapKey();
                var pos = this.model.getPos();
                if(objType == "start") {
                    if(mapKey) {
                        var id = parseInt(mapKey.substring(4));
                        orgInfo.fetch({data: {orgId:id, freightId:currFreightId, type:"start"}, success: function(md, result) {
                            var arr = new Array();
                            arr.push(result.orgName?result.orgName:"起运地");
                            arr.push(getValueOrNull(result.province) + getValueOrNull(result.city) + getValueOrNull(result.area) + "&nbsp;");
                            arr.push(result.address?result.address:"&nbsp;");
                            var sOrgDlg = parseDataForDlg(startOrgDlg, arr, 3);
                            if(result.orgName) {
                                sOrgDlg = sOrgDlg.replace("#$#", "<span class='btn-a-white'><a href='' class='br3 ftgrey'>企业详情</a></span>");
                            }else {
                                sOrgDlg = sOrgDlg.replace("#$#", "");
                            }
                            if(result.level) {
                                var opt = {level:result.level, type:"user"};
                                var levelstr = miscs.calcLevel(opt);
                                sOrgDlg = sOrgDlg.replace("###", levelstr);
                            }else {
                                sOrgDlg = sOrgDlg.replace("###", "");
                            }
                            if(sOrgDlg) {
                                window.cslmap.showInfoWindow(pos, "组织信息", sOrgDlg);
                            }
                        }});
                    }
                }else if(objType == "finish") {
                    if(mapKey) {
                        var id = parseInt(mapKey.substring(4));
                        orgInfo.fetch({data: {orgId:id, freightId:currFreightId, type:"finish"}, success: function(md, result) {
                            var arr = new Array();
                            arr.push(result.orgName?result.orgName:"目的地");
                            arr.push(getValueOrNull(result.province) + getValueOrNull(result.city) + getValueOrNull(result.area) + "&nbsp;");
                            arr.push(result.address?result.address:"&nbsp;");
                            var sOrgDlg = parseDataForDlg(startOrgDlg, arr, 3);
                            if(result.orgName) {
                                sOrgDlg = sOrgDlg.replace("#$#", "<span class='btn-a-white'><a href='' class='br3 ftgrey'>企业详情</a></span>");
                            }else {
                                sOrgDlg = sOrgDlg.replace("#$#", "");
                            }
                            if(result.level) {
                                var opt = {level:result.level, type:"user"};
                                var levelstr = miscs.calcLevel(opt);
                                sOrgDlg = sOrgDlg.replace("###", levelstr);
                            }else {
                                sOrgDlg = sOrgDlg.replace("###", "");
                            }
                            if(sOrgDlg) {
                                window.cslmap.showInfoWindow(pos, "组织信息", sOrgDlg);
                            }
                        }});
                    }
                }
            }

        });

        var TruckSources = Backbone.Collection.extend({
            model: Node,

            initialize: function (options) {
                this.type = options.type;
                this.on("reset", _.bind(this.applyType, this));
            },

            applyType: function () {
                var that = this;
                _.each(this.models, function (model) {
                    model.set("type", that.type);
                });
            }
        });
        var transits = new TruckSources({type: "transits"});
        var hasExp = new TruckSources({type: "hasExp"});
        var free = new TruckSources({type: "free"});
        var booked = new TruckSources({type: "booked"});
        var finish = new TruckSources({type: "finish"});

        var Ratio = Backbone.Model.extend({
            defaults: {
                num: 100
            }
        });

        var ratio = new Ratio;

        var GraphPanel = Backbone.View.extend({
            initialize: function () {
                ratio.on("change", _.bind(this.render, this));
            },

            render: function () {
                var already = ratio.get("num");
                if (already == 0){
                    already = 100;
                }
                var wait = 100 - already;
                Morris.Donut({
                    element: 'graph',
                    data: [
                        {value: already, label: '已订车'},
                        {value: wait, label: '未订车'}
                    ],
                    backgroundColor: '#f6f6f6',
                    labelColor: '#434343',
                    colors: [
                        '#2d80c9',
                        '#ffd45e'
                    ],
                    formatter: function (x) {
                        return x + "%"
                    }
                });
            }
        });
        var Freight = Backbone.Model.extend({});
        var Freights = Backbone.Collection.extend({
            model: Freight,
            paging: new Paging,
            url: config.ctx + "/console/api/freights",
            parse: function (data) {
                if(data && data.freights && data.freights.entityVOs && data.freights.entityVOs.length > 0) {
                    if(!$("#freight_status").text() && initOrderList(data.freights.entityVOs[0].entity)){
                        initOrderList(data.freights.entityVOs[0].entity);
                    }
                    this.paging.set(data.paging);
                    if (data.freights) {
                        ratio.set("num", (Math.ceil(data.truckTonnage * 100 / data.totalFreightTonnage))||0);
                    }
                    return data.freights.entityVOs;
                }
                return null;
            }
        });

        var Point = Backbone.Model.extend({});

        var Points = Backbone.Collection.extend({
            model: Point
        });

        var points = new Points();

        var Tracks = Backbone.Collection.extend({
            model: Node,
            url: config.openapiServerUrl + "lbs/userRoute/orders"
        });

        var tracks = new Tracks();

        var TruckRoute = Backbone.Model.extend({
            url: config.ctx + "/console/api/truckRoute",

            initialize: function () {
                this.on("change", _.bind(this.fetchTracks, this));
            },

            fetchTracks: function () {
                tracks.fetch({data: {orders: JSON.stringify(this.get("orders"))}, dataType: "jsonp"});
            },

            parse: function (data) {
                points.reset(data.points);
                transits.reset(data.transits);
                hasExp.reset(data.hasExp);
                free.reset(data.free);
                booked.reset(data.booked);
                finish.reset(data.finish);
                statistics.set({waitConfirm: data.waitConfirm, waitFeedback: data.waitFeedback});
                if(data.srcAddress != null && data.destAddress != null) {
                    routestart.set({id:data.srcAddress.id, longitude:data.srcAddress.longitude, latitude:data.srcAddress.latitude, pic:"map_start.png", type: "start"});
                    routefinish.set({id:data.destAddress.id, longitude:data.destAddress.longitude, latitude:data.destAddress.latitude, pic:"map_finish.png", type: "finish"});
                }
                if(data.orgInfo != null) {
                    orgofroute.set({id:data.orgInfo.id, longitude:data.orgInfo.longitude, latitude:data.orgInfo.latitude, pic:"map_stick.png", type: "org"});
                }
                return data;
            }
        });
        var truckRoute = new TruckRoute;

        var Statistics = Backbone.Model.extend({
            defaults: {
                waitConfirm: 0,
                waitFeedback: 0
            }
        });

        var statistics = new Statistics;

        var MapView = Backbone.View.extend({

            initialize: function (options) {
                this.map = options.map;
                points.on("reset", _.bind(this.renderPoints, this));
                transits.on("reset", _.bind(this.renderTransits, this));
                hasExp.on("reset", _.bind(this.renderHasExp, this));
                free.on("reset", _.bind(this.renderFree, this));
                booked.on("reset", _.bind(this.renderBooked, this));
                finish.on("reset", _.bind(this.renderFinish, this));
                tracks.on("sync", _.bind(this.renderTracks, this));
                statistics.on("change", _.bind(this.renderStat, this));
                routestart.on("change", _.bind(this.renderRouteStart, this));
                routefinish.on("change", _.bind(this.renderRouteFinish, this));
                orgofroute.on("change", _.bind(this.renderOrgInfo, this));
            },

            renderStat: function () {
                var data = statistics.toJSON();
                for (var i in data) {
                    $("." + i).text("(" + data[i] + ")");
                }
            },

            renderTracks: function () {
                var that = this;
                _.each(tracks.models, function (model) {
                    var nodeView = new NodeView({model: model, map: that.map, ctx: config.ctx});
                    nodeView.render();
                });
                that = null;
            },

            renderTransits: function () {
                var that = this;
                _.each(transits.models, function (model) {
                    var nodeView = new NodeView({model: model, map: that.map, ctx: config.ctx});
                    nodeView.render();
                });
                that = null;
            },
            renderFree: function () {
//                var that = this;
//                _.each(free.models, function (model) {
//                    var nodeView = new NodeView({model: model, map: that.map, ctx: config.ctx});
//                    nodeView.render();
//                });
//                that = null;
            },
            renderHasExp: function () {
//                var that = this;
//                _.each(hasExp.models, function (model) {
//                    var nodeView = new NodeView({model: model, map: that.map, ctx: config.ctx});
//                    nodeView.render();
//                });
//                that = null;
            },
            renderBooked: function () {
                var that = this;
                _.each(booked.models, function (model) {
                    var nodeView = new NodeView({model: model, map: that.map, ctx: config.ctx});
                    nodeView.render();
                });
                that = null;
            },

            renderFinish: function () {
                var that = this;
                _.each(finish.models, function (model) {
                    var nodeView = new NodeView({model: model, map: that.map, ctx: config.ctx});
                    nodeView.render();
                });
                that = null;
            },

            renderRouteStart: function () {
                var that = this;
                var fixedObjView = new FixedObjView({model: routestart, map: that.map, ctx: config.ctx});
                fixedObjView.render();
                that = null;
            },

            renderRouteFinish: function () {
                var that = this;
                var fixedObjView = new FixedObjView({model: routefinish, map: that.map, ctx: config.ctx});
                fixedObjView.render();
                that = null;
            },

            renderOrgInfo: function () {
//            	var that = this;
//            	var fixedObjView = new FixedObjView({model: orgofroute, map: that.map, ctx: config.ctx});
//                fixedObjView.render();
//                that = null;
            },

            renderPoints: function () {
                var that = this;
                if(points.models) {
                    var arr = new Array();
                    for(var i=0; i< points.models.length; i++) {
                        var pt = points.models[i];
                        var pointDt = wgs84_gaode(pt.get("lon"), pt.get("lat"));
                        var p = CYPoint.create(pointDt.lng, pointDt.lat);
                        arr.push(p);
                    }
                    if(arr.length == 2) {
                        var sp = arr[0];
                        var ep = arr[1];
                        that.map.searchRoute(sp, ep, function(obj) {
                            var pts = obj.Points;
                            pts.unshift(sp);
                            pts.push(ep);
                            window.cslmap.addPolyline(routeKey, pts);
                        });
                    }
                }
                that = null;
            }

        });

        var FreightView = Backbone.View.extend({
            template: freightTmpl,
            tagName: "dl",
            className: "ctrl-list br3 clearfix",
            events: {
                "click .freight_detail": "freightDetail",
                "click": "clickFreight",
                "mouseenter": "mouseenter",
                "mouseleave": "mouseleave"
            },
            freightDetail: function(e){
                e.stopPropagation();
            },
            clickFreight: function (e) {
                e.preventDefault();
                e.stopPropagation();
                isFreightMode = true;
                currFreightId = this.model.get("entity").id;
                $("[name=status]").val("");
                $("[name=status]").trigger("chosen:updated");
                $("[name=status]").chosen();
                if (window.orders){
                    window.orders["comparator"] = window.orders["defaultComparator"];
                    window.orders.sort();
                }
                initOrderList(this.model.get("entity"), true);
                this.$el.addClass("cur").siblings().removeClass("cur");
                $(".uc-tab").find("ul li").eq(0).addClass("crt").siblings().removeClass("crt").find("i").removeClass("ico-ordertop").addClass("ico-taborder");

                routestart.clear();
                routefinish.clear();
                orgofroute.clear();
                if (!window.cslmap){
                    var myInterval = setInterval((function(){
                        return (function(){
                            if(window.cslmap){
                                window.cslmap.removePolyline(routeKey);
                                window.cslmap.clearAll();
                                window.cslmap.enableCustomMap(false);
                                truckRoute.fetch({
                                    data: {freightId: currFreightId, userId: config.userId}
                                });
                                clearInterval(myInterval);
                            }
                        })
                    })(),500);
                }else{
                    window.cslmap.removePolyline(routeKey);
                    window.cslmap.clearAll();
                    window.cslmap.enableCustomMap(false);
                    truckRoute.fetch({
                        data: {freightId: currFreightId, userId: config.userId}
                    });
                }
                return false;
            },
            mouseenter: function () {
                this.$el.addClass("current").siblings().removeClass("current");
            },
            mouseleave: function () {
                this.$el.removeClass("current");
            },
            initialize: function () {
            },
            render: function () {
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
        });
        var FreightListView = Backbone.View.extend({
            el: ".uc-ctrlmain .ctrl-arrangement",

            initialize: function () {
                this.model.on("sync", _.bind(this.render, this));
            },
            render: function () {
                var that = this;
                this.$el.empty();
                _.each(this.model.models, function (e) {
                    var freightView = new FreightView({model: e});
                    freightView.render().$el.appendTo(that.el);
                });
                that = null;
                mask.unblock(".freights-panel");
                var itemIndex = $("[name=itemIndex]").val();
                if(itemIndex){
                    var itemIndex = parseInt(itemIndex-1,10);
                    $("#ctrl-arrangement")[0].scrollTop = $("#ctrl-arrangement")[0].scrollHeight*(0.1*itemIndex-0.05);
                    $(".ctrl-arrangement").find("dl").eq(itemIndex).click();
                }
                return this;
            }
        });

        var FreightsPanel = Backbone.View.extend({
            el: ".freights-panel",
            events: {
                "change .uc-ctrl-select": "fetchFreights",
                "click .ucp-next": "next",
                "click .ucp-pre": "prev",
                "keyup input.curpage": "gotoPage"
            },

            next: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($("[name=itemIndex]").val().trim()){
                    $("[name=itemIndex]").val("");
                }
                var curpage = this.$el.find(".curpage").val();
                this.$el.find(".curpage").val((parseInt(curpage) + 1) || 1);

                this.fetchFreights();
                $("#ctrl-arrangement")[0].scrollTop = 0;
                return false;
            },

            prev: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($("[name=itemIndex]").val().trim()){
                    $("[name=itemIndex]").val("");
                }
                var curpage = this.$el.find(".curpage").val();
                this.$el.find(".curpage").val((curpage && (curpage > 1)) ? parseInt(curpage) - 1 : 1);
                this.fetchFreights();
                $("#ctrl-arrangement")[0].scrollTop = 0;
                return false;
            },

            gotoPage: function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.fetchFreights();
                    return false;
                }
            },

            initialize: function () {
                this.model.on("sync", _.bind(this.render, this));
            },

            fetchFreights: function () {
                mask.block(".freights-panel");
                this.model.fetch({data: this.serialize()});
            },
            render: function () {
                var paging = this.model.paging.toJSON();
                this.$el.find(".uc-totalrecords").text(paging.records);
                this.$el.find(".curpage").val(paging.currentPage);
                this.$el.find(".uc-totalpage").text(paging.pages);
                mask.unblock(".freights-panel");
                return this;
            },
            serialize: function () {
                return {
                    pageNo: this.$el.find(".curpage").val(),
                    freightStatus: this.$el.find(".uc-ctrl-select").val()
                }
            }
        });

        var initFreightList = function () {
            var freights = new Freights();
            var freightListView = new FreightListView({model: freights});
            var freightsPanel = new FreightsPanel({model: freights});
            mask.block(".freights-panel");
            var pageIndex = $("[name=pageIndex]").val();
            freights.fetch({
                data: {
                    freightStatus: $(".uc-ctrl-select").val(),
                    pageNo: pageIndex||1
                }
            });
        };

        var Drivers = Backbone.Collection.extend({
            model: Node,
            url: config.openapiServerUrl + "public/lbs/userRoute/partial/coords"
        });

        var drivers = new Drivers();

        var zoomChangeHandler = function(level, amap) {
            if(level > amap.maxZoomForCMap) {
                if(!isFreightMode) {
                    var bound = amap.getBound();
                    var minlon = bound.minLon;
                    var minlat = bound.minLat;
                    var maxlon = bound.maxLon;
                    var maxlat = bound.maxLat;
                    drivers.fetch({data: {flon:minlon, flat:minlat, slon:maxlon, slat:maxlat}, dataType: "jsonp", contentType:"application/json", success: function(res) {
                        res.each(function(node) {
                            node.set("type", "userRoute");
                            var nodeView = new NodeView({model: node, map: amap, ctx: config.ctx});
                            nodeView.render();
                        });
                    }});
                }
            }else {
                if(!isFreightMode) {
                    amap.enableCustomMap(true);
                    amap.clearAll();
                }
            }
        };

        window.initMap = function () {
            var map = CYMap.create("amap");
            window.cslmap = map;
            map.setTileUrl(window.lbsTileUrl);
            map.setZoom(4);
            map.setZoomLevelChanged(zoomChangeHandler);
            map.setMapPaned(zoomChangeHandler);

            new MapView({map: map, model: truckRoute, tracks: tracks});
            map.showScale();
            map.showToolbar();
            map.enableCustomMap(true);
            map.addCustomMap();
        };

        //运单管理

        var inu=iun=-1,
            arr1 = ["4","3","2","1","9","8","7","6","5","15","14","13","12","11","10"],
            arr2 = ["10","11","12","13","14","15","5","6","7","8","9","1","2","3","4"];
        var Dotgo = function(){
            inu++;iun++;
            var h1dot = $(".hs1 .hsdot"),
                h2dot = $(".hs2 .hsdot");
            h1dot.children(".hds"+arr1[inu]).addClass("greydot");
            h2dot.children(".hds"+arr2[iun]).removeClass("greydot");
            if (inu>14 || iun>14 ) {
                inu = iun = -1;
                $.each($(".hs1 .hsdot i"), function(){
                    $(this).removeClass("greydot");
                });
                $.each($(".hs2 .hsdot i"), function(){
                    $(this).addClass("greydot");
                });
            }
            setTimeout(Dotgo,1000);
        };

        var updStatus = function(id,num){
            var $obj = $("#"+id);
            if (num || num > 0){
                $obj.text(num);
                $obj.parent().addClass("ftorange ftbold").removeClass("ftgrey").parent().removeClass("curnone tdn");
            }else{
                $obj.text(0);
                $obj.parent().addClass("ftgrey").removeClass("ftorange ftbold").parent().addClass("curnone tdn");
            }
        };
        var updateStatus = function(stayReceiveGoods, stayFeedback, totalOrder){
            updStatus("stayReceiveGoods", stayReceiveGoods);
            updStatus("stayFeedback", stayFeedback);
            $("#totalOrder").text(totalOrder||0);
        };

        var Filter = Backbone.Model.extend({
            defaults: {
                freightId: null,
                linkStatus: null,
                status: null,
                pageNo: null/*that.$el.find(".curpage").val()*/
            }
        });
        var Order = Models.MultipleSelectItem.extend({
            url: function(){
                return config.ctx + "/console/api/order?id=" + this.get("id");
            }
        });
        var Orders = Models.MultipleSelectList.extend({
            model: Order,
            paging: new Paging,
            freight: null,
            url: config.ctx + "/console/api/orders",
            initialize: function(options){
                this.comparator = this.defaultComparator;
                this.sort();
            },
            parse: function (data) {
                this.paging.set(data.paging);
                //this.freight.set();
                if (data.orders) {
                    updateStatus(data.orders.stayReceiveGoods, data.orders.stayFeedback, data.orders.totalOrder);
                    $("#intransit").text(data.orders.intransit||0);
                    $("#transportFinished").text(data.orders.transportFinished||0);
                    $("#tobook").text(data.orders.tobook||0);
                }
                return data.orders.orderbos;
            },
            refresh: function(){
                window.orders.fetch({data:window.filter.toJSON()});
            },
            defaultComparator: function (arg1, arg2) {
                return arg2.attributes["createTime"] - arg1.attributes["createTime"];
            },
            sortByDefault: function(){
                this.comparator = this.defaultComparator;
                this.sort();
            },
            sortByUnitPrice: function(asc){
                this.comparator = function (arg1, arg2) {
                    return (arg1.attributes["unitPrice"] - arg2.attributes["unitPrice"]) * (asc ? 1 : -1);
                };
                this.sort();
            }
        });

        var OrderView = Backbone.View.extend({
            template: orderTmpl,
            tagName: "div",
            className: "uc-item br3",
            events: {
                "click": "clickOrder",
                "click [name=map_view]": "mapView",
                "click .popup_receivegoods": "receivegoods",
                "click .popup_feedback": "feedback",
                "click .notice": "notice",
                "click .popup_bookingtruck_cancel": "cancel",
                "click .popup_complaint": "complaint",
                "mouseenter": "mouseenter",
                "mouseleave": "mouseleave"
            },
            clickOrder: function (e) {
                var tagName = e.target.tagName;
                if (tagName != "A" && tagName != "INPUT"){
                    $(e.target).parents(".uc-item").find("[name=all_ids_ck]").prop("checked",!$(e.target).parents(".uc-item").find("[name=all_ids_ck]").prop("checked"));
                }
            },
            mapView: function(){
                $(".ctrl-module li").eq(0).click();
            },
            receivegoods: function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                this.orderList.reset([this.model]);
                this.orderList.trigger("selectReceive");
                return false;
            },
            feedback: function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                var that = this;
                //初始化 信用等级
                $(".feedback_level", ".freight_console_page").each(function (i, o) {
                    $(o).data("level", "0");
                });
                setPopupInfo(that.model.toJSON(), "feedback");
                this.orderList.reset([this.model]);
                this.orderList.trigger("selectFeedback");
            },
            notice: function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                this.orderList.reset([this.model]);
                this.orderList.trigger("selectNotice");
                return false;
            },
            cancel: function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                setPopupInfo(this.model.toJSON(), "cancel");
                this.orderList.reset([this.model]);
                this.orderList.trigger("selectCancel");
                return false;
            },
            complaint: function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                setPopupInfo(this.model.toJSON(), "complaint");
                this.orderList.reset([this.model]);
                this.orderList.trigger("selectComplaint");
                return false;
            },
            mouseenter: function () {
                this.$el.addClass("current").siblings().removeClass("current");
            },
            mouseleave: function () {
                this.$el.removeClass("current");
            },
            initialize: function (options) {
                this.orderList = options.orderList;
                this.model.on("sync", _.bind(this.render, this));
            },
            render: function () {
                this.$el.append(this.template(this.model.toJSON()));
                
                return this;
            }
        });
        var OrderListView = Backbone.View.extend({
            el: ".uc-main .pagination",
            initialize: function (options) {
                this.orderList = options.orderList;
                _.bindAll(this, "render");
                this.model.on("sync", this.render);
                this.model.on("reset",this.render);
                this.model.on("sort", this.render);
            },
            render: function () {
                var that = this;
                this.$el.empty();
                _.each(this.model.models, function (e) {
                    var orderView = new OrderView({model: e, orderList: that.orderList});
                    orderView.render().$el.appendTo(that.el);
                });
                that = null;
                mask.unblock(".ctrlbill");
                scheight();
                window.orderSectionList.reset([]);
                return this;
            }
        });
        var OrdersPanel = Backbone.View.extend({
            el: ".ctrlbill",
            events: {
                "change [name=status]": "getOrders",
                "click #stayReceiveGoodsck": "linkSearch",
                "click #stayFeedbackck": "linkSearch",
                "click .uc-tab ul li": "sort",
                "click #ck-scall": "checkAll",
                "click .batch-receive": "batchReceive",
                "click .batch-notice": "batchNotice",
                "click .batch-feedback": "batchFeedback",
                "click .ucp-next": "next",
                "click .ucp-pre": "prev",
                "keyup input.curpage": "gotoPage"
            },
            getOrders: function(){
                this.linkStatus = null;
                initOrderList(this.freight, true);
            },
            linkSearch: function(e){
                var $a = $(e.target);
                var that = this;
                if($a[0].tagName != "A"){
                    $a = $a.parents("a");
                }
                if (!$a.hasClass("curnone")){
                    $("[name=status]").val("");
                    $("[name=status]").trigger("chosen:updated");
                    $("[name=status]").chosen();
                    var linkStatus = $a.attr("id")=="stayFeedbackck"?"2":"1";
                    mask.block(".ctrlbill");
                    that.linkStatus = linkStatus;
                    window.orders.fetch({
                        data: {
                            freightId: that.freight.id,
                            linkStatus: linkStatus
                        }
                    });
                    window.filter.clear();
                    window.filter.set({
                        freightId: that.freight.id,
                        linkStatus: linkStatus
                    });
                }
            },
            sort: function(e){
                var $li = $(e.target).parents("li");
                var $i = $li.find("i");
                var isCk = $li.hasClass("crt");
                $li.addClass("crt").siblings().removeClass("crt");
                if (!isCk && $li.parent().children().eq(1).hasClass("crt")){
                    $i.removeClass("ico-ordertop").addClass("ico-taborder");
                    this.model.sortByUnitPrice(false);
                }else{
                    switch ($li.index()) {
                        case 0:
                            $li.next().find("i").removeClass("ico-ordertop").addClass("ico-taborder");
                            this.model.sortByDefault();
                            break;
                        default:
                            if($i.hasClass("ico-taborder")){
                                $i.removeClass("ico-taborder").addClass("ico-ordertop");
                                this.model.sortByUnitPrice(true);
                            }else{
                                $i.removeClass("ico-ordertop").addClass("ico-taborder");
                                this.model.sortByUnitPrice(false);
                            }
                            break;
                    }
                }
            },
            checkAll: function (ev) {
                ev.stopPropagation();
                var $target = $(ev.target);
                if ($target.is(":checked")) {
                    this.model.selectAll();
                } else {
                    this.model.clearSelected();
                }
                $("input[name=all_ids_ck]").prop("checked",$target.is(":checked"));
            },
            batchReceive: function(){
                this.sectionList.reset([]);
                this.sectionList.add(this.model.currentSelected());
                this.sectionList.trigger("selectReceive");
            },
            batchNotice: function(){
                this.sectionList.reset([]);
                this.sectionList.add(this.model.currentSelected());
                this.sectionList.trigger("selectNotice");
            },
            batchFeedback: function(){
                var orderIds = [];
                var flag = false;
                if (this.model.currentSelected().length == 0){
                    miscs.alert({
                        title: "批量评价",
                        msgTitle: "请选择需要评价的运单!",
                        iconCls: "inoti",
                        successBtn: "确认"
                    });
                    return;
                }
                _.each(this.model.currentSelected(), function (e) {
                    var data = e.toJSON();
                    var orderStatus = data.statusValue;
                    var feedbackStatus = data.feedbackStatusValue;
                    if ((orderStatus == 2||orderStatus == 3||orderStatus == 4)&&(feedbackStatus == 1||feedbackStatus==3)) {
                        orderIds.push(data.id);
                        flag = true;
                    }
                });
                if (flag) {
                    $("input[name=batchIds]").val(orderIds.join(","));
                    $("#batch_evaluation_form").submit();
                } else {
                    miscs.alert({
                        title: "批量评价",
                        msgTitle: "请选择需要待评价的订单!",
                        msgInfo: "暂无可评价的订单!",
                        iconCls: "inoti",
                        sign: true,
                        successBtn: "确认"
                    });
                }
            },
            next: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var curpage = this.$el.find(".curpage").val();
                this.$el.find(".curpage").val((parseInt(curpage) + 1) || 1);
                this.fetchFreights();
                return false;
            },

            prev: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var curpage = this.$el.find(".curpage").val();
                this.$el.find(".curpage").val((curpage && (curpage > 1)) ? parseInt(curpage) - 1 : 1);
                this.fetchFreights();
                return false;
            },

            gotoPage: function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.fetchFreights();
                    return false;
                }
            },

            initialize: function (options) {
                this.freight = options.freight;
                this.sectionList = options.sectionList;
                this.model.on("sync", _.bind(this.render, this));
            },

            fetchFreights: function () {
                mask.block(".ctrlbill");
                this.model.fetch({data: this.serialize()});
            },
            render: function () {
                var paging = this.model.paging.toJSON();
                this.$el.find(".curpage").val(paging.currentPage);
                this.$el.find(".totalpage").text(paging.pages);
                mask.unblock(".ctrlbill");
                return this;
            },
            serialize: function () {
                var that = this;
                var data = {};
                if (that.linkStatus){
                    data = {
                        pageNo: that.$el.find(".curpage").val(),
                        freightId: that.freight.id,
                        linkStatus: that.linkStatus
                    };
                }else{
                    data = {
                        pageNo: that.$el.find(".curpage").val(),
                        freightId: that.freight.id,
                        status: $("[name=status]").val()
                    };
                }
                window.filter.clear();
                window.filter.set(data);
                return data;
            }
        });

        var FeedbackDialogue = Backbone.View.extend({
            el: "#feedback",
            events: {
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.orderList = options.orderList;
                this.model.on("selectFeedback", _.bind(this.show, this));
            },
            show: function () {
                $(".feedback_level").mouseleave();
                if (this.model.models.length == 0) return;
                $(this.el).popup();
            },
            close: function () {
            	$(".itemMsg").addClass("hide");
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                var model = this.model.models[0].toJSON();
                var orderId = model.id;
                var driverId= model.driverId;
                var description = $("#description").val();
                var feedbacks = [];
                var score = false;
                $(".feedback_level").each(function (i, o) {
                    if($(o).data("level")==0){
                    	score=true;
                    }
                    feedbacks.push($(o).data("level"));
                });
                if(score){
                	$(".itemMsg").removeClass("hide");
                	return;
                }
                var that = this;
                if (!that.flag){
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/feedback/edit",
                        data: {
                            "orderId": orderId,
                            "driverId": driverId,
                            "description": description,
                            "feedbacks": feedbacks
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data) {
                                $("#order_ck"+orderId).data("feedbackStatus",data.fstatus);
                                updStatus("stayFeedback", parseInt($("#stayFeedback").text(),10)-1);
                                $("#detail_index4" +orderId).html("");
                                $("#detail_index5" +orderId).html("");
                                var str='';
                                if (data.fstatus == 2) {
                                    str='我已评价';
                                } else if(data.fstatus==4) {
                                    str='双方已评';
                                }
                                $("#feedback_status_str_" + orderId).html('<span class="scmap ftgrey"><a href="' + config.ctx + '/feedback/Window/' + orderId + '/detail" target="_blank">'+str+'</a></span>');
                                window.orders.refresh();
                                $("#feedback").popup({close:true});
                            } else {
                                $("#confirm_feedback_error_msg").text("系统忙,稍后再试...");
                            }
                            that.flag = false;
                            
                            miscs.alert({
	                            title: "评价车主",
	                            msgTitle: "评价车主成功!",
	                            msgInfo: "您已评价车主。",
	                            iconCls: "iok",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
                        }, error: function () {
                            //$("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
                        	
                        	$("#feedback").popup({close:true});
	                    	miscs.alert({
	                            title: "评价车主",
	                            msgTitle: "评价车主失败!",
	                            msgInfo: "该运单可能已完成或者关闭",
	                            iconCls: "inoti",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
                            that.flag = false;
                        }

                    });
                }
            }
        });
        var ReceiveDialogue = Backbone.View.extend({
            el: "#confirm_receivegoods",
            events: {
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.orderList = options.orderList;
                this.model.on("selectReceive", _.bind(this.show, this));
            },
            show: function () {
                if (this.model.models.length == 0) {
                    miscs.alert({
                        title: "批量确认收货",
                        msgTitle: "请选择需要待确认收货的运单!",
                        iconCls: "inoti",
                        successBtn: "确认"
                    });
                    return;
                }else{
                    var orderIds = [];
                    var flag = false;
                    _.each(this.model.models, function (e) {
                        var data = e.toJSON();
                        if (data.statusValue == 1) {		//待确认收货
                            orderIds.push(data.id);
                            flag = true;
                        }
                    });
                    if (flag){
                        $("input[name=receivegoods_orderId]").val(orderIds.join(","));
                        $(this.el).popup();
                    }else{
                        miscs.alert({
                            title: "批量确认收货",
                            msgTitle: "请选择需要待确认收货的运单!",
                            msgInfo: "暂无可待确认收货的订单!",
                            iconCls: "inoti",
                            sign: true,
                            successBtn: "确认"
                        });
                    }
                }
            },
            close: function () {
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                var that = this;
                var orderId = $("input[name=receivegoods_orderId]").val();
                var orders = orderId.split(",");

                if (!that.flag){
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/order/receiveGoods",
                        sync: false,
                        data: {"ids": orders, "freightId": window.ordersPanel["freight"].id },
                        dataType: "json",
                        success: function (data) {
                            if (data) {
                                updateStatus(data.stayReceiveGoods, data.stayFeedback, data.totalOrder);
                                window.orders.refresh();
                                $("#confirm_receivegoods").popup({close:true});
                            } else {
                                $("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
                            }
                            that.flag = false;
                            
                            
                            var feedbackUrl = "";
                            if (orders.length == 1){
                                feedbackUrl = "<a href='javascript:void(0);'"
                                    + " class='ftblue tdu' id='tofeedback' data-order-id='"+orderId+"' title='现在去评价车主'>现在去评价车主？</a>";
                            }else{
                                feedbackUrl = "<a  id='tohreffeedback' href='" + config.ctx + "/feedback/Window/batch?batchIds=" + $("input[name=receivegoods_orderId]").val() + "'" +
                                    " class='ftblue tdu' target='_blank' title='现在去评价车主'>现在去评价车主？</a>";
                            }
                            var ts = "";
                            if(data.certStatusValue==3){
                            	ts = "您已成功确认收货，是否" + feedbackUrl;
                            }else{
                            	ts = "您已成功确认收货。";
                            }
                            miscs.alert({
                                title: "确认收货",
                                msgTitle: "确认收货成功!",
                                msgInfo: ts,
                                iconCls: "iok",
                                sing: true,
                                cancelBtn: "关闭"
                            });
                            
                        }, error: function () {
                            //$("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
                        	 $("#confirm_receivegoods").popup({close:true});
                        	miscs.alert({
                                title: "确认收货",
                                msgTitle: "确认收货失败!",
                                msgInfo: "运单可能被签收",
                                iconCls: "inoti",
                                sing: true,
                                cancelBtn: "关闭"
                            });
                        	
                        	
                            that.flag = false;
                        }
                    });
                }
            }
        });
        
        $(document).on("click", "#tofeedback", function(e){
            var $this =  $(e.target);
            $("#" + $this.parents(".showdialog").prop("id")).popup({close:true});
            var orderId = $this.data("orderId");
            $("#detail_index4" + orderId).find(".popup_feedback").click();
        });
        
        
        var NoticeDialogue = Backbone.View.extend({
            el: "#sendnotice",
            events: {
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.orderList = options.orderList;
                this.model.on("selectNotice", _.bind(this.show, this));
            },
            show: function () {
                if (this.model.models.length == 0){
                    miscs.alert({
                        title: "批量发送通知",
                        msgTitle: "请选择需要发送通知的运单!",
                        iconCls: "inoti",
                        successBtn: "确认"
                    });
                    return;
                }else{
                    var driverids =[];
                    var frIds =[];
                    var flag = false;
                    _.each(this.model.models, function (e) {
                        var data = e.toJSON();
                        if (data.statusValue == 1) {
                            driverids.push(data.driverId);
                            frIds.push(data.freightResponseId);
                            flag = true;
                        }
                    });
                    if (flag){
                        $("input[name=frId]").val(frIds.join(","));
                        $("input[name=driverid]").val(driverids.join(","));
                        $(this.el).popup();
                    }else{
                        miscs.alert({
                            title: "批量发送通知",
                            msgTitle: "请选择需要发送通知的订单!",
                            msgInfo: "暂无可发送通知的订单!",
                            iconCls: "inoti",
                            sign: true,
                            successBtn: "确认"
                        });
                    }
                }
            },
            close: function () {
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                if (!$("#sendnoticeform").valid()) {
                    return;
                }
                var driverid = $("input[name=driverid]").val();
                var frId = $("input[name=frId]").val();
                var driverIds =driverid.split(",");
                var frIds = frId.split(",");
                var sendnotice = $("[name=sendnotice]").val();
                var data = {
                    driverids: driverIds,
                    content: sendnotice,
                    freightResponseIds: frIds
                };
                var that = this;
                if (!that.flag) {
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/bookingTruck/batchNotice",
                        data: data,
                        dataType: "json",
                        success: function (data) {
                            if (data.success) {
                                if (!$("#sendnotice_error").hasClass("hide")) {
                                    $("#sendnotice_error").addClass("hide");
                                }
                                that.close();
                                $("#sendnotice_info").popup();
                            } else {
                                $("#sendnotice_error").removeClass("hide");
                            }
                            that.flag = false;
                        },
                        error: function () {
                            $("#already_booking_truck_confirm_error_msg").text("系统忙,稍后再试...");
                            that.flag = false;
                        }
                    });
                }
            }
        });
        var CancelDialogue = Backbone.View.extend({
            el: "#bookingtruck_cancel",
            events: {
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.orderList = options.orderList;
                this.model.on("selectCancel", _.bind(this.show, this));
            },
            show: function () {
                if (this.model.models.length == 0) return;
                $("input[name=order_popup_cancel_orderId]").val(this.model.models[0].id);
                $(this.el).popup();
            },
            close: function () {
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                var orderId = $("input[name=order_popup_cancel_orderId]").val();
                var reason = $("[name=cancel-reason]:checked").val();
                var description = $("[name=cancel_description]").val();
                var that = this;
                if (!that.flag){
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/order/cancel",
                        data: {"orderId": orderId,"description": description,"cancelReasonId": reason},
                        dataType: "json",
                        success: function (data) {
                            if (data) {
                                $("#order_ck"+orderId).data("orderStatus",5);
                                updateStatus(parseInt($("#stayReceiveGoods").text(),10)-1,parseInt($("#stayFeedback").text(),10),parseInt($("#totalOrder").text(),10)-1)
                                window.orders.refresh();
                                $("#bookingtruck_cancel").popup({close:true});
                            } else {
                                $("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
                            }
                            that.flag = false;
                            
                            miscs.alert({
	                            title: "取消订单",
	                            msgTitle: "取消订单成功!",
	                            msgInfo: "您已成功取消订单。",
	                            iconCls: "iok",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
                        }, error: function () {
                            //$("#confirm_receivegoods_error_msg").text("系统忙,稍后再试...");
                        	
                        	$("#bookingtruck_cancel").popup({close:true});
	                    	miscs.alert({
	                            title: "取消订单",
	                            msgTitle: "取消订单失败!",
	                            msgInfo: "运单可能已完成",
	                            iconCls: "inoti",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
	                    	
	                    	
                            that.flag = false;
                        }
                    });
                }
            }
        });
        var ComplaintDialogue = Backbone.View.extend({
            el: "#complaint",
            events: {
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.orderList = options.orderList;
                this.model.on("selectComplaint", _.bind(this.show, this));
            },
            show: function () {
                if (this.model.models.length == 0) return;
                $("input[name=order_popup_dirverId]").val(this.model.models[0].toJSON().carrierUserId);//评价的对象
                var orderId = $("input[name=order_popup_complaint_orderId]").val(this.model.models[0].toJSON().id);
                $(this.el).popup();
            },
            close: function () {
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                if (!$("#complaint_form_des").valid()) {
                    return;
                }
                var orderId = $("input[name=order_popup_complaint_orderId]").val();
                var driverId= $("input[name=order_popup_dirverId]").val();
                var description = $("#complaint_des").val();
                var reason = $("[name=complaint-reason]:checked").val();
                var that = this;
                if (!that.flag){
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/feedback/complaint",
                        data: {
                            "control": 2,
                            "orderId": orderId,
                            "driverId": driverId,
                            "description": description,
                            "complainId": reason
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data) {
                                that.model.models[0].fetch();
                                $("#complaint").popup({close:true});
                                $("#detail_index5"+orderId).html("");
                            } else {
                                $("#confirm_feedback_error_msg").text("系统忙,稍后再试...");
                            }
                            that.flag = false;
                            
                            miscs.alert({
	                            title: "投诉车主",
	                            msgTitle: "投诉车主成功!",
	                            msgInfo: "您已投诉车主。",
	                            iconCls: "iok",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
                        }, error: function () {
                        	
                        	$("#complaint").popup({close:true});
                        	
                        	miscs.alert({
	                            title: "投诉车主",
	                            msgTitle: "投诉车主失败!",
	                            msgInfo: "该运单已评价或者关闭。",
	                            iconCls: "inoti",
	                            sing: true,
	                            cancelBtn: "关闭"
	                        });
                        	
                            //that.$el.find("#booking_truck_confirm_error_msg").text("系统忙,稍后再试...");
                            that.flag = false;
                        }
                    });
                }
            }
        });
        function initOrderList(freight, pageType) {
            var orders = null;
            var orderListView = null;
            var ordersPanel = null;
            var receiveDialogue = null;
            var feedbackDialogue = null;
            var noticeDialogue = null;
            var cancelDialogue = null;
            var complaintDialogue = null;
            var orderSectionList = null;
            var filter = null;
            if(window.orders){
                orders = window.orders;
                filter = window.filter;
                window.orders.clearSelected();
                orderSectionList = window.orderSectionList;
                receiveDialogue = window.receiveDialogue;
                feedbackDialogue = window.feedbackDialogue;
                noticeDialogue = window.noticeDialogue;
                cancelDialogue = window.cancelDialogue;
                complaintDialogue = window.complaintDialogue;
                receiveDialogue["orderList"] = orders;
                feedbackDialogue["orderList"] = orders;
                noticeDialogue["orderList"] = orders;
                cancelDialogue["orderList"] = orders;
                complaintDialogue["orderList"] = orders;
            }else{
                orders = new Orders();
                filter = new Filter();
                orderSectionList = new Models.MultipleSelectList;
                receiveDialogue = new ReceiveDialogue({model: orderSectionList, orderList: orders});
                feedbackDialogue = new FeedbackDialogue({model: orderSectionList, orderList: orders});
                noticeDialogue = new NoticeDialogue({model: orderSectionList, orderList: orders});
                cancelDialogue = new CancelDialogue({model: orderSectionList, orderList: orders});
                complaintDialogue = new ComplaintDialogue({model: orderSectionList, orderList: orders});
                orderListView = new OrderListView({model: orders, orderList: orderSectionList});
            }
            if(window.ordersPanel){
                ordersPanel = window.ordersPanel;
                ordersPanel["freight"] = freight;
            }else{
                ordersPanel = new OrdersPanel({model: orders, freight: freight, sectionList: orderSectionList});
            }
            var freightId = "";
            if (freight){
                freightId = freight.id;
                var departureAddrNames = freight.departureAddrName.split(" ");
                var destinationAddrNames = freight.destinationAddrName.split(" ");
                var departureAddrName = departureAddrNames[1] + " " + departureAddrNames[2];
                var destinationAddrName = destinationAddrNames[1] + " " + destinationAddrNames[2];
                $("#ganxiren").attr("href",window.ctx+"/relatePerson/"+freightId);
                $("#freight_status").text(freight.status == "RUNNING"?"发布中":"发布完成");
                $("#commandLine").text(departureAddrName + " - " + destinationAddrName).attr("title",departureAddrName + " - " + destinationAddrName );
                $("#goodsName").text(freight.goodsDesc);
                $("#total_transport").text(new Number(freight.totalTransport).pattern("#,###.#"));
                $("#total_transport_unit").text(freight.transportUnitName||"吨");
                $("#loadingDate").text(config.dateFormat(new Date(freight.loadingDate),"yyyy年MM月dd日"));
                $("#tobookingconfirm").attr("href",config.ctx + "/bookingTruck/winauto/"+freightId+"/view");
                $("#freightdetail").attr("href", config.ctx + "/freight/Window/" + freightId + "/detail");
            }
            var status = $("[name=status]").val();
            $("#ck-scall").prop("checked", false);
            mask.block(".ctrlbill");
            filter.clear();
            filter.set({
                freightId: freightId,
                status: status
            });
            orders.fetch({
                data: {freightId: freightId, status: status}
            });
            if (pageType){
                ordersPanel["linkStatus"] = null;
            }
            window.orders = orders;
            window.ordersPanel = ordersPanel;
            window.receiveDialogue = receiveDialogue;
            window.feedbackDialogue = feedbackDialogue;
            window.noticeDialogue = noticeDialogue;
            window.cancelDialogue = cancelDialogue;
            window.complaintDialogue = complaintDialogue;
            window.orderSectionList = orderSectionList;
            window.filter = filter;
        };

        /* 设置弹窗信息(取消订单、评价车主、投诉车主)*/
        var setPopupInfo = function (data, status) {
            var orderId = data.id;
            var orderNo = data.orderNo||"";
            var shipperAddrName = data.shipperAddrName||"";
            var consigneeAddrName = data.consigneeAddrName||"";
            var trucklicenseNo = data.trucklicenseNo||"";
            var truckModel = data.truckModel||"";
            var driverName = data.driverName||"";
            $("input[name=order_popup_" + status + "_orderId]").val(orderId);
            $("#order_popup_" + status + "_orderNo").text(orderNo);
            $("#order_popup_" + status + "_shipperAddrName").text(shipperAddrName);
            $("#order_popup_" + status + "_consigneeAddrName").text(consigneeAddrName);
            $("#order_popup_" + status + "_truckModel").text(truckModel);
            $("#order_popup_" + status + "_trucklicenseNo").text(trucklicenseNo);
            $("#order_popup_" + status + "_driverName").text(driverName);
        };

        return {
            init: function () {

            	$("[name=status]", ".freight_console_page").attr("data-placeholder", "运单状态").trigger("chosen:updated").chosen().next().css({"width": "129px"});
            	
                if ($(".uc-ctrl").size() > 0) {
                    drawPanel();
                    initFreightList();
                    CYMap.initialize();
                }

                //运单列表
                $(".freightinfo .fihd span").click(function(){
                    if(!$(this).hasClass("ud-ctrlfolddown")){
                        $(this).addClass("ud-ctrlfolddown");
                        $(".fibd").slideUp();
                        var ch = $(".ctrl-listwp .uc-main").outerHeight();
                        $(".ctrl-listwp .uc-main").css("height",ch+122);
                        $(this).find("a").text("展开 货源详情")
                    }else{
                        $(this).removeClass("ud-ctrlfolddown");
                        $(".fibd").slideDown();
                        var ch = $(".ctrl-listwp .uc-main").outerHeight();
                        $(".ctrl-listwp .uc-main").css("height",ch-122);
                        $(this).find("a").text("收缩 货源详情")
                    };
                    var fihdem = $(".freightinfo .fihd").find("span.fr");
                });

                $(".ctrl-module").on("click", "li",function(){
                    $(this).addClass("cur").siblings().removeClass("cur");
                    var index = $(".ctrl-module li").index(this)+1;
                    var obj = $(".ctrl-mainwrapper").children().eq(index);
                    obj.removeClass("hide").siblings().addClass("hide");
                    if (index == 1){
                        obj.prev().removeClass("hide");
                    }
                });

                //点击关闭弹窗事件
                $(".popup_cancel", ".freight_console_page").on("click", function (e) {
                    $("#" + $(e.target).data("openId")).popup({close:true});
                });

                miscs.areaLength($(".msgLengthArea"));

                //批量评价
                $("#batch_evaluation", ".freight_console_page").on("click",function(){
                    var orderIds = [];
                    var flag = false;
                    $("input[name=all_ids_ck]:checked",".freight_console_page").each(function (i, o) {
                        var orderStatus=$(o).data("orderStatus");
                        var feedbackStatus=$(o).data("feedbackStatus");
                        if ((orderStatus == 2||orderStatus == 3||orderStatus == 4)&&(feedbackStatus == 1||feedbackStatus==3)) {
                            orderIds.push($(o).data("orderId"));
                            flag = true;
                        }
                    });
                    if (flag) {
                        $("input[name=batchIds]").val(orderIds.join(","));
                        $("#batch_evaluation_form").submit();
                    } else {
                        miscs.alert({
                            title: "批量评价",
                            msgTitle: "请选择需要待评价的订单!",
                            iconCls: "inoti",
                            successBtn: "确认"
                        });
                    }
                });
                $("#complaint_form_des").validate({
                    rules:{complaint_des:{required:true}}
                });
                //评价 内容
                var feedbackarr=["非常不满","不满意","一般","满意","非常满意"];
                $(".feedback_level > i", ".freight_console_page").mouseover(function () {
                    var _this = $(this);
                    _this.prevAll().andSelf().removeClass("ico-stargrey");
                    _this.prevAll().andSelf().addClass("ico-starblue");
                    _this.parent().next().find("span").text($(this).index() + 1);
                    _this.parent().next().next().text(feedbackarr[$(this).index()]);
                    _this.nextAll().removeClass("ico-starblue");
                    _this.nextAll().addClass("ico-stargrey");
                    $(this).parent().data("templevel", $(this).index() + 1);
                });

                $(".feedback_level", ".freight_console_page").mouseleave(function () {
                    var $this = $(this);
                    var level = $this.data("level");
                    
                    $this.next().next().text(feedbackarr[level - 1]);
                    $this.data("templevel", level);		//重置临时level状态
                    $this.next().find("span").text(level);
                    if (!level||level==0) {
                        level = 0;
                        $this.parent().data("level", 0);
                        $this.parent().data("templevel", 0);
                        $this.next().next().text("");
                    }

                    $this.children().each(function (i, o) {
                        if (i >= level) {
                            $(o).removeClass("ico-starblue");
                            $(o).addClass("ico-stargrey");
                        } else {
                            $(o).addClass("ico-starblue");
                            $(o).removeClass("ico-stargrey");
                        }
                    });
                });

                $(".feedback_level > i", ".freight_console_page").click(function () {
                    $(this).parent().data("level", $(this).parent().data("templevel"));
                });
                new Dotgo();
                $(".uc-ctrl-select", ".freight_console_page").next().css({"width": "105px"});
            }
        };
    });

var hide = function(obj) {
    $(obj).parents("#popupdlg").hide();
};

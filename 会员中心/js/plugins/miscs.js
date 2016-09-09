define(["jquery", "config", "uploadify", "json3", "popup", "hbs!plugins/template/uploadComplete", "hbs!plugins/template/uploading", "chosen"],
    function ($, config, uploadify, JSON, popupWin, completeTmpl, uploadingTmpl, chosen) {

        /* 下拉框 */
        $(".plusdrop").on("click", "ul li", function(){
            $(this).addClass("ckd").siblings().removeClass("ckd");
        });

        $.fn.hoverDelay = function (options) {
            var defaults = {
                hoverDuring: 200,
                outDuring: 200,
                hoverEvent: function () {
                    $.noop();
                },
                outEvent: function () {
                    $.noop();
                }
            };
            var sets = $.extend(defaults, options || {});
            var hoverTimer, outTimer;
            return $(this).each(function () {
                $(this).hover(function () {
                    clearTimeout(outTimer);
                    hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
                }, function () {
                    clearTimeout(hoverTimer);
                    outTimer = setTimeout(sets.outEvent, sets.outDuring);
                });
            });
        };
        var initSingleDept=function(e,target){
        	var $li=null,deptId='',level=1,init=true,input=target;        	
        	if(e){        		
        		$li=e.parent('li');
        		var t=$li.children('.xuli');
        		deptId=t.data("deptId");
        		level=t.data('level');
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
    						dom+='<li class="tree_node_'+obj.id+'">'+(obj.hasChildren?'<i class="icon i13 ico-plus ico-minus"></i>':'')+'<span data-dept-id="'+obj.id+'" data-dept-name="'+obj.deptName+'" class="xuli ftbold crt">'+obj.deptName+'<em class="ftorange">'+obj.userCounts+'</em></span>';
    					}
    					var len=data.nodes.length;
    					if (len > 0) {
    						dom+='<ul class="treelist">';
    						$.each(data.nodes, function(i, o) {
    							dom +='<li class="tree_node_'+o.id+(i==len-1?' last':'')+'">'+(o.hasChildren?'<i class="icon i13 ico-plus"></i>':'')+'<span data-dept-id="'+o.id+'" data-dept-name="'+o.deptName+'" class="xuli">'+o.deptName+'<em class="ftorange">'+o.userCounts+'</em></span></li>';
    						});
    						dom+='</ul>';
    					}
    					if(init){
    						dom+="</li>";
    						$(".department_treelist").html(dom);
    						$(".dropdown-treelist").removeClass('hide').insertAfter(input);
    					}else{
    						$li.append(dom);
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
        var alert = function (options) {
                if (options) {
                    var width="", height="", title="", iconCls="", sign="";
                    var msgTitle="", msgInfo="", cancelBtn="", successBtn="",btnLink = "", hideClose = "";
                    var alertId = parseInt(1000*Math.random(), 10);
                    if (options.hideClose) hideClose = "hide";
                    if (options.width) width = "width:" + options.width + "px";
                    if (options.height) height = "height:"+options.height + "px";
                    if (options.title) title = options.title;
                    if (options.iconCls) iconCls = options.iconCls;
                    if (options.sign) sign = '<i class="icon i14 i-sign"></i>';
                    if (options.msgTitle) msgTitle = options.msgTitle;
                    if (options.msgInfo) msgInfo = options.msgInfo;
                    if (options.btnLink) btnLink = options.btnLink;
                    if (options.cancelBtn) cancelBtn = '<span class="cancel btn-a-white"><a href="javascript:void(0);" id="cancel_'+alertId+'" class="br3 close_popup" title="'+options.cancelBtn+'">'+options.cancelBtn+'</a></span>';
                    if (options.successBtn) successBtn = '<span class="confirm btn-a-blue"><a href="javascript:void(0);" id="success_'+alertId+'"  class="br3 close_popup" title="'+options.successBtn+'">'+options.successBtn+'</a></span>';
                    if (options.title) {
                        title = options.title;
                    } else {
                        title = "系统信息";
                    }
                    if ($(".alert_dialog").length){
                        return;
                    }

                    var alertInfo = '<div class="showdialog sd-info hide alert_dialog" style="'+width+';'+height+'" id="alert_'+alertId+'">'
                        + '<div class="sd-hd">'
                        + '<h2 class="sdtit">'+title+'</h2>'
                        + '<a href="javascript:void(0);" class="close br3 '+hideClose+'" title="点击关闭窗口">关闭</a> </div>'
                        + '<div class="sd-bd clearfix">'
                        + '<div class="info-main">'
                        + '<i class="i48 '+iconCls+' fl"></i>'
                        + '<div class="infocont">'
                        + '<h3 class="sc-tit">'+msgTitle+'</h3>'
                        + '<p class="ftgrey">'+ sign +msgInfo+'</p></div>'
                        + '</div>'
                        + '<p class="fmbtm cl">'
                        + btnLink + cancelBtn + successBtn +'</p>'
                        + '</div></div>';
                    var $body = $("body");
                    $body.append(alertInfo);
                    $("#alert_"+alertId).popup();
                    var $alert = $(alertInfo);
                    var _cancelBtn=document.getElementById("cancel_" + alertId);
                    var _successBtn=document.getElementById("success_" + alertId);
                    if (_cancelBtn){
                        if (options.cancel){
                            if(_cancelBtn.attachEvent){
                                _cancelBtn.attachEvent('onclick',function(){options.cancel($alert)});
                            }else{
                                _cancelBtn.addEventListener('click',function(){options.cancel($alert)},false);
                            }
                        }
                    }
                    if (_successBtn){
                        if (options.success) {
                            if (_successBtn.attachEvent) {
                                _successBtn.attachEvent('onclick', function () {options.success($alert)});
                            } else {
                                _successBtn.addEventListener('click', function () {options.success($alert)}, false);
                            }
                        }
                    }

                }
            };

        $.fn.hoverDelay = function (options) {
            var defaults = {
                hoverDuring: 200,
                outDuring: 200,
                hoverEvent: function () {
                    $.noop();
                },
                outEvent: function () {
                    $.noop();
                }
            };
            var sets = $.extend(defaults, options || {});
            var hoverTimer, outTimer;
            return $(this).each(function () {
                $(this).hover(function () {
                    clearTimeout(outTimer);
                    hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
                }, function () {
                    clearTimeout(hoverTimer);
                    outTimer = setTimeout(sets.outEvent, sets.outDuring);
                });
            });
        };
        return {
            autoIframeHeight: function () {
                var iframes = $("iframe.autoHeight");
                for (var i = 0; i < iframes.length; i++) {
                    var iframe = iframes[i];
                    iframe.height = iframe.contentDocument.body.offsetHeight + 20;
                }
            },


            initSingleUploadify: function (e) {
                e = $(e);
                var name = e.prop("name");
                e.removeProp("name");
                var options = $.extend({}, {
                    swf: config.ctx + "/resources/lib/uploadify/uploadify.swf",
                    formData: {"jsessionid": config.jsessionid},
                    fileObjName: "file",
                    fileTypeExts: "*.jpg;*.png;*.gif;*.jpeg;*.bmp",
                    fileTypeDesc: "Image Files",
                    multi: false,
                    width: "122px",
                    fileSizeLimit: "2MB",
                    itemTemplate: false,
                    overrideEvents: ["onSelect","onSelectError"],
                    removeCompleted: false,
                    onSelect: function (file) {
                        $("#bizLicenceFileErrorId").addClass("hide");
                        $("#orgCodeFileErrorId").addClass("hide");
                        $("#taxRegFileErrorId").addClass("hide");
                        $("#identityPath1ErrorId").addClass("hide");

                        var settings = this.settings;
                        var data = {fileID: file.id, instanceID: settings.id};
                        $("#" + settings.queueID).append(uploadingTmpl(data));
                        alert(settings.id);
                        var $up = $("#" + settings.id);
                        $up.find(".uploadify-button").hide();
                        $up.css("width", 0);
                        $up.find("object").attr("width", 0);
                    },
                    onSelectError : function(file, errorCode, errorMsg) {
                        // Load the swfupload settings
                        var settings = this.settings;

                        // Run the override event handler
                        switch(errorCode) {
                            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                                if (settings.queueSizeLimit > errorMsg) {
                                    this.queueData.errorMsg += '\nThe number of files selected exceeds the remaining upload limit (' + errorMsg + ').';
                                } else {
                                    this.queueData.errorMsg += '\nThe number of files selected exceeds the queue size limit (' + settings.queueSizeLimit + ').';
                                }
                                break;
                            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                               this.queueData.errorMsg = ' 上传文件最大为2M！';
                                break;
                            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                                this.queueData.errorMsg += '\nThe file "' + file.name + '" is empty.';
                                break;
                            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                                this.queueData.errorMsg = '上传文件不支持此类型';
                                break;
                        }
                        if (errorCode != SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
                            delete this.queueData.files[file.id];
                        }
                        // Call the user-defined event handler
//                        if (settings.onSelectError) settings.onSelectError.apply(this, arguments);
                    },
                    onUploadProgress: function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                        var percent = (totalBytesUploaded ? Math.ceil(bytesTotal * 100 / totalBytesUploaded) : 0);
                        var $file = $("#" + file.id);
                        $file.find(".progressbar .probar-blue").css("width", percent + "%");
                        $file.find(".progressbar .percent").text(percent + "%");
                    },

                    onUploadSuccess: function (file, text, response) {
                        var settings = this.settings;
                        var re = JSON.parse(text);
                        var data = {fileID: file.id, fileName: file.name, instanceID: settings.id, resID: re.fileId, previewURL: config.resourceServerUrl + "preview/" + re.fileId + "?height=28&width=48", hiddenName: settings.hiddenName};


                        var re1 = JSON.parse(text);
                        var data1 = {fileID: file.id, fileName: file.name, instanceID: settings.id, resID: re1.fileId, previewURL: config.resourceServerUrl + "preview/" + re1.fileId + "?height=28&width=48", hiddenName: settings.hiddenName};

                        var re2 = JSON.parse(text);
                        var data2 = {fileID: file.id, fileName: file.name, instanceID: settings.id, resID: re2.fileId, previewURL: config.resourceServerUrl + "preview/" + re2.fileId + "?height=28&width=48", hiddenName: settings.hiddenName};

                        
                        var $img = $("#imgJscrop");
                        if(data.instanceID=='firstUpLoad'){
                        var $this = $("#" + settings.id);
                        var firstImage = $("#firstImg");
                        firstImage.attr("src", config.resourceServerUrl + "preview/" + re.fileId);
                        $("#firstImage").attr("src", config.resourceServerUrl + "preview/" + re.fileId);
                        $this.find(".uploadify-button").show();
                        $("#firstUpLoad-queue").hide();
                        $this = null;
                     //   $this.find(".uploadify-button").show();
                        $("#idCardDiv").removeClass("hide");
                        $("#SWFUpload_0").css({"width": "115px"});
                        $("#firstUpLoad").css({"width": "115px"});
                        $("#identityPath1Id").val(re1.fileId);
                      //  idcard-photo pa idcard-upload hide
                        }
     

                     if(data.instanceID=='secondUpload'){
                    var $this = $("#" + settings.id);
                    var firstImage = $("#secondImg");
                    firstImage.attr("src", config.resourceServerUrl + "preview/" + re.fileId);
                    $("#secondUpload").attr("src", config.resourceServerUrl + "preview/" + re.fileId);
                    $this.find(".uploadify-button").show();
                    $("#secondUpload-queue").hide();
                    $this = null;
                 //   $this.find(".uploadify-button").show();
                    $("#idCardDiv2").removeClass("hide");
                    $("#SWFUpload_1").css({"width": "115px"});
                    $("#secondUpload").css({"width": "115px"});
                    $("#identityPath2Id").val(re.fileId);
                  //  idcard-photo pa idcard-upload hide
                    }
                     
                        if ($img.length != 0) {
                            var $this = $("#" + settings.id);
                            $this.find(".uploadify-button").show();
                            $("#uploadifyPhote-queue").hide();
                            $this = null;
                            $img.attr("src", "<stateImg:staticResource  attachId='" + re.fileId + "'/>");
                            $("#imgJscrop").next().find("img").attr("src", config.resourceServerUrl + "preview/" + re.fileId);
                            $("#imgJscropPreview").attr("src", config.resourceServerUrl + "/preview/" + re.fileId);
                            $("#uploadifyPhote").css({"width": "115px"});
                            $("#SWFUpload_0").css({"width": "115px"});
                        } else {
                        	data.fileName="";
                            $("#" + file.id).replaceWith(completeTmpl(data));
                        }

                        if (!$("#idCard1").hasClass("hide")) {
                            var $imgCard1 = $("#imgCard1");
                            if ($imgCard1.length != 0) {
                                var $this = $("#" + settings.id);
                                $this.find(".uploadify-button").show();
                                $("#idUpCard1-queue").hide();
                                $this = null;
                                $imgCard1.attr("src", config.resourceServerUrl + "preview/" + re1.fileId);
                                $("#imgCardId1").attr("src", config.resourceServerUrl + "preview/" + re1.fileId);
                                $("#identityPath1Id").val(re1.fileId);
                                $("#idUpCard1").css({"width": "115px"});
                                $("#SWFUpload_3").css({"width": "115px"});
                                if( $("#identityPath1Id").val()!=""){
                                	var idcard = function(){
                                		var tip = function(){
                                			$(".idcard-tip").css("opacity",0);
                                			$(".idcard-tip").animate({top:0,opacity:1},500);
                                		};
                                		return {
                                			init:function(){
                                				tip();
                                			}
                                		};
                                	}();
                                	idcard.init();
                                }
                                $("#messageCard1-2").removeClass("hide");
                                $("#messageCard1-3").addClass("hide");
                                $("#resText4").empty();   //清空resText4里面的所有内容
                                var html =
                                    '<span class="fmtit"><i class="icon i24 ico-cerstatus"></i>未认证</span>' +
                                    '<span class="fmcont">申请人身份证</span>' +
                                    '<div class="fmright upsucess">' +
                                    '<span class="fr"><a href="javascript:void(0);" class="close" title="删除文件" id="deleteorgIdFileId"></a></span>' +
                                    '<span class="sucess"><span class="sucimg pr"><i class="icon i14 ico-ok pa"></i><img src="' + config.resourceServerUrl + 'preview/' + re1.fileId + '"/> </span></span></div>';


                                $("#resText4").html(html);
                                /*miscs.initSingleUploadify('#repeatload4');*/
                                $("#resText4").on("click","#deleteorgIdFileId",function(){
                                	$("#resText4").empty();   //清空resText4里面的所有内容
									var html=	
													'<span class="fmtit"><i class="icon i24 ico-cerstatus"></i>未认证</span>'+
													'<span class="fmcont">申请人身份证</span>'+
													'<a href="javascript:void(0);" id="reploadIdCard" class="fr" style="margin-right:30px">重新上传证件</a>';									
								$("#resText4").html(html);
                                });
                                
                                
                            }
                        }

                        if (!$("#idCard2").hasClass("hide")) {
                            var $imgCard2 = $("#imgCard2");
                            if ($imgCard2.length != 0) {
                                var $this = $("#" + settings.id);
                                $this.find(".uploadify-button").show();
                                $("#idUpCard2-queue").hide();
                                $this = null;
                                $imgCard2.attr("src", config.resourceServerUrl + "preview/" + re2.fileId);
                                $("#imgCardId2").attr("src", config.resourceServerUrl + "preview/" + re2.fileId);
                                $("#identityPath2Id").val(re2.fileId);
                                $("#idUpCard2").css({"width": "115px"});
                                $("#SWFUpload_4").css({"width": "115px"});
                                if( $("#identityPath2Id").val()!=""){
                                	var idcard = function(){
                                		var tip = function(){
                                			$(".idcard-tip").css("opacity",0);
                                			$(".idcard-tip").animate({top:0,opacity:1},500);
                                		};
                                		return {
                                			init:function(){
                                				tip();
                                			}
                                		};
                                	}();
                                	idcard.init();
                                }
                                $("#messageCard2-2").removeClass("hide");
                                if($("#resText4 .sucess span:eq(1)").length==1){
                                	$("#resText4 .sucess span:eq(1)").remove();
                                }
                                var html = '<span class="sucimg pr"><i class="icon i14 ico-ok pa"></i><img src="' + config.resourceServerUrl + 'preview/' + re2.fileId + '"/></span>';
                                $("#resText4").find(".sucess").append(html);
                            }
                        }


                    },
                    onUploadError: function (event, queueID, fileObj,errorObj) {
                        if(errorObj.type == 'File Size'){
                            this.alert({
                                title: "信息提示",
                                msgTitle: "文件过大!",
                                msgInfo:"上传文件大于2M,请重新上传!",
                                iconCls: "sd-error",
                                successBtn: "确认"
                            });
                        }
                    },
                    onCancel: function () {
                        var $this = $("#" + this.settings.id);
                        $this.delay(1500).fadeIn(500, function () {
                            $this.find(".uploadify-button").show();
                            $this.css("width", this.width);
                            $this.find("object").prop("width", this.width);
                            $this = null;
                        });
                    },
                    onClearQueue: function () {
                        var $this = this;
                        var width = $this.data("uploadify").settings.width;
                        $this.delay(1500).fadeIn(500, function () {
                            $this.find(".uploadify-button").show();
                            $this.css("width", width);
                            $this.find("object").prop("width", width);
                            $this = null;
                        });
                    }
                }, e.data(), {hiddenName: name});
                e.uploadify(options);
            },

            uploadify: function () {
                var list = $("input[type=file].fileUpload");
                for (var i = 0; i < list.length; i++) {
                    this.initSingleUploadify(list[i]);
                }
            },

            hoverDelay: function () {
                $(".menu-down").hoverDelay({
                    hoverEvent: function () {
                        $(".menu-cur").addClass("nav-hover");
                        $(".menu-hd").removeClass("hide");
                    },
                    outEvent: function () {
                        $(".menu-cur").removeClass("nav-hover");
                        $(".menu-hd").addClass("hide");
                    }
                });
            },

            choosenModify: function () {

                var config = {
                    '.chosen': {},
                    '.chosen-with-deselect': {allow_single_deselect: true}
                };
                for (var selector in config) {
                    $(selector).chosen(config[selector]);
                }

            },

            alert: alert,

            areaLength: function($input){
                $input.each(function(i ,v){
                    var $v = $(v);
                    $v.on("keyup", function(){
                        this.value = this.value.slice(0, $v.attr("maxLength"));
                        $v.next().text($v.val().length + "/" + $v.attr("maxLength"));
                    }).on("keydown", function(){
                        this.value = this.value.slice(0, $v.attr("maxLength"));
                        $v.next().text($v.val().length + "/" + $v.attr("maxLength"));
                    });
                });
            },

            mCustomScrollbar: function () {
                $(".scrollable").mCustomScrollbar();
            },

            tooltip_global_warning: function ($dom, message) {
                var target = $dom.parent();
                if (!target.hasClass("pr")) {
                    $dom.wrap("<div class='pr'></div>");
                }
                ;
                target = $dom.parent();
                target.find("i .icon-warning").remove();
                target.find("strong").remove();
                target.append("<i class='icon i14 pa ico-warning'></i>");
                target.append("<strong class='wntext br3 pa'><i class='num-san pa'></i>" + message + "</strong>");
            },

            tooltip_global_ok: function ($dom) {
                var target = $dom.parent();
                if (!target.hasClass('pr')) {
                    $dom.wrap("<div class='pr'></div>");
                }
                ;
                target = $dom.parent();
                target.find("i .icon-ok").remove();
                target.find("strong").remove();
                target.append("<i class='icon i14 pa ico-ok'></i>");
            },

            tooltip_input_warning: function (inputname, message) {
                var input = $("input[name='" + inputname + "']");
                this.tooltip_global_warning(input, message);
            },

            tooltip_input_ok: function (inputname) {
                var input = $("input[name='" + inputname + "']");
                this.tooltip_global_ok(input);
            },

            tooltip_select_warning: function (inputname, message) {
                var select = $("select[name='" + inputname + "']").next();
                this.tooltip_global_warning(select, message);
            },

            tooltip_select_ok: function (inputname) {
                var select = $("select[name='" + inputname + "']").next();
                /*this.tooltip_global_ok(select);*/
            },

            validation_errorHandle: function (errors, element) {
                if (element.context.localName == "textarea") {
                    element.addClass("mbwarning");
                } else if (element.context.localName == "select") {
                    var target = $(element);
                    var targetName = target.attr("name");
                    var error = errors[0];
                    this.tooltip_select_warning(targetName, error.innerHTML);
                } else {
                    var target = $(element);
                    var targetName = target.attr("name");
                    var error = errors[0];
                    this.tooltip_input_warning(targetName, error.innerHTML);
                }
            },

            validation_unhighlight: function (element) {
                var target = $(element);
                var targetName = target.attr("name");
                if (element.tagName && element.tagName == "SELECT") {
                    this.tooltip_select_ok(targetName);
                } else {
                    if (!target.hasClass("ignore")) {
                        this.tooltip_input_ok(targetName);
                    }
                }
            },

            verify_empty: function (e) {
                var val = $(e).val();
                if (val) {
                    return true;
                } else {
                    return false;
                }
            },

            minheight: function () {
                var container_height = $(window).height(), top_header = $(".header").outerHeight(), breadquick_height = $(".breadquick").outerHeight() || 0, footer = $(".footer").outerHeight();
                $(".container .innerwp").css("min-height", container_height - top_header - breadquick_height - footer - 24);
            },

            evaluation:function(options){
                var defaults = {
                    level : 0
                };
                var opts = $.extend(defaults, options);
                var skinbefore =  	"<span class='creditlevel'>",
                    skinafter = 	"</span>",
                    crown = 		"<i class='icon i14 ico-cre4'></i>",
                    sun =   		"<i class='icon i14 ico-cre3'></i>",
                    moon =  		"<i class='icon i14 ico-cre2'></i>",
                    star =  		"<i class='icon i14 ico-cre1'></i>";

                var obj=$("#"+opts.id);
                if(opts.level>=0 && opts.level <= 100){
                    obj.append(skinbefore + star + skinafter);
                }else if(opts.level>=100 && opts.level<=299){
                    obj.append(skinbefore + star + star+ skinafter);
                }else if(opts.level>=200 && opts.level<=499){
                    obj.append(skinbefore + star + star+ star+ skinafter);
                }
                else if(opts.level>=500 && opts.level<=999){
                    obj.append(skinbefore + star+ star+ star+ star + skinafter);
                }
                else if(opts.level>=1000 && opts.level<=1999){
                    obj.append(skinbefore + star+ star+ star+ star+ star + skinafter);
                }
                else if(opts.level>=2000 && opts.level<=3999){
                    obj.append(skinbefore + moon + skinafter);
                }
                else if(opts.level>=4000 && opts.level<=5999){
                    obj.append(skinbefore + moon + moon + skinafter);
                }
                else if(opts.level>=6000 && opts.level<=9999){
                    obj.append(skinbefore + moon + moon + moon  + skinafter);
                }
                else if(opts.level>=10000 && opts.level<=14999){
                    obj.append(skinbefore + moon + moon + moon + moon  + skinafter);
                }
                else if(opts.level>=15000 && opts.level<=24999){
                    obj.append(skinbefore + moon + moon + moon + moon + moon  + skinafter);
                }
                else if(opts.level>=25000 && opts.level<=39999){
                    obj.append(skinbefore + sun + skinafter);
                }
                else if(opts.level>=40000 && opts.level<=59999){
                    obj.append(skinbefore + sun+ sun + skinafter);
                }
                else if(opts.level>=60000 && opts.level<=89999){
                    obj.append(skinbefore + sun+ sun+ sun + skinafter);
                }
                else if(opts.level>=90000 && opts.level<=129999){
                    obj.append(skinbefore + sun+ sun+ sun+ sun + skinafter);
                }
                else if(opts.level>=130000 && opts.level<=149999){
                    obj.append(skinbefore + sun+ sun+ sun+ sun+ sun + skinafter);
                }
                else if(opts.level>=150000 && opts.level<=19999){
                    obj.append(skinbefore + crown + skinafter);
                }
                else if(opts.level>=200000 && opts.level<=299999){
                    obj.append(skinbefore + crown+ crown + skinafter);
                }
                else if(opts.level>=300000 && opts.level<=599999){
                    obj.append(skinbefore+ crown+ crown+ crown + skinafter);
                }
                else if(opts.level>=600000 && opts.level<=999999){
                    obj.append(skinbefore + crown+ crown+ crown +crown+ skinafter);
                }
                else if(opts.level>=1000000){
                    obj.append(skinbefore + crown+ crown+ crown+ crown+ crown + skinafter);
                }
            },
            
            calcLevel:function(options) {
            	
            	var defaults = {
                        level : 0
                    };
            	
            	var skinbefore;
            	var skinafter;
            	var crown;
            	var sun;
            	var moon;
            	var star;
            	
                var opts = $.extend(defaults, options);
                var type = opts.type;
                var addspan=opts.addspan;
            	if(type == "org") {
            		if(addspan){
            			skinbefore ="";
            			skinafter="";
            		}else{
            			skinbefore =  "<span class='creditlevel'>";
                		skinafter = 	"</span>";
            		}
                	crown = 		"<i class='icon i14 ico-cre4'></i>";
                	sun =   		"<i class='icon i14 ico-cre3'></i>";
                	moon =  		"<i class='icon i14 ico-cre2'></i>";
                	star =  		"<i class='icon i14 ico-cre1'></i>";
            	}else if(type == "user") {
            		if(addspan){
            			skinbefore ="";
            			skinafter="";
            		}else{
                		skinbefore =  "<span class='userlevel'>";
                    	skinafter = 	"</span>";
                    }
                	crown = 		"<i class='icon i14 ico-lv4'></i>";
                	sun =   		"<i class='icon i14 ico-lv3'></i>";
                	moon =  		"<i class='icon i14 ico-lv2'></i>";
                	star =  		"<i class='icon i14 ico-lv1'></i>";
            	}
            	
            	
            	var retStr = skinbefore;
            	
            	var level = parseInt(opts.level);
            	switch(level) {
	            	case 1:
	            		retStr = retStr + star;
	            		break;
	            	case 2:
	            		retStr = retStr + star + star;
	            		break;
	            	case 3:
	            		retStr = retStr + star + star + star;
	            		break;
	            	case 4:
	            		retStr = retStr + star + star + star + star;
	            		break;
	            	case 5:
	            		retStr = retStr + star + star + star + star + star;
	            		break;
	            	case 6:
	            		retStr = retStr + moon;
	            		break;
	            	case 7:
	            		retStr = retStr + moon + moon;
	            		break;
	            	case 8:
	            		retStr = retStr + moon + moon + moon;
	            		break;
	            	case 9:
	            		retStr = retStr + moon + moon + moon + moon;
	            		break;
	            	case 10:
	            		retStr = retStr + moon + moon + moon + moon + moon;
	            		break;
	            	case 11:
	            		retStr = retStr + sun;
	            		break;
	            	case 12:
	            		retStr = retStr + sun + sun;
	            		break;
	            	case 13:
	            		retStr = retStr + sun + sun + sun;
	            		break;
	            	case 14:
	            		retStr = retStr + sun + sun + sun + sun;
	            		break;
	            	case 15:
	            		retStr = retStr + sun + sun + sun + sun + sun;
	            		break;
	            	case 16:
	            		retStr = retStr + crown;
	            		break;
	            	case 17:
	            		retStr = retStr + crown + crown;
	            		break;
	            	case 18:
	            		retStr = retStr + crown + crown + crown;
	            		break;
	            	case 19:
	            		retStr = retStr + crown + crown + crown + crown;
	            		break;
	            	case 20:
	            		retStr = retStr + crown + crown + crown + crown + crown;
	            		break;
            		default:
            	}           	
            	retStr = retStr + skinafter;
            	return retStr;
            },

            simplePage:function(options){
                var defaults = {
                    currentPage:1,
                    pages:1
                   };
                var opt = $.extend(defaults, options);
                $("#simplepage").empty();
                var $dom = "";
                if(opt.currentPage > 1){
                    $dom += "<a href='javascript:void(0);' data-page-number="+(opt.currentPage-1)+" class='ucp-pre page_a' title='上一页'><i class='icon i6-12 ico-prearrow'></i>上一页</a>";
                }
                if(opt.currentPage <= 1){
                    $dom += "<span class='ucp-pre'><i class='icon i6-12 ico-prearrow' title='上一页'></i></span>";
                }
                if(opt.currentPage >= opt.pages){
                    $dom += "<span class='ucp-next'><i class='icon i6-12 ico-nextarrow' title='下一页'></i></span>";
                }
                if(opt.currentPage < opt.pages){
                    $dom += "<a href='javascript:void(0);' data-page-number="+(opt.currentPage+1)+" class='ucp-next page_a' title='下一页'>下一页<i class='icon i6-12 ico-nextarrow'></i></a>";
                }
                $("#simplepage").html($dom);
            },

            completePage:function(options){
                var defaults = {
                    currentPage:1,
                    pages:1
                };
                var opt = $.extend(defaults, options);
                $("#completePage").empty();
                var $dom = "";
                if(opt.currentPage <= 1){
                    $dom += "<span class='ucp-pre'><i class='icon i6-12 ico-prearrow'></i>上一页</span><span class='ucp-crt'>1</span>";
                }else{
                    $dom += "<a class='ucp-pre page_a' href='javascript:void(0);' data-page-number='"+(opt.currentPage-1)+"' ><i class='icon i6-12 ico-prearrow'></i>上一页</a>	<a href='javascript:void(0);' class='page_a' data-page-number='1' >1</a>";
                }

                if(opt.pages > 1){
                    if(opt.pages < 9){
                        if(opt.pages > 6){
                            if(opt.currentPage < 5){
                                for(var i =2;i<=5;i++){
                                    if(i == opt.currentPage){
                                        $dom += "<span class='ucp-crt'>"+i+"</span>";
                                    }else{
                                        $dom += "<a href='javascript:void(0);' class='page_a' data-page-number='"+i+"' >"+i+"</a>"
                                    }
                                }
                                $dom +="...";
                                for(var i=opt.pages; i<=opt.pages;i++){
                                    if(i == opt.currentPage){
                                        $dom += "<span class='ucp-crt'>"+i+"</span>";
                                    }else{
                                        $dom += "<a href='javascript:void(0);' class='page_a' data-page-number='"+i+"' >"+i+"</a>"
                                    }
                                }
                            }else{
                                    $dom +="...";
                                    for(var i=opt.pages-4; i<=opt.pages;i++){
                                        if(i == opt.currentPage){
                                            $dom += "<span class='ucp-crt'>"+i+"</span>";
                                        }else{
                                            $dom += "<a href='javascript:void(0);' class='page_a' data-page-number='"+i+"' >"+i+"</a>"
                                        }
                                    }
                            }
                        }else{
                            for(var i=2; i<=opt.pages;i++){
                                if(i == opt.currentPage){
                                    $dom += "<span class='ucp-crt'>"+i+"</span>";
                                }else{
                                    $dom += "<a href='javascript:void(0);' class='page_a' data-page-number='"+i+"' >"+i+"</a>"
                                }
                            }
                        }
                    }else{
                        $dom +="...";
                        for(var i =parseInt((opt.pages-opt.currentPage)/2);i<=parseInt((opt.pages-opt.currentPage)/2)+5;i++){
                            if(i == opt.currentPage){
                                $dom += "<span class='ucp-crt'>"+i+"</span>";
                            }else{
                                $dom += "<a href='javascript:void(0);' class='page_a' data-page-number='"+i+"' >"+i+"</a>"
                            }
                        }
                        $dom +="...";
                        for(var i=opt.pages; i<=opt.pages;i++){
                            if(i == opt.currentPage){
                                $dom += "<span class='ucp-crt'>"+i+"</span>";
                            }else{
                                $dom += "<a href='javascript:void(0);' class='page_a' data-page-number='"+i+"' >"+i+"</a>"
                            }
                        }
                    }
                }

                if(opt.currentPage >= opt.pages){
                    if(opt.pages > 1){
                        $dom += "<span class='ucp-next'>下一页<i class='icon i6-12 ico-nextarrow'></i></span>";
                    }
                }else{
                    if(opt.pages > 1){
                        $dom += "<a href='javascript:void(0);' data-page-number='"+(opt.currentPage+1)+"'  class='ucp-next page_a'>下一页<i class='icon i6-12 ico-nextarrow'></i></a>";
                    }
                }


                $("#completePage").append($dom);
            },

            initSingleOrgList: function(e, options){
                var target = e;
                var defaults = {
                    name: target.val(),
                    id: "org_relator_list"
                };
                var opts = $.extend(defaults, options);
                $.ajax({
                    type:"GET",
                    url :config.ctx + "/relatePerson/orgList",
                    data:{"name": opts.name},
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        var targetDiv = $("#"+opts.id);
                        targetDiv.empty();
                        var dom = "";
                        if(data.length>0){
                            $.each(data, function (i, o){
                                if(i == 0){
                                    dom += "<p class='curhand relate-org-p' data-org-id="+ o.orgId+" data-org-name="+ o.orgName+"><em class='text-split fl mr5 ftblack'>"+o.orgName+"</em><input type='hidden' value='' name='sincerity_level'><span class='creditlevel'></span><span class='ftgrey fr'>本公司</span></p>";
                                }
                                dom += "<ul class='filterlist'>";
                                dom+='<li class="curhand" data-org-id="'+o.orgId+'" data-org-name="'+o.orgName+'"><em class="text-split fl mr5">'+o.orgName+'</em>';
                                if(o.creditLevel){
                                    var creditLevel=miscs.calcLevel({level:o.creditLevel,type:"org"});
                                    dom+=' '+creditLevel;
                                }
                                if(o.resource==1){
                                    dom+='<span class="ftgrey fr">伙伴库</span>';
                                }
                                dom+='</li></ul>';
                            });
                            targetDiv.html(dom);
                        }
                        /*_list.next(1).removeClass("hide");*/
                        targetDiv.removeClass("hide");
                    },error: function () {}
                });
            },
                      
            initDept: function(){
            	$(".input_department_tree").on("click", function(){
            		var dr= $('.dropdown-treelist');
            		var target=$(this);
            		if(dr.children().children().length>0){
            			dr.removeClass('hide');
            			if(target.next('.dropdown-treelist').length==0){
            				dr.insertAfter(target);
            			}
            		}else{            			
            			initSingleDept(null,target); 
            		}
            	});
     			$(".department_treelist").on("click",".xuli",function(e){
    				var current=$(this);
    				var div=current.parents(".dropdown-treelist");
    				var inp=div.prev();
    				inp.prev().val(current.data('deptId'));
    				inp.val(current.data('deptName'));
    				div.addClass("hide");
    				div.find(".crt").removeClass("crt");
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
    				initSingleDept(e,null);
    			});
            }
        };
    });
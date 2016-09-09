/**
 * 弹窗
 * @param $("#id").popup(); //打开 
 * @param popup({oldWin:true,close:true})
 * data-disabled="true" 为打开页面默认设置为disabled   data-clean="true"  plusdrop下的ul情况(true清空，默认不请空)
 */
(function($){
	function popWin(a){function n(){var a=k?k:document.body,b=a.scrollHeight>a.clientHeight?a.scrollHeight:a.clientHeight,c=a.scrollWidth>a.clientWidth?a.scrollWidth:a.clientWidth;$("#maskLayer").css({height:b,width:c})}var d,e,b=9e3,c=!1,f=$("#"+a),g=f.width(),h=f.height(),i=f.find(".tit"),j=f.find(".close"),k=document.documentElement,l=($(document).width()-f.width())/2,m=(k.clientHeight-f.height())/2;f.css({"z-index":b- -1}),i.mousedown(function(a){c=!0,d=a.pageX-parseInt(f.css("left")),e=a.pageY-parseInt(f.css("top")),f.css({"z-index":b- -1}).fadeTo(50,.5)}),i.mouseup(function(){c=!1,f.fadeTo("fast",1)}),$(document).mousemove(function(a){if(c){var b=a.pageX-d;0>=b&&(b=0),b=Math.min(k.clientWidth-g,b)-5;var i=a.pageY-e;0>=i&&(i=0),i=Math.min(k.clientHeight-h,i)-5,f.css({top:i,left:b})}}),j.on("click",function(){$(this).parent().parent().hide();var p = j.parent().parent();if (j.parent().parent().hasClass("alert_dialog")){p.remove();};$("#maskLayer").remove()}),$('<div id="maskLayer"></div>').appendTo("body").css({background:"#000",opacity:".4",top:0,left:0,position:"absolute",zIndex:"8000"}),n(),$(window).bind("resize",function(){n()})}
		
	$.fn.popup = function(options){
        var closeFlag = true;
        if (!options || options.close != true){
            closeFlag = false;
            $.each($(".showdialog"), function(i ,v ){
                if(!$(v).hasClass("hide")){
                    return;
                }
            })
        }

        var that = this;
		var _id = that.attr("id");
        if (!options || (options && options.oldWin != true && options.close != true)){
            $.each(that.find("form"),function(i,v){
                v.reset();
                $.each(v.elements,function(i,v) {
                    var $v = $(v);
                    $v.nextAll("i.ico-warning").addClass("hide");
                    $v.nextAll("i.ico-ok").addClass("hide");
                    $v.nextAll("strong.wntext").addClass("hide");
                    if ($v.data("disabled")==true){
                        $v.prop("disabled",true);
                    }else{
                        $v.prop("disabled",false);
                    }
                    if (v.tagName == "SELECT" && ($v.hasClass("chosen") ||$v.hasClass("chosen-with-deselect"))) {
                        $(v).trigger("chosen:updated").chosen();
                    }
                });
            });
            $.each(that.find(".plusdrop"),function(i, v){
                var $this = $(v);
                if($this.data("clean") == true){
                    $this.find("ul").html("");
                }
            });
        }

		if (_id){		//判断是否有id
			if (closeFlag){
				$("#"+_id+">div:first>a").click();
			}else{
				$("#" + _id).css("display", "block");
				$("#" + _id).removeClass("hide");
				popWin(_id);
			}
		}
	};

    $("body").on("click",".close_popup",function(e){
        $(e.target).parents("div.showdialog").find(".close").trigger("click");
        $(e.target).parents("div.showdialog").remove();
    });

	$.fn.popup_temp = function(options){
		var _id = this.attr("id");
		if (_id){		//判断是否有id
			if (options){
				$("#" + _id).find(".txtbox, textarea").each(function(){
					$(this).val("");
					$(this).next("i").remove();
					$(this).next("strong").remove();
					$(".chosen-with-diselect .chosen").trigger("chosen:updated")
				});
				$("#"+_id+">div:first>a").click();
			}else{
				$("#" + _id).css("display", "block");
				$("#" + _id).removeClass("hide");
				popWin(_id);
			}
		}
	};
})(jQuery);
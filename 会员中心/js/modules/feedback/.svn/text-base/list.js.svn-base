/**
 * 评价列表
 * Created by liuchuangui on 2014/4/19.
 */
define(["jquery", "plugins/miscs", "config"], function($, miscs, config) {
    /* 翻页提交表单 */
    var page_submit = function (pageNumber) {
            var $pageNumber = $("#pageNumber");
            if ($pageNumber.length > 0) {
                $("input[name=pageNumber]").val(pageNumber);
            } else {
                $(".page_submit").append('<input name="pageNumber" value="' + pageNumber + '" type="hidden" />');
            }
            $(".page_submit").submit();
    };
    return {
        init: function () {
    		$(".evaluation_submit",".batch-evaluation-list").on("click",function(e){
    			var _this = $(this);
    			var orderId=$(e.target).data("orderId");
    			var driverId=$(e.target).data("driverId");
                var description=$("#description"+orderId).val();
    			var feedbacks = [];
                $(".feedback_level","#fb-dl"+orderId).each(function (i, o) {
                    feedbacks.push($(o).data("level"));
                });
                
                
                $.ajax({
                    type: "POST",
                    url: config.ctx + "/feedback/edit",
                    data: {
                    	"orderId": orderId,
                    	"driverId": driverId,
                        "description": description,
                        "feedbacks": feedbacks},
//                    async:false,
                    dataType: "json",
                    success: function (data) {
                    	var fs=data.fstatus;
	                    if (fs==2||fs==4) {
	            			_this.parents(".uncomment").removeClass("uncomment");
	            			_this.parents(".eval-item").find(".evalform").slideUp(250,"linear",function(){
	            				_this.parents(".eval-item").nextAll(".uncomment:eq(0)").find(".evalform").delay(100).slideDown(250,"linear");
	            				_this.parents(".eval-item").nextAll(".uncomment:eq(0)").addClass("eon").siblings(".eval-item").removeClass("eon");
	            				if(!_this.parents(".eval-item").nextAll().hasClass("uncomment")){
	            					_this.parents(".eval-item").prevAll(".uncomment").last().find(".evalform").slideDown(250,"linear");
	            					_this.parents(".eval-item").prevAll(".uncomment").last().addClass("eon").siblings(".eval-item").removeClass("eon");
	            				};
	            			});
	            			_this.parents(".eval-item").find(".scstatus").removeClass("ftorange").addClass("ftgreen").html("已评价");
	            			_this.parents(".eval-item").find(".btn-a-white").removeClass("btn-a-white").html('<a href="'+ config.ctx + '/feedback/Window/' + orderId +'/detail" title="查看评价" target="_blank">查看评价</a>');                        	
	                    }
                    }/*,
                    error: function(){
                    	console.log(arguments);
                    }*/
                        
                });
    		});
    		$(".evaluation_wait",".batch-evaluation-list").on("click",function(){
    			var _this = $(this);
    			_this.parents(".eval-item").siblings(".eval-item").find(".evalform").slideUp(250,"linear",function(){
    				_this.parents(".eval-item").find(".evalform").delay(350).slideDown(250,"linear");
    				_this.parents(".eval-item").addClass("eon").siblings(".eval-item").removeClass("eon");
    				
    			});
    		});
            /* 分页提交数据 */
            $(".page_a", ".batch-evaluation-list").on("click", function(e){
                var pageNumber = $(e.target).data("pageNumber");
                page_submit(pageNumber);
            });
            //评价 内容
            var feedbackarr=["非常不满","不满意","一般","满意","非常满意"];
            $(".feedback_level > i", ".batch-evaluation-list").mouseover(function () {
                var _this = $(this);
                _this.prevAll().andSelf().removeClass("ico-stargrey");
                _this.prevAll().andSelf().addClass("ico-starblue");
                _this.parent().next().find("span").text($(this).index() + 1);
                _this.parent().next().next().text(feedbackarr[$(this).index()]);
                _this.nextAll().removeClass("ico-starblue");
                _this.nextAll().addClass("ico-stargrey");
                $(this).parent().data("templevel", $(this).index() + 1);
            });

            $(".feedback_level", ".batch-evaluation-list").mouseleave(function () {
                var $this = $(this);
                var level = $this.data("level");
                if (!level) {
                    level = 1;
                    $this.parent().data("level", 1);
                    $this.parent().data("templevel", 1);
                }
                $this.data("templevel", level);		//重置临时level状态
                $this.next().find("span").text(level);
                $this.next().next().text(feedbackarr[level - 1]);

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
            $(".feedback_level > i", ".batch-evaluation-list").click(function () {
                $(this).parent().data("level", $(this).parent().data("templevel"));
            });
        }
    };
});


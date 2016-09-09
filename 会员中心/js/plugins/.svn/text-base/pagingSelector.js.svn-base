define(["jquery","config","backbone","hbs!plugins/template/select","hbs!plugins/template/selectItem","_", "plugins/mask","json3"],
    function ($, config, Backbone, selectTmpl, selectItemTmpl, _, mask,JSON) {
    var pagingSelector = $(".pagingSelector");
    if (!pagingSelector && pagingSelector.length < 1){
        return {
            init: function(){}
        }
    }

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

    var Name = Backbone.Model.extend({});
    var Names = Backbone.Collection.extend({});
    var NameView = Backbone.View.extend({
        template: selectItemTmpl,
        events: {
            "click": "clickItem"
        },
        clickItem: function (e, flag) {
            e.stopPropagation();
            e.preventDefault();
            var name = this.model.get("name");
            var id = this.model.get("id");
            var input = this.$el.parents(".selectPaging").prev();
            input.val(id).data("name", name);
            this.$el.parents(".droplist").addClass("hide").prev().text(name);
            this.$el.addClass("current").siblings().removeClass("current");
            if (input.val() && input.data("clear")){
                this.$el.parents(".selectPaging").find(".dropclose").removeClass("hide");
            }
            if (!flag){
                input.change();
            }
        },
        initialize: function () {
            this.model.on("sync", _.bind(this.render, this));
        },
        render: function () {
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        }
    });

    var NameListView = Backbone.View.extend({
        className: "listitem",
        initialize: function (options) {
            this.inputEl = options.inputEl;
            this.model.on("sync", _.bind(this.render, this));
        },
        render: function () {
            var that = this;
            that.$el.empty();
            _.each(that.model.models, function (e) {
                var nameView = new NameView({model: e});
                nameView.$el.appendTo(that.$el);
                nameView.render();
            });
            return that;
        }
    });

    var NamesPanel = Backbone.View.extend({
        template: selectTmpl,
        className: "fmcont selectPaging",
        events: {
            "click .dropclose": "clearName",
            "click .goodsname": "clickName",
            "change .uc-ctrl-select": "fetchNames",
            "click .ucp-next": "next",
            "click .ucp-pre": "prev",
            "click .go": "gotoPage",
            "keyup input.curpage": "gotoPage"
        },
        isCollapsed: function(e){
            return $(e.target).hasClass("goodsname") || $(e.target).hasClass("name") ||
            $(e.target).hasClass("dpright") || $(e.target).parent().hasClass("dpright");
        },
        clearName: function(e){
            e.preventDefault();
            e.stopPropagation();
            this.$el.find(".listitem div").each(function(i, v){
                $(v).removeClass("current");
            });
            this.$el.find(".name").text("");
            this.inputEl.val(null);
            $(e.target).addClass("hide");
            this.inputEl.change();
            return false;
        },
        clickName: function(e){
            if (this.isCollapsed(e)){
                this.$el.find(".droplist").toggleClass("hide");
            }
        },
        hide: function(e){
            var that = $(e.target);
            if (that.hasClass("selectPaging") || that.parents(".selectPaging").length){
                if (!this.isCollapsed(e)){
                    if (that.hasClass("listitem") || that.parents("listitem").length){
                        this.$el.find(".droplist").addClass("hide");
                    }else{
                        this.$el.find(".droplist").removeClass("hide");
                    }
                }
            }else{
                this.$el.find(".droplist").addClass("hide");
            }
        },

        next: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(e.target);
            if (($this[0].tagName == "I" && $this.parent()[0].tagName == "A") || $this[0].tagName == "A"){
                var curpage = this.$el.find(".curpage").val();
                this.$el.find(".curpage").val((parseInt(curpage) + 1) || 1);
                this.fetchNames();
            }
            return false;
        },

        prev: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(e.target);
            if (($this[0].tagName == "I" && $this.parent()[0].tagName == "A") || $this[0].tagName == "A"){
                var curpage = this.$el.find(".curpage").val();
                this.$el.find(".curpage").val((curpage && (curpage > 1)) ? parseInt(curpage) - 1 : 1);
                this.fetchNames();
            }
            return false;
        },

        gotoPage: function (e) {
            var $this = $(e.target);
            if (e.which == 13 || ($this[0].tagName == "I" &&
                    $this.parent().hasClass("go")) || $this.hasClass("go")) {
                e.preventDefault();
                e.stopPropagation();
                this.fetchNames();
                return false;
            }
        },

        initialize: function (options) {
            this.inputEl = options.inputEl;
            this.nameListView = options.nameListView;
            this.model.on("sync", _.bind(this.render, this));
            this.init();
        },
        init: function(){
            var that = this;
            var width = that.inputEl.data("width");
            var itemWidth = that.inputEl.data("itemWidth");
            that.$el.html(that.template({"title":that.inputEl.data("title")}));
            that.$el.find(".goodsname").width(width);
            that.$el.find(".droplist").width(itemWidth||width);
            that.$el.find(".droplist").find("#paging").before(that.nameListView.$el);
            this.$el.find(".dropclose").addClass("hide");
        },
        fetchNames: function () {
            mask.block(".fmcont .droplist");
            this.model.fetch({data: this.serialize()});
        },
        setValue: function(url){
            var that = this;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "JSON",
                success: function (result) {
                    if (result){
                        var pageIndex = result.pageIndex;
                        var itemIndex = result.itemIndex;
                        that.$el.find(".curpage").val(pageIndex);
                        $(".go").click();
                        that.pageIndex = pageIndex;
                        that.itemIndex = itemIndex;
                    }
                }
            });
        },
        render: function () {
            var that = this;
            var paging = that.model.paging;
            mask.unblock(".fmcont .droplist");
            var prev = "", next = "";
            if (paging.get("currentPage") <= 1){
                prev = '<span class="ucp-pre"><i class="icon i6-12 ico-prearrow"  title="上一页"></i></span>';
            }else{
                prev = '<a href="javascript:void(0);" class="ucp-pre" title="上一页"><i class="icon i6-12 ico-prearrow"></i>上一页</a>';
            }
            if (paging.get("pages") <= paging.get("currentPage")){
                next = '<span class="ucp-next"><i class="icon i6-12 ico-nextarrow"  title="下一页"></i></span>';
            }else{
                next = '<a href="javascript:void(0);" class="ucp-next" title="下一页">下一页<i class="icon i6-12 ico-nextarrow"></i></a>';
            }

            var pagingHtml = '<div class="uc-pages">第<input class="curpage">页<a href="javascript:void(0);" class="go"><i class="icon i20'
                +' ico-enter"></i></a>，共<em class="uc-totalpage"></em>页'+prev+next+'</div>';
            that.$el.find("#paging").html(pagingHtml);
            that.inputEl.after(that.$el);
            that.inputEl.addClass("hide").removeClass("invisible");
            this.$el.find(".uc-totalrecords").text(paging.get("records"));
            this.$el.find(".curpage").val(paging.get("currentPage"));
            this.$el.find(".uc-totalpage").text(paging.get("pages"));
            if (that.itemIndex){
                that.$el.find(".listitem").children().eq(parseInt(that.itemIndex-1,10)).find("a").trigger("click",true);
                that.itemIndex = null;
            }
            if (that.inputEl.data("initUrl")){
                that.setValue(that.inputEl.data("initUrl"));
                that.inputEl.data("initUrl",null);
            }
            mask.unblock(".fmcont .droplist");
            return this;
        },
        serialize: function () {
            return {
                pageNumber: this.$el.find(".curpage").val()
            }
        }
    });

    return {
        init: function(){
            var fs = [];
            for (var i = 0; i < pagingSelector.length; i++) {
                var $name = $(pagingSelector[i]);
                var NameList = Names.extend({
                    model: Name,
                    url: function(){
                        return $name.data("url");
                    },
                    paging: new Paging,
                    parse: function (data) {
                        this.paging.set(data.paging);
                        return data.data;
                    }
                });
                var names = new NameList();
                var nameListView = new NameListView({model: names});
                var namesPanel = new NamesPanel({
                    model: names,
                    nameListView: nameListView,
                    inputEl: $name
                });
                fs[i] = namesPanel;
                names.fetch();
                $.fn.setSelectPagingValue = function(url){
                    namesPanel.setValue(url);
                };
                $name.data("selectPaging",fs[i]);
                $.fn.setSelectPagingValue = function(v){
                    var selectObj = this.data("selectPaging");
                    if (selectObj){
                        selectObj.setValue(v);
                    }
                }
            }

            if (fs.length > 0) {
                $(document).on("click", function(e) {
                    for (var i = 0; i < fs.length; i++) {
                        fs[i].hide(e);
                    }
                });
            }
        }
    }
});

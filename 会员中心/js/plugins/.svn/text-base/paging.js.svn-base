/**
 * Created by liuchuangui on 2014/5/30.
 */
define(["backbone", "_"], function (Backbone, _) {

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

    var Item = Backbone.Model.extend({
        defaults: {
            selected: false,
            disabled: false
        },

        isSelected: function () {
            return this.get("selected");
        },

        isDisabled: function () {
            return this.get("disabled");
        },

        disable: function () {
            this.set("disabled", true);
            this.collection.trigger("itemDisabled", this);
        },

        enable: function () {
            this.set("disabled", false);
            this.collection.trigger("itemEnabled", this);
        },

        select: function () {
            var trigger = arguments.length > 0 ? arguments[0] : true;
            this.collection.clearSelected();
            this.set("selected", true);
            if (trigger) {
                this.collection.trigger("selectChanged", this);
            }
        },

        deselect: function () {
            this.set("selected", false);
        }
    });

    var List = Backbone.Collection.extend({
        model: Item,
        paging: new Paging,
        /*parse: function (data) {
            this.paging.set(data.paging);
            return null;
        },*/
        currentSelected: function () {
            return _.find(this.models, function (e) {
                return e.isSelected()
            });
        },

        clearSelected: function () {
            _.each(this.models, function (e) {
                if (e.isSelected()) e.deselect();
            });
        },

        disableById: function (id) {
            var item = this.findById(id);
            if (item) item.disable();
        },

        enableById: function (id) {
            var item = this.findById(id);
            if (item) item.enable();
        },

        selectById: function (id, trigger) {
            trigger = arguments.length > 1 ? arguments[1] : true;
            var item = this.findById(id);
            if (item) item.select(trigger);
        },

        findById: function (id) {
            return _.find(this.models, function (e) {
                return e.get("id") == id;
            });
        },

        locateCurrent: function () {
            var current = this.currentSelected();
            if (!current) return;
            return this.locate(current.get("id"))
        },

        locate: function (id) {
            if (!id) return 1;
            var item = this.findById(id);
            if (item) {
                var index = _.indexOf(this.models, item);
                return Math.ceil((index + 1) / this.pageSize);
            } else {
                return 1;
            }
        },

        pageAt: function (targetPage) {
            var total = this.models.length;
            var pageSize = this.pageSize;
            if (total <= pageSize) {
                this.currentPage = 1;
                return this.models;
            }

            var totalPages = Math.ceil(total / pageSize);
            if (targetPage < 1) targetPage = 1;
            if (targetPage > totalPages) targetPage = totalPages;

            var start = (targetPage - 1) * pageSize;
            var end = start + pageSize;
            if (end > total) end = total;

            this.currentPage = targetPage;
            return _.map(this.models.slice(start, end), function (e) {
                return e;
            });
        },

        isLastPage: function () {
            return this.currentPage == this.totalPages;
        },

        isFirstPage: function () {
            return this.currentPage <= 1;
        },

        nextPage: function () {
            return this.pageAt(this.currentPage + 1);
        },

        prevPage: function () {
            return this.pageAt(this.currentPage - 1);
        }
    });

    var PageMultipleSelectItem = Item.extend({
        defaults: {
            selected: false,
            disabled: false
        },

        select: function () {
            var trigger = arguments.length > 0 ? arguments[0] : true;
            this.set("selected", true);
            if (trigger) {
                this.collection.trigger("selectChanged", this);
            }
        }

    });

    var PageMultipleSelectList = List.extend({
        model: PageMultipleSelectItem,
        currentSelected: function () {
            return _.filter(this.models, function (e) {
                return e.isSelected()
            });
        },
        selectAll: function () {
            _.each(this.models, function (e) {
                e.select();
            });
        }
    });

    var PagingView = Backbone.View.extend({
        template: null,
        tagName: "div",
        className: "uc-item br3",
        events: {
            "mouseenter": "mouseenter",
            "mouseleave": "mouseleave"
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

    var PagingListView = Backbone.View.extend({
        el: ".pagination",
        initialize: function (options) {
            this.pagingView = options.pagingView;
            this.model.on("sync", _.bind(this.render, this));
        },
        render: function () {
            var that = this;
            this.$el.empty();
            _.each(this.model.models, function (e) {
                this.pagingView.render().$el.appendTo(that.el);
            });
            that = null;
            return this;
        }
    });

    var PagingPanel = Backbone.View.extend({
        el: ".freights-panel",
        events: {
            "click .ucp-next": "next",
            "click .ucp-pre": "prev"
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

    return {
        List: List,
        Item: Item,
        PageMultipleSelectItem: PageMultipleSelectItem,
        PageMultipleSelectList: PageMultipleSelectList,
        PagingView: PagingView,
        PagingListView: PagingListView,
        PagingPanel: PagingPanel
    };
});
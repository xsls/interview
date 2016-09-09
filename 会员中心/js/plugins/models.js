define(["backbone", "_"], function (Backbone, _) {
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

        pageSize: 16,

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
            var total = this.models.length;
            var pageSize = this.pageSize;
            if (total <= pageSize) {
                return true;
            }

            var totalPages = Math.ceil(total / pageSize);
            return this.currentPage == totalPages;
        },

        isFirstPage: function () {
            return this.currentPage <= 1;
        },

        nextPage: function () {
            return this.pageAt(this.currentPage + 1);
        },

        prevPage: function () {
            return this.pageAt(this.currentPage - 1);
        },

        search: function (k) {
            if ($.isFunction(k)) {
                return _.map(_.filter(this.models, function (e) {
                    return k(e);
                }), function (e) {
                    return e.toJSON();
                });
            }

            return [];
        }
    });

    var MultipleSelectItem = Item.extend({
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

    var MultipleSelectList = List.extend({
        model: MultipleSelectItem,
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


    return {
        List: List,
        Item: Item,
        MultipleSelectItem: MultipleSelectItem,
        MultipleSelectList: MultipleSelectList
    };
});
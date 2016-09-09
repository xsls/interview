define([
    "jquery",
    "config",
    "backbone",
    "_",
    "json3",
    "plugins/models",
    "hbs!plugins/template/regions",
    "hbs!plugins/template/region",
    "hbs!plugins/template/tab",
    "hbs!plugins/template/dropdown"
], function ($, config, Backbone, _, JSON, Models, regionsTmpl, regionTmpl, tabTmpl, ddTmpl) {
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var ENTER_KEY = 13;
    var LENGTH_TO_TRIGGER = 1;
    var citySelector = $(".citySelector");

    if (!citySelector || !citySelector[0] || citySelector.length < 1){
        return {
            init: function(){}
        }
    }
    var all = "";

    $.ajax({
        type: "GET",
        url: config.ctx+"/resources/js/plugins/allRegion.json",
        async: false,
        dataType: "JSON",
        success: function (result) {
            all = result;
        }
    });

    var citiesMap = all.citiesMap;
    var areasMap = all.areasMap;
    var cities = all.cities;
    var provinces = all.provinces;
    var regions = all.regions;

    var CitySelectorView = Backbone.View.extend({
        events: {
            "click": "click",
            "keyup": "keyup"
        },
        rendered: false,
        initialize: function (options) {
            this.citySelectorContainerView = options.citySelectorContainerView;
            this.citySuggestionView = options.citySuggestionView;
            this.suggestionRegions = options.suggestionRegions;
            this.areasRegions = options.areasRegions;
            this.tabs = options.tabs;

            this.suggestionRegions.on("selectChanged", _.bind(this.suggestionSelected, this));
            this.areasRegions.on("selectChanged", _.bind(this.areasSelected, this));

            this.show = _.throttle(this.show, 500);
        },
        areasSelected: function (region) {
            this.updateInput(region.toJSON());
        },
        suggestionSelected: function (region) {
            if (region.get("type") == "cities") {
                this.showSelector();
                this.tabs.selectById("areas");
            }
            this.updateInput(region.toJSON());
        },
        updateInput: function (region) {
            var array = [], c = region;
            while (c) {
                array.push(c.name);
                c = c.parent;
            }
            var $el = $(this.el);
            if (this.citySelectorContainerView.regionsContainerView.citiesRegions.findById(region.parent.id)){
                $el.val(this.citySelectorContainerView.regionsContainerView.citiesRegions.findById(region.parent.id).get("parent").name.trim() + "-" + array.reverse().join("-"));
            }else{
                $el.val(array.reverse().join("-"));
            }
            var name = $el.attr("name") || $el.data("name");
            if (!name) throw Error("input NAME must be specified");
            $el.removeAttr("name").data("name", name);
            var regionHidden = $("[name='" + name + "']");
            if (regionHidden && regionHidden.length == 0) {
                $("<input type='hidden' name='" + name + "' value='" + region.id + "'>").insertAfter($el);
            } else {
                regionHidden.val(region.id);
            }
        },
        showSuggestion: function () {
            this.citySelectorContainerView.hide();
            this.citySuggestionView.search(this.$el.val());
            this.citySuggestionView.show();
            this.citySuggestionView.positionBelow(this.$el);
        },
        showSelector: function () {
            this.citySuggestionView.hide();
            this.citySelectorContainerView.show();
            this.citySelectorContainerView.positionBelow(this.$el);
        },
        click: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.render();
            var value = $(e.target).val();
            if (value && value.length > 0 && !this.$el.next().val()) {
                var arr = value.split("-");
                var tmp = arr[arr.length - 1];
                var matches = this.suggestionRegions.search(this.searchByNameType(tmp, "cities"));
                if (matches && matches.length == 1) {
                    this.suggestionRegions.selectById(matches[0].id);
                } else {
                    this.showSuggestion();
                }
            } else {
                this.tabs.reset(tabData);
                this.showSelector();
            }
            $(".citySelector ").each(function(i,o){
                var cityobj = $(o).data("cityobj");
                if (o.id != $(e.target).attr("id")){
                    cityobj.hide();
                }
            });
            return false;
        },
        keyup: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.render();
            switch (e.which) {
                case UP_KEY:
                    this.up();
                    break;
                case DOWN_KEY:
                    this.down();
                    break;
                case ENTER_KEY:
                    this.enter();
                    break;
                default:
                    this.clearHideValue();
                    this.show();
                    break;
            }
            return false;
        },
        down: function () {
            this.citySuggestionView.down();
        },
        enter: function () {
            this.citySuggestionView.choseRegion();
        },
        up: function () {
            this.citySuggestionView.up();
        },
        render: function () {
            if (!this.rendered) {
                this.citySuggestionView.$el.insertAfter(this.$el);
                this.citySuggestionView.render();
                this.citySelectorContainerView.$el.insertAfter(this.$el);
                this.citySelectorContainerView.render();
                this.rendered = true;
            }
        },
        searchByNameType: function (keyword, type) {
            return function (e) {
                return e.get("name").toLowerCase() == keyword.toLowerCase() && e.get("type") == type;
            }
        },
        hasContent: function () {
            var value = this.$el.val();
            return value != null && value.length >= LENGTH_TO_TRIGGER;
        },
        show: function () {
            var hasContent = this.hasContent();
            hasContent ? this.showSuggestion() : this.showSelector();
        },
        hide: function () {
            if (this.citySuggestionView)this.citySuggestionView.hide();
            if (this.citySelectorContainerView)this.citySelectorContainerView.hide();
        },
        clearHideValue: function () {
            $("[name='" + this.$el.data("name") + "']").val("");
        }
    });
    var CitySuggestionView = Backbone.View.extend({
        className: "citysuggest",
        template: ddTmpl,
        events: {
            "click a": "click"
        },
        initialize: function (options) {
            this.citiesMap = options.citiesMap;
            this.areasMap = options.areasMap;
            this.input = options.input;
        },
        click: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var selected = $(e.target);
            if (selected[0].tagName == "I"){
                selected = selected.parent();
            }
            var $input = selected.parent().parent().parent().children(":eq(0)");
            $input.val("");
            var regionId = selected.data("regionId");
            var type = selected.data("type");
            if (type == "cities" ){
                this.model.selectById(selected.data("regionId"));
            }else{
                this.model.selectById(selected.data("regionId"));
                var citiId = this.model.findById(selected.data("regionId")).get("parent").id;
                $.each(citiesMap, function(i ,v){
                    $.each(v,function(j,o){
                        if (o.id == citiId){
                            if ($input.val().split("-").length<3){
                                $input.val(o.parent.name.trim() + "-" + $input.val());
                            }
                        }
                    })
                });
            }
            this.clearActive();
            selected.addClass("active");
            return false;
        },
        up: function () {
            var active = this.$("a.active");
            this.clearActive();
            if (active.length == 0) {
                this.$("a:last").addClass("active");
            } else {
                var prev = active.prev();
                if (prev.length == 0) {
                    this.$("a:last").addClass("active");
                } else {
                    active.prev().addClass("active");
                }
            }
        },
        down: function () {
            var active = this.$("a.active");
            this.clearActive();
            if (active.length == 0) {
                this.$("a:first").addClass("active");
            } else {
                var next = active.next();
                if (next.length == 0) {
                    this.$("a:first").addClass("active");
                } else {
                    active.next().addClass("active");
                }
            }
        },
        choseRegion: function () {
            var selected = this.$("a.active");
            this.model.selectById(selected.data("regionId"));
        },
        clearActive: function () {
            this.$el.find("a.active").removeClass("active");
        },
        processKeyWord: function (keyword) {
            var arr = keyword.split("-");
            return arr[arr.length - 1];
        },
        searchByNameAndPinyin: function (keyword) {
            return function (e) {
                return e.get("name").toLowerCase().indexOf(keyword.toLowerCase()) >= 0 || e.get("pinyin").toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
            }
        },
        search: function (keyword) {
            if (!keyword) return;
            var k = this.processKeyWord(keyword);
            if (k && k.length >= LENGTH_TO_TRIGGER) {
                var matches = this.model.search(this.searchByNameAndPinyin(k));
                if (!matches || matches.length == 0) {
                    this.hide();
                    return;
                }
                this.$el.html(this.template({regions: matches, keyword: k}));
            }
        },
        positionBelow: function ($target) {
            var top = $target.position().top;
            var left = $target.position().left;
            var height = $target.outerHeight();
            this.$el.css({left: left, top: top + height});
        },
        hide: function () {
            this.$el.hide();
        },
        show: function () {
            this.$el.show();
        },
        isHidden: function () {
            return this.$el.is(":hidden");
        },
        resetInput: function(){
            var that = this;
            that.input.val(null);
            $("[name='"+that.input.data("hideName")+"']").val(null);
        },
        setValue: function ( v) {
            var that = this;
            var flag = true;
            if (v){
                this.model.selectById(v);
                _.each(that.areasMap, function (a) {
                    var area = _.find(a, function(c){
                        return c.id == v;
                    });
                    if (area){
                        _.each(that.citiesMap, function (citie) {
                            var city = _.find(citie, function(area_c){
                                return area_c.id == area.parent.id;
                            });
                            if (city){
                                that.input.val(city.parent.name.trim() + "-" + that.input.val());
                                flag = false;
                            }
                        });
                    }
                });
                if (flag){
                    that.resetInput();
                }
            }else{
                this.resetInput();
            }
        }
    });
    var CitySelectorContainerView = Backbone.View.extend({
        className: "cityselect",
        initialize: function (options) {
            this.tabsView = options.tabsView;
            this.regionsContainerView = options.regionsContainerView;
            this.areasRegions = options.areasRegions;
        },
        render: function () {
            this.$el.empty();
            this.$el.append(this.tabsView.render().$el);
            this.$el.append(this.regionsContainerView.render().$el);
        },
        positionBelow: function ($target) {
            var top = $target.position().top;
            var left = $target.position().left;
            var height = $target.outerHeight();
            this.$el.css({left: left, top: top + height});
        },
        hide: function () {
            this.$el.hide();
        },
        show: function () {
            this.$el.show();
        },
        isHidden: function () {
            return this.$el.is(":hidden");
        }
    });
    var TabsView = Backbone.View.extend({
        tagName: "p",
        className: "tabs",
        initialize: function (options) {
            this.model.on("reset", _.bind(this.render, this));
        },
        render: function () {
            var that = this;
            this.$el.empty();
            _.each(this.model.models, function (model) {
                var tabView = new TabView({model: model});
                that.$el.append(tabView.render().$el);
            });
            that = null;
            return this;
        }
    });
    var TabView = Backbone.View.extend({
        template: tabTmpl,
        events: {
            "click a": "changeTab"
        },
        initialize: function () {
            this.model.on("change", _.bind(this.render, this));
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        changeTab: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.model.isDisabled()) {
                this.model.select();
            }
            return false;
        }
    });
    var RegionView = Backbone.View.extend({
        template: regionTmpl,
        initialize: function () {
            this.model.on("change:selected", _.bind(this.render, this));
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    var RegionsView = Backbone.View.extend({
        className: "regions",
        template: regionsTmpl,
        events: {
            "click .prev a": "prevPage",
            "click .next a": "nextPage",
            "click .reglist a": "choseRegion"
        },
        initialize: function (options) {
            this.tabs = options.tabs;
            this.selected = options.selected;
            this.model.on("reset", _.bind(this.render, this));
            this.model.on("sync", _.bind(this.render, this));
        },
        choseRegion: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.model.selectById($(e.target).data("regionId"));
            if (this.$el.index() == 3){
                var $input = this.$el.parents(".cityselect").prev().prev();
                $input.data("cityobj").hide();
                $input.blur();
            }
            return false;
        },
        turnToPage: function (page) {
            this.renderPage(this.model.pageAt(page));
        },
        nextPage: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.renderPage(this.model.nextPage());
            return false;
        },
        prevPage: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.renderPage(this.model.prevPage());
            return false;
        },
        render: function () {
            this.$el.html(this.template());
            this.$regions = this.$el.find(".reglist");
            this.selected ? this.show() : this.hide();
            this.turnToPage(this.model.locateCurrent() || 1);
            return this;
        },
        renderPage: function (regions) {
            var that = this;
            this.$regions.empty();
            _.each(regions, function (region) {
                var regionView = new RegionView({model: region});
                that.$regions.append(regionView.render().$el);
            });
            if (this.model.isLastPage()) {
                this.$el.find(".next").addClass("disabled");
            } else {
                this.$el.find(".next").removeClass("disabled");
            }
            if (this.model.isFirstPage()) {
                this.$el.find(".prev").addClass("disabled");
            } else {
                this.$el.find(".prev").removeClass("disabled");
            }
            that = null;
        },
        hide: function () {
            this.$el.hide();
        },
        show: function () {
            this.turnToPage(this.model.locateCurrent() || 1);
            this.$el.show();
        }
    });

    var Tab = Models.Item.extend({
        initialize: function () {
        }
    });
    var Tabs = Models.List.extend({
        model: Tab,
        initialize: function () {
        }
    });
    var Region = Models.Item.extend({
        initialize: function (options) {
        }
    });
    var Regions = Models.List.extend({
        model: Region,
        initialize: function (model, options) {
            this.pageSize = 12;
            this.currentPage = 1;
        }
    });
    var h = [];
    for (var i = 0; i < 100; i++)h[i] = {"prefix": "hotCity", id: i, name: "热门" + i};
    var tabData = [
        {id: "hotCities", name: "热门城市", disabled: false, selected: true},
        {id: "provinces", name: "省份", disabled: false},
        {id: "cities", name: "城市", disabled: true},
        {id: "areas", name: "区县", disabled: true}
    ];

    var RegionsContainerView = Backbone.View.extend({
        initialize: function (options) {
            this.hotCitiesRegions = options.hotCitiesRegions;
            this.provincesRegions = options.provincesRegions;
            this.citiesRegions = options.citiesRegions;
            this.areasRegions = options.areasRegions;
            this.tabs = options.tabs;
            this.regionsViewMap = options.regionsViewMap;
            this.suggestionRegions = options.suggestionRegions;

            _.bindAll(this, "tabsSelected", "hotCitiesSelected", "provincesSelected", "citiesSelected", "suggestionSelected");
            this.hotCitiesRegions.on("selectChanged", this.hotCitiesSelected);
            this.provincesRegions.on("selectChanged", this.provincesSelected);
            this.citiesRegions.on("selectChanged", this.citiesSelected);
            this.areasRegions.on("selectChanged", this.areasSelected);
            this.tabs.on("selectChanged", this.tabsSelected);
            this.suggestionRegions.on("selectChanged", this.suggestionSelected);
        },
        render: function () {
            this.$el.empty();
            for (var id in this.regionsViewMap) {
                this.$el.append(this.regionsViewMap[id].render().$el);
            }
            return this;
        },
        hideAllRegions: function () {
            for (var id in this.regionsViewMap) {
                this.regionsViewMap[id].hide();
            }
        },
        suggestionSelected: function (region) {
            var data = region.toJSON();

            switch (data.type) {
                case "cities":
                    this.hotCitiesSelected(region);
                    break;
                default:
                    break;
            }
        },
        tabsSelected: function (tab) {
            this.hideAllRegions();
            this.regionsViewMap[tab.get("id")].show();
        },
        hotCitiesSelected: function (hotCity) {
            var data = hotCity.toJSON();
            this.provincesRegions.selectById(data.parent.id);
            this.citiesRegions.selectById(data.id);
            this.areasRegions.reset(areasMap[data.id]);
            this.tabs.selectById("areas");
            this.tabs.enableById("cities");
            this.tabs.enableById("areas");
        },
        provincesSelected: function (province) {
            this.citiesRegions.reset(citiesMap[province.get("id")]);
            this.areasRegions.reset([]);
            this.tabs.selectById("cities");
            this.tabs.enableById("cities");
            this.tabs.disableById("areas");
        },
        citiesSelected: function (city) {
            this.areasRegions.reset(areasMap[city.get("id")]);
            this.tabs.selectById("areas");
            this.tabs.enableById("areas");
        }
    });
    return {
        init: function () {
            if (citySelector && citySelector.length > 0) {
                var cs = [];

                for (var i = 0; i < citySelector.length; i++) {
                    $(citySelector[i]).on("focus", function(){
                        this.select();
                    });
                    var tabs = new Tabs(tabData);

                    var hotCitiesRegions = new Regions(cities);
                    var provincesRegions = new Regions(provinces);
                    var citiesRegions = new Regions();
                    var areasRegions = new Regions();
                    var regionsViewMap = {
                        hotCities: new RegionsView({model: hotCitiesRegions, tabs: tabs, selected: true}),
                        provinces: new RegionsView({model: provincesRegions, tabs: tabs}),
                        cities: new RegionsView({model: citiesRegions, tabs: tabs, disabled: true}),
                        areas: new RegionsView({model: areasRegions, tabs: tabs, disabled: true})
                    };
                    var suggestionRegions = new Regions(regions);
                    var citySelectorContainerView = new CitySelectorContainerView({
                        tabsView: new TabsView({model: tabs}),
                        regionsContainerView: new RegionsContainerView({
                            hotCitiesRegions: hotCitiesRegions,
                            provincesRegions: provincesRegions,
                            citiesRegions: citiesRegions,
                            areasRegions: areasRegions,
                            suggestionRegions: suggestionRegions,
                            tabs: tabs,
                            regionsViewMap: regionsViewMap
                        }),
                        areasRegions: areasRegions
                    });
                    var citySuggestionView = new CitySuggestionView({model: suggestionRegions, input: $(citySelector[i]), citiesMap: citiesMap, areasMap:areasMap});
                    var citySelectorView = new CitySelectorView({
                        el: $(citySelector[i]),
                        citySelectorContainerView: citySelectorContainerView,
                        citySuggestionView: citySuggestionView,
                        suggestionRegions: suggestionRegions,
                        areasRegions: areasRegions,
                        tabs: tabs
                    });
                    cs[cs.length++] = citySelectorView;
                    /* 初始化城市值 */
                    citySuggestionView.setValue($(citySelector[i]).data("value"));
                    citySelectorView.$el.data("cityobj",cs[i]);
                    $.fn.setCityValue = function(v){
                        var cityObj = this.data("cityobj");
                        if (cityObj){
                            cityObj["citySuggestionView"].setValue(v);
                        }
                    }
                }

                if (cs.length > 0) {
                    $(document).on("click", function () {
                        for (var i = 0; i < cs.length; i++) {
                            if (!cs[i].citySuggestionView.isHidden() || !cs[i].citySelectorContainerView.isHidden()) {
                                cs[i].hide();
                                cs[i].$el.blur();
                            }
                        }
                    });
                }
            }
        }
    };
});
define(["jquery", "config", "backbone", "_", "plugins/models", "hbs!plugins/template/channel", "hbs!plugins/template/message", "hbs!plugins/template/dialogue", "plugins/testData", "plugins/cometd", "easing"],
    function ($, config, Backbone, _, Models, channelTmpl, messageTmpl, dialogueTmpl, testData, cometd, easing) {
        var MessageCenterView = Backbone.View.extend({
            el: ".news",
            events: {
                "click": "noop",
                "click .newstree-top": "treeToggle"
            },
            initialize: function (options) {
                this.channelListView = options.channelListView;
            },
            noop: function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            },
            treeToggle: function (e) {
                e.stopPropagation();
                e.preventDefault();
                var $treemain = this.$el.find(".tree-main");
                var that = this;
                if ($treemain.is(":hidden")) {
                    $treemain.slideDown(500, function () {
                        $treemain.find(".newstree-body").mCustomScrollbar("update");
                        that.$el.find(".i-treetoggle").toggleClass("i-treetoggle-bot");
                        that = null;
                    });
                } else {
                    $treemain.slideUp(500, function () {
                        that.$el.find(".i-treetoggle").toggleClass("i-treetoggle-bot");
                        that = null;
                    });
                }

                return false;
            },
            render: function () {
                this.channelListView.render();
            },
            minimize: function () {
                var that = this;
                this.$el.find(".tree-main").slideUp(500, function () {
                    that.$el.find(".i-treetoggle").removeClass("i-treetoggle-bot");
                    that = null;
                });
            }
        });

        var Channel = Models.Item.extend({
            initialize: function () {
                this.messageList = new MessageList(this.get("messages"));
            },
            triggerClose: function () {
                this.trigger("close");
            },
            triggerMinimize: function () {
                this.trigger("minimize");
            }
        });
        var ChannelList = Models.List.extend({
            model: Channel,
            triggerCloseAll: function (a) {
                _.each(this.models, function (e) {
                    if (a != e)e.triggerClose();
                });
            },
            triggerMinimizeAll: function (a) {
                _.each(this.models, function (e) {
                    if (a != e)e.triggerMinimize();
                });
            },

            findByName: function (channelName) {
                if (!channelName) return;
                return _.find(this.models, function (e) {
                    return e.get("name") === channelName;
                });
            }
        });

        var Message = Models.Item.extend({
            defaults: {
                read: false
            },

            isUnread: function () {
                return !this.get("read");
            },

            markRead: function () {
                this.set("read", true);
            },
            markUnread: function () {
                this.set("read", false);
            }
        });

        var MessageList = Models.List.extend({
            model: Message,
            comparator: "-date",
            unreads: function () {
                return _.filter(this.models, function (e) {
                    return e.isUnread();
                });
            },
            countUnreads: function () {
                return this.unreads().length;
            },
            markReads: function () {
                _.each(this.models, function (e) {
                    e.markRead();
                });

                this.trigger("allReadsMarked");
            },
            markUneads: function () {
                _.each(this.models, function (e) {
                    e.markUnread();
                });
                this.trigger("allUnreadsMarked");
            }
        });

        var ChannelListView = Backbone.View.extend({
            el: ".news .newstree-body",

            initialize: function () {
                _.bindAll(this, "renderOne", "render");
                this.model.on("add", this.renderOne);
            },

            renderOne: function (model) {
                if (!model)return;
                var cv = new ChannelView({model: model});
                if (!this.isScroll()) {
                    this.$el.append(cv.$el);
                } else {
                    this.$el.find(".mCSB_container").prepend(cv.el);
                    this.$el.mCustomScrollbar("update");
                }
                cv.render();
            },

            isScroll: function () {
                return this.$el.find(".mCSB_container").length > 0;
            },

            render: function () {
                this.$el.empty();
                _.each(this.model.models, this.renderOne);
                this.$el.mCustomScrollbar();
            }
        });

        var ChannelView = Backbone.View.extend({
            tagName: "dl",
            className: "clearfix",
            template: channelTmpl,
            events: {
                "click": "showDialogue"
            },
            initialize: function () {
                _.bindAll(this, "render");
                this.dialogueView = new DialogueView({
                    model: this.model,
                    messageList: this.model.messageList
                });
                this.showDialogue = _.throttle(this.showDialogue, 1000);
                this.model.messageList.on("allReadsMarked", this.render);
                this.model.messageList.on("add", this.render);
            },
            render: function () {
                var ml = this.model.messageList;
                var dialog = $(".dia-body");
                var totalUnread = "";
                if (dialog && dialog.length>0 && !dialog.is(":hidden")){
                    _.each(ml.models,function(v,i){
                        v.set("read", true);
                    });
                    totalUnread = 0;
                }else{
                    totalUnread = ml.length > 0 ? ml.countUnreads() : 0;
                }
                var data = _.extend({}, (ml.length > 0 ? ml.first().toJSON() : {}), {totalUnread: totalUnread }, {channelName: this.model.get("name")});
                this.$el.html(this.template(data));
            },
            showDialogue: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.model.collection.triggerCloseAll(this.model);
                if (!this.dialogueView.rendered) {
                    $(".news").append(this.dialogueView.$el);
                    this.dialogueView.render();
                } else {
                    this.dialogueView.show();
                    this.dialogueView.showBody();
                }
                this.model.messageList.markReads();
                $(".dia-content").mCustomScrollbar("scrollTo","bottom");
                return false;
            }
        });

        var DialogueView = Backbone.View.extend({

            className: "dialogue-1 dialogue-box",

            template: dialogueTmpl,
            events: {
                "click .dia-min": "minimize",
                "click .dia-top-close": "toClose",
                "click .dia-close": "toClose",
                "click .dia-bottom": "maximize"
            },

            initialize: function (options) {
                _.bindAll(this, "render", "show", "close", "minimize");
                this.messageListView = new MessageListView({model: options.messageList});
                this.model.on("close", this.close);
                this.model.on("minimize", this.minimize);
            },
            render: function () {
                this.$el.html(this.template());
                this.$el.find(".dia-name").text(this.messageListView.model.models[0].toJSON()["fromUser"]);
                this.messageListView.setElement(this.$el.find(".dia-content"));
                this.messageListView.render();
                this.$el.data("width", this.$el.outerWidth());
                this.show();
                this.rendered = true;
                return this;
            },
            show: function () {
                $(".dialogue-box").removeClass("hide");
                $(".dia-body").removeClass("hide").css("margin-top",0);
                this.$el.css("right",100).animate({"right":300},"fast");
                this.$el.find(".dia-content").mCustomScrollbar("update");
            },
            close: function () {
                this.$el.addClass("hide");
            },
            toClose: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.close();
                return false;
            },
            showBody: function () {
                var $body = this.$el.find(".dia-body");
                $body.show("slow");
                $body.data("width", $body.outerWidth());
                $body.data("height", $body.height());
            },

            minimize: function () {
                var diaheight = parseInt($(".dia-body").css("margin-top"));
                if(diaheight==0){
                    $(".dia-body").animate({"margin-top":325},600,"easeInOutQuint");
                };
            },
            maximize: function () {
                var diaheight = parseInt($(".dia-body").css("margin-top"));
                if(diaheight!==0){
                    $(".dia-body").animate({"margin-top":0},600,"easeInOutQuint");
                };
                _.each(this.model.messageList.models,function(v,i){
                    v.set("read", true);
                });
                $(".info-num").eq(0).text("0");
                var dialog = $(".dia-content");
                if (dialog && dialog.length>0 && !dialog.is(":hidden")){
                    $(".dia-content").mCustomScrollbar("update");
                    $(".dia-content").mCustomScrollbar("scrollTo","bottom");
                }
            }
        });

        var MessageView = Backbone.View.extend({
            template: messageTmpl,
            tagName: "dl",
            className: "clearfix",

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
            }

        });

        var MessageListView = Backbone.View.extend({
            el: ".dialogue-box .dia-content",

            initialize: function () {
                _.bindAll(this, "render", "renderOne");
                this.model.on("reset", this.render);
                this.model.on("add", this.renderOne);
            },

            renderOne: function (model) {
                if (!model)return;
                var mv = new MessageView({model: model});
                if (!this.isScroll()) {
                    this.$el.append(mv.$el);
                } else {
                    this.$el.find(".mCSB_container").append(mv.$el);
                }
                mv.render();
            },

            isScroll: function () {
                return this.$el.find(".mCSB_container").length > 0;
            },

            render: function () {
                this.$el.empty();
                _.each(this.model.models, this.renderOne);
                this.$el.show();
                this.$el.mCustomScrollbar();
                return this;
            }
        });

        var cl = new ChannelList(testData.channelData);

        var messageCallback = function (cometMsg) {
            var message = JSON.parse(cometMsg.data);
            if (message.messageType == "S2P") {
                var msg = {
                    headPictureUrl: config.ctx + "/resources/img/temp.jpg",
                    fromUser: message.sender.displayName,
                    content: message.messageBody,
                    date: message.messageHead.sendDate
                };
                cl.models[0].messageList.add(msg);
                var dialog = $(".dia-content");
                if (dialog && dialog.length>0 && !dialog.is(":hidden")){
                    $(".dia-content").mCustomScrollbar("update");
                    $(".dia-content").mCustomScrollbar("scrollTo","bottom");
                }
            }
        };
        window.messageCallback = messageCallback;
        return {
            init: function () {
                var clv = new ChannelListView({model: cl});
                var mcv = new MessageCenterView({
                    channelListView: clv
                });
                window.mcv = mcv;

                mcv.render();
                $(document).click(function () {
                    mcv.minimize();
                    cl.triggerMinimizeAll();
                });
                cometd.comet.addDownstreamListener(messageCallback);

            }
        };
    });

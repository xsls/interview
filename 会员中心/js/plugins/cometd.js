define(['jquery', "backbone", "_", 'jquery_cometd', "jquery_cometd_reload", "jquery_cometd_ack", "config"],
    function ($, Backbone, _, cometd, reload, ack, config) {

        var Comet = Backbone.Model.extend({

            downstream: "/service/downstream",

            upstream: "/service/upstream",

            cmessage: "/service/cmessage",

            handshake: "/meta/handshake",

            connect: "/meta/connect",

            initialize: function (options) {
                this.userId = options.userId;
                this.on("handshakeSucceeded", _.bind(this.handshakeSucceeded, this));
                this.downstreamListener = [];
                this.upstreamListener = [];

            },

            handshakeSucceeded: function () {
                this.login();
                for (var i = 0; i < this.downstreamListener.length; i++) {
                    this.subscribeDownstream(this.downstreamListener[i]);
                }
                for (var i = 0; i < this.upstreamListener.length; i++) {
                    this.subscribeUpstream(this.upstreamListener[i]);
                }
            },

            addDownstreamListener: function (fn) {
                this.downstreamListener.push(fn);
            },

            addUpstreamListener: function (fn) {
                this.upstreamListener.push(fn);
            },

            unsubscribe: function () {
                $.cometd.unsubscribe(this.downstream);
                $.cometd.unsubscribe(this.upstream);
            },

            subscribeDownstream: function (fn) {
                try {
                    $.cometd.subscribe(this.downstream, fn);
                } catch (e) {
                    console.log(e);
                }
            },

            subscribeUpstream: function (fn) {
                try {
                    $.cometd.subscribe(this.upstream, fn);
                } catch (e) {
                    console.log(e);
                }
            },

            leave: function () {
                var that = this;
                $.cometd.batch(function () {
                    $.cometd.publish(this.cmessage,
                        {
                            "messageHead": {
                                "accessToken": "1234567",
                                "userId": config.userId
                            },
                            "messageType": "UOT",
                            "sender":{
                                id:config.userId,
                                displayName:""
                            },
                            contentType:"EMPTY"
                        });

                    this.unsubscribe();
                });
                $.cometd.disconnect();
            },

            join: function () {
                $.cometd.getExtension('reload').configure({cookieMaxAge: 15});

                var that = this;
                /* handshake listener to report client IDs */
                $.cometd.addListener(this.handshake, function (message) {
                    if (message.successful) {
                        that.trigger("handshakeSucceeded");
                        that.showLoggedOn();
                    } else {
                        that.showLoggedOff();
                    }
                });

                /* connect listener to report advice */
                $.cometd.addListener(this.connect, function (message) {
                    if (message.successful) {
                        that.showLoggedOn();
                    } else {
                        this.showLoggedOff();
                    }
                });
                var prop = { url: config.cometServerUrl, logLevel: "info" };
                /* Initialize CometD */
                /* configure and handshake*/
                $.cometd.init(prop);

                /* Setup reload extension */
                $(window).unload(function () {
                    $.cometd.reload({cookieMaxAge: 15});
                });
            },

            showLoggedOn: function () {
                $(".news-state", ".newstree-top").removeClass("news-red").addClass("news-green");
            },

            showLoggedOff: function () {
                $(".news-state", ".newstree-top").removeClass("news-green").addClass("news-red");
            },

            login: function () {
                $.cometd.publish('/service/upstream',
                    {
                        "messageHead": {
                           "accessToken": "1234567",
                           "userId": config.userId
                        },
                        "messageType": "ULG",
                        "sender":{
                            id:config.userId,
                            displayName:""
                        },
                        contentType:"EMPTY"
                    });
            }
        });
        return {
            comet: new Comet({userId: config.userId})
        };
    })
;

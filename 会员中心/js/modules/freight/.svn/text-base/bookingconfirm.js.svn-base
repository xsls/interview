define(["jquery", "jQvalidation", "jQmessage", "jQvalidationRule", "config", "plugins/miscs", "backbone", "_", "plugins/models", "hbs!modules/template/intended", "hbs!modules/template/booked", "plugins/cometd", "json3"],
    function ($, validator, message, validationRule, config, miscs, Backbone, _, Models, intendedTmpl, bookedTmpl, cometd, JSON) {
        var WaitBookingDialogue = Backbone.View.extend({
            msgMaxLength: 210,
            el: "#wait_booking_confirm",
            events: {
                "keydown #booking_truck_confirm_msg,keyup  #booking_truck_confirm_msg": "updateCount",
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.intendedList = options.intendedList;
                this.model.on("selectEnd", _.bind(this.show, this));
            },
            updateCount: function () {
                var msg = this.$el.find("#booking_truck_confirm_msg");
                if (msg && msg.val()) {
                    this.$el.find("#booking_truck_confirm_msg_len").text(msg.val().trim().length + "/" + this.msgMaxLength);
                }
            },
            show: function () {
                if (this.model.models.length == 0) return;
                var licenseNo = "";
                if (this.model.models.length > 1) {
                    licenseNo = "******";
                } else {
                    licenseNo = this.model.models[0].get("truckLicenseNo");
                }
                $("#stay_trucklicenseNo").text(licenseNo);
                $("#booking_truck_confirm_error_msg").val(null);
                this.updateCount();
                $(this.el).popup();
            },
            close: function () {
            	$("#booking_truck_confirm_error_msg").text("");
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                /* var freightresponseId = $("input[name=freightresponseId]").val();
                 var phone = $("input[name=phones]").val();*/
                var msg = this.$el.find("#booking_truck_confirm_msg").val();
                var arr = [];
                var phones = [];
                var truckIds = [];
                var truckLicenseNos = [];
                var driverIds = [];
                _.each(this.model.models, function (e) {
                    var data = e.toJSON();
                    arr.push(data.frId);
                    phones.push(data.phone);
                    truckIds.push(data.id);
                    driverIds.push(data.driverId);
                    truckLicenseNos.push(data.truckLicenseNo);
                });
                var that = this;
                if (!that.flag) {
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/bookingTruck/" + intendedList.freightId + "/stayConfirm",
                        data: {"ids": arr, "phones": phones, "msg": msg, "truckIds": truckIds, "driverIds": driverIds, "truckLicenseNos": truckLicenseNos},
                        dataType: "json",
                        success: function (data) {
                        	if(data.message=="ok"){
	                            //提示信息
	                            that.$el.find("#title_msg_popup").text("订车确认");
	                            that.$el.find("#result_msg_popup1").text("恭喜您，信息发送成功!");
	                            that.$el.find("#result_msg_popup2").text("您已成功预订所选车辆!");
	                            that.intendedList.remove(that.model.models);
	                            bookedList.add(that.model.models);
	                            that.model.reset([]);
	                            that.close();
                        	}else{
                        		that.$el.find("#booking_truck_confirm_error_msg").text(data.message);
                        	}
                        	that.flag = false;
                        }, error: function (data) {
                            that.$el.find("#booking_truck_confirm_error_msg").text("系统忙,稍后再试...");
                            that.flag = false;
                        }
                    });
                }
            }
        });
        var AlreadyBookedDialogue = Backbone.View.extend({
            msgMaxLength: 210,
            el: "#bookingtruck_cancel",
            events: {
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.bookedList = options.bookedList;
                this.intendedNum = options.intendedNum;
                this.model.on("selectAlreadyEnd", _.bind(this.show, this));
            },
            show: function () {
                if (this.model.models.length == 0) return;
                $.ajax({
                    type: "GET",
                    url: config.ctx + "/bookingTruck/frIdToOrder",
                    data: {"freightResponseId": this.model.models[0].get("frId")},
                    dataType: "json",
                    success: function (data) {
                        if (data.order) {
                            var order = data.order;
                            $("#order_popup_cancel_orderNo").text(order.orderNo || "");
                            $("#order_popup_cancel_shipperAddrName").text(order.shipperAddrName || "");
                            $("#order_popup_cancel_consigneeAddrName").text(order.consigneeAddrName || "");
                            $("#order_popup_cancel_truckLicenseNo").text(order.truckLicenseNo || "");
                            $("#order_popup_cancel_truckModel").text(order.truckModel || "");
                            $("#order_popup_cancel_driverName").text(order.driverName || "");
                        }
                        if (data.carrierLevel){
                            $("[name=sincerity_level]").val(data.carrierLevel || "");
                            $("[name=sincerity_level]").each(function(index, data){
                                $(this).next().remove().andSelf().after(miscs.calcLevel({
                                    level:$(this).val(),
                                    type:"user"
                                }));
                            });
                        }
                    }
                });
                $(this.el).popup();
            },
            close: function () {
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                var that = this;
                var frId = that.model.models[0].get("frId");
                var reason = $("[name='cancel_reason']:checked").val();
                var description = $("[name=cancel_description]").val();

                if (!that.flag) {
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/bookingTruck/cancel",
                        data: {"freightresponseId": frId, "description": description, "reason": reason},
                        dataType: "json",
                        success: function (data) {
                            if (data) {
                                $("#cancel_error_info").addClass("hide");
                                bookedList.remove(that.model.models);
                                intendedNum.minusSelf();
                                that.model.reset([]);
                                that.close();
                                that.flag = false;
                            } else {
                                $("#cancel_error").removeClass("hide");
                                that.flag = false;
                            }
                        }
                    });
                }
                ;
            }
        });
        var BatchNoticeDialogue = Backbone.View.extend({
            msgMaxLength: 140,
            el: "#sendnotice",
            events: {
                "click .cancel a": "close",
                "click .confirm a": "confirm"
            },
            initialize: function (options) {
                this.bookedList = options.bookedList;
                this.model.on("selectEnd", _.bind(this.show, this));
            },
            show: function () {
                if (this.model.models.length == 0) return;
                $("[name=sendnotice]").val("");
                $(this.el).popup();
            },
            close: function () {
                this.$el.find(".close").trigger("click");
            },
            confirm: function () {
                var that = this;
                var driverIds = [];
                var frIds = [];
                _.each(this.model.models, function (e) {
                    var data = e.toJSON();
                    driverIds.push(data.driverId);
                    frIds.push(data.frId);
                });
                var sendnotice = $("[name=sendnotice]").val();
                var data = {
                    driverids: driverIds,
                    content: sendnotice,
                    freightResponseIds: frIds
                };
                if (!that.flag) {
                    that.flag = true;
                    $.ajax({
                        type: "POST",
                        url: config.ctx + "/bookingTruck/batchNotice",
                        data: data,
                        dataType: "json",
                        success: function (data) {
                            if (data.success) {
                                $("#sendnotice_error").html("通知内容将以短信方式进行发送！");
                                that.close();
                                $("#sendnotice_info").popup();
                            } else {
                                $("#sendnotice_error").html("系统忙,稍后再试...");
                            }
                            that.flag = false;
                        },
                        error: function () {
                            $("#sendnotice_error").text("系统忙,稍后再试...");
                            that.flag = false;
                        }
                    });
                }

            }
        });
        var Count = Backbone.Model.extend({
            defaults: {
                count: -1
            },

            addSelf: function () {
                this.set("count", this.get("count") + 1);
            },

            minusSelf: function () {
                this.get("count", this.get("count") - 1);
            },

            setCount: function (count) {
                if (count == undefined) return;
                this.set("count", parseInt(count, 10));
            },

            getCount: function () {
                return this.get("count") == undefined ? 0 : this.get("count");
            }
        });
        var CountView = Backbone.View.extend({

            initialize: function () {
                this.model.on("change", _.bind(this.render, this));
            },

            render: function () {
                this.$el.html(this.model.get("count"));
                return this;
            }
        });

        var Booked = Models.MultipleSelectItem.extend({
            idAttribute: "truckId"
        });
        var BookedList = Models.MultipleSelectList.extend({
            model: Booked,

            url: function () {
                return config.ctx + "/bookingTruck/" + this.freightId + "/alreadyTruckList";
            },

            initialize: function (options) {
                this.already = options.already;
                this.on("add", _.bind(this.updateAlreadyCount, this));
                this.on("remove", _.bind(this.updateAlreadyCount, this));
                this.on("reset", _.bind(this.updateAlreadyCount, this));
            },

            defaultComparator: function (arg1, arg2) {
                return arg1.attributes["createTime"] - arg2.attributes["createTime"];
            },

            updateAlreadyCount: function () {
                this.already.setCount(this.models.length);
            },
            parse: function (data) {
                this.counts = data.length;
                return data;
            }
        });
        var BookedView = Backbone.View.extend({
            className: "uc-item br3",
            template: bookedTmpl,
            events: {
                "click .cancelbook a": "cancelBook",
                "click [name=ck-booked]": "choose"
            },
            initialize: function (options) {
                this.alreadyList = options.alreadyList;
                this.model.on("remove", _.bind(this.removeFromList, this));
            },
            render: function () {
                this.$el.hide();
                this.$el.html(this.template(this.model.toJSON()));
                this.$el.show("slide");
            },
            choose: function (ev) {
                ev.stopPropagation();
                var $target = $(ev.target);
                if ($target.is(":checked")) {
                    this.model.select();
                } else {
                    this.model.deselect();
                }
            },
            removeFromList: function () {
                var that = this;
                this.$el.fadeOut(500, function () {
                    that.remove();
                    that = null;
                });
            },
            cancelBook: function (ev) {
                $("input[name='freightResponseId_cancel']").val(this.model.toJSON().frId);
                ev.preventDefault();
                ev.stopPropagation();
                this.alreadyList.reset([this.model]);
                this.alreadyList.trigger("selectAlreadyEnd");
                return false;
            }

        });
        var BookedListView = Backbone.View.extend({

            initialize: function (options) {
                this.alreadyList = options.alreadyList;
                this.flag = false;
                this.count = 0;
                this.model.on("add", _.bind(this.addOne, this));
                this.model.on("reset", _.bind(this.render, this));
            },

            addOne: function (toAdd) {
                var bookedView = new BookedView({model: toAdd, alreadyList: alreadyList});
                if (this.flag) {
                    this.$el.prepend(bookedView.$el);
                } else {
                    this.count++;
                    if (this.model.counts == this.count) {
                        this.flag = true;
                    }
                    this.$el.append(bookedView.$el);
                }
                bookedView.render();
            },

            render: function () {
                _.each(this.model.models, this.addOne);
                return this;
            }
        });

        var Intended = Models.MultipleSelectItem.extend({
            idAttribute: "truckId",
            initialize: function (options) {
                this.freightResponseId = options.freightResponseId;
            },

            url: function () {
                return config.ctx + "/bookingTruck" + "/waitTruck/" + this.freightResponseId;
            }
        });

        var Polling = Backbone.Model.extend({

            defaults: {
                lastUpdated: undefined
            },

            initialize: function (options) {
                this.intendedList = options.intendedList;
                this.intendedNum = options.intendedNum; 
                this.pushed = options.pushed;
                this.freightId = options.freightId;
                this.on("sync", _.bind(this.update, this));
            },

            poll: function () {
                this.timerId = setInterval(_.bind(this.fetch, this), 5000);
            },

            cancel: function () {
                this.timerId && clearInterval(this.timerId);
            },

            getLastUpdated: function () {
                var last = _.last(_.sortBy(this.intendedList.models, function (e) {
                    return e.get("createTime")
                }));
                if (last) {
                    return last.get("createTime");
                }
            },

            update: function (a, b, c) {
                this.pushed.setCount(b.pushCount || 0);
                this.intendedNum.setCount(b.intenTruckCount || 0);
                this.intendedList.add(b.waitTruckList);
            },

            url: function () {
                var lastUpdated = this.getLastUpdated();
                return config.ctx + "/bookingTruck/" + this.freightId + "/waiting" + (lastUpdated ? "?lastUpdated=" + lastUpdated : "");
            }

        });

        var IntendedList = Models.MultipleSelectList.extend({
            model: Intended,

            initialize: function (options) {
                this.comparator = this.defaultComparator;
                this.on("remove", _.bind(this.triggerItemRemove, this));
                this.on("add", _.bind(this.updateWaitCount, this));
                this.on("reset", _.bind(this.updateWaitCount, this));
            },

            updateWaitCount: function () {
                this.wait.setCount(this.models.length);
            },

            url: function () {
                return config.ctx + "/bookingTruck/" + this.freightId + "/waitTruckList";
            },

            triggerItemRemove: function (item) {
                this.wait.setCount(this.models.length);
                item.trigger("remove");
            },

            defaultComparator: function (arg1, arg2) {
                return arg2.attributes["createTime"] - arg1.attributes["createTime"];
            },

            sortByDefault: function () {
                this.comparator = this.defaultComparator;
                this.sort();
            },

            sortByQuotePrice: function (asc) {
                this.comparator = function (arg1, arg2) {
                    return (arg1.attributes["quotePrice"] - arg2.attributes["quotePrice"]) * (asc ? 1 : -1);
                };
                this.sort();
            },
            sortBySincerityLevel: function (asc) {
                this.comparator = function (arg1, arg2) {
                    return (arg1.get("userCarrierInfo")["sincerityLevel"] - arg2.get("userCarrierInfo")["sincerityLevel"]) * (asc ? 1 : -1);
                };
                this.sort();
            },
            sortByDistance: function (asc) {
                this.comparator = function (arg1, arg2) {
                    //TODO: no distance variable
                    return 0;
                };
                this.sort();

            }
        });
        var IntendedView = Backbone.View.extend({
            className: "uc-item",
            template: intendedTmpl,
            events: {
                "click .book-btn": "book",
                "click [name=ck-scid]": "choose"
            },

            initialize: function (options) {
                this.toBookList = options.toBookList;
                this.model.on("remove", _.bind(this.removeFromList, this));
                this.model.on("change:selected", _.bind(this.updateSelected, this));
            },

            updateSelected: function () {
                if (this.model.isSelected()) {
                    this.$el.find(".ck-vt").prop("checked", "checked");
                } else {
                    this.$el.find(".ck-vt").prop("checked", false);
                }
                this.lineUpdateClass();
            },

            book: function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                this.toBookList.reset([this.model]);
                this.toBookList.trigger("selectEnd");
                return false;
            },

            choose: function (ev) {
                ev.stopPropagation();
                var $target = $(ev.target);
                if ($target.is(":checked")) {
                    this.model.select();
                } else {
                    this.model.deselect();
                }
            },

            render: function () {
                this.$el.hide();
                this.$el.html(this.template(this.model.toJSON()));
                this.$el.show("slide");
                this.lineUpdateClass();
            },

            removeFromList: function () {
                var that = this;
                this.$el.fadeOut(500, function () {
                    that.remove();
                    that.lineUpdateClass();
                    that = null;
                });
            },

            lineUpdateClass: function () {
                $(".intensioncar .uc-item-list > div:even", ".bookingconfirm_view").removeClass("bgwhite");
                $(".intensioncar .uc-item-list > div:odd", ".bookingconfirm_view").addClass("bgwhite");
            }
        });
        var IntendedListView = Backbone.View.extend({

            initialize: function (options) {
                this.toBookList = options.toBookList;
                _.bindAll(this, "addOne", "render");
                this.model.on("add", this.addOne);
                this.model.on("reset", this.render);
                this.model.on("sort", this.render);
            },

            addOne: function (toAdd) {
                var intendedView = new IntendedView({model: toAdd, toBookList: toBookList});
                this.$el.append(intendedView.el);
                intendedView.render();
            },
            render: function () {
                this.$el.empty();
                _.each(this.model.models, _.bind(this.addOne, this));
                $(".intensioncar .uc-item-list > div:even", ".bookingconfirm_view").removeClass("bgwhite");
                $(".intensioncar .uc-item-list > div:odd", ".bookingconfirm_view").addClass("bgwhite");
                return this;
            }
        });

        var IntendedSection = Backbone.View.extend({
            events: {
                "click .batch-book": "batchBook",
                "click #stay_truck_all_ck": "checkAll",
                "click .int-tablist ul li a": "sort"
            },

            sort: function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                var $target = $(ev.target);
                var sortBy = $target.data("sortBy");
                var asc = $target.data("curAsc") == null ? $target.data("asc") : !$target.data("curAsc");
                switch (sortBy) {
                    case "default":
                        this.model.sortByDefault();
                        break;
                    case "sincerityLevel":
                        this.model.sortBySincerityLevel(asc);
                        break;
                    case "quotePrice":
                        this.model.sortByQuotePrice(asc);
                        break;
                    case "distance":
                        this.model.sortByDistance(asc);
                        break;
                    default:
                        this.model.sortByDefault();
                        break;
                }
                $target.data("curAsc", asc);

                this.$el.find(".int-tablist ul li.crt").removeClass("crt");
                $target.parent("li").addClass("crt");
                asc ?
                    $target.find("a").removeClass(".ico-ordertop").addClass(".ico-taborder") :
                    $target.find("a").removeClass(".ico-taborder").addClass(".ico-ordertop");
                return false;
            },

            initialize: function (options) {
                this.toBookList = options.toBookList;
            },

            batchBook: function () {
                this.toBookList.reset([]);
                this.toBookList.add(this.model.currentSelected());
                this.toBookList.trigger("selectEnd");
            },

            checkAll: function (ev) {
                ev.stopPropagation();
                var $target = $(ev.target);
                if ($target.is(":checked")) {
                    this.model.selectAll();
                } else {
                    this.model.clearSelected();
                }
            }
        });

        var BookedSection = Backbone.View.extend({
            events: {
                "click #already_truck_all_ck": "checkAll",
                "click #batch_notice": "batchNotice",
                "click #batch_assign_truck": "assignTruck",
                "click #export_truck": "exportBtn"
            },

            sort: function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                var $target = $(ev.target);
                var sortBy = $target.data("sortBy");
                var asc = $target.data("curAsc") == null ? $target.data("asc") : !$target.data("curAsc");
                switch (sortBy) {
                    case "default":
                        this.model.sortByDefault();
                        break;
                    case "sincerityLevel":
                        this.model.sortBySincerityLevel(asc);
                        break;
                    case "quotePrice":
                        this.model.sortByQuotePrice(asc);
                        break;
                    case "distance":
                        this.model.sortByDistance(asc);
                        break;
                    default:
                        this.model.sortByDefault();
                        break;
                }
                $target.data("curAsc", asc);

                this.$el.find(".int-tablist ul li.crt").removeClass("crt");
                $target.parent("li").addClass("crt");
                asc ?
                    $target.find("a").removeClass(".ico-ordertop").addClass(".ico-taborder") :
                    $target.find("a").removeClass(".ico-taborder").addClass(".ico-ordertop");
                return false;
            },

            initialize: function (options) {
                this.sendNoticeList = options.sendNoticeList;
            },

            batchNotice: function () {
                this.sendNoticeList.reset([]);
                this.sendNoticeList.add(this.model.currentSelected());
                this.sendNoticeList.trigger("selectEnd");
            },

            exportBtn: function () {
                var models = this.model.currentSelected();
                if (models.length) {
                    var truckLicenses = [];
                    var truckModels = [];
                    var driverNames = [];
                    var phones = [];
                    var freightName = $("[name=freightName]").val();

                    _.each(models, function (e) {
                        var data = e.toJSON();
                        truckLicenses.push(data.truckLicenseNo);
                        truckModels.push(data.truckModelName);
                        driverNames.push(data.userName);
                        phones.push(data.phone);
                    });

                    var data = {
                        truckLicenses: truckLicenses,
                        truckModels: truckModels,
                        driverNames: driverNames,
                        freightName: freightName,
                        phones: phones
                    };
                    var $exportForm = $("#exportform");
                    if ($("#exportform").length) {
                        $exportForm.remove();
                    }

                    var $form = '<form id="exportform" action="' + config.ctx + '/bookingTruck/export" method="POST">';
                    $.each(truckLicenses, function (i, n) {
                        $form += '<input type="hidden" name="truckLicenses[' + i + ']" value="' + truckLicenses[i] + '" />';
                        $form += '<input type="hidden" name="truckModels[' + i + ']" value="' + truckModels[i] + '" />';
                        $form += '<input type="hidden" name="driverNames[' + i + ']" value="' + driverNames[i] + '" />';
                        $form += '<input type="hidden" name="phones[' + i + ']" value="' + phones[i] + '" />';
                    });
                    $form += '<input type="hidden" name="freightName" value="' + freightName + '" />';
                    $form += '</form>';
                    $("body").append($form);
                    $("#exportform").submit();
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
            }
        });

        var PanelView = Backbone.View.extend({
            el: ".svgpercent",
            initialize: function (options) {
                this.bookedList = options.bookedList;
                this.totalTransport = options.totalTransport;
                this.bookedList.on("add", _.bind(this.updateCount, this));
                this.bookedList.on("reset", _.bind(this.updateCount, this));
                this.bookedList.on("remove", _.bind(this.updateCount, this));
            },
            updateCount: function () {
                var currentBooked = _.reduce(this.bookedList.models, function (memo, booked) {
                    return memo + parseInt(booked.attributes.regTonnage, 10) || 0;
                }, 0);
                this.svgrun(currentBooked, this.totalTransport);
            },
            svgrun: function (num, total) {
                if (num == null || total == null || total === 0)return;
                var ratio = num <= total ? Math.ceil(num * 100 / total) : 100;
                this.$el.find(".ftpercent").html(ratio + "<em>%</em>");
                this.$el.find(".fttons").html(num + "<em class='tons'>吨</em>");
                if (num != 0 || total != 0) {
                    this.$el.find(".svgblue").animate({"top": (/*圆球总高度*/115 * (100 - ratio)) / 100 + /*圆球距底部高度修正*/12.5}, 4600 * (ratio / 100), 'linear');
                }
            }

        });

        var pushed = new Count;
        var wait = new Count;
        var intendedNum = new Count;
        var already = new Count;
        var intendedList = new IntendedList();
        intendedList.wait = wait;
        var bookedList = new BookedList({already: already});
        var toBookList = new Models.MultipleSelectList;
        var alreadyList = new Models.MultipleSelectList;
        var sendNoticeList = new Models.MultipleSelectList;
        var pushCallback = function (cometMsg) {
            var message = JSON.parse(cometMsg.data);
            if (message.messageType == "FFB") {
                var messageBody = JSON.parse(message.messageBody);
                if (messageBody.freightId == pushed.freightId) {
                    $.ajax({
                        type: "GET",
                        url: config.ctx + "/bookingTruck/" + pushed.freightId + "/updatePushCounts",
                        dataType: "json",
                        success: function (data) {
                            if (data.success) {
                                pushed.addSelf();
                            }
                        },
                        error: function () {
                        }
                    });
                }
            }
        };
        var freightResCallback = function (cometMsg) {
            var message = JSON.parse(cometMsg.data);
            if (message.messageType == "FR") {
                var messageBody = JSON.parse(message.messageBody);
                if (messageBody.freightId == intendedList.freightId) {
                    var intended = new Intended({freightResponseId: messageBody.freightResponseId});
                    intended.fetch({
                        success: function () {
                            intendedNum.setCount(intendedNum.getCount() + 1);
                            intendedList.add(intended);
                        }
                    });
                }
            }
        };

        var changeFreight = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var id = $("[name=id]").val();
            document.location = config.ctx + "/bookingTruck/winauto/" + (id||0) + "/view";
            return false;
        };
        window.config = config;
        /* 关闭货源  */
        var closeFreight = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var that = this;
            miscs.alert({
                width: 440,
                title: "结束发布",
                msgTitle: "确认结束发布您的货源吗 !",
                msgInfo: "结束货源后，您仍然可以对响应的车辆进行订车！",
                sign: true,
                iconCls: "iok",
                successBtn: "确认",
                cancelBtn: "取消",
                success: function () {
                    var freightId = $("[name=freightId]").val();
                    if (!that.flag) {
                        that.flag = true;
                        $.ajax({
                            type: "GET",
                            url: config.ctx + "/freight/closeFreight",
                            data: {id: freightId},
                            dataType: "json",
                            success: function (data) {
                                $("#freightStatus").val(data.status);
                                $("#close_freight_btn").remove();
                                $("#status").text("发布完成");
                                that.flag = false;
                            },
                            error: function () {
                                that.flag = false;
                            }
                        });
                    }

                },
                cancel: function () {

                }
            });
        };

        /* 检查平台是否有此车辆号 */
        var checklicenseNo = function () {
            var freightId = $("input[name=freightId]").val();
            var licenseNo = $("#already_exist_truck_trucklicenseNo").val();
            $(".ml10").html("");
            $.ajax({
                type: "GET",
                url: config.ctx + "/bookingTruck/licenseToTruck",
                data: {"trucklicenseNo": licenseNo, "freightId": freightId},
                dataType: "json",
                success: function (data) {
                    if (!data.length) {
                        $("input[name=trueName]").val(null);
                        $("input[name=truckCertStatus]").val(null);
                        window.bookedUser = [];
                        $(".list_disabled").val(null).removeAttr("disabled");
                        $(".plusdrop").css({"display": "none"});
                        $("[name=truckmodelId]").trigger("chosen:updated");
                        $("[name=truckmodelId]").chosen();
                        $(".plusdrop ul").html("");
                        return;
                    }

                    var tempData;
                    if (data.length != 0) {
                        tempData = data[0];
                    }
                    $(".ml10").html('<a target="_blank" href="'+config.ctx+'/truck/Window/'+tempData.truckId+'" class="ftblue">查看车辆详情</a>');
                    if (tempData && tempData.bookingStatus != 2 && (tempData.orderStatus == 5 || tempData.orderStatus != 6)) {
                        if (tempData.truckmodelId) {
                            $("[name=truckmodelId]").val(tempData.truckmodelId);
                            $("[name=truckmodelId]").attr("disabled", "disabled");
                            $("[name=truckmodelId]").trigger("chosen:updated");
                            $("[name=truckmodelId]").chosen();
                        }
                        $("input[name=truckCertStatus]").val(tempData.truckCertStatus);
                        $("[name=regTonnage]").val(tempData.regTonnage);
                        if (tempData.trueName && tempData.userId) {
                            window.bookedUser = [];
                            if (data.length > 1) {
                                var liView = "";
                                for (var i = 0; i < data.length; i++) {
                                    liView += '<li data-truename="' + data[i].trueName + '" data-user-id="' + data[i].userId + '" data-phone="' + data[i].phone + '">' + data[i].trueName + '</li>';
                                    window.bookedUser.push({
                                        trueName: data[i].trueName,
                                        userId: data[i].userId,
                                        phone: data[i].phone
                                    });
                                }
                                $(".plusdrop ul").html(liView);
                                $(".plusdrop").css({"display": "block"});
                            } else {
                                $(".plusdrop").css({"display": "none"});
                            }
                            window.bookedUser.push({
                                trueName: tempData.trueName,
                                userId: tempData.userId,
                                phone: tempData.phone
                            });
                            $("[name=trueName]").val(tempData.trueName);
                            $("[name=userId]").val(tempData.userId);
                            $("[name=phone]").val(tempData.phone);
                        }
                        if (tempData.bookingStatus) {
                            if (tempData.bookingStatus == 2 && (tempData.orderStatus == 5 || tempData.orderStatus != 6)) {
                                $("[name=bookingStatus]").val(tempData.bookingStatus);
                            } else if (tempData.bookingStatus == 1) {
                                $("[name=bookingStatus]").val(tempData.bookingStatus);
                            } else {
                                $("[name=bookingStatus]").val("");
                            }
                        } else {
                            $("[name=bookingStatus]").val("");
                        }
                        if (tempData.freightResponseId) {
                            $("[name=bookedFreightResponseId]").val(tempData.freightResponseId);
                        }

                        if (!$("[name=quotePrice]").attr("disabled") && tempData.bookingStatus == "1") {
                            $("[name=quotePrice]").val(tempData.quotePrice);
                            $("[name=quotePrice]").attr("disabled", "disabled");
                        }

                        if (tempData.truckId) {
                            $("input[name=truckId]").val(tempData.truckId);
                        }

                        $(".list_disabled").attr("disabled", "disabled");
                        $(".list_disabled").blur();
                        $("[name=phone]").attr("disabled", null);
                    } else {
                        window.bookedUser = [];
                        $("input[name=trueName]").val(null);
                        $(".list_disabled").val(null).removeAttr("disabled");
                        $(".plusdrop").css({"display": "none"});
                    }
                }
            });
        };

        /* 清空 */
        var cleanBooked = function () {
            $("input[name=trueName]").val(null);
            window.bookedUser = [];
            $(".list_disabled").val(null).removeAttr("disabled");
            $(".plusdrop").css({"display": "none"});
            $("[name=truckmodelId]").trigger("chosen:updated");
            $("[name=truckmodelId]").chosen();
            $(".plusdrop ul").html("");
        };

        var ofsPush = function (e) {
            var that = $(e.target);
            if (!that.hasClass("pushcrt")) {
                miscs.alert({
                    width: 440,
                    title: "智能推送",
                    msgTitle: "是否允许平台选择匹配的车辆，进行智能推送！",
                    iconCls: "iok",
                    successBtn: "确认",
                    cancelBtn: "取消",
                    success: function () {
                        if (!that.flag) {
                            that.flag = true;
                            $.ajax({
                                type: "GET",
                                url: config.ctx + "/bookingTruck/" + $("[name=id]").val() + "/pushFreight",
                                dataType: "json",
                                success: function (data) {
                                    if (data.success) {
                                        that.addClass("pushcrt");
                                        miscs.alert({
                                            title: "系统消息",
                                            msgTitle: "货源推送成功!",
                                            iconCls: "iok",
                                            successBtn: "关闭"
                                        });
                                    }
                                    that.flag = false;
                                },
                                error: function () {
                                    that.flag = false;
                                }
                            });
                        }

                    },
                    cancel: function () {

                    }
                });
            }
        };

        var checklicenseNoBlur = function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".ml10").html("");
            var freightId = $("input[name=freightId]").val();
            var licenseNo = $("#already_exist_truck_trucklicenseNo").val();
            if (!licenseNo) {
                cleanBooked();
            } else {
                $.ajax({
                    type: "GET",
                    url: config.ctx + "/" +
                        "",
                    data: {"trucklicenseNo": licenseNo, "freightId": freightId},
                    dataType: "json",
                    success: function (data) {
                        if (!data.length) {
                            cleanBooked();
                            return;
                        }
                        var tempData = data[0];
                        $(".ml10").html('<a target="_blank" href="'+config.ctx+'/truck/Window/'+tempData.truckId+'" class="ftblue">查看车辆详情</a>');
                        if (tempData && tempData.bookingStatus != 2 && (tempData.orderStatus == 5 || tempData.orderStatus != 6)) {
                            if (tempData.truckmodelId) {
                                $("[name=truckmodelId]").val(tempData.truckmodelId);
                                $("[name=truckmodelId]").attr("disabled", "disabled");
                                $("[name=truckmodelId]").trigger("chosen:updated");
                                $("[name=truckmodelId]").chosen();
                            }

                            $("[name=regTonnage]").val(tempData.regTonnage);
                            if (tempData.trueName && tempData.userId) {
                                window.bookedUser = [];
                                if (data.length > 1) {
                                    var liView = "";
                                    for (var i = 0; i < data.length; i++) {
                                        liView += '<li data-truename="' + data[i].trueName + '" data-user-id="' + data[i].userId + '" data-phone="' + data[i].phone + '">' + data[i].trueName + '</li>';
                                        window.bookedUser.push({
                                            trueName: data[i].trueName,
                                            userId: data[i].userId,
                                            phone: data[i].phone
                                        });
                                    }
                                    $(".plusdrop ul").html(liView);
                                    $(".plusdrop").css({"display": "block"});
                                } else {
                                    $(".plusdrop").css({"display": "none"});
                                }
                                window.bookedUser.push({
                                    trueName: tempData.trueName,
                                    userId: tempData.userId,
                                    phone: tempData.phone
                                });
                                $("[name=trueName]").val(tempData.trueName);
                                $("[name=userId]").val(tempData.userId);
                                $("[name=phone]").val(tempData.phone);
                            }
                            if (tempData.bookingStatus) {
                                if (tempData.bookingStatus == 2 && (tempData.orderStatus == 5 || tempData.orderStatus != 6)) {
                                    $("[name=bookingStatus]").val(tempData.bookingStatus);
                                } else if (tempData.bookingStatus == 1) {
                                    $("[name=bookingStatus]").val(tempData.bookingStatus);
                                } else {
                                    $("[name=bookingStatus]").val("");
                                }
                            } else {
                                $("[name=bookingStatus]").val("");
                            }
                            if (tempData.freightResponseId) {
                                $("[name=bookedFreightResponseId]").val(tempData.freightResponseId);
                            }

                            if (!$("[name=quotePrice]").attr("disabled") && tempData.bookingStatus == "1") {
                                $("[name=quotePrice]").val(tempData.quotePrice);
                                $("[name=quotePrice]").attr("disabled", "disabled");
                            }

                            if (tempData.truckId) {
                                $("input[name=truckId]").val(tempData.truckId);
                            }

                            $(".list_disabled").attr("disabled", "disabled");
                            $("[name=phone]").attr("disabled", null);
                        } else {
                            cleanBooked();
                        }
                    }
                });
            }
        };

        /* 添加已订车辆第一步 */
        var alreadybookingtruck_popup = function () {
            $("#already_exist_truck").popup();
        };
        /* 添加已订车辆 第二步*/
        var alreadybookingtruck_popup2 = function () {
            if (!$("#addTruckForm").valid()) {
                return;
            }
            $('#already_exist_truck').popup({
                close: true
            });
            $("#already_trucklicenseNo").text($("#already_exist_truck_trucklicenseNo").val());
            $("#already_exist_truck_push").popup();
        };

        /* 返回上一步 */
        var backbookingtruckpopup2 = function () {
            $("#already_exist_truck_push").popup({close: true});
            $("#already_exist_truck").popup({oldWin: true});

        };
        
        var already_exist_truck_push_close = function(){
        	$("#already_booking_truck_confirm_error_msg").text("");
        }

        /* 添加已订车辆 第三步 */
        var alreadybookingtruck_popup3 = function () {

            $("#already_booking_truck_confirm_error_msg").text("");
            var truckmodelId = $("[name=truckmodelId]").val();
            var regTonnage = $("[name=regTonnage]").val();
            var trueName = $("[name=trueName]").val();
            var phone = $("[name=phone]").val();
            var freightId = $("input[name=freightId]").val();
            var trucklicenseNo = $("#already_exist_truck_trucklicenseNo").val();
            var remark = $("[name=remark]").val();
            var bookingStatus = $("[name=bookingStatus]").val();
            var quotePrice = $("[name=quotePrice]").val();
            var msg = $("#add_already_booking_truck_msg").val();
            var freightResponseId = $("[name=bookedFreightResponseId]").val();
            var truckId = $("[name=truckId]").val();
            var userId = $("[name=userId]").val();
            var description = $("#bookedDescription").val();

            $("#add_success_truck").text(trucklicenseNo);
            var that = this;
            var jData = {
                "truckId": truckId,
                "userId": userId,
                "truckmodelId": truckmodelId,
                "freightResponseId": freightResponseId,
                "regTonnage": regTonnage,
                "userName": trueName,
                "phone": phone,
                "bookingStatus": bookingStatus,
                "freightId": freightId,
                "trucklicenseNo": trucklicenseNo,
                "quotePrice": quotePrice,
                "description": description,
                "remark": remark,
                "msg": msg
            };
            if (!that.flag) {
                that.flag = true;
                $.ajax({
                    type: "POST",
                    url: config.ctx + "/bookingTruck/saveAlreadyBookingTruck",
                    data: jData,
                    dataType: "json",
                    success: function (data) {
                        if (data.success) {
                            jData.orderId = data.orderId;
                            jData.driverId = data.userId;
                            jData.createTime = data.createTime;
                            jData.truckCertStatus = data.truckCertStatus;
                            jData.truckLicenseNo = trucklicenseNo;
                            jData.frId = data.freightResponseId;
                            jData.sincerityLevel = data.sincerityLevel;
                            jData.unitName = $("#priceUnitName").text();
                            var booked = new Booked(jData);
                            bookedList.add(booked);
                            intendedList.remove(intendedList.findById(jData.truckId));
                            intendedNum.addSelf();
                            $("#already_trucklicenseNo").text($("#already_exist_truck_trucklicenseNo").val());
                            $('#already_exist_truck_push').popup({close: true});
                            $("#bookedDescription").val(null);
                            $("#already_exist_truck_success").popup();
                        } else {
                            $("#already_booking_truck_confirm_error_msg").text(data.message);
                        }
                        that.flag = false;
                    },
                    error: function (data) {
                        $("#already_booking_truck_confirm_error_msg").text(data.message);
                        that.flag = false;
                    }
                });
            }
        };

        /* 车辆号下拉列表  */
        var trucklicenseNoList = function (e) {
            e.stopPropagation();
            var _this = $(this);
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(function () {
                //标记是否为自定义车辆还是平台已有车辆。
                var freightId = _this.data("freightId");
                var no = $(_this).val();
                var _list = $("#already_exist_truck_trucklicenseNo_list");
                _list.addClass("hide");
                $.ajax({
                    type: "GET",
                    url: config.ctx + "/bookingTruck/query/trucklicenseNo",
                    data: {"trucklicenseNo": no, "freightId": freightId},
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.length) {
                            var dom = "";
                            $.each(data, function (i, o) {
                                if (o.status == 2) {
                                    dom += '<li class="alreadybook licenseno readOnly_list" style="cursor: default;"><span class="ftgrey">' + o.truckLicense_No + '</span>';
                                } else {
                                    dom += '<li class="licenseno" data-licenseno="' + o.truckLicense_No + '"><span>' + o.truckLicense_No + '</span>';
                                }
                                if (o.truck_cert_status == 3) {
                                    dom += '<i class="icon i31-20 ico-idcerti ml10"></i>';
                                }
                                if (o.status == 2) {
                                    dom += '<span class="ftblue fr">' + o.statusName + '</span>';
                                } else if (o.status == 1) {
                                    dom += '<span class="ftorange fr">' + o.statusName + '</span>';
                                }
                                dom += "</li>";
                            });
                            _list.html(dom);
                            _list.removeClass("hide");
                        } else {
                            _list.html("");
                        }
                    },
                    error: function () {

                    }
                });
            }, 350);
        };

        /* 关闭车牌号下拉列表 */
        var closeTruckLicenseNoList = function (e) {
            var _list = $("#already_exist_truck_trucklicenseNo_list");
            var _current = $(e.target);
            var licenseNo = "";
            var $plusdrop = $(".plusdrop");
            if (_current.attr("name") == "trueName") {
                if ($(".plusdrop ul").html().trim()) {
                    $(".plusdrop").toggleClass("hide");
                }
            } else {
                if (!_current.parents(".plusdrop").length && !_current.hasClass("plusdrop")) {
                    $(".plusdrop").addClass("hide");
                } else if (_current[0].tagName == "LI") {
                    $("[name=trueName]").val(_current.data("truename"));
                    $("[name=userId]").val(_current.data("userId"));
                    $("[name=phone]").val(_current.data("phone"));
                    $(".plusdrop").addClass("hide");
                }
            }

            if (_current.hasClass("readOnly_list") || _current.parents("li").hasClass("readOnly_list")) {
                return false;
            }
            if (_current.hasClass("licenseno")) {
                licenseNo = _current.data("licenseno");
            }
            if (_current.parents("li").hasClass("licenseno")) {
                licenseNo = _current.parents("li").data("licenseno");
            }
            if (licenseNo) {
                $("#already_exist_truck_trucklicenseNo").val(licenseNo);
                checklicenseNo();
            }

            if (_current.attr("id") != 'already_exist_truck_trucklicenseNo') {
                if (!_list.hasClass("hide")) {
                    _list.addClass("hide");
                }
            } else {
                if (e.target.value != "") {
                    _list.toggleClass("hide");
                }
            }
        };

        return {
            init: function () {
                var freightId = $("[name='id']").val();
                if (freightId) {
                    intendedList.freightId = freightId;
                    bookedList.freightId = freightId;
                    pushed.freightId = freightId;
                    wait.freightId = freightId;
                    intendedNum.freightId = freightId;
                    already.freightId = freightId;
                    var intendedListView = new IntendedListView({el: ".intensioncar .uc-item-list", model: intendedList, toBookList: toBookList});
                    var bookedListView = new BookedListView({el: ".bookedcar .uc-item-list", model: bookedList, alreadyList: alreadyList});
                    var pushedView = new CountView({el: ".booktotal .push .btnum", model: pushed});
                    var intendedNumView = new CountView({el: ".booktotal .wait .btnum", model: intendedNum});
                    var alreadyView = new CountView({el: ".booktotal .already .btnum", model: already});
                    var waitListView = new CountView({el: ".waitListNum", model: wait});
                    var alreadyListView = new CountView({el: ".alreadyListNum", model: already});
                    var waitBookingDialogue = new WaitBookingDialogue({model: toBookList, intendedList: intendedList});
                    var alreadyBookedDialogue = new AlreadyBookedDialogue({model: alreadyList, bookedList: bookedList, intendedNum: intendedNum});
                    var batchNoticeDialogue = new BatchNoticeDialogue({model: sendNoticeList, bookedList: bookedList});
                    var intendedSection = new IntendedSection({el: ".intensioncar", model: intendedList, toBookList: toBookList});
                    var bookedSection = new BookedSection({el: ".bookedcar", model: bookedList, sendNoticeList: sendNoticeList});
                    var panelView = new PanelView({el: ".svgpercent", totalTransport: window.totalTransport, bookedList: bookedList});
//                    intendedList.fetch();
                    bookedList.fetch();
//                    pushed.setCount($(".booktotal .push .btnum").text() || 0);
                    intendedNum.setCount($(".booktotal .wait .btnum").text() || 0);
                    var polling = new Polling({intendedList: intendedList, pushed: pushed, freightId: freightId, intendedNum: intendedNum});
                    polling.fetch();
                    polling.poll();
                    /*
                     cometd.comet.addDownstreamListener(pushCallback);
                     cometd.comet.addDownstreamListener(freightResCallback);
                     */
                }
                $("[name=id]", ".bookingconfirm_view").on("change", changeFreight);
                $("#close_freight_btn", ".bookingconfirm_view").on("click", closeFreight);
                $("#already_exist_truck_btn", ".bookingconfirm_view").on("click", alreadybookingtruck_popup);
                $("#already_exist_truck_trucklicenseNo", ".bookingconfirm_view").on("keyup", trucklicenseNoList);
                $("#already_exist_truck_trucklicenseNo", ".bookingconfirm_view").on("click", trucklicenseNoList);
                $("#already_exist_truck_trucklicenseNo", ".bookingconfirm_view").on("blur", checklicenseNoBlur);
                //$("#already_exist_truck_push_btn", ".bookingconfirm_view").on("click", alreadybookingtruck_popup1);
                $("#back_already_exist_truck", ".bookingconfirm_view").on("click", backbookingtruckpopup2);
                $("#already_exist_truck_push_btn", ".bookingconfirm_view").on("click", alreadybookingtruck_popup2);
                $("#already_exist_truck_push_btn1", ".bookingconfirm_view").on("click", alreadybookingtruck_popup3);
                $("#already_exist_truck_push_close", ".bookingconfirm_view").on("click", already_exist_truck_push_close);
                $("#156push", ".bookingconfirm_view").on("click", ofsPush);
                $("input[name=trueName]", ".bookingconfirm_view").on("blur", function (e) {
                    if (!$(".plusdrop ul").html().trim()) {
                        $("[name=userId]").val(null);
                        $("[name=phone]").val(null);
                        return;
                    }
                    var $input = $(e.target);
                    var flag = true;
                    $.each(window.bookedUser, function (i, v) {
                        if (v.trueName == $input.val()) {
                            flag = false;
                            $("[name=trueName]").val(v.trueName);
                            $("[name=userId]").val(v.userId);
                            $("[name=phone]").val(v.phone);
                            $("[name=phone]").blur();
                            return;
                        }
                    });

                    if (flag) {
                        $("[name=userId]").val(null);
                        $("[name=phone]").val(null);
                    }
                });

                $("#already_exist_truck_success_close_btn", ".bookingconfirm_view").on("click", function () {
                    cleanBooked();
                    $("[name=remark]").val(null);
                    $("#already_exist_truck_trucklicenseNo").val(null);
                    $("#already_exist_truck_success").popup({close: true});
                });
                $("#continue_already_exist_truck", ".bookingconfirm_view").on("click", function () {
                    $("#already_exist_truck_success").popup({close: true});
                    $("#already_exist_truck_trucklicenseNo").val("");
                    $("#already_exist_truck_trucklicenseNo").blur();
                    alreadybookingtruck_popup();
                });
                $(document).click(closeTruckLicenseNoList);
                //添加已订车
                $(".car-keyword li").last().css("border-bottom", "none");
                $(".car-keyword").on("mouseover", "li", function () {
                    $(this).addClass("cur").siblings().removeClass("cur");
                });

                /*下拉提示*/
                $(".car-search").keyup(function (event) {
                    if (event.which != 38 && event.which != 40 && event.which != 13) {
                        $(".car-keyword").removeClass("hide");
                    }
                });

                miscs.areaLength($(".msgLengthArea"));

                $(".pushtype a,.help", ".bookingconfirm_view").hover(function () {
                        $(this).children(".tipmsg").show();
                    }, function () {
                        $(this).children(".tipmsg").hide();
                    }
                );

                /* 打开取消订单 */
                $("[name=bookingtruck_cancel_list]").click(function () {
                    var orderNo = $(this).data("orderNo");
                    var orderId = $(this).data("orderId");
                    var freightresponseId = $(this).data("freightresponseId");
                    var truckLicenseNo = $(this).data("truckLicenseNo");
                    var truckmodelName = $(this).data("truckmodelName");
                    var truename = $(this).data("truename");

                    $("#cancel_orderno").text(orderNo);
                    $("#cancel_truckLicenseno").text(truckLicenseNo);
                    $("#cancel_truckmodelname").text(truckmodelName);
                    $("#cancel_truename").text(truename);

                    $("[name=cancel_freightResponse]").val(freightresponseId);
                    $("[name=cancel_orderId]").val(orderId);

                    $("#bookingtruck_cancel").popup({close: true});
                });

                /* 初始化select */
                $("[name=id]", ".bookingconfirm_view").next().css({"width": "360px"});

                /* 已订车全选 */
                $("#already_truck_all_ck", ".bookingconfirm_view").on("click", function (e) {
                    $("[name=ck-booked]").prop("checked", $(e.target).prop("checked"));
                });

                /* 关闭弹窗 */
                $(".popup_cancel", ".bookingconfirm_view").on("click", function (e) {
                    $("#confirm_closefreight").popup({close: true});
                });
                /* 关闭批量通知弹窗 */
                $("#sendnotice_info_close", ".bookingconfirm_view").on("click", function (e) {
                    $("#sendnotice_info").popup({close: true});
                });

                var v_options = {
                    rules: {
                        truckmodelId: {
                            required: true
                        },
                        regTonnage: {
                            required: true,
                            number: true
                        },
                        trueName: {
                            required: true
                        },
                        phone: {
                            required: true,
                            mobileNumber: true/*,
                             remote: {
                             url: "",
                             data: {

                             }
                             }*/
                        }
                    }
                };
                var valid = $("#addTruckForm", ".bookingconfirm_view").validate(v_options);
                window.valid = valid;
                if (!$("[name=quotePrice]").prop("disabled")) {
                    $("#addTruckForm").validate().settings.rules["quotePrice"] = {required: true, decimalOne: 1};
                }

                var v_options1 = {
                    rules: {
                        sendnotice: {
                            required: true
                        }
                    },
                    messages: {
                        sendnotice: {
                            required: "通知不能为空!"
                        }
                    }
                };
                $("#sendnoticeform", ".bookingconfirm_view").validate(v_options1);
                $("[name=truckmodelId]", ".bookingconfirm_view").next().css({"width": "185px"});
                $("[name=quotePrice]").css({"width": "145px"});
                if (!$("[name=freightId]").val()) {
                    $(".ilcont").html("");
                    $(".btn-a-white").each(function(i, v){
                        if($(v).is(":visible")){
                            $(v).remove();
                        }
                    });
                    $(".btn-a-blue").each(function(i,v){
                        if($(v).is(":visible")){
                            $(v).remove();
                        }
                    });
                }
            }
        };
    });
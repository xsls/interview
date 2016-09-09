define(["jquery", "config", "CryptoJS"], function ($, config, CryptoJS) {

    var ajaxLogin = function (username, password, casServerUrl, loginServerUrl) {
        var ticketUrl = casServerUrl + "/api/tickets";
        var callbackUrl = loginServerUrl + "/cas";

        requestTicketGrantingTicket(username, password, ticketUrl, callbackUrl);
    };

    var requestTicketGrantingTicket = function (username, password, ticketUrl, callbackUrl) {
        $.ajax({
            url: ticketUrl,
            data: {username: username, password: password, service: callbackUrl},
            type: "POST"
        }).done(function (text) {
            requestServiceTicket(ticketUrl, text, callbackUrl);
        }).fail(function () {
        });
    };

    var requestServiceTicket = function (ticketUrl, ticketGrantingTicketId, callbackUrl) {
        $.ajax({
            url: ticketUrl + "/" + ticketGrantingTicketId,
            data: {service: callbackUrl},
            type: "POST"
        }).done(function (text) {
            validateServiceTicket(text, callbackUrl);
        }).fail(function () {
        });
    };

    var validateServiceTicket = function (serviceTicketId, callbackUrl) {
        $.ajax({
            url: callbackUrl + "?ticket=" + serviceTicketId
        }).done(function () {
        }).fail(function () {
        });
    };

    var showLoginDialog = function () {
        $("#logindialog").removeClass("hide");
    };

    return {
        showLoginDialog: showLoginDialog,

        init: function () {
            var $logindialog = $("#logindialog");
            var url = "http://" + config.host + ":" + config.port + config.ctx;
            $logindialog
                .on("click", "#closewin,#winClose", function () {
                })
                .on("click", "#submitForm", function () {
                    var $form = $logindialog.find("#ajaxloginform");
                    if ($form.valid()) {
                        var username = $form.find("#username").val();
                        var password = $form.find("#password").val();
                        ajaxLogin(username, CryptoJS.MD5(password).toString(), "http://dev.156.com/cas", url);
                    }
                });
        }
    };
});
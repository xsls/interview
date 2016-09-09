define(["jquery"], function ($) {
    var EMPTY_FUNCTION = function () {
    };

    if ($.isIE) {
        window.console = {};
        window.console.log = EMPTY_FUNCTION;
    }

    return {
        ctx: window.ctx,
        jsessionid: window.jsessionid,
        userId: window.userId,
        host: window.host,
        port: window.port,
        dateFormats: {
            "date": "yyyy-mm-dd",
            "datehms": "yyyy-M-dd HH:mm:ss",
            "datehm": "yyyy-MM-dd HH:mm",
            "hms": "HH:mm:ss",
            "hm": "HH:mm",
            "datec": "yyyy年MM月dd日"
        },
        dateFormat: function (date, format) {
            var o = {
                "M+": date.getMonth() + 1, //month
                "d+": date.getDate(), //day
                "h+": date.getHours(), //hour
                "m+": date.getMinutes(), //minute
                "s+": date.getSeconds(), //second
                "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                "S": date.getMilliseconds() //millisecond
            };

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },
        cometClientIdCookieName: "org.cometd.clientId",
        cometStateCookieName: "org.cometd.state",
        cometServerUrl: window.cometServerUrl,
        resourceServerUrl: window.resourceServerUrl,
        openapiServerUrl: window.openapiServerUrl
    };
});
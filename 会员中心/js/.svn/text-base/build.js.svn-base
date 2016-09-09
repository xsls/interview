(function () {
    var cfg = {
        optimize: "uglify2",
        paths: {
            "jquery": "../lib/jquery-1.9.1.min",
            "placeholder": "../lib/jquery.placeholder",
            "json3": "../lib/json3.min",
            "backbone": "../lib/backbone.min",
            "handlebars": "../lib/handlebars-v1.3.0",
            "_": "../lib/underscore.min",
            "dateFormat": "../lib/dateFormat.min",
            "numberFormat": "../lib/numberFormat.min",
            "chosen": "../lib/dropdownlist/chosen.jquery",
            "hbs": "../lib/hbs",
            "text": "../lib/text",
            "config": "config",
            "datepicker": "../lib/bootstrap-datepicker/js/bootstrap-datepicker",
            "datepickerCn": "../lib/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN",
            "datetimepicker": "../lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min",
            "datetimepickerCn": "../lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
            "cookie": "../lib/jquery.cookie",
            "uploadify": "../lib/uploadify/jquery.uploadify",
            "jQvalidation": "../lib/jquery-validation/dist/jquery.validate",
            "popup": "../lib/popup",
            "jQmessage": "../lib/jquery-validation/localization/messages_zh",
            "jQvalidationRule": "../lib/jquery-validation-custom-rules",
            "scrollbar": "../lib/jquery.mCustomScrollbar.concat.min",
            "jquery_cometd": "../lib/cometd/jquery/jquery.cometd",
            "jquery_cometd_reload": "../lib/cometd/jquery/jquery.cometd-reload",
            "jquery_cometd_ack": "../lib/cometd/jquery/jquery.cometd-ack",
            "org.cometd": "../lib/cometd/org/cometd",
            "org.cometd.ReloadExtension": "../lib/cometd/org/cometd/ReloadExtension",
            "org.cometd.AckExtension": "../lib/cometd/org/cometd/AckExtension",
            "jquery_passwordStrength": "../lib/jquery.passwordStrength",
            "jcrop": "../lib/jcrop/js/jquery.Jcrop",
            "raphael": "../lib/morris/raphael-min",
            "morris": "../lib/morris/morris",
            "CYMap": "../lib/map/CYMap",
            "coordinate": "../lib/map/coordinate",
            "CryptoJS": "../lib/md5",
            "easing": "../lib/jquery.easing.1.3",
            "blockUI": "../lib/jquery.blockUI"
        },

        config: {
            waitSeconds: 0
        },

        debug: true,

        packages: [
            {
                name: "plugins",
                location: "plugins"
            },
            {
                name: "modules",
                location: "modules"
            }
        ],

        shim: {
            "placeholder": {
                deps: ["jquery"],
                exports: "placeholder"
            },
            "popup": {
                deps: ["jquery"],
                exports: "popup"
            },
            "cookie": {
                deps: ["jquery"],
                exports: "cookie"
            },
            "json3": {
                exports: "JSON"
            },
            "chosen": {
                deps: ["jquery"],
                exports: "chosen"
            },
            "uploadify": {
                deps: ["jquery"],
                exports: "uploadify"
            },
            "jQvalidationRule": {
                deps: ["jquery", "jQvalidation"],
                exports: "jQvalidationRule"
            },
            "jQmessage": {
                deps: ["jquery", "jQvalidation"],
                exports: "jQmessage"
            },
            "jQvalidation": {
                deps: ["jquery"],
                exports: "jQvalidation"
            },
            "datepicker": {
                deps: ["jquery"],
                exports: "datepicker"
            },
            "datepickerCn": {
                deps: ["jquery", "datepicker"],
                exports: "datepickerCn"
            },
            "datetimepicker": {
                deps: ["jquery"],
                exports: "datetimepicker"
            },
            "datetimepickerCn": {
                deps: ["jquery", "datetimepicker"],
                exports: "datetimepickerCn"
            },
            "handlebars": {
                exports: "Handlebars"
            },
            "backbone": {
                deps: ["jquery", "_"],
                exports: "Backbone"
            },
            "dateFormat": {
                exports: "dateFormat"
            },
            "numberFormat": {
                exports: "numberFormat"
            },
            "_": {
                exports: "_"
            },
            "scrollbar": {
                deps: ["jquery"],
                exports: "scrollbar"
            },
            "org.cometd": {
                deps: [],
                exports: "org.cometd"
            },
            "jquery_cometd": {
                deps: ["jquery", "org.cometd", "json3"],
                exports: "jquery_cometd"
            },
            "jquery_cometd_reload": {
                deps: ["jquery", "jquery_cometd", "cookie", "org.cometd.ReloadExtension"],
                exports: "jquery_cometd_reload"
            },
            "org.cometd.ReloadExtension": {
                deps: ["org.cometd"],
                exports: "org.cometd.ReloadExtension"
            },
            "jquery_cometd_ack": {
                deps: ["jquery", "jquery_cometd", "org.cometd.AckExtension"],
                exports: "jquery_cometd_ack"
            },
            "org.cometd.AckExtension": {
                deps: ["org.cometd"],
                exports: "org.cometd.AckExtension"
            },
            "jcrop": {
                deps: ["jquery"],
                exports: "jcrop"
            },
            "CYMap": {
                exports: "CYMap"
            },
            "coordinate": {
                exports: "coordinate"
            },
            "easing": {
                exports: "easing"
            },
            "CryptoJS": {
                exports: "CryptoJS"
            }
        },
        name: "main",
        out: "main.min.js",
        useStrict: true,
        generateSourceMaps: false,
        preserveLicenseComments: false
    };
    if (this) {
        this.requirejs_cfg = cfg;
    }
    return cfg;
})()
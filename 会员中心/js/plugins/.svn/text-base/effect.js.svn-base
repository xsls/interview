define(["jquery"], function ($) {
    return {
        slideDown: function (el) {
            var $el = $(el);
            var height = $el.data("height");
            $el.animate({marginTop: "+=" + height, height: "-=" + height, duration: 500}, function () {
                $el.hide();
                $el = null;
            });
        },
        slideUp: function (el) {
            var $el = $(el);
            var height = $el.data("height");
            $el.show();
            $el.animate({marginTop: "-=" + height, height: "+=" + height, duration: 500});

        },
        slideLeft: function (el) {
            var $el = $(el);
            var width = $el.data("width");
            $el.width(0).css({"marginLeft": "0"});
            $el.show();
            $el.animate({marginLeft: "-=" + width, width: "+=" + width, duration: 500});
        },
        slideRight: function (el) {
            var $el = $(el);
            var width = $el.data("width");
            $el.css({"marginLeft": "0"});
            $el.animate({marginLeft: "+=" + width, width: "-=" + width, duration: 500}, function () {
                $el.hide();
            });
        }
    };
});
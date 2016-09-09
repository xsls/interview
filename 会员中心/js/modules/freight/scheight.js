define([],function(){
    function scheight() {
        var screen_height;
        if (typeof document.documentElement != 'undefined' && document.documentElement.clientWidth != 0) {
            screen_height = document.documentElement.clientHeight;
        }
        else {
            screen_height = document.getElementsByTagName('body')[0].clientHeight;
        }

        $(".uc-item-list").css("height", screen_height - 320);
        $(".leftinfo").css("height", screen_height - 160);
    }

    return {
        init:function(){
            scheight();
            $(window).resize(scheight);
        }
    };
});

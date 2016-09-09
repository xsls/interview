define([], function () {
    /***进度条**/
    var bookrun_x = 0, bookrun_k = 0, bookrun_t;

    function bookrun() {
        var m_width = parseInt($(".mqprogress").css("width"));

        if (bookrun_x * 8 < m_width) {
            bookrun_x = bookrun_x + 1;
            $(".mprun").css("margin-left", bookrun_x * 8);
        } else {
            bookrun_k = -1;
            bookrunright();
            return;
        }
        bookrun_t = setTimeout(bookrun, 50);
    }

    function bookrunright() {
        var k_width = parseInt($(".mqprogress-right").css("width"));
        if (bookrun_k * 8 < k_width) {
            bookrun_k = bookrun_k + 1;
            $(".mprun-right").css("margin-left", bookrun_k * 8);
        } else {
            bookrun_x = -1;
            bookrun();
            return;
        }
        bookrun_t = setTimeout(bookrunright, 50);
    }

    return {
        init: function () {
            $(window).resize(function () {
                if (bookrun_t) {
                    window.clearTimeout(bookrun_t);
                }
                bookrun();
            });
            bookrun();
        }
    };


});

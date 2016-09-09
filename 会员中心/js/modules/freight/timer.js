define([], function () {
    /* 时间计时器 */
    var nowDate = $("input[name=nowDate]").val()*1;
    var createTime = $("input[name=freight_infoExpirationDate]").val();
    var timer = null;
    var updateTimer = function () {
        createTime = createTime - 1000;
        var resultDate = Math.abs(nowDate - createTime);
        if (resultDate == 0){
            clearInterval(timer);
        }
        var days = Math.floor(resultDate / (24 * 3600 * 1000));

        var leave3 = resultDate % (24 * 3600 * 1000);
        var hours = Math.floor(leave3 / (3600 * 1000));

        var leave1 = resultDate % (3600 * 1000);
        var minutes = Math.floor(leave1 / (1000 * 60));

        var leave2 = resultDate % (60 * 1000);
        var seconds = Math.floor(leave2 / (1000));


        if (days < 10) {
            days = "0" + days;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        $(".timer > .day").text(days);
        $(".timer > .hour").text(hours);
        $(".timer > .minute").text(minutes);
        $(".timer > .second").text(seconds);
    };

    return {
        init: function () {
            timer = setInterval(updateTimer, 1000);
            updateTimer();
        }
    };
});
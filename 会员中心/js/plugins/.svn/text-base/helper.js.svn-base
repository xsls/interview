define(["handlebars", "config"], function (Handlebars, config) {
    var drawGreyStar = function (count) {
        var re = "";
        for (var i = 0; i < count; i++) {
            re += '<i class="icon i12-11 ico-greystar"></i>';
        }
        return re;
    };
    var drawStar = function (count) {
        var re = "";
        for (var i = 0; i < count; i++) {
            re += '<i class="icon i12-11 ico-hlstar"></i>';
        }
        return re;
    };
    Handlebars.registerHelper("highlight", function (data, keyword, options) {
        var reg = new RegExp(keyword, "gi");
        return data.replace(reg, "<i>" + keyword + "</i>");
    });
    Handlebars.registerHelper("test", function (value, value2,value3,value4,value5, options) {
        return value;
    });
    Handlebars.registerHelper("config", function (style, options) {
        return config[style] || "";
    });
    Handlebars.registerHelper("addrCut", function (addr, style) {
        var addrs = addr.split(style);
        return addrs[1] + " " + addrs[2];
    });
    Handlebars.registerHelper("eq", function (data, value, options) {
        return data == value ? options.fn(this) : "";
    });
    Handlebars.registerHelper("dateFormat", function (date, style, options) {
        var pattern = config.dateFormats[style];
        return new Date(date).pattern(pattern);
    });
    Handlebars.registerHelper("numberFormat", function (value, style, options) {
        return new Number(value).pattern(style);
    });
    Handlebars.registerHelper("compare",function(v1,v2,options){
        if(v1>v2){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("logic",function(){
        var expression = arguments[0];
        for (var i = 1; i < arguments.length - 1; i++){
            expression = expression.replace('?', arguments[i]);
        }
        var flag = false;
        eval("if(" + expression + "){flag = true;}");
        return flag ? arguments[arguments.length-1].fn(this):"";
    });
    Handlebars.registerHelper("ranking", function (rank, options) {
        if (rank == 0) {
            return drawGreyStar(5);
        } else if (rank > 0 && rank <= 1) {
            return drawStar(1) + drawGreyStar(4);
        } else if (rank > 1 && rank <= 2) {
            return drawStar(2) + drawGreyStar(3);
        } else if (rank > 2 && rank <= 3) {
            return drawStar(3) + drawGreyStar(2);
        } else if (rank > 3 && rank <= 4) {
            return drawStar(4) + drawGreyStar(1);
        } else if (rank == 5) {
            return drawStar(5);
        }
        return "";
    });
    Handlebars.registerHelper("level", function (level, type) {
            var options = {
                level:level,
                type:type
            };
            var defaults = {
                level : 0
            };

            var skinbefore;
            var skinafter;
            var crown;
            var sun;
            var moon;
            var star;

            var opts = $.extend(defaults, options);
            var type = opts.type;
            var addspan=opts.addspan;
            if(type == "org") {
                if(addspan){
                    skinbefore ="";
                    skinafter="";
                }else{
                    skinbefore =  "<span class='creditlevel'>";
                    skinafter = 	"</span>";
                }
                crown = 		"<i class='icon i14 ico-cre4'></i>";
                sun =   		"<i class='icon i14 ico-cre3'></i>";
                moon =  		"<i class='icon i14 ico-cre2'></i>";
                star =  		"<i class='icon i14 ico-cre1'></i>";
            }else if(type == "user") {
                if(addspan){
                    skinbefore ="";
                    skinafter="";
                }else{
                    skinbefore =  "<span class='userlevel'>";
                    skinafter = 	"</span>";
                }
                crown = 		"<i class='icon i14 ico-lv4'></i>";
                sun =   		"<i class='icon i14 ico-lv3'></i>";
                moon =  		"<i class='icon i14 ico-lv2'></i>";
                star =  		"<i class='icon i14 ico-lv1'></i>";
            }


            var retStr = skinbefore;

            var level = parseInt(opts.level);
            switch(level) {
                case 1:
                    retStr = retStr + star;
                    break;
                case 2:
                    retStr = retStr + star + star;
                    break;
                case 3:
                    retStr = retStr + star + star + star;
                    break;
                case 4:
                    retStr = retStr + star + star + star + star;
                    break;
                case 5:
                    retStr = retStr + star + star + star + star + star;
                    break;
                case 6:
                    retStr = retStr + moon;
                    break;
                case 7:
                    retStr = retStr + moon + moon;
                    break;
                case 8:
                    retStr = retStr + moon + moon + moon;
                    break;
                case 9:
                    retStr = retStr + moon + moon + moon + moon;
                    break;
                case 10:
                    retStr = retStr + moon + moon + moon + moon + moon;
                    break;
                case 11:
                    retStr = retStr + sun;
                    break;
                case 12:
                    retStr = retStr + sun + sun;
                    break;
                case 13:
                    retStr = retStr + sun + sun + sun;
                    break;
                case 14:
                    retStr = retStr + sun + sun + sun + sun;
                    break;
                case 15:
                    retStr = retStr + sun + sun + sun + sun + sun;
                    break;
                case 16:
                    retStr = retStr + crown;
                    break;
                case 17:
                    retStr = retStr + crown + crown;
                    break;
                case 18:
                    retStr = retStr + crown + crown + crown;
                    break;
                case 19:
                    retStr = retStr + crown + crown + crown + crown;
                    break;
                case 20:
                    retStr = retStr + crown + crown + crown + crown + crown;
                    break;
                default:
            }
            retStr = retStr + skinafter;
            return retStr;
    });
});
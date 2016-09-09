/*
* 春宇地图库 版本0.1
* 建立日期：2014-05-01
* 更新时间：2014-05-24
* 作者： PHZ、Goodchild
*
* 本地图是基于高德地图V1.2版二次开发而成。对于低于或高于此版本的
* 高德地图未经过测试，作者并不保证其稳定性。
*
*/




/*
*点对象
*用于描述经纬度坐标的对象
*成员：
*    lon 经度
*    lat 纬度
*/
var CYPoint = {
    create: function (lon, lat) {
        var cyPoint = {};

        /*经度*/
        cyPoint.lon = lon;
        /*纬度*/
        cyPoint.lat = lat;

        return cyPoint;
    }
};

/*
*矩形对象
*用于描述经纬度坐标的对象
*成员：
*    lon 经度
*    lat 纬度
*/
var CYRect = {
    create: function (lefttop, rightbottom) {
    }
};


/*
*地图类型枚举
*/
var CYMapType = {
    /*
    表示矢量地图
    */
    MetaMap: "cyMetaMap",

    /*
    表示卫星遥感图
    */
    ImageMap: "cyImageMap"
};


/*
*地图对象
*用于在容器中创建地图对象，并且提供地图基本操作的功能
*成员：
*    
*/
var CYMap = {
    /*
    *描述：创建地图对象
    *参数：
    *   containerName 地图容器的ID
    */
    create: function (containerName) {
        var cyMap = {
        };

        var pi = 3.14159265358979324;
        var ee = 0.00669342162296594323;
        var a = 6378245.0;
        /*
        *描述：获取标注对象（私有）
        *参数：
        *   id 标注对象的ID
        *返回值：
        *   marker 高德地图标注对象， null 表示未找到
        */
        var getMarkerById = function (id) {
            if (id in markers) {
                return markers[id];
            }

            return null;
        };

        /*
        *描述：获取路线对象（私有）
        *参数：
        *   id 路线对象的ID
        *返回值：
        *   marker 高德地图标注对象， null 表示未找到
        */
        var getPolylineById = function (id) {
            if (id in polylines) {
                return polylines[id];
            }

            return null;
        };

        /*
        *描述：自定义坐标到高德坐标转换（私有）
        *参数：
        *   pt CYPoint 对象
        *返回值：
        *   LngLat 对象（高德地图）
        */
        var cyPoint2Lnglat = function (pt) {
            var ret = new AMap.LngLat(pt.lon, pt.lat);
            return ret;
        };

        var lnglat2cyPoint = function (pt) {
            var ret = new cyPoint();
            ret.lon = pt.getLng();
            ret.lat = pt.getLat();
        };

        var cyRuler = {};

        /*
        获取地图中心点
        */
        cyMap.center = new AMap.LngLat(121, 31);

        /*
        *保存地图上所有标记的数组
        */
        var markers = new Array();

        /*
        *保存地图上所有路线的数组
        */
        //cyMap.polylines = new Array();
        var polylines = new Array();



        /*
        获取地图对象
        */
        cyMap.GDMap = new AMap.Map(containerName, { center: cyMap.center });

        /*
        自定义地图图层
        */
        var customMap = null;

        /*
        开启或关闭私服地图的标志.
        */
        var enableCustomMap = false;

        /*
        * 地图切换级别.
        * goodchild @ 2014-06-04
        */
        var maxZoomForCMap = 10;
        
        cyMap.maxZoomForCMap = maxZoomForCMap;

        /**
        * 设置地图切换级别.
        * goodchild @ 2014-06-04
        */
        var setMaxZoom = function (level) {
            if (level < 3 || level > 18) return;
            maxZoomForCMap = level;
        };



        AMap.event.addListener(cyMap.GDMap, 'zoomchange', function () {
            if (zoomLevelChanged != null)
                zoomLevelChanged(cyMap.GDMap.getZoom(), cyMap);
            cyMap.addCustomMap();
        });
        AMap.event.addListener(cyMap.GDMap, 'moveend', function () {
            cyMap.addCustomMap();
            if (mapPaned != null) {
                mapPaned(cyMap.GDMap.getZoom(), cyMap);
            }
        });
        /*
        *加载地图测距插件
        */
        cyMap.GDMap.plugin(["AMap.RangingTool"], function () {
            cyRuler = new AMap.RangingTool(cyMap.GDMap);

            AMap.event.addListener(cyRuler, "end", function (e) {
                cyRuler.turnOff();
            });
        });


        /**
        * 搜索路线
        * 参数:
        *   beginPos 起始点坐标 CYPoint 类型
        *   endpos  终止点坐标 CYPoint 类型
        *   callback 
        */
        cyMap.searchRoute = function (beginPos, endPos, callback) {
        	
        	cyMap.GDMap.plugin(["AMap.Driving"], function () {
                var drivingOptions = {
                    //驾车策略，包括LEAST_TIME , LEAST_DISTANCE , REAL_TRAFFIC  
                    policy: AMap.DrivingPolicy.LEAST_TIME
                }
                var roadRoute = new AMap.Driving(drivingOptions); //构造驾车导航类  
            	AMap.event.addListener(roadRoute, "complete", function (result) {

                    if (result.info == "OK") {

                        //查询路线返回的对象
                        var ret = new Object();
                        //距离
                        ret.Distance = result.routes[0].distance;
                        //点的集合
                        ret.Points = new Array();

                        for (/*var step in result.routes[0].steps*/var i = 0; i < result.routes[0].steps.length; i++) {

                            var step = result.routes[0].steps[i];

                            for (/*var pt in step.path */var j = 0; j < step.path.length; j++) {
                                var pt = step.path[j];
                                ret.Points.push(CYPoint.create(pt.lng, pt.lat));
                            }
                        }

                        if (callback != null) {
                            callback(ret);
                        }
                    }
                });
                
            	roadRoute.search(cyPoint2Lnglat(beginPos), cyPoint2Lnglat(endPos));
            });
        };


        /**
        * 添加自定义地图。
        * 添加了级别判断条件.  
        * goodchild @ 2014-06-04
        */
        cyMap.addCustomMap = function () {
            if (cyMap.GDMap.getZoom() > maxZoomForCMap) {
                cyMap.removeCustomMap();
                return;
            }
            if (!enableCustomMap) return;
            if (customMap == null) {
                customMap = new AMap.TileLayer({
//                    tileUrl: "http://dev.156.com/RealTimeTracking/test.jsp?x=[x]&y=[y]&z=[z]"
                    tileUrl:tileUrl
                });
                customMap.setMap(cyMap.GDMap);
            }
        };

        cyMap.enableCustomMap = function (b) {
            enableCustomMap = b;
            if (!enableCustomMap) {
                cyMap.removeCustomMap();
            }

        };

        cyMap.removeCustomMap = function () {
            customMap && customMap.setMap(null);
            customMap = null;
        }



        /*
        *描述：设置地图中心点
        *参数：
        *   pos 地图中心点 CYPoint类型
        *返回值：
        *   true：成功
        *   false 失败
        */
        cyMap.centerAt = function (pos) {
            var pos1 = cyPoint2Lnglat(pos);
            cyMap.GDMap.setCenter(pos1);
        };

        /*
        *描述: 获取地图中心点
        */
        cyMap.getCenter = function () {
            var ct = cyMap.GDMap.getCenter();
            var pos = lnglat2cyPoint(ct);
            return pos;
        };

        /**
        * 设置地图级别发生变化后的回调函数.
        * handler对应的函数原型为 :
        * function(level){} level为当前的级别
        */
        var zoomLevelChanged = null;
        cyMap.setZoomLevelChanged = function (handler) {
            zoomLevelChanged = handler;
        };

        var mapPaned = null;
        cyMap.setMapPaned = function (handler) {
            mapPaned = handler;
        };
        
        var tileUrl = "http://dev.156.com/RealTimeTracking/test.jsp?x=[x]&y=[y]&z=[z]";
        cyMap.setTileUrl = function (url) {
        	tileUrl = url;
        }
        
        /*
        *描述：设置地图类型
        *参数：
        maptype 地图类型，取值为CYMapType中定义的对象
        *返回值：
        *   true 成功
        *   false 失败
        */
        cyMap.setupMapType = function (maptype) {
        };

        /*
        *描述：设置地图窗口全屏/正常模式
        *参数：
        *   isFull 类型bool，true 表示全屏，false表示正常
        *返回值：
        *   当前地图的全屏状态
        */
        cyMap.fullScreen = function (isFull) {

        };

        /*
        *描述：鼠标移动事件，当鼠标在目标上移动时激发
        *参数：
        *   func 回调函数，当鼠标在目标上移动时调用，
        *   函数原型为func(type, id, e),其中type 为
        *   目标类型、id 为目标id号，e 为目标绑定的对象
        */
        cyMap.setOnMouseMoveListener = function (id, type, func) {
            var m = getMarkerById(id);

            if (m != null) {
                AMap.event.addListener(m, "mousemove", func);
            }
        };

        /*
        *描述：鼠标移入事件，当鼠标移入目标时激发
        *参数：
        *   func 回调函数，当鼠标在目标上移动时调用，
        *   函数原型为func(type, id, e),其中type 为
        *   目标类型、id 为目标id号，e 为目标绑定的对象
        */
        cyMap.setOnMouseOverListener = function (id, type, func) {
            var m = getMarkerById(id);

            if (m != null) {
                AMap.event.addListener(m, "mouseover", func);
            }
        };

        /*
        *描述：鼠标移出事件，当鼠标移出目标时激发
        *参数：
        *   func 回调函数，当鼠标在目标上移动时调用，
        *   函数原型为func(type, id, e),其中type 为
        *   目标类型、id 为目标id号，e 为目标绑定的对象
        */
        cyMap.setOnMouseOutListener = function (id, type, func) {
            var m = getMarkerById(id);

            if (m != null) {
                AMap.event.addListener(m, "mouseout", func);
            }
        };

        /*
        *描述：鼠标点击事件，当鼠标在目标上点击时激发
        *参数：
        *   func 回调函数，当鼠标在目标上移动时调用，
        *   函数原型为func(type, id, e),其中type 为
        *   目标类型、id 为目标id号，e 为目标绑定的对象
        */
        cyMap.setOnMouseClickListener = function (id, type, func) {
            var m = getMarkerById(id);

            if (m != null) {
                AMap.event.addListener(m, "click", func);
            }
        };

        /*
        *描述：设置地图显示级别
        *参数： 
        *   level 地图显示级别（3~18）
        *返回值：
        *   true 成功
        *   false 失败
        */
        cyMap.setZoom = function (level) {
            if (level >= 3 && level <= 18) {
                cyMap.GDMap.setZoom(level);
            }
            else {
                throw "parameter 'level' must be in 3 - 18";
            }
        };


        /*
        *描述：获取地图显示级别
        *返回值：
        *   地图显示级别（0~15）
        */
        cyMap.getZoom = function () {
            return cyMap.GDMap.getZoom();
        };

        /*
        * 描述： 获取当前地图的minLon,minLat,maxLon,maxLat.
        数据为偏移后的坐标.
        */
        cyMap.getBound = function () {
            var mbr = cyMap.GDMap.getBounds();
            return {
                "minLon": mbr.getSouthWest().getLng(),
                "minLat": mbr.getSouthWest().getLat(),
                "maxLon": mbr.getNorthEast().getLng(),
                "maxLat": mbr.getNorthEast().getLat()
            };
            return mbr;
        };


        /**
        * 清理地图上所有的标注信息.
        */
        cyMap.clearAll = function () {
            for (var key in markers) {
                markers[key] && markers[key].setMap && markers[key].setMap(null);
            }
            /*cyMap.GDMap.clearMap();*/
            markers = [];
        };

        /**
        * 隐藏地图上所有的标注信息			 
        */
        cyMap.hideAll = function () {
            for (var key in markers) {
                markers[key].hide();
            }
        };

        /**
        * 描述：在同一视图内显示所有点.
        * 参数：
        *         pts CYPoint结构的数组.
        * 返回: 无
        * goodchild @ 2014-06-04
        */
        cyMap.showInView = function (pts) {
            if (pts.length < 2) return;

            var minLon, minLat, maxLon, maxLat;
            minLon = 180;
            minLat = 90;
            maxLon = 0;
            maxLat = 0;
            for (var i = 0; i < pts.length; i++) {
                var pt = pts[i];
                if (pt.lon > maxLon) maxLon = pt.lon;
                if (pt.lon < minLon) minLon = pt.lon;
                if (pt.lat > maxLat) maxLat = pt.lat;
                if (pt.lat < minLat) minLat = pt.lat;
            }
            /*做少量放大,便于查看.*/
            //        	minLon -= 0.05;
            //        	minLat -= 0.05;
            //        	maxLon += 0.05;
            //        	maxLat += 0.05;

            var minLnglat = new AMap.LngLat(minLon, minLat);
            var maxLnglat = new AMap.LngLat(maxLon, maxLat);
            var mbr = new AMap.Bounds(minLnglat, maxLnglat);
            cyMap.GDMap.setBounds(mbr);
        };

        /**
        * 显示地图上所有的标注信息			 
        */
        cyMap.showAll = function () {
            for (var key in markers) {
                markers[key].show();
            }
        };
        /*
        *描述：在制定位置显示弹出窗口
        *参数：
        *   pos 显示窗口的位置，CYPoint类型。
        *   title 窗口标题栏的文字内容。
        *   content 窗口显示的内容。可以是HTML文本。
        *返回值：
        *   true：成功
        *   false：失败
        */
        cyMap.showInfoWindow = function (pos, title, content) {
            var showContent = content;
            var wnd = new AMap.InfoWindow({ isCustom: false, autoMove: true, content: showContent, closeWhenClickMap: false, showShadow: false, offset: new AMap.Pixel(16, 0)});
            wnd.open(cyMap.GDMap, cyPoint2Lnglat(pos));
            return wnd;
        };

        cyMap.reopenInfoWindow = function (window, pos) {
            window && window.open(cyMap.GDMap, cyPoint2Lnglat(pos));
        };

        cyMap.closeInfoWindow = function (window) {
            window && window.close();
        };

        cyMap.clearInfoWindow = function () {
            cyMap.GDMap.clearInfoWindow();
        };

        /*
        *描述：在地图上添加图片对象
        *参数：
        *   id 图片对象ID
        *   type 对象类型
        *   pos 位置信息， CYPoint 对象，经纬度
        *   imageUrl 图片的url
        *   angle 图片的角度
        *   xOffset 图片相对X轴偏移量
        *   yOffset 图片相对于Y轴偏移量
        *返回值：
        *   true 成功
        *   false 失败
        */
        cyMap.addImageLabel = function (id, type, pos, imageUrl, xOffset, yOffset) {
            var mapPos = new AMap.LngLat(pos.lon, pos.lat);
            var x = 0, y = 0;

            if (xOffset != null && xOffset != "undefined") {
                x = xOffset;
            }

            if (yOffset != null && xOffset != "undefined") {
                y = yOffset;
            }

            var ofs = new AMap.Pixel(x, y);

            var marker = new AMap.Marker({ map: cyMap.GDMap, position: mapPos, offset: ofs });

            if (imageUrl != null) {
                marker.setIcon(imageUrl);
            }

            marker.extData = id;
            /*
            *保存对象
            */
            markers[id] = marker;
        };


        /*
        *描述：旋转图片
        *参数：
        *   id 图片对象ID
        *   type 图片对象类型（设为 null）
        *   angle 旋转角度（0 ~ 359）
        */
        cyMap.rotateImageLabel = function (id, type, angle) {
            var m = getMarkerById(id);

            if (m != null) {
                m.setRotation(angle);
            }
        };

        /*
        *描述：地图加载完成事件
        *参数：
        *   func 完成后调用的函数
        *返回值： 无
        */
        cyMap.mapLoaded = function (func) {
        };

        /*
        *描述：更新地图上图片标注的位置和图片内容
        *参数：
        *   id 标注的id
        *   pos 标注的新位置 CYPoint类型,若不更新位置则为null
        *   imageUrl 图片的url ，若不更改图片，则为空值（null）
        *返回值：
        *   true 成功
        *   false 失败
        */
        cyMap.updateImageLabel = function (id, pos, imageUrl) {
            var m = getMarkerById(id);

            if (m != null) {
                if (pos != null) {
                    m.setPosition(cyPoint2Lnglat(pos));
                }

                if (imageUrl != null) {
                    m.setIcon(imageUrl);
                }

                return true;
            }

            return false;
        };

        /*
        *描述：删除地图上的标注
        *参数：
        *   id 要删除标注的ID
        *返回值：
        *   true 成功
        *   false 失败
        */
        cyMap.deleteImageLabel = function (id) {
            var m = getMarkerById(id);

            if (m != null) {
                m.setMap(null);
                delete markers[id];
                return true;
            }

            return false;
        };

        /**
        * 地图坐标转WGS-84.
        */
        cyMap.mars_wgs84 = function (lng, lat) {
        }

        cyMap.wgs84_mars = function (lng, lat) {
            if (this.outofchina(lng, lat)) {
                return { "lng": lng, "lat": lat };
            }
            else {
                var dLat = this.transformlat(lng - 105.0, lat - 35.0);
                var dLon = this.transformlng(lng - 105.0, lat - 35.0);
                var radLat = lat / 180.0 * pi;
                var magic = Math.sin(radLat);
                magic = 1 - ee * magic * magic;
                var sqrtMagic = Math.sqrt(magic);
                dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
                dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
                return { "lng": lng + dLon, "lat": lat + dLat };
            }
        };

        cyMap.outofchina = function (lng, lat) {
            if (lng < 72.004 || lng > 137.8347) return true;
            if (lat < 0.8293 || lat > 55.8271) return true;
            return false;
        };

        cyMap.transformlat = function (x, y) {
            var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
            return ret;
        };

        cyMap.transformlng = function (x, y) {
            var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
            return ret;
        };


        /*
        *描述：进入测距状态
        *参数：无
        *返回值：无
        */
        cyMap.beginDistance = function () {
            if (cyRuler != null) {
                cyRuler.turnOn();
            }
        };

        /*
        *描述：退出测距状态
        *参数：无
        *返回值：无
        */
        cyMap.endDistance = function () {
            cyRuler.turnOff();
        };

        /*
        *描述：在地图上添加路线
        *参数：
        *   id 路线id
        *   posArray 路线点的集合 CYPoint 类型
        *返回值：
        *   true 成功
        *   false 失败
        */
        cyMap.addPolyline = function (id, posArray) {
            var poly = getPolylineById(id);

            if (poly == null) {
                poly = new AMap.Polyline({ map: cyMap.GDMap, strokeColor: "#7eafda", strokeOpacity: 0.7, strokeWeight: 4, isOutline: true, outlineColor: "#3f8acd" });
                var path = new Array();

                for (var i = 0; i < posArray.length; i++) {
                    var mapPoint = cyPoint2Lnglat(posArray[i]);
                    path.push(mapPoint);
                }
                
                poly.setPath(path);
                polylines[id] = poly;
            }

            cyMap.GDMap.setFitView(new Array(poly));
        };

        /*
        *描述：移除路线
        *参数：
        *   id 要移除路线的id
        *返回值：
        *   true 成功
        *   false 失败
        */
        cyMap.removePolyline = function (id) {
            var poly = getPolylineById(id);

            if (poly != null) {
                poly.setMap(null);

                delete polylines[id];
            }
        };


        /*
        *描述：获取制定矩形区域内的要素
        *参数：
        *   rect 地图的矩形区域，CYRect类型
        */
        cyMap.getLatestData = function (rect) {
        };

        cyMap.showScale = function () {
            cyMap.GDMap.plugin(["AMap.Scale"], function () {
                var scale = new AMap.Scale();
                cyMap.GDMap.addControl(scale);
            });
        };

        cyMap.showToolbar = function () {
            cyMap.GDMap.plugin(["AMap.ToolBar"], function () {
                var toolBar = new AMap.ToolBar();
                cyMap.GDMap.addControl(toolBar);
            });
        };
        var google;
        //添加GOOGLE地图图层
        cyMap.addGoogle = function () {
            google = new AMap.TileLayer({
                tileUrl: "http://mt{1,2,3,0}.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galil"//图块取图地址
            });
            google.setMap(cyMap.GDMap);
        };
        //移出GOOGLE地图图层
        cyMap.removeGoogle = function () {
            google && google.setMap(null);
        };


        return cyMap;
    },



    initialize: function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://webapi.amap.com/maps?v=1.2&key=aa1758a1409ea625bf5bf1a953dc3722&callback=initMap";
        document.body.appendChild(script);
    }
};

//window.onload = CYMap.initialize;


var RoutePlayer = function (map, path, opts) {
    this._map = map;
    this._path = path;
    //移动到当前点的索引
    this.i = 0;
    //控制暂停后开始移动的队列的数组
    this._setTimeoutQuene = [];
    this._fromPause = false;
    this._fromStop = true;
    /**
    * 返回经纬度对应的直角坐标。 
    */
    this._projection = function (pt) {
        return this._map.lnglatToPixel(pt, this._map.getZoom());
    };
    this._pixelToLnglat = function (x, y) {
        return this._map.pixelToLngLat(new AMap.Pixel(x, y), this._map.getZoom());
    }
    this._opts = {
        marker: null,
        speed: 40,
        defaultContent: "",
        icon: "images/red/0.png",
        movingCallback: null,
        finishedCallback: null
    };
    this._timeoutFlag = 0;
    //动态目标.
    this._marker = null;
    this.SetOptions(opts);
    this._icon = this._opts.icon;
}

RoutePlayer.prototype.SetOptions = function (opts) {
    if (!opts) return;
    for (var p in opts) {
        if (opts.hasOwnProperty(p)) {
            this._opts[p] = opts[p];
        }
    }
}

RoutePlayer.prototype.Start = function () {
    var me = this;
    var len = me._path.length;
    //不是第一次点击开始,并且小车还没到达终点
    if (me.i && me.i < len - 1) {
        //没按pause再按start不做处理
        if (!me._fromPause) {
            return;
        } else if (!me._fromStop) {
            //按了pause按钮,并且再按start，直接移动到下一点
            //并且此过程中，没有按stop按钮
            //防止先stop，再pause，然后连续不停的start的异常
            me._moveNext(++me.i);
        }
    } else {
        //第一次点击开始，或者点了stop之后点开始
        me._addMarker();
        me._moveNext(me.i);
        //等待marker动画完毕再加载infowindow
        //me._timeoutFlag = setTimeout(function () {
        //    //me._addInfoWin();
        //    me._moveNext(me.i);
        //}, 400);
    }
    //重置状态
    this._fromPause = false;
    this._fromStop = false;
}

RoutePlayer.prototype.Stop = function () {
    this.i = 0;
    this._fromStop = true;
    clearInterval(this._intervalFlag);
    this._clearTimeout();
}

RoutePlayer.prototype.DestroySelf = function () {
    this.Stop();
    if (this._marker)
        this._marker.setMap(null);
}

RoutePlayer.prototype.Pause = function () {
    clearInterval(this._intervalFlag);

    //标识是否是按过pause按钮
    this._fromPause = true;
    this._clearTimeout();
}

RoutePlayer.prototype._addMarker = function (callback) {
    if (this._marker) {
        this.Stop();
        this._marker.setMap(null);
        clearTimeout(this._timeoutFlag);
    }
    this._marker = new AMap.Marker({
        map: this._map,
        position: this._path[0], //基点位置
        icon: this._icon, //marker图标，直接传递地址url
        offset: { x: 0, y: 0 } //相对于基点的位置
    });
    //计算方向。
}

RoutePlayer.prototype._getDistance = function (pxA, pxB) {
    return Math.sqrt(Math.pow(pxA.x - pxB.x, 2) + Math.pow(pxA.y - pxB.y, 2));
}

var pi = 3.14159265358979324;
/**
* 计算一个近似的方位角。
*/
RoutePlayer.prototype._getHeading = function (iniPixelPos, targetPixelPos) {
    var dx = targetPixelPos.getLng() - iniPixelPos.getLng();
    var dy = targetPixelPos.getLat() - iniPixelPos.getLat();

    alert(dx);
    alert(dy);
    var result = 0.0;
    if (dx > 0) result = (pi * 0.5) - Math.atan(dy / dx);
    else if (dx < 0) result = (pi * 1.5) - Math.atan(dy / dx);
    else if (dy > 0) result = 0;
    else if (dy < 0) result = pi;
    else result = 0.0; // the 2 points are equal
    result = result * 180 / pi;
    alert(result);
    return result;
}


function sgn(n) {
    if (n > 0) return 1;
    else if (n < 0) return -1;
    return 0;
}

RoutePlayer.prototype._move = function (initPos, targetPos, effect) {

    var me = this,
        heading = me._getHeading(initPos, targetPos),
    //当前的帧数
                currentCount = 0,
    //步长，米/秒
                timer = 1,
                step = this._opts.speed / (1000 / timer),
    //初始坐标
                iniPixelPos = this._projection(initPos),
    //获取结束点的(x,y)坐标
                targetPixelPos = this._projection(targetPos),
    //总的步长
                count = Math.round(me._getDistance(iniPixelPos, targetPixelPos) / step);

    //如果小于1直接移动到下一点
    this._marker.setRotation(heading);
    if (count < 1) {
        me._moveNext(++me.i);
        return;
    }
    //两点之间匀速移动
    me._intervalFlag = setInterval(function () {
        //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
        if (currentCount >= count) {
            clearInterval(me._intervalFlag);
            //移动的点已经超过总的长度
            if (me.i > me._path.length) {
                return;
            }
            //运行下一个点
            me._moveNext(++me.i);
        } else {
            //正在移动
            currentCount++;
            var x = effect(iniPixelPos.getX(), targetPixelPos.getX(), currentCount, count),
                y = effect(iniPixelPos.getY(), targetPixelPos.getY(), currentCount, count),
                pos = me._pixelToLnglat(x, y);
            //pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
            //设置marker
            me._marker.setPosition(pos);
        }
    }, timer);
}

RoutePlayer.prototype._moveNext = function (index) {
    var me = this;
    if (index < this._path.length - 1) {
        me._segmentFinished && me._segmentFinished(me._path[index], me._path[index + 1]);
        me._move(me._path[index], me._path[index + 1], me.linear);
        //  @modified by 叶方舟 2013.9.5
        //  #01 开始播放后将地图范围和中心位置移动到当前轨迹路径
        if (index == 0) {
            me._map.setCenter(me._path[0]);
        }
        else {
            if (me._opts.movingCallback != null) {
                me._opts.movingCallback(index, 0);
            }
        }
    }
    else {
        me._opts.finishedCallback && me._opts.finishedCallback();
    }
}

//初始坐标，目标坐标，当前的步长，总的步长
RoutePlayer.prototype.linear = function (initPos, targetPos, currentCount, count) {
    var b = initPos, c = targetPos - initPos, t = currentCount,
    d = count;
    return c * t / d + b;
}
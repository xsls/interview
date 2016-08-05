apply的数据的应用,提供数据

apply传参数和call的区别


例子：
var slice ＝ Array.prototype.slice;

console.log('slice', slice);

var arr = [1,2,3];

arr.slice(0,1);

slice.call(arr, 0, 1);
slice.apply(arr, [0,1]);

// vuejs的重度使用者

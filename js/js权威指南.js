跨域请求的使用
js
css
html
基础框架

删除数组中对象的方法
Array.prototye.remove = function (obj) {
    const index = this.indexOf(obj);
    if (index === -1) {
        return ;
    }
    this.splice(index, 1);
};

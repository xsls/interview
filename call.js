//console.log(Function.prototype.call);

//console.log(Function.prototype.apply);

//apply和call是非常常用的方法

1.他们的作用一样,就是call和apply

2.他们传入的参数是唯一的区别

3.apply接受两个参数，第一个参数指定了函数体内的this对象的指向，第二个参数是数组

4.call接受多个参数，第一个参数指定了函数体内的this对象的指向，其后就是不一样的

5.如果参入的参数是null，函数就会默认的指向宿主对象，在浏览器中就是 window

6.代码开发一定要有好的思维


function add(a,b){

	console.log(this);
};

add.apply(this,[1,2,3]);
//改变对象
window.name = 'name';
var obj = {
	
	name:'nyl'
};

var getName = function(){
	//console.log(this.name);
	console.log(this);
}

getName();

var s = getName.call(obj,[1,2,3]);

console.log('s',s);

getName.apply(obj,[1,2,3]);

// call和apply只可以给函数类型的对象调用





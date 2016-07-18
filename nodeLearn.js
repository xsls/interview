// util的工具函数，实现继承
var util = require('util'); 
function Base() {
	this.name = 'base';
	this.base = 1991;
	this.sayHello = function() {
	console.log('Hello ' + this.name);
	}; 
}
// 原型模式
Base.prototype.showName = function() {
	console.log(this.name);
}; 
function Sub() { 
	this.name = 'sub'; 
}
// 函数的继承 sub继承Base
util.inherits(Sub, Base); 

var objBase = new Base(); 
objBase.showName(); 
objBase.sayHello(); 
console.log(objBase);

var objSub = new Sub(); 

objSub.showName(); 
//objSub.sayHello(); 
console.log('objSub', objSub); 
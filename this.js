//this 的理解

window.name = '11111';

function add (){

	var name = 22222;
	console.log(this.name);
};

add();


//js数据的基本类型

1.string

2.number

3.boolean

4.null

5.undefined

6.object

window.name = 1111111;

var  obj  = {

	name:222222,
	getName :function(){

		console.log(this.name);
	}
}

obj.getName();

function add (){

	var that  = this;

	console.log(this);
}

add();


//严格模式和非严格模式的区别


'use strict';

function add (){

	console.log(this);
}


1.this的理解,全局作用域的理解


2.原型链的理解

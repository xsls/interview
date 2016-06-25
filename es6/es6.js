// js基本的面向对象的编程
class Point {
	// 构造函数的使用
	constructor(x, y) {
		this.x = x;
		this.y = y;
	};
	toString() {
		return this.x + '.....' + this.y;
	}
}

// 1.继承的关键字: extends
// 2.构造函数: constructor
class SuperPoint extends Point {
	constructor(x, y, color) {
		// 继承起方法
		super(x,y);
		// this.x = x;
		// this.y = y;
		this.color = color;
	};
	toString() {
		return this.color + '........' + super.toString();
	}
}

let childPoint = new SuperPoint(1, 2, 'red');

console.log(childPoint.toString());


// generator
function* generator () {
	yield 'hello';
  	yield 'world';
  	return 'ending';
}

var g = generator();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

var arr = [1,2,3,4];


//箭头函数的使用
arr.map((x) => {
    console.log('x1', x);
});

arr.map(x=>{
    console.log('x', x);
});

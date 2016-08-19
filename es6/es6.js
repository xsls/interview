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
        // super的使用规则
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


// generator,可以少些很多回调函数
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

let arrayList = [
    {
        name: 'nyl',
        age: 21
    },
    {
        name: 'nyl',
        age: 28
    }
];
console.log('>>>>>>>>>><<<<<<<<<<');
let result = [];
arrayList.forEach(val => {
    const item = val;
    // 使用delete删除指定的数据
    delete item['name'];
    console.log('val1111', val);
    result.push(item);
})
console.log('result1111', result);

result.map((val, key, obj)=> {
    console.log('value', val);
    console.log('key', key);
    console.log('obj', obj);
})

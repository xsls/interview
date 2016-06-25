//  规范: class名字必须大写
//  方法名字可以小写
class Queue {
    constructor(contents = []) {
        this.queue = [...contents];
    }
    pop() {
        const value = this.queue[0];
        this.queue.splice(0);
        return value;
    }
};

var s = new Queue([1,2,3,4,5,6]);
var result = s.pop();
console.log('result', result);



class React {
    constructor(options = {}) {
        // 初始化的构造函数
        this.name = options.name || 'no name';
    };
    // 定义的方法
    getName() {
        return this.name;
    };
    //
    toString() {
        return `React - ${this.getName()}`;
    };
};


// 继承的写法
class App extends React {
    constructor (name) {
        this.name = name;
        super();
    };

}


一.es6语法新特性
1.

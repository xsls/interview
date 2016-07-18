function add (){
	var a = [];
	for (var i = 0; i < 10; i++) {
  		a[i] = function () {
    	console.log(i);
  		};
	}
}

//函数的调用

var func = add();

console.log(func[5]());

//面向对象和closure

var extend = function(){
	var value = 0;

	return {
		call:function(){
			value++;
			console.log(value);
		}
	}
};
var extent = extend();

extent.call();

for(var i =0;i<10;i++){
	extent.call();
}

//必包实现命令模式

//对象里面可以有方法
var Tv = {

	close:function(){
		console.log('关闭电视');
	},
	open:function(){
		console.log('打开电视');
	}
};

// 创建命令
var createCommand =function(reciver){
	//将方法暴露出去

	var excute = function(){
		return reciver.open();
	}
	var undo = function(){
		return reciver.close();
	}
    // 返回一个对象
	return {
		excute:excute,
		undo:undo
	}
};

var setCommand = function(command){

	command.excute();
	command.undo();

};

setCommand(createCommand(Tv));

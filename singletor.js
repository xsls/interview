//实现单例模式

var singletor = function(name){
	this.name = name;
	this.instance = null;
};

singletor.prototype.getName = function() {
	
	console.log(name);
};


singletor.getInstance = function(name){

	//关键是这个实例
	if(!this.instance){
		
		this.instance = new singletor(name);
	}

	return this.instance;
};

//一旦实例被创建，就全部是这个

var b = singletor.getInstance("steven2");

var a = singletor.getInstance("steven1");

console.log(a);

console.log(b);






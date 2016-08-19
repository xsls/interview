const fs = require('fs');
// const file = fs.createWriteStream('./test.html');
// let data = fs.readFileSync('./test.html', 'utf8');
// console.log('data', data);
// 读取文件中字节
let buf = new Buffer(1000); // 1000代表字节数
fs.open('./test.html', 'r', (err, fd) => {
	fs.read(fd, buf, 0, 1000, 3, (err, bytesRead, buffer) => {
		console.log(buffer.slice(0, bytesRead).toString());
	})
});
// 向文件中写入数据
// let ws = new Buffer('我喜欢编程');
// fs.open('./test.html', 'wx', (err, fd) => {

// 	fs.write(fd, ws, 0, 15, 0, (err,written, buffer) =>{
// 		// if (err) {
// 		// 	console.log('操作文件失败');
// 		// } else {
// 		// 	console.log('写文件操作成功');
// 		// }
// 		let info = err ? '操作文件失败': '写文件操作成功';
// 		console.log('info', info);
// 		fs.close(fd);
// 	})
// });

// 创建与读取目录

// fs.mkdir('./imooc', err => {
// 	if (err) {
// 		console.log('创建目录失败');
// 	} else {
// 		console.log('创建目录成功');
// 	}
// });
// 读取目录
fs.readdir('./imooc', (err, files) => {
	if (err) {
		console.log('读取目录失败');
	} else {
		console.log('读取目录成功', files);
	}
});

// 查看与修改文件夹或目录的信息
fs.stat('./test.html', (err, stats) => {
	console.log('stats', stats);
});
fs.lstat('./test.html', (err, lstat) => {
	console.log('lstat', lstat);
});

// 检查文件或目录是否存在
fs.exists('./imooc', exists => {
	if (exists) {
		console.log('该文件存在');
	} else {
		console.log('该文件不存在');
		fs.mkdir('./imooc', (err) => {
			if (err) {
				console.log('操作文件失败');
			} else {
				console.log('操作文件成功');
			}
		});
	}
});









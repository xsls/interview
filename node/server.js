// 记得使用es6的语法哦
const http = require('http');
const server = http.createServer((req, res) => {
	console.log(req, res);
}).listen(1377, '127.0.0.1');
server.on('error', e => {
	if(e.code === 'EADDRINUSE') {
		console.log('服务器地址及端口被占用');
	}
})
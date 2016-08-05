const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
// 断言测试
const assert = require('assert');
console.log('assert', assert);

//Buffer
const buffer = Buffer.alloc(10, 15); // 转换成16进制的数据
console.log('buffer', buffer);

const buf1 = Buffer.allocUnsafe(10);
console.log('buf1', buf1);

const buf4 = Buffer.from([1,2,3]);
console.log('buf4', buf4);

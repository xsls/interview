const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('message', function(msg, rinfo) {
	console.log('msg', msg);
	console.log('info', info);
	let buf = new Buffer('确认信息:', msg);
	server.send(buf, 0, buf.length, rinfo.port, rinfo.address);
});
server.on('listening', function () {
	let address = server.address();
	console.log('address', address);
});
server.bind(4321, 'localhost');
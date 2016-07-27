var http = require('http');
// var path = require('path');
var server = http.createServer(function(req, res) {
    res.end();
}).listen(1377, '127.0.0.1');
server.setTimeout(5000, function(socket) {
    console.log('服务器请求超时');
    console.log('socket', socket);

})

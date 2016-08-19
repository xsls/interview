// 启动服务:sudo mongod
// 查看数据库:mongo
// 查看更多数据
// 配置文件的基本路径:/usr/local/var/log
// systemLog:
//   destination: file
//   path: /usr/local/var/log/mongodb/mongo.log
//   logAppend: true
// storage:
//   dbPath: /usr/local/var/mongodb
// net:
//   bindIp: 127.0.0.1
// 配置文件及端口的配置:
// /usr/local/etc/mongod.conf 
const mongo = require('mongodb');
const host = 'localhost';
// 配置端口号的使用
const port = 27017;
const server = new mongo.Server(host, port, {auto_reconnect: true});
const db = new mongo.Db('database', server, {safe: true});
db.open((err, db) => {
    if (err) {
        throw err
    } else {
        console.log('success');
        db.collection('users', (err, collection) => {
            let data = {name: '聂玉林', firstName: '明珠'};
            collection.insert(data, (err, docs) => {
                console.log(docs);
                // db.close();
            });
        });
    }
});
// 数据库的关闭
db.on('close', (err, db) => {
    if (err) {
        throw err
    } else {
        console.log('成功关闭数据库');
    }
});

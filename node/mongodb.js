const mongo = require('mongodb');
const host = 'localhost';
const port = 27017;
const server = new mongo.Server(host, port, {auto_reconnect: true});
const db = new mongo.Db('database', server, {safe: true});
db.open((err, db) => {
    if (err) {
        throw err
    } else {
        console.log('success');
        // db.close();
        db.collection('users', (err, collection) => {
            let data = {name222222: '聂玉林2222', firstName222: '小欢2222'};
            collection.insert(data, (err, docs) => {
                console.log(docs);
                // db.close();
            });
        });
    }
});
db.on('close', (err, db) => {
    if (err) {
        throw err
    } else {
        console.log('成功关闭数据库');
    }
});

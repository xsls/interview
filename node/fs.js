const fs = require('fs');
// const file = fs.createWriteStream('./test.html');
let data = fs.readFileSync('./test.html', 'utf8');
console.log('data', data);

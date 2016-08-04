const crypto = require('crypto');
const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log('hash', hash);

const cert1 = new crypto.Certificate();
const cert2 = crypto.Certificate();
console.log('cert1', cert1);
console.log('cert2', cert2);
